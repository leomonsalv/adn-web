import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../stores/actions/notification';

const SnackBar = () => {
  const {
    show, type, message, content
  } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      notification[type]({
        message,
        description: content
      });
      dispatch(clearNotification());
    }
  }, [show, type, message, content, dispatch]);
  return <></>;
};

export default SnackBar;
