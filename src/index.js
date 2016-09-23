import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { browserHistory } from 'react-router'
import { IndexRoute } from 'react-router'

import configreStore from './store'
import App from './components/App'
import TodoList from './containers/TodoList'
import CompanyList from './containers/CompanyList'


const store = configreStore()

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } >
        <IndexRoute component={ TodoList }/>
        <Route path="companies" component={CompanyList}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
