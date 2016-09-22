import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { browserHistory } from 'react-router'
import axios from 'axios'
// import { hashHistory } from 'react-router'

import configreStore from './store'
import App from './components/App'


const store = configreStore()
// store.dispatch({
//       type: "COMPANIES",
//       payload: axios.get(`http://localhost:8000/etadmin/companies/`, {withCredentials: 'true'})
//     })
ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
