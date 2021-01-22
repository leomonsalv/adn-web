import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NavBar.module.scss';
import navbar from '../../../constans/navbar';

const NavBar = () => {
  const history = useHistory();
  const goToRoute = (route) => () => history.push(route);

  return (
    <>
      <ul className={styles.container_navbar}>
        {navbar.map((item) => (
          <li
            key={item.name}
            className={styles.span_element}
            onClick={goToRoute(item.route)}
            aria-hidden
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavBar;
