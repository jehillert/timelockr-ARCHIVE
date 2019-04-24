/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'typeface-roboto';

require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'client:*');
}

ReactDOM.render(<App />, document.getElementById('app'));
