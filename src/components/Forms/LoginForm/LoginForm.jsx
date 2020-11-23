import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import runTranslate from './formRules';

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
      form={form}
      name="login"
      onFinish={onFinish}
      scrollToFirstError
      labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 10 } }}
    >
      <Form.Item name="email" label={t('auth.fields.email')} rules={formRules.emailRules}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={t('auth.fields.password')}
        rules={formRules.passwordRules}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16, offset: 8 }
        }}
      >
        <Button type="primary" htmlType="submit">
          {t('auth.loginPage.button')}
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
