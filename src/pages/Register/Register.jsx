import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import API from '../../services';
import RegistrationForm from '../../components/Forms/RegistrationForm/RegistrationForm';
import { showNotification } from '../../stores/actions/notification';
import { SIGNIN } from '../../constans/routes';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import styles from './Register.module.scss';

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleFormSubmit = async (formFieldValues) => {
    try {
      const object = {
        name: formFieldValues.username,
        email: formFieldValues.email,
        password: formFieldValues.password,
        address: formFieldValues.address,
        phone: formFieldValues.phone,
        dni: formFieldValues.dni,
        // Adding constant role until work on assign role to user
        roleId: 'zDEUZFLh02VUM6lV9oSJ',
        register: true,
      };
      dispatch(loadingWithSpinner());
      await API.users.createUser(object);
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
