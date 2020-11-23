import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({
  title, method, className, mode, disabled
}) => {
  const referenceButton = useRef();
  /* istanbul ignore next */
  useEffect(() => {
    const rippleEffect = (button) => (event) => {
      const positionX = event.clientX - event.target.offsetLeft;
      const positionY = event.clientY - event.target.offsetTop;

      const ripples = document.createElement('span');
      ripples.style.left = `${positionX}px`;
      ripples.style.top = `${positionY}px`;
      button.append(ripples);

      setTimeout(() => {
        ripples.remove();
      }, 700);
    };

    const button = referenceButton.current;
    button.addEventListener('click', rippleEffect(button));

    return () => {
      clearTimeout(button);
      button.removeEventListener('click', rippleEffect);

      return button;
    };
  }, []);

  const addClasses = () => {
    if (!className) return [styles.base];

    const classNames = className.split(' ');
    const classes = [styles.base];

    classNames.map((element) => classes.push(styles[element]));

    return classes.join(' ');
  };

  return (
    <button
      type={mode === 'submit' ? 'submit' : 'button'}
      ref={referenceButton}
      onClick={method}
      className={addClasses()}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  method: PropTypes.func,
  className: PropTypes.string.isRequired,
  mode: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  method: () => {},
  mode: 'button'
};

export default Button;
