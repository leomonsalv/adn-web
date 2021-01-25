import React from 'react';
import share from 'assets/images/footer/share.svg';

import styles from './Bottom.module.scss';

function Bottom() {
  return (
    <div className={styles.bottom}>
      <span className={styles.text}>
        Todos los derechos reservados
        <span className={styles.bold}> ©2020 Adan</span>
        <br />
        Designed and Developed by
        <span className={styles.bold}> @300dev</span>
      </span>
      <div className={styles.asd}>
        <img src={share} alt="share" />
      </div>
    </div>
  );
}

export default Bottom;
