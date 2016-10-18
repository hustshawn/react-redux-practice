import React from 'react'
import { connect } from 'react-redux'
import { SHOW_COMPLETED, SHOW_ACTIVE, toggleTodo } from '../actions'
import { List, ListItem } from 'material-ui/List'
import { withRouter } from 'react-router'
import Footer from './Footer'
import { visibleTodos } from '../reducers'
import { fetchTodos } from '../api'

class VisibileTodoList extends React.Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos => 
      console.log(this.props.filter, todos))
  }
  render() {
    return <TodoList {...this.props} />
  }
}
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

const mapStateToTodoListProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: visibleTodos(
      state, 
      filter),
    filter
  }
}


const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch(toggleTodo(id))
    }
})

// the 'withRouter' wrapper is only available to the 3.0 of 'react-router'
VisibileTodoList = withRouter(connect(
  mapStateToTodoListProps, 
  { onTodoClick: toggleTodo }
)(VisibileTodoList))

export default VisibileTodoList

