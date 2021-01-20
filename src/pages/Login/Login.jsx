import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showNotification } from '../../stores/actions/notification';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import {
  setToken,
  cleanSessionStorage,
  setUserIdStorage,
  setAccessCodeOdoo,
  setCookieExpiredTime
} from '../../firebase/utils/token';
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

      const responseOdoo = await API.odoo.getOdooAuth();

      if (!responseOdoo.data) {
        return;
      }

      setAccessCodeOdoo(responseOdoo.data.odoo_access_code);
      setCookieExpiredTime(responseOdoo.data.odoo_cookie_expired_time);

      const { data } = await API.auth.signIn({ email, password, signin: true });

      if (data) {
        const { userProfile, token } = data;

        const isClientUser = userProfile.category_id.find(
          (category) => category.name.toLowerCase() === 'client'
        );

        if (!isClientUser) {
          dispatch(cleanProfile());
          cleanSessionStorage();
          dispatch(
            showNotification({
              type: 'error',
              message: 'Error',
              content: 'Need a Category Client User to Access'
            })
          );
          dispatch(loaded());
          return;
        }

        const permissions = userProfile.x_role_id.x_permission_ids.map(
          (permission) => permission.x_name
        );
        const role = {
          role: userProfile.x_role_id.x_name,
          permissions
        };

        setToken(token);

        if (role === undefined) {
          dispatch(cleanProfile());
          cleanSessionStorage();
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

        setUserIdStorage(data.userProfile.id);
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
    <div className={styles.container_login}>
      <img src={image} className={styles.logo} alt="logo" />
      <div className={styles.form_paper}>
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
      <Button
        type="link"
        htmlType="submit"
        className={styles.button_register}
        onClick={goToRoute(REGISTER)}
      >
        <img src={emailIcon} alt="logo" className={styles.margin_icon} />
        {t('auth.registerPage.button')}
      </Button>
      <Button type="link" className={styles.button_forgot}>
        {t('auth.loginPage.forgot')}
        <span className={styles.span_password}>
          {t('auth.loginPage.password')}
        </span>
      </Button>
    </div>
  );
};

export default Login;
