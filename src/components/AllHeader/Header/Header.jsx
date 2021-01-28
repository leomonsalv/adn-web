import React from 'react';
import { useDispatch } from 'react-redux';
import logoIcon from 'assets/images/header/header_logo.svg';
import search from 'assets/images/header/search.svg';
import cart from 'assets/images/header/cart.svg';
import heart from 'assets/images/header/heart.svg';
import menu from 'assets/images/header/menu.svg';
import cartItem from 'assets/images/header/cartItem.svg';
import styles from './Header.module.scss';
import { openModal } from '../../../stores/actions/modal';
import SearchProducts from '../../SearchProducts/SearchProducts';

const Header = () => {
  const dispatch = useDispatch();

  const modalContent = {
    component: SearchProducts
  };

  const showSearch = () => {
    dispatch(openModal({ content: modalContent, buttons: undefined }));
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logoIcon} alt="logo" className={styles.icon_logo} />
      </div>
      <div className={styles.container}>
        <div
          className={styles.iconSearch}
          onClick={showSearch}
          aria-hidden="true"
        >
          <img src={search} alt="search" />
        </div>
        <div className={styles.login}>
          <span className={styles.text}>LOGIN / CREATE ACCOUNT</span>
        </div>
        <div className={styles.iconHeart}>
          <img src={heart} alt="heart" />
        </div>
        <div className={styles.cart}>
          <img src={cart} alt="cart" />
          <span className={styles.text}> MY CART </span>
          <img src={cartItem} alt="cartItem" />
        </div>
        <div className={styles.menu}>
          <img src={menu} alt="cart" />
          <span className={styles.text}> MENÚ </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
