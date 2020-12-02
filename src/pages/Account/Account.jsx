import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import { showNotification } from '../../stores/actions/notification';
import API from '../../services';
import img from '../../assets/images/account/default.svg';
import styles from './Account.module.scss';
import PersonalInfo from './PersonalInfo/PersonalInfo';

const Account = () => {
  const dispatch = useDispatch();
  const {
    docId, role, favorites
  } = useSelector((state) => state.profile);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserPassword = async () => {
      try {
        dispatch(loadingWithSpinner());
        const userProfile = await API.users.getUserById(docId);
        setUser(userProfile.data);
        dispatch(loaded());
      } catch (error) {
        dispatch(
          showNotification({
            type: 'error',
            message: 'Error',
            content: error.message
          })
        );
      }
    };
    if (docId) fetchUserPassword();
  }, [dispatch, docId]);

  const initialUser = {
    srcImgProfile: img,
    fullName: user && user.name,
    email: user && user.email,
    dni: user && user.dni,
    phone: user && user.phone,
    address: user && user.address,
    role,
    favorites,
    password: user && user.password,
    docId,
  };

  return (
    <div className={styles.container}>
      <PersonalInfo user={initialUser} setUser={setUser} />
    </div>
  );
};

export default Account;
