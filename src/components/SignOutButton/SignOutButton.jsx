import React, { useContext } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SIGNIN } from '../../constans/routes';
import { cleanProfile } from '../../stores/actions/profile';
import { showNotification } from '../../stores/actions/notification';
import { loadingWithSpinner, loaded } from '../../stores/actions/loader';
import FirebaseContext from '../../firebase/context';

const SignOutButton = (properties) => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const signOutHandler = async () => {
    try {
      dispatch(loadingWithSpinner());
      await firebase.signOut();
      dispatch(cleanProfile());
      window.sessionStorage.clear();
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Error',
          content: error.message
        })
      );
    } finally {
      dispatch(loaded());
      history.push(SIGNIN);
    }
  };

  return (
    <Menu.Item {...properties} icon={<LogoutOutlined />} onClick={signOutHandler}>
      Salir
    </Menu.Item>
  );
};

SignOutButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  properties: PropTypes.object
};

SignOutButton.defaultProps = {
  properties: undefined
};

export default SignOutButton;
