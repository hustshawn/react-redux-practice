import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { browserHistory } from 'react-router'
// import { hashHistory } from 'react-router'

import configreStore from './store'
import App from './components/App'


const store = configreStore()
ReactDOM.render(
  <Provider store={store}>
    <Router history={ browserHistory } >
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
