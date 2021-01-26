import React from 'react';
import styles from './Newsletter.module.scss';

function Newsletter() {
  return (
    <div className={styles.newsletter}>
      Suscríbete a nuestra
      <br />
      newsletter
      <form className={styles.form}>
        <input type="text" className={styles.input} placeholder="Email" />
        <button type="submit" className={styles.button}>ENVIAR</button>
      </form>
    </div>
  );
}

export default Newsletter;
