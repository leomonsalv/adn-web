import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';

import App from './app';

const store = configureStore();

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
