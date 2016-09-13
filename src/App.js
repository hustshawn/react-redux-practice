import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoList from './component/TodoList'
import { addTodo } from './actions'
import { connect } from 'react-redux'

class App extends Component {

  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.dispatch(addTodo(text))
    node.value = ""
  }

  render() {
    // console.log(this)
    const { todos } = this.props
    return (
      <div className="App">
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>Add</button>
        <TodoList todos={todos} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    todos: state.todos
  }
}
export default connect(mapStateToProps)(App);


