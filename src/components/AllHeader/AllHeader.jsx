import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Navbar from './NavBar/NavBar';
import UbicationBar from './UbicationBar/UbicationBar';

const AllHeader = ({ children }) => (
  <>
    <div>
      <UbicationBar />
      <Header />
      <Navbar />
    </div>
    {children}
  </>
);

AllHeader.propTypes = {
  children: PropTypes.node
};

AllHeader.defaultProps = {
  children: undefined
};

export default AllHeader;
