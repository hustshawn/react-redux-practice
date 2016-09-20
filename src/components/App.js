import 'babel-polyfill'
import React from 'react'

import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'
import Footer from '../containers/Footer'
import '../index.css';

const App = () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
)

export default App