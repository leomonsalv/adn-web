import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showNotification } from '../../stores/actions/notification';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import { setToken, removeToken } from '../../firebase/utils/token';
import { setProfile, cleanProfile } from '../../stores/actions/profile';
import API from '../../services';
import { HOME, REGISTER } from '../../constans/routes';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import styles from './Login.module.scss';
import image from '../../assets/images/logo.svg';
import emailIcon from '../../assets/images/email.svg';

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const goToRoute = (route) => () => history.push(route);

  const handleFormSubmit = async (formFieldValues) => {
    const { email, password } = formFieldValues;
    try {
      dispatch(loadingWithSpinner());

      const { data } = await API.auth.signIn({ email, password, signin: true });

      if (data) {
        setToken(data.token);

        const { data: role } = await API.roles.roleVerification(data.userProfile.roleId);

        if (role === undefined) {
          dispatch(cleanProfile());
          removeToken();
          return;
        }

        dispatch(
          setProfile({
            ...data.userProfile,
            isLogged: true,
            accessToken: data.token,
            role
          })
        );

        window.sessionStorage.setItem('userId', JSON.stringify(data.userProfile.id));
      }

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
      <img src={image} className={styles.logo} alt="logo" />
      <div className={styles.formPaper}>
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
      <Button
        type="link"
        htmlType="submit"
        className={styles.buttonRegister}
        onClick={goToRoute(REGISTER)}
      >
        <img src={emailIcon} alt="logo" className={styles.marginIcon} />
        {t('auth.registerPage.button')}
      </Button>
      <Button type="link" className={styles.buttonForgot}>
        Olvidaste tu
        {' '}
        <span className={styles.spanPassword}>contraseña?</span>
      </Button>

    </div>
  );
};

export default Login;
