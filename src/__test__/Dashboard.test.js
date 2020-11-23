import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { HOME } from '../constans/routes';

import configureStore from '../stores/configureStore';
import DashBoard from '../pages/DashBoard/DashBoard';

describe('Dashboard Page ', () => {
  const store = configureStore();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[HOME]}>
        <DashBoard>
          <span>chilndre</span>
        </DashBoard>
      </MemoryRouter>
    </Provider>
  );
  it('Should render without crash', () => {
    expect(wrapper.find(DashBoard).length).toBe(1);
  });
});
