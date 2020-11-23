import React from 'react';

import LoginForm from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm
};

const Template = (arguments_) => <LoginForm {...arguments_} />;

export const Basic = Template.bind({});
