import React from 'react'

import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'
import Footer from '../containers/Footer'
import CompanyList from '../containers/CompanyList'
import Nav from './Nav'

import '../index.css';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
}
// const App = () => (
//   <div>
//     {this.props.children}
//   </div>
// )

// export default App
