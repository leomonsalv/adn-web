import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../../stores/configureStore';
import Login from '../../../pages/Login/Login';
import LoginForm from '../../../components/Forms/LoginForm/LoginForm';

const store = configureStore();

describe('Login Page', () => {
  let wrapper;
  let wrapperForm;
  const history = { replace: global.mockFn };

  beforeEach(() => {
    wrapper = global.mount(
      <Provider store={store}>
        <Login history={history} />
      </Provider>
    );
    wrapperForm = wrapper.find(LoginForm);
  });

  it('render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title', () => {
    expect(wrapper.text()).toContain('Iniciar SesiónE-mailPasswordEnterRegístrate');
    expect(wrapperForm).toBeTruthy();
  });
});
