import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../../stores/configureStore';
import Register from '../../../pages/Register/Register';
import RegistrationForm from '../../../components/Forms/RegistrationForm/RegistrationForm';

const store = configureStore();

describe('Register Page', () => {
  let wrapper;
  const history = { replace: global.mockFn };

  beforeEach(() => {
    wrapper = global.mount(
      <Provider store={store}>
        <Register history={history} />
      </Provider>
    );
  });

  it('render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title', () => {
    expect(wrapper.text()).toContain('Register');
    expect(wrapper.find(RegistrationForm)).toBeTruthy();
  });
});
