import '../src/theme/global.scss';
import Spinner, { SpinnerProvider } from './components/Spinner';
import SnackBar from './components/SnackBar/SnackBar';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './stores/configureStore';
import * as serviceWorker from './serviceWorker';
import FirebaseInstance, { FirebaseContext } from './firebase';
import Axios from '../src/services/Interceptor';

const store = configureStore();

Axios.Interceptor(store);

ReactDOM.render(
    <Provider store={store}>
      <SpinnerProvider>
        <Spinner>
          <FirebaseContext.Provider value={FirebaseInstance}>
              <App />
          </FirebaseContext.Provider>
        </Spinner>
      </SpinnerProvider>
      <SnackBar />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
