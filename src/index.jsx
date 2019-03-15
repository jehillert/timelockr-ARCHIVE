require('dotenv').config();
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { hot } from 'react-hot-loader'

const AppWithHot = hot(module)(App);

var mountNode = document.getElementById("app");
ReactDOM.render(<AppWithHot name="TimeLockr" />, mountNode);