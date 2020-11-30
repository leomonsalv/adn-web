import React from 'react';
import { Provider } from 'react-redux';
import configureAppStore from '../../../stores/configureStore';
import BackButton from '../../../components/BackButton/BackButton';

describe('Test Back Button', () => {
  let wrapper;
  const store = configureAppStore();

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <BackButton />
      </Provider>
    );
  });

  it('renders Back Button Correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
