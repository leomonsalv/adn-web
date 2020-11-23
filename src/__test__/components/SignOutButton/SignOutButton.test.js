import React from 'react';
import { Provider } from 'react-redux';
import configureAppStore from '../../../stores/configureStore';
import SignOutButton from '../../../components/SignOutButton/SignOutButton';

describe('Test Sign Out Button', () => {
  let wrapper;
  const store = configureAppStore();

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <SignOutButton />
      </Provider>
    );
  });

  it('renders Sign Out Button Correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
