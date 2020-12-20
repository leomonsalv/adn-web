import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';
import runTranslate from './formRules';
import styles from './RegistrationForm.module.scss';
import userIcon from '../../../assets/images/user.svg';
import passwordIcon from '../../../assets/images/password.svg';
import emailIcon from '../../../assets/images/email.svg';
import directionIcon from '../../../assets/images/direction.svg';

/**
 * Registration form component
 */

const RegistrationForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [formRules] = useState(() => runTranslate());

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      className={styles.formRegisterContainer}
      form={form}
      name="register"
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

      <Form.Item
        className={styles.formItem}
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={formRules.secondPasswordRules}
      >
        <Input.Password
          className={styles.input}
          placeholder={t('auth.fields.password')}
          prefix={<img src={passwordIcon} alt="logo" className={styles.inputIcon} />}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        name="username"
        rules={formRules.usernameRules}
      >
        <Input
          className={styles.input}
          placeholder={t('auth.fields.username')}
          prefix={<img src={userIcon} alt="logo" className={styles.inputIcon} />}
        />

      </Form.Item>

      <Form.Item
        className={styles.formItem}
        name="dni"
        rules={formRules.dniRules}
      >
        <Input
          className={styles.input}
          placeholder={t('auth.fields.dni')}
          prefix={<img src={passwordIcon} alt="logo" className={styles.inputIcon} />}
        />
      </Form.Item>

      <Form.Item name="address" rules={formRules.addressRules} className={styles.formItem}>
        <Input
          className={styles.input}
          placeholder={t('auth.fields.address')}
          prefix={<img src={directionIcon} alt="logo" className={styles.inputIcon} />}
        />
      </Form.Item>

      <Form.Item name="phone" rules={formRules.phoneRules} className={styles.formItem}>
        <Input
          addonBefore={<span>+58</span>}
          style={{ width: '100%', padding: '0px', height: '100%' }}
          type="number"
          className={styles.input}
          placeholder={t('auth.fields.phoneNumber')}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        // wrapperCol={{
        //   xs: { span: 24 },
        //   sm: { span: 16, offset: 8 }
        // }}
      >
        <Button htmlType="submit" className={styles.buttonRegister} type="primary">
          <img src={emailIcon} alt="logo" className={styles.marginIcon} />
          {t('auth.registerPage.button')}
        </Button>
      </Form.Item>
    </Form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegistrationForm;
