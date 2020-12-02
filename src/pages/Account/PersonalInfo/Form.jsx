import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loadingWithSpinner, loaded } from '../../../stores/actions/loader';
import { showNotification } from '../../../stores/actions/notification';
import API from '../../../services';
import Button from '../../../components/Button/Button';
import useForm from '../../../hooks/useForm';
import Input from '../../../components/Input/Input';
import styles from './Form.module.scss';

const Form = ({ setEditing, userData, setUser }) => {
  const dispatch = useDispatch();
  const { values, handleInputChange } = useForm(userData);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const updatedUser = {
      id: values.id || userData.docId,
      name: values.fullName,
      email: values.email,
      dni: values.dni,
      phone: values.phone,
      address: values.address,
      password: values.password,
      roleId: values.role.id,
      favorites: ['Pm88lNMUdlJzHQLr4iop'],
    };
    try {
      dispatch(loadingWithSpinner());
      await API.users.updateUser(updatedUser, values.id);
      dispatch(loaded());
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Error',
          content: error.message
        })
      );
    }
    setUser({ ...updatedUser, role: values.role });
    setLoading(false);
    setEditing();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.personal_img_content}>
        <div className={styles.circular_landscape}>
          <img
            src={userData.srcImgProfile}
            className={styles.image}
            alt="miprofile"
          />
        </div>
      </div>
      <div className={styles.fields_content}>
        <Input
          id="fullName"
          name="fullName"
          placeholder={t('pages.account.userInfo.fullName')}
          size="large"
          value={values.fullName}
          onChange={handleInputChange}
          disabled={loading}
          className={styles.field}
        />
        <Input
          id="email"
          name="email"
          placeholder={t('pages.account.userInfo.email')}
          size="large"
          value={values.email}
          onChange={handleInputChange}
          disabled={loading}
          className={styles.field}
        />

        <Input
          id="dni"
          name="dni"
          placeholder={t('pages.account.userInfo.dni')}
          size="large"
          value={values.dni}
          onChange={handleInputChange}
          disabled={loading}
          className={styles.field}
        />

        <Input
          id="phone"
          name="phone"
          placeholder={t('pages.account.userInfo.phone')}
          size="large"
          value={values.phone}
          onChange={handleInputChange}
          disabled={loading}
          className={styles.field}
        />

        <Input
          id="address"
          name="address"
          placeholder={t('pages.account.userInfo.address')}
          size="large"
          value={values.address}
          onChange={handleInputChange}
          className={styles.field}
          disabled={loading}
        />

        <Input
          id="password"
          name="password"
          placeholder={t('pages.account.userInfo.password')}
          size="large"
          value={values.password}
          onChange={handleInputChange}
          className={styles.field}
          disabled={loading}
        />
      </div>
      <div className={styles.actions_button}>
        <Button
          title={t('common.button.edit')}
          mode="submit"
          className="primary small"
          disabled={loading}
        />
        <Button
          title={t('common.button.cancel')}
          method={setEditing}
          className="secondary small"
          disabled={loading}
        />
      </div>
    </form>
  );
};

Form.propTypes = {
  setEditing: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    docId: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    srcImgProfile: PropTypes.string.isRequired,
    role: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string
    }),
  }).isRequired,
  setUser: PropTypes.func
};

Form.defaultProps = {
  setUser: undefined
};

export default Form;
