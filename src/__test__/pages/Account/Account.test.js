import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../../stores/configureStore';

import Account from '../../../pages/Account/Account';

const store = configureStore();

describe('Testing in <Account /> component', () => {
  let wrapper;
  const history = {
    replace: sinon.spy()
  };
  beforeEach(() => {
    wrapper = global.mount(
      <Provider store={store}>
        <Account history={history} />
      </Provider>
    );
  });

  it('should render component', () => {
    expect(wrapper.render()).toMatchSnapshot();
  });
});
