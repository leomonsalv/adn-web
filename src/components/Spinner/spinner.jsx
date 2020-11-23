import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import useSpinnerContext from './useSpinner';

const Spinner = ({ children }) => {
  const { loading, spinner } = useSpinnerContext();

  return (
    <Spin spinning={loading && spinner} size="large">
      {' '}
      {children}
      {' '}
    </Spin>
  );
};

Spinner.propTypes = {
  children: PropTypes.node.isRequired
};

export default Spinner;
