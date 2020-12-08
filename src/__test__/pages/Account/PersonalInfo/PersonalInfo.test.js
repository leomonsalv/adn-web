import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../../../stores/configureStore';

import PersonalInfo from '../../../../pages/Account/PersonalInfo/PersonalInfo';
import img from '../../../../assets/images/account/default.svg';

const store = configureStore();

describe('Testing in <PersonalInfo /> component', () => {
  let wrapper;
  const initialUser = {
    srcImgProfile: img,
    fullName: 'Jose BAptista',
    email: 'jbaptista@300dev.com',
    dni: 'V25965874',
    phone: '+5804165366698',
    address: 'Caracas, Venezuela',
    role: { name: 'Coordinator' },
    favorites: []
  };

  beforeEach(() => {
    wrapper = global.mount(
      <Provider store={store}>
        <PersonalInfo user={initialUser} />
      </Provider>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('change the default value of all inputs and submit, and check that the form no longer renders', () => {
    expect(wrapper.find('Button#edit').props().title).toBe('common.button.edit');
    wrapper.find('Button#edit').simulate('click');
    expect(wrapper.find('form')).toBeTruthy();

    expect(wrapper.find('button.secondary').props().children).toBe('common.button.cancel');
    wrapper.find('button.secondary').simulate('click');

    expect(wrapper.find('section.personal_info')).toBeTruthy();
  });

  it('change the default value of all span', () => {
    expect(wrapper.find('span#fullName').text()).toBe(initialUser.fullName);
    expect(wrapper.find('span#role').text()).toBe(initialUser.role.name);
    expect(wrapper.find('span#email').text()).toBe(initialUser.email);
    expect(wrapper.find('span#dni').text()).toBe(initialUser.dni);
    expect(wrapper.find('span#phone').text()).toBe(initialUser.phone);
    expect(wrapper.find('span#address').text()).toBe(initialUser.address);
  });
});
