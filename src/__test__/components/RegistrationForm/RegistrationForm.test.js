import React from 'react';
import simulateChangeOnInput from '../../utils';
import RegistrationForm from '../../../components/Forms/RegistrationForm/RegistrationForm';

describe('Registration Form Tests', () => {
  const selectorEmail = 'input#register_email';
  const selectorPassWord = 'input#register_password';
  const selectorPhone = 'input#register_phone';
  const selectorConfirmPassword = 'input#register_confirm';
  const selectorUserName = 'input#register_name';
  const selectorAddress = 'input#register_address';

  const email = 'ddelgado@300dev.com';
  const password = 'password';
  const secondPassword = 'password';
  const name = 'delgado';
  const phone = '+584121234567';
  const address = 'caracas, miranda';

  let wrapper;
  const onSubmitMock = jest.fn();
  const container = document.createElement('DIV');
  container.id = 'hotRegister';
  document.body.append(container);

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = global.mount(<RegistrationForm onSubmit={onSubmitMock} />, {
      attachTo: document.querySelector('#hotRegister')
    });
  });

  afterEach(() => {
    wrapper.detach();
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow form submission when fields are valid', () => {
    const inputEmail = simulateChangeOnInput(wrapper, selectorEmail, {
      name: 'email',
      value: email
    });

    const inputPassword = simulateChangeOnInput(wrapper, selectorPassWord, {
      name: 'password',
      value: password
    });

    const inputConfirmPassword = simulateChangeOnInput(
      wrapper,
      selectorConfirmPassword,
      {
        name: 'confirm',
        value: secondPassword
      }
    );

    const inputName = simulateChangeOnInput(wrapper, selectorUserName, {
      name: 'name',
      value: name
    });

    const inputAddress = simulateChangeOnInput(wrapper, selectorAddress, {
      name: 'address',
      value: address
    });

    const inputPhone = simulateChangeOnInput(wrapper, selectorPhone, {
      name: 'phone',
      value: phone
    });

    expect(inputEmail.props().value).toBe(email);
    expect(inputPassword.props().value).toBe(password);
    expect(inputConfirmPassword.props().value).toBe(secondPassword);
    expect(inputName.props().value).toBe(name);
    expect(inputAddress.props().value).toBe(address);
    expect(inputPhone.props().value).toBe(phone);

    const formButton = wrapper.find('button');
    formButton.simulate('submit');
    setTimeout(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    }, 0);
  });

  it('should not enable the submit button as you do not have all the data', () => {
    const inputEmail = simulateChangeOnInput(wrapper, selectorEmail, {
      name: 'email',
      value: ''
    });

    const inputPassword = simulateChangeOnInput(wrapper, selectorPassWord, {
      name: 'password',
      value: password
    });

    const inputConfirmPassword = simulateChangeOnInput(
      wrapper,
      selectorConfirmPassword,
      {
        name: 'confirm',
        value: secondPassword
      }
    );

    const inputName = simulateChangeOnInput(wrapper, selectorUserName, {
      name: 'name',
      value: name
    });

    const inputAddress = simulateChangeOnInput(wrapper, selectorAddress, {
      name: 'address',
      value: ''
    });

    const inputPhone = simulateChangeOnInput(wrapper, selectorPhone, {
      name: 'phone',
      value: phone
    });

    expect(inputEmail.props().value).toBe('');
    expect(inputPassword.props().value).toBe(password);
    expect(inputConfirmPassword.props().value).toBe(secondPassword);
    expect(inputName.props().value).toBe(name);
    expect(inputAddress.props().value).toBe('');
    expect(inputPhone.props().value).toBe(phone);
  });
});
