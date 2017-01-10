import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {Main} from './app/main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.scss';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}/>
  </Router>,
  document.getElementById('root')
);
