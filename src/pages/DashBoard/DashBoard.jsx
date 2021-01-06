import { PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SignOutButton from '../../components/SignOutButton/SignOutButton';
import { HOME, PRODUCTS, ACCOUNT } from '../../constans/routes';
import styles from './Dashboard.module.scss';
import logoIcon from '../../assets/images/logo.svg';
import userIcon from '../../assets/images/user.svg';
import bagIcon from '../../assets/images/bag.svg';

const {
  Content, Footer, Sider
} = Layout;

const DashBoard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();
  const goToRoute = (route) => () => history.push(route);
  const location = useLocation();

  return (
    <Layout className={styles.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <img src={logoIcon} alt="logo" className={styles.logo} />
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

          <Menu.Item
            className={styles.menu}
            key={ACCOUNT}
            icon={<img src={userIcon} alt="logo" className={location.pathname === '/account' ? styles.icon_light : styles.icon} />}
            onClick={goToRoute(ACCOUNT)}
          >
            <span className={collapsed ? styles.opacity : undefined}>
              {t('menu.myAccount')}
            </span>
          </Menu.Item>

          <Menu.Item
            className={styles.menu}
            key={PRODUCTS}
            icon={<img src={bagIcon} alt="logo" className={location.pathname === '/products' ? styles.icon_light : styles.icon} />}
            onClick={goToRoute(PRODUCTS)}
          >
            <span className={collapsed ? styles.opacity : undefined}>
              {t('menu.products')}
            </span>
          </Menu.Item>
          <SignOutButton collapsed={collapsed} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div
            className={[styles.paddingContent, 'site-layout-background'].join(' ')}
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
};

DashBoard.propTypes = {
  children: PropTypes.node
};

DashBoard.defaultProps = {
  children: undefined
};

export default DashBoard;
