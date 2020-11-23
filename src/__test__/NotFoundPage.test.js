import { mount } from 'enzyme';
import React from 'react';

import Button from '../components/Button/Button';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  const history = {
    replace: sinon.spy()
  };

  const wrapper = mount(<NotFoundPage history={history} />);
  const wrapperComponent = wrapper.find(NotFoundPage);
  it('should mount component without crash', () => {
    expect(wrapperComponent).toHaveLength(1);
  });
  it('should render a button and text', () => {
    expect(wrapperComponent.find(Button).length).toBe(1);
    expect(wrapperComponent.find('h1').length).toBe(1);
    expect(wrapperComponent.contains('pages.notFound.title')).toBeTruthy();
  });
  it('should call mock function when button is clicked', () => {
    wrapperComponent.find(Button).simulate('click');
    sinon.assert.called(history.replace);
  });
});
