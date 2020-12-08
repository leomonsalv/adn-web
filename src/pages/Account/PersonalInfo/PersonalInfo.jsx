import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '../../../components/Button/Button';
import styles from './PersonalInfo.module.scss';
import Form from './Form';

const PersonalInfo = ({ user, setUser }) => {
  const [editing, setEditing] = useState(false);
  const { t } = useTranslation();

  const {
    docId, fullName, role, srcImgProfile, id, password, ...Alldata
  } = user;

  const EditMode = () => {
    setEditing(!editing);
  };

  const renderData = () => Object.keys(Alldata).map((item) => item !== 'favorites' && (
  <div key={item} className={styles.other_personal_item}>
    <span className={styles.label}>{item}</span>
    <span className={styles.value} id={item}>{Alldata[item]}</span>
  </div>
  ));

  return (
    <section
      className={` ${styles.personal_info} ${editing && styles.editing} `}
    >
      {editing ? (
        <Form
          setEditing={EditMode}
          setUser={setUser}
          userData={{
            ...Alldata,
            role: user.role,
            password: user.password,
            id: docId || id,
            fullName: user.fullName,
            srcImgProfile: user.srcImgProfile
          }}
        />
      ) : (
        <div className={styles.containerAccount}>
          <div className={styles.personal_img_content}>
            <div className={styles.circular_landscape}>
              <img
                src={user.srcImgProfile}
                className={styles.image}
                alt="miprofile"
              />
            </div>
          </div>
          <div className={styles.personal_data}>
            <div className={styles.content}>
              <div className={styles.personal_item}>
                <span className={styles.name} id="fullName" name="fullName">{user.fullName}</span>
                <span className={styles.value} id="role" name="role">{user.role.name}</span>
              </div>
              <div className={styles.buttonEdit}>
                <Button
                  id="edit"
                  title={t('common.button.edit')}
                  method={EditMode}
                  className="primary small"
                />
              </div>

            </div>

            <div className={styles.contentItems}>{renderData()}</div>
          </div>
        </div>
      )}
    </section>
  );
};

PersonalInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    docId: PropTypes.string,
    srcImgProfile: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    dni: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string
    }),
    favorites: PropTypes.arrayOf(PropTypes.string)
  }),
  setUser: PropTypes.func
};

PersonalInfo.defaultProps = {
  user: undefined,
  setUser: undefined
};

export default PersonalInfo;
