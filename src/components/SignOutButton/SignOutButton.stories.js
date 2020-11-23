import React from 'react';
import { Provider } from 'react-redux';
import { Menu } from 'antd';
import configureAppStore from '../../stores/configureStore';
import SignOutButton from './SignOutButton';

const store = configureAppStore();

export default {
  title: 'Components/SignOutButton',
  component: SignOutButton
};

const Template = (arguments_) => (
  <Provider store={store}>
    <Menu>
      <SignOutButton {...arguments_} />
    </Menu>
  </Provider>
);

export const Basic = Template.bind({});
Basic.args = {
  onClick: {
    action: 'clicked'
  }
};
