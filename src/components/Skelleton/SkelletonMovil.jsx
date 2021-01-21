import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Row, Col
} from 'antd';
import styles from './SkelletonMovil.module.scss';

const SkelletonMovil = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const square = ['Home', 'Prescriptions', 'Cart', 'Account'];

  return (
    (
      <div className={styles.container_skelleton}>
        <Skeleton className={styles.header} />
        <div className={styles.padding_container}>
          <Row gutter={[16, 12]}>
            <Col xs={24}>
              <Skeleton className={styles.hero} />
            </Col>
            <Col xs={24} className={styles.title}>
              <p className={styles.shoppTitle}>Shopping in adans</p>
              <p className={styles.seeAll}>See all</p>
            </Col>
            <Col xs={24}>
              <Row gutter={[6, 6]}>
                {arr.map(() => (
                  <Col xs={6} className={styles.circle}>
                    <Skeleton circle height={45} width={45} />
                  </Col>
                ))}
              </Row>
            </Col>

            <Col xs={24} className={styles.title}>
              <p className={styles.shoppTitle}>Best deals for you</p>
              <p className={styles.seeAll}>See all</p>
            </Col>

            <Col xs={24}>
              <Row gutter={[6, 6]}>
                <Col xs={12}>
                  <Skeleton className={styles.slider} />
                </Col>
                <Col xs={12}>
                  <Skeleton className={styles.slider} />
                </Col>
              </Row>
            </Col>

            <Col xs={24}>
              <Row gutter={[6, 6]}>
                {square.map((item) => (
                  <Col
                    xs={6}
                    className={styles.square}
                  >
                    <Skeleton className={styles.item} />
                    <p className={styles.square_text}>
                      {item}
                    </p>
                  </Col>
                ))}

              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  );
};

export default SkelletonMovil;
