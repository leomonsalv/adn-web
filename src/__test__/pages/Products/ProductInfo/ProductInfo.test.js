import React from 'react';
import { Provider } from 'react-redux';
import ProductInfo from '../../../../pages/Products/ProductInfo/ProductInfo';
import configureAppStore from '../../../../stores/configureStore';
import img from '../../../../assets/images/account/default.svg';

describe('Testing in <ProductInfo /> component', () => {
  const store = configureAppStore();
  let wrapper;
  const initialProduct = {
    imageUrl: img,
    name: 'amoxicilina',
    description: 'antibiotico',
    manufacturer: 'bayer',
    category: 'antibiotico',
    components: [
      {
        name: 'ibuprofeno',
        key: '1'
      }
    ]
  };

  beforeEach(() => {
    wrapper = global.mount(
      <Provider store={store}><ProductInfo product={initialProduct} /></Provider>
    );
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('change the default value of all span', () => {
    expect(wrapper.find('span#name').text()).toBe(initialProduct.name);
    expect(wrapper.find('span#description').text()).toBe(initialProduct.description);
    expect(wrapper.find('span#manufacturer').text()).toBe(initialProduct.manufacturer);
    expect(wrapper.find('span#category').text()).toBe(initialProduct.category);
    expect(wrapper.find('span#components').text()).toBe(
      Array.prototype.map.call(initialProduct.components, (component) => component.name).toString()
    );
  });
});
