import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Row, Col, Breadcrumb
} from 'antd';
import styles from './SkelletonWeb.module.scss';

const SkelletonWeb = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={styles.container_skelleton}>
      <Breadcrumb separator="">
        <Breadcrumb.Item className={styles.bread_crumb}>Home</Breadcrumb.Item>
        <Breadcrumb.Separator />
      </Breadcrumb>
      <Row gutter={[16, 12]} className={styles.bread_crumb}>
        <Col xs={24}>
          <Skeleton className={styles.skelleton} />
        </Col>
        <Col xs={6}>
          <Skeleton className={styles.skelleton_hero} />
        </Col>
        <Col xs={18}>
          <Row gutter={[16, 12]}>
            {arr.map(() => (
              <Col xs={12}>
                <Skeleton className={styles.skelleton} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SkelletonWeb;
