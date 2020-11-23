import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../stores/configureStore';
import Snackbar from '../../components/SnackBar/SnackBar';

describe('Snackbar Test', () => {
  let wrapper;
  const store = configureStore();
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Snackbar />
      </Provider>
    );
  });

  it('should render without crash', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
