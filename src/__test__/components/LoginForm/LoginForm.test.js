import React from 'react';
import simulateChangeOnInput from '../../utils';
import LoginForm from '../../../components/Forms/LoginForm/LoginForm';

describe('Login Form Tests', () => {
  const selectorEmail = 'input#login_email';
  const selectorPassWord = 'input#login_password';

  const email = 'ddelgado@300dev.com';
  const password = 'password';

  let wrapper;
  const onSubmitMock = jest.fn();
  const container = document.createElement('DIV');
  container.id = 'hotLogin';
  document.body.append(container);

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = global.mount(<LoginForm onSubmit={onSubmitMock} />, {
      attachTo: document.querySelector('#hotLogin')
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

    expect(inputEmail.props().value).toBe(email);
    expect(inputPassword.props().value).toBe(password);

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

    expect(inputEmail.props().value).toBe('');
    expect(inputPassword.props().value).toBe(password);
  });
});
