import React from 'react';
import { Provider } from 'react-redux';
import img from '../../../../assets/images/account/default.svg';
import Form from '../../../../pages/Account/PersonalInfo/Form';
import configureStore from '../../../../stores/configureStore';

const store = configureStore();

const simulateChangeOnInput = (wrapper, inputSelector, newtarget) => {
  const input = wrapper.find(inputSelector);
  input.simulate('change', {
    target: newtarget
  });

  return wrapper.find(inputSelector);
};

describe('Testing in <Account /> component', () => {
  let wrapper;
  const setEditing = global.mockFn;
  const setUser = global.mockFn;
  const initialUser = {
    srcImgProfile: img,
    fullName: 'Jose BAptista',
    email: 'jbaptista@300dev.com',
    dni: 'V25965874',
    phone: '+5804165366698',
    address: 'Caracas, Venezuela',
    role: {
      name: 'Administrator',
      id: 'zDEUZFLh02VUM6lV9oSJ'
    },
    favorites: []
  };

  beforeEach(() => {
    wrapper = global.mount(
      <Provider store={store}>
        <Form setEditing={setEditing} userData={initialUser} setUser={setUser} />
      </Provider>
    );
  });

  it('should render component', () => {
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('change the default value of all inputs and submit, and check that the form no longer renders', () => {
    const inputfullName = simulateChangeOnInput(wrapper, 'input#fullName', {
      name: 'fullName',
      value: 'john wick'
    });

    expect(inputfullName.props().value).not.toBe(initialUser.fullName);

    const inputEmail = simulateChangeOnInput(wrapper, 'input#email', {
      name: 'email',
      value: 'jwick@300dev.com'
    });

    expect(inputEmail.props().value).not.toBe(initialUser.email);

    const inputDni = simulateChangeOnInput(wrapper, 'input#dni', {
      name: 'dni',
      value: 'E85965874'
    });

    expect(inputDni.props().value).not.toBe(initialUser.dni);

    const inputPhone = simulateChangeOnInput(wrapper, 'input#phone', {
      name: 'phone',
      value: 'E85965874'
    });

    expect(inputPhone.props().value).not.toBe(initialUser.phone);

    const inputAddress = simulateChangeOnInput(wrapper, 'input#address', {
      name: 'address',
      value: 'New york, Estados unidos'
    });

    expect(inputAddress.props().value).not.toBe(initialUser.address);

    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(wrapper.find('section.personal_info')).toBeTruthy();
  });
});
