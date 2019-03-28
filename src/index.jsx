require('dotenv').config();
import React from 'react';
import App from './components/App';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'
import 'typeface-roboto';

const AppWithHot = hot(module)(App);

var mountNode = document.getElementById('app');

ReactDOM.render(<AppWithHot name='TimeLockr' />, mountNode);