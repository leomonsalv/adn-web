import React from 'react';

import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 'input text',
  id: 'input1'
};
