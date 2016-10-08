import React from 'react'
import { connect } from 'react-redux'
import { SHOW_COMPLETED, SHOW_ACTIVE, toggleTodo } from '../actions'
import { List, ListItem } from 'material-ui/List'
import { withRouter } from 'react-router'
import Footer from './Footer'
import { visibleTodos } from '../reducers'
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
  onTodoClick, 
  filter 
}) => (
    <div>
      <List>
        {todos.map(todo =>
          <Todo 
            key={todo.id} 
            {...todo} 
            onClick={() => onTodoClick(todo.id)} 
          />
        )}
      </List>
      
    </div>
  )


// const mapStateToTodoListProps = (state, ownProps) => {
//   console.log(ownProps)
//   return {
//     todos: getVisibleTodos(
//       state.todos, 
//       ownProps.params.filter || 'all')
//   }
// }
const mapStateToTodoListProps = (state, { params }) => {
  return {
    todos: visibleTodos(
      state, 
      params.filter || 'all')
  }
}


const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch(toggleTodo(id))
    }
})

// the 'withRouter' wrapper is only available to the 3.0 of 'react-router'
TodoList = withRouter(connect(
  mapStateToTodoListProps, 
  // mapDispatchToTodoListProps
  { onTodoClick: toggleTodo }
)(TodoList))

export default TodoList

