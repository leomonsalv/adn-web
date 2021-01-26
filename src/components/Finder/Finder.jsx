import React from 'react';
import { Input } from 'antd';
import search from 'assets/images/finder/search.svg';
import styles from './Finder.module.scss';

const Finder = () => (
  <div className={styles.row_container}>
    <div className={styles.title}>
      <h1>
        La forma más fácil
        {' '}
        <span className={styles.green}>de comprar medicinas </span>
        {' '}
        y estar
        {' '}
        <span className={styles.green}>bien</span>
      </h1>
    </div>
    <div className={styles.subTitle}>
      <p>
        Busca los productos
        {' '}
        <span className={styles.keyword}>
          por tu síntoma, nombre o

          palabra clave
        </span>
        {' '}
        que recuerdes del medicamento.
      </p>
    </div>
    <div className={styles.search}>
      <Input
        placeholder="Escribe la palabra que quieras"
        size="large"
      />
      <div className={styles.icon}>
        <img src={search} alt="search" />
      </div>
    </div>
  </div>
);

export default Finder;
