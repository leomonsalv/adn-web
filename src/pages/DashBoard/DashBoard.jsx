import { PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignOutButton from '../../components/SignOutButton/SignOutButton';
import { HOME } from '../../constans/routes';
import styles from './Dashboard.module.scss';

const {
  Content, Footer, Sider
} = Layout;

const DashBoard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const goToRoute = (route) => () => history.push(route);
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className={styles.logo} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
        >
          <Menu.Item
            key={HOME}
            icon={<PieChartOutlined />}
            onClick={goToRoute(HOME)}
          >
            Home
          </Menu.Item>
          <SignOutButton />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Adans Client</Footer>
      </Layout>
    </Layout>
  );
};

DashBoard.propTypes = {
  children: PropTypes.node
};

DashBoard.defaultProps = {
  children: undefined
};

export default DashBoard;
