import React from 'react';

import Button from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'primary',
  title: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  className: 'secondary',
  title: 'Button'
};

export const Large = Template.bind({});
Large.args = {
  className: 'large',
  title: 'Button'
};

export const Medium = Template.bind({});
Medium.args = {
  className: 'medium',
  title: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  className: 'small',
  title: 'Button'
};

export const Mode = Template.bind({});
Mode.args = {
  mode: 'submit',
  title: 'Button'
};
