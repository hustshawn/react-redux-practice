import React from 'react'
import { connect } from 'react-redux'
import { SHOW_COMPLETED, SHOW_ACTIVE, toggleTodo } from '../actions'
import { List, ListItem } from 'material-ui/List'
const Todo = ({
  onClick,
  text,
  completed
}) => (
  <ListItem     
    onClick={onClick}
    primaryText={text}
    style={{
      textDecoration: 
        completed? 
          "line-through":
          "none"
        }} 
  />
)

let TodoList = ({
  todos, 
  onTodoClick 
}) => (
  <List>
    {todos.map(todo =>
      <Todo 
        key={todo.id} 
        {...todo} 
        onClick={() => onTodoClick(todo.id)} 
      />
    )}
  </List>
)
const getVisibleTodos = (todos, filter) => {
  // return todos.filter()
  switch(filter) {
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}
TodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList)
export default TodoList

