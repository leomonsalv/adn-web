import React from 'react';
import { Typography } from 'antd';

import styles from './Splash.module.scss';

const Splash = () => (
  <div className={styles.container}>
    <Typography.Title level={1} className={styles.text}>ADAN</Typography.Title>
  </div>
);

export default Splash;
