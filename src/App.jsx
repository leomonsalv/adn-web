import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from './logo.svg';
import { increment, decrement } from './stores/actions/demo';

import './App.css';

function App() {
  const counter = useSelector((state) => state.demo.value);
  const dispatch = useDispatch();
  // Action: code that causes an update to the state when something happens
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          Value:
          {' '}
          {counter}
          {' '}
          <br />
          <button type="submit" onClick={handleIncrement}>Increment</button>
          <button type="submit" onClick={handleDecrement}>Decrement</button>
        </div>
      </header>
    </div>
  );
}

export default App;
