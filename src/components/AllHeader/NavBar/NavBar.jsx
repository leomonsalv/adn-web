import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import navbar from 'constans/navbar';
import styles from './NavBar.module.scss';
import Section from './Sections/Section';

const NavBar = () => {
  const history = useHistory();
  const goToRoute = (route) => () => history.push(route);
  const [itemMenu, setItemMenu] = useState();
  const [showContainer, setShowContainer] = useState(false);

  const showItemHover = (item) => {
    setItemMenu(item);
    setShowContainer(true);
  };

  return (
    <>
      <ul className={styles.containerNavbar}>
        {navbar.map((item) => (
          <li
            key={item.name}
            className={styles.spanElement}
            onClick={goToRoute(item.route)}
            onMouseEnter={() => showItemHover(item.name)}
            onMouseLeave={() => setShowContainer(false)}
            aria-hidden
          >
            {item.name}
          </li>
        ))}
      </ul>

      {showContainer && (
      <div
        className={styles.containerHover}
        onMouseEnter={() => setShowContainer(true)}
        onMouseLeave={() => setShowContainer(false)}
      >
        <Section name={itemMenu} />
      </div>
      )}
    </>
  );
};

export default NavBar;
