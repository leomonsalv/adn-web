import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.scss';
import logoIcon from '../../assets/images/logo.svg';

const {
  Content, Footer
} = Layout;

const DashBoard = ({ children }) => (
  <Layout className={styles.layout}>
    <Layout className={styles.layout_container}>
      <Content>
        <div
          className={[styles.paddingContent].join(' ')}
        >
          {children}
        </div>
      </Content>
      <Footer className={styles.footer_container}>
        <img
          src={logoIcon}
          alt="logo"
          className={styles.logo_footer}
        />
      </Footer>
    </Layout>
  </Layout>
);

DashBoard.propTypes = {
  children: PropTypes.node
};

DashBoard.defaultProps = {
  children: undefined
};

export default DashBoard;
