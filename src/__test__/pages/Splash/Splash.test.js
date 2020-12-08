import React from 'react';
import Splash from 'pages/Splash/Splash';

describe('Spinner Test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = global.mount(
      <Splash />
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title', () => {
    expect(wrapper.text()).toContain('ADAN');
  });
});
