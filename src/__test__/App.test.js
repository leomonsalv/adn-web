import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from '../stores/configureStore';
import App from '../App';

const store = configureStore();

describe('testing <App /> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it('render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
