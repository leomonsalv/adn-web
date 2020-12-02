import React from 'react';
import PropTypes from 'prop-types';
import { Input as AntdInput } from 'antd';

/**
 * A basic widget for getting the user input is a text field.
 * Keyboard and mouse can be used for providing or changing data.
 */
const Input = (props) => <AntdInput data-testid="input-comp" {...props} />;

Input.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  type: PropTypes.string,
  value: PropTypes.string
};

Input.defaultProps = {
  defaultValue: '',
  disabled: false,
  maxLength: 20,
  name: '',
  onPressEnter: undefined,
  size: 'middle',
  type: 'text',
  value: ''
};

export default Input;
