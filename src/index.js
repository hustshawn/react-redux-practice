import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { browserHistory } from 'react-router'
import { IndexRoute } from 'react-router'

import configreStore from './store'
import App from './components/App'
import TodoApp from './containers/TodoApp'
import CompanyList from './containers/CompanyList'


const store = configreStore()
let routes = (
  <Route path="/" component={ App } >
    <IndexRoute component={ CompanyList }/>
    <Route path="companies" component={CompanyList}/>
    <Route path="todos(/:filter)" component={TodoApp}/>

  </Route>
)


// const store = configreStore()
// let routes = (
//   <Route path="/" component={ App } >
//     <IndexRoute component={ TodoApp }/>
//     <Route path="/(:filter)" component={TodoApp}/>
//   </Route>
// )

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);


