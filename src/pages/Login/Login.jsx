import { Typography, Button } from 'antd';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showNotification } from '../../stores/actions/notification';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import { setToken, removeToken } from '../../firebase/utils/token';
import { setProfile, cleanProfile } from '../../stores/actions/profile';
import API from '../../services';
import FirebaseContext from '../../firebase/context';
import { HOME, REGISTER } from '../../constans/routes';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import styles from './Login.module.scss';

const Login = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const goToRoute = (route) => () => history.push(route);

  const handleFormSubmit = async (formFieldValues) => {
    const { email, password } = formFieldValues;
    try {
      dispatch(loadingWithSpinner());
      const { user } = await firebase.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await user.getIdToken();
      setToken(token);
      const userProfile = await firebase.getUserByEmail(user.email);
      const { data } = await API.roles.roleVerification(userProfile.roleId);
      if (data === undefined) {
        dispatch(cleanProfile());
        removeToken();
        return;
      }

      dispatch(
        setProfile({
          ...userProfile,
          isLogged: true,
          accessToken: token,
          role: data
        })
      );

      window.sessionStorage.setItem('userId', JSON.stringify(user.uid));
      dispatch(loaded());
      history.push(HOME);
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Error',
          content: error.message
        })
      );
      dispatch(loaded());
    }
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={1}>Iniciar Sesión</Typography.Title>
      <div className={styles.formPaper}>
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
      <Button type="link" onClick={goToRoute(REGISTER)}>Regístrate</Button>
    </div>
  );
};

export default Login;
