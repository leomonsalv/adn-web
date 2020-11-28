import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './BackButton.module.scss';

const BackButton = () => {
  const history = useHistory();

  const clickHandler = () => {
    history.goBack();
  };

  return (
    <Button
      onClick={clickHandler}
      icon={<ArrowLeftOutlined />}
      className={styles.back_button}
      size="large"
    />
  );
};

export default BackButton;
