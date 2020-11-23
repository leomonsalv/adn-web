import React, { useContext } from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegistrationForm from '../../components/Forms/RegistrationForm/RegistrationForm';
import FirebaseContext from '../../firebase/context';
import { showNotification } from '../../stores/actions/notification';
import { SIGNIN } from '../../constans/routes';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import styles from './Register.module.scss';

const Register = () => {
  const firebase = useContext(FirebaseContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleFormSubmit = async (formFieldValues) => {
    const { email, password } = formFieldValues;
    try {
      dispatch(loadingWithSpinner());
      await firebase.createUserWithEmailAndPassword(email, password);
      dispatch(
        showNotification({
          type: 'success',
          message: 'Success',
          content: 'User created'
        })
      );
      dispatch(loaded());
      history.push(SIGNIN);
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
      <Typography.Title level={1}>{t('auth.registerPage.title')}</Typography.Title>
      <div className={styles.formPaper}>
        <RegistrationForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Register;
