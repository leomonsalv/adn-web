import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const SpinnerContext = createContext({
  loading: undefined,
  spinner: undefined
});

const SpinnerProvider = ({ children }) => {
  const { loading, spinner } = useSelector((state) => state.loader);

  return (
    <SpinnerContext.Provider value={{ loading, spinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

SpinnerProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default SpinnerProvider;
