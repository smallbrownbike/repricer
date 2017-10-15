import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import App from './Main/App';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/' component={ App } />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)