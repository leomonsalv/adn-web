import React, { useState } from 'react';
import {
  Button, Form, Input
} from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import runTranslate from './formRules';
import userIcon from '../../../assets/images/user.svg';
import passwordIcon from '../../../assets/images/password.svg';
import styles from './LoginForm.module.scss';

/**
 * Login form component
 */
const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formRules] = useState(() => runTranslate());

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      className={styles.formLoginContainer}
      form={form}
      name="login"
      onFinish={onFinish}
      scrollToFirstError
      labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 10 } }}
    >
      <Form.Item name="email" rules={formRules.emailRules} className={styles.formItem}>
        <Input
          className={styles.input}
          prefix={<img src={userIcon} alt="logo" className={styles.inputIcon} />}
          placeholder={t('auth.fields.email')}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        name="password"
        rules={formRules.passwordRules}
        hasFeedback
      >
        <Input.Password
          className={styles.input}
          placeholder={t('auth.fields.password')}
          prefix={<img src={passwordIcon} alt="logo" className={styles.inputIcon} />}
        />
      </Form.Item>

      <Form.Item className={styles.formItem} style={{ marginTop: '42px' }}>
        <Button
          className={styles.buttonLogin}
          type="primary"
          htmlType="submit"
        >
          {t('auth.loginPage.title')}
        </Button>

      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
