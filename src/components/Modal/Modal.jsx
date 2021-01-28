import React from 'react';
import { Modal, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../stores/actions/modal';

const AppModal = () => {
  const {
    open, buttons, content, showOkButton
  } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const close = () => {
    dispatch(closeModal());
  };
  let Cont;
  let footer;
  if (content) Cont = content.component;
  if (buttons) {
    footer = buttons.map((button) => (
      <Button
        key={uuidv4()}
        onClick={button.function}
        type={button.primary ? 'primary' : 'default'}
      >
        {button.text}
      </Button>
    ));
  }
  return (
    <Modal
      visible={open}
      onCancel={close}
      onOk={close}
      footer={footer}
      width={1200}
      cancelText={t('common.button.cancel')}
      cancelButtonProps={
        showOkButton ? undefined : { style: { display: 'none' } }
      }
      okButtonProps={
        showOkButton ? undefined : { style: { display: 'none' } }
      }
    >
      {Cont ? <Cont {...content.props} /> : undefined}
    </Modal>
  );
};

export default AppModal;
