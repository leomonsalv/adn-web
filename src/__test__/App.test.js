import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../stores/configureStore';
import App from '../App';

const store = configureStore();

describe('testing <App /> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  });
  it('render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
