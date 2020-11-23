import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';
import runTranslate from './formRules';

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
      form={form}
      name="register"
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
        name="confirm"
        label={t('auth.fields.confirmPassword')}
        dependencies={['password']}
        hasFeedback
        rules={formRules.secondPasswordRules}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="username"
        label={t('auth.fields.username')}
        rules={formRules.usernameRules}
      >
        <Input />
      </Form.Item>

      <Form.Item name="address" label={t('auth.fields.address')} rules={formRules.addressRules}>
        <Input />
      </Form.Item>

      <Form.Item name="phone" label={t('auth.fields.phoneNumber')} rules={formRules.phoneRules}>
        <Input
          addonBefore={<span>+58</span>}
          style={{ width: '100%' }}
          type="number"
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16, offset: 8 }
        }}
      >
        <Button type="primary" htmlType="submit">
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
