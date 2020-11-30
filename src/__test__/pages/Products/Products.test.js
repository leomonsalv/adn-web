import React from 'react';
import { Provider } from 'react-redux';
import configureAppStore from '../../../stores/configureStore';
import Products from '../../../pages/Products/Products';

describe('Testing component <Products />', () => {
  const store = configureAppStore();
  const wrapper = global.mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );
  it('Render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
