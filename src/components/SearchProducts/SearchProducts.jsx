import React from 'react';
import { Input } from 'antd';
import findtIt from '../../assets/images/findIt.svg';
import warning from '../../assets/images/warning.svg';
import styles from './SearchProducts.module.scss';
import arr from '../../constans/searchProducts';

const Finder = () => (
  <div className={styles.row_container}>
    <div className={styles.search}>
      <Input
        placeholder="Search something"
        className={styles.inputText}
        suffix={(
          <div className={styles.icon}>
            <img src={findtIt} alt="search" />
          </div>
              )}
      />
    </div>
    <div className={styles.warning}>
      <div>
        <img src={warning} alt="search" />
      </div>
      <div className={styles.container_title}>
        Puedes buscar por patología, síntoma, palabra clave o
        cualquier otro criterio que consideres
      </div>
    </div>
    <div className={styles.products}>
      <div className={styles.title}>Recommendations for you</div>
      <div className={styles.productsItems}>
        {arr.map(() => (
          <div className={styles.item}>
            <div className={styles.square} />
            <div>
              <p className={styles.name}>Product Name</p>
              <p className={styles.category}>Main Category</p>
              <p className={styles.price}>13.00 $</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Finder;
