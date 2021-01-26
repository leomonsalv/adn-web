import React from 'react';
import logo from 'assets/images/header/header_logo.svg';
import mail from 'assets/images/footer/mail.svg';
import twitter from 'assets/images/footer/twitter.svg';
import facebook from 'assets/images/footer/facebook.svg';
import linkedin from 'assets/images/footer/linkedin.svg';
import instagram from 'assets/images/footer/instagram.svg';
import phone from 'assets/images/footer/phone.svg';

import styles from './Information.module.scss';

function Information() {
  return (
    <div className={styles.middle}>
      <div className={styles.left}>
        <div className={styles.description}>
          <img className={styles.logo} height="60" src={logo} alt="logo" />
          <p className={styles.text}>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Cras at sodales elit. Nunc sagittis
            iaculis varius. Integer ornare finibus felis.
            Sed vitae est in orci dignissim egestas.
          </p>
        </div>
        <ul className={styles.options}>
          <li className={styles.text}>Crear usuario nuevo</li>
          <li className={styles.text}>Devoluciones</li>
          <li className={styles.text}>Problemas con el producto?</li>
          <li className={styles.text}>Problemas en la entrega</li>
          <li className={styles.text}>Sugerencias</li>
          <li className={styles.text}>Otro link cualquiera</li>
        </ul>
      </div>
      <div className={styles.right}>
        <div className={styles.contact}>
          <div className={styles.social}>
            <div className={styles.mail}>
              <img src={mail} alt="mail" />
              <span className={styles.text}>
                mail@adan.com
              </span>
            </div>
            <div className={styles.sites}>
              <img src={twitter} alt="twitter" />
              <img src={facebook} alt="facebook" />
              <img src={linkedin} alt="linkedin" />
              <img src={instagram} alt="instagram" />
            </div>
          </div>
          <div className={styles.phone}>
            <img src={phone} alt="phone" />
            <ul className={styles.numbers}>
              <li className={styles.text}>+123 456 78 89</li>
              <li className={styles.text}>+123 456 78 89</li>
            </ul>
          </div>
        </div>
        <div className={styles.conditions}>
          <span className={styles.text}>Términos y condiciones</span>
          <span className={styles.text}>Política de privacidad</span>
          <span className={styles.text}>Cookies</span>
        </div>
      </div>
    </div>
  );
}

export default Information;
