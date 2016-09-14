import React, { Component } from 'react';
import { connect } from 'react-redux'
// import logo from './logo.svg';
import './App.css';
import { addTodo } from './actions'
import TodoList from './component/TodoList'
import AddTodo from './component/AddTodo'

class App extends Component {

  render() {
    console.log(this.props)
    const { todos, onAddClick } = this.props
    return (
      <div >
        <AddTodo onAddClick={ onAddClick }/>
        <TodoList todos={todos} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: (text) => {
      dispatch(addTodo(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


