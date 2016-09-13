import React, { Component } from 'react';
import { connect } from 'react-redux'
// import logo from './logo.svg';
import './App.css';
import { addTodo } from './actions'
import TodoList from './component/TodoList'
import AddTodo from './component/AddTodo'
class App extends Component {



  render() {
    // console.log(this)
    const { todos, dispatch } = this.props
    return (
      <div className="App">
        <AddTodo onAddTodo={text => dispatch(addTodo(text))}/>
 
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


