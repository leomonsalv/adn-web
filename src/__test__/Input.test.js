import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Input from '../components/Input/Input';

it('should call onChange prop', () => {
  const onSearchMock = sinon.spy();
  const component = mount(
    <Input id="input-test" value="test" onChange={onSearchMock} />
  );
  const input = component.find('input');
  expect(input.props().value).toBe('test');
  input.simulate('change');
  expect(onSearchMock.calledOnce).toBe(true);
});
