import React from 'react'

import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'
import Footer from '../containers/Footer'
import CompanyList from '../containers/CompanyList'

import '../index.css';

export default class App extends React.Component {

  render() {
    return (
      <div>
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
