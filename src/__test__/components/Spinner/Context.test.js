import React from 'react';
import { Provider } from 'react-redux';
import SpinnerProvider from '../../../components/Spinner/context';
import configureAppStore from '../../../stores/configureStore';

describe('Spinner Context Test', () => {
  let wrapper;
  const store = configureAppStore();

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <SpinnerProvider>
          <span>children</span>
        </SpinnerProvider>
      </Provider>
    );
  });

  it('should render without crash', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
