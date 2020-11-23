/* eslint-disable no-undef */
import React from 'react';
import Button from '../../components/Button/Button';

describe('Test button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Button title="test" method={global.mockFn} className="primary" />
    );
  });

  it('render button', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mock function when button is clicked', () => {
    wrapper.simulate('click');
    expect(global.mockFn).toHaveBeenCalled();
  });
  it('should render with only className base', () => {
    const wrapperClass = shallow(<Button method={global.mockFn} title="test" className="primary" />);
    expect(wrapperClass.find('.base').length).toBe(1);
  });
});
