import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import image from '../../assets/images/logo.svg';
import API from '../../services';
import RegistrationForm from '../../components/Forms/RegistrationForm/RegistrationForm';
import { showNotification } from '../../stores/actions/notification';
import { SIGNIN } from '../../constans/routes';
import { setAccessCodeOdoo } from '../../firebase/utils/token';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import styles from './Register.module.scss';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleFormSubmit = async (formFieldValues) => {
    try {
      const userObj = {
        name: formFieldValues.name,
        email: formFieldValues.email,
        password: formFieldValues.password,
        street: formFieldValues.address,
        city: formFieldValues.city,
        phone: formFieldValues.phone,
        vat: formFieldValues.vat,
        x_role_id: 3,
        country_id: 238,
        state_id: 1385,
        company_type: 'person',
        category_id: [9]
      };
      const odooBody = {
        ...userObj,
        register: true
      };

      dispatch(loadingWithSpinner());
      const responseOdoo = await API.odoo.getOdooAuth();

      setAccessCodeOdoo(responseOdoo.data.odoo_access_code);

      await API.odoo.registerClientOdoo(odooBody);
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
    <div className={styles.container_login}>
      <img src={image} className={styles.logo} alt="logo" />
      <div className={styles.form_paper}>
        <RegistrationForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Register;
