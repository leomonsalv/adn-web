import React from 'react';
import Newsletter from './Newsletter';
import Information from './Information';
import styles from './Footer.module.scss';
import Bottom from './Bottom';

function Footer() {
  return (
    <div className={styles.container}>
      <Newsletter />
      <Information />
      <Bottom />
    </div>
  );
}

export default Footer;
