import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import image from '../../assets/images/notfound/not_found.svg';
import Button from '../../components/Button/Button';
import styles from './NotFound.module.scss';

const NotFoundPage = ({ history }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={image} className={styles.img} alt={t('pages.notFound.title')} />
        <h1 className={styles.title}>{t('pages.notFound.title')}</h1>
        <Button
          title={t('pages.notFound.button')}
          // eslint-disable-next-line react/prop-types
          method={() => history.replace('/')}
          className="primary"
        />
      </div>
    </div>
  );
};

NotFoundPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object
};

NotFoundPage.defaultProps = {
  history: undefined
};
export default NotFoundPage;
