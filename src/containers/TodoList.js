import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { List, ListItem } from 'material-ui/List'
import { withRouter } from 'react-router'
import Footer from './Footer'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import FetchError from '../components/FetchError'


class VisibileTodoList extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) 
      this.fetchData()
  }

  fetchData() {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter).then(() => console.log('done!'))
  }

  render() {
    const { toggleTodo, todos, isFetching, errorMessage } = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError 
          message={errorMessage}
          onRetry={() => this.fetchData()}
          />
      )
    }
    return <TodoList 
              todos={todos}
              onTodoClick={toggleTodo}
            />
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
  onTodoClick 
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
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
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
  actions
)(VisibileTodoList))

export default VisibileTodoList

