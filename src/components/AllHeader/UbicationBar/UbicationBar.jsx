import React from 'react';
import ubication from 'assets/images/header/ubication.svg';
import close from 'assets/images/header/close.svg';
import settings from 'assets/images/header/settings.svg';
import styles from './UbicationBar.module.scss';

function UbicationBar() {
  return (
    <div className={styles.container}>
      <div className={styles.ubication}>
        <img src={ubication} alt="ubication" />
        <div className={styles.ubication_text}>
          <span className={styles.text}>Estás en, Caracas, Venezuela</span>
        </div>
        <img src={settings} alt="settings" />
      </div>
      <div className={styles.help}>
        <span className={styles.text}>Need help? </span>
        <span className={styles.underlined_text}>Click here</span>
      </div>
      <div className={styles.close}>
        <img src={close} alt="close" />
      </div>
    </div>
  );
}

export default UbicationBar;
