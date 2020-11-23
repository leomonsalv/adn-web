import React from 'react';
import Spinner from '../../../components/Spinner';

describe('Spinner Test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Spinner>
        <span>children</span>
      </Spinner>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children', () => {
    expect(wrapper.find('span').length).toBe(1);
  });
});
