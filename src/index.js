import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import './index.css';
import logger from 'redux-logger'


const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
let currentTodo = 0
// Reducer
// todo -reducer , handle the each todo's action
const todo = (state, action) => {
  switch(action.type) {
    case ADD_TODO: 
      return {
        id: currentTodo++,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO: 
      if (state.id !== action.id){
        return state
      } else {
          return {
            ...state,
            completed: !state.completed
          }
        }
    default:
      return state
  }
}

const todosReducer = (state=[], action) => {
  switch(action.type){
    case ADD_TODO: 
      return [
        ...state,
        todo(undefined, action)
      ]        
    case TOGGLE_TODO: 
      // This is called 'Reducer Composition'
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
const SHOW_ALL = 'SHOW_ALL'
const SHOW_ACTIVE = 'SHOW_ACTIVE'
const SHOW_COMPLETED = 'SHOW_COMPLETED'

const filterReducer = (
    state = SHOW_ALL,
    action
  ) => {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:{
      console.log(action)
      return action.filter
    }
      
    default:
      return state
  }
}

const visibleTodos = (state, action) => {
  switch(action.type) {
    case SHOW_COMPLETED:
      return state.todos.filter(todo => todo.completed)
    case SHOW_ACTIVE: 
      return state.todos.filter(todo => !todo.completed)
    default:
      return state
  }
}

// const combineReducers = (reducers) =>{
//   return (state ={}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](
//           state[key],
//           action
//         )
//         return nextState
//       }, 
//       {}
//     )
//   }
// }
const appReducer = combineReducers({
  todos: todosReducer,
  // visibleTodos: visibleTodos,
  visibilityFilter: filterReducer
})

const middleware = applyMiddleware(logger())
const store = createStore(appReducer, middleware)

// Presentational component
const Link = ({
  onClick,
  active,
  children
}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#" onClick={onClick}>
      { children }
    </a>
  )
}

// Container ? provides data and behavior
class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()
    const { filter, children } = this.props
    return (
      <Link active={ filter === state.visibilityFilter } onClick={
        e=> {
          e.preventDefault();
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      }>
        { children }
      </Link>
    )
  }
}

// Footer - presentational component 
const Footer = () => (
  <p> 
   Show:
    {' '}
    <FilterLink filter={SHOW_ALL}>All</FilterLink>
    {' '}
    <FilterLink filter={SHOW_ACTIVE}>Active</FilterLink>
    {' '}
    <FilterLink filter={SHOW_COMPLETED}>Completed</FilterLink>
  </p>
)

class AddTodo extends React.Component {
  handleClick() {
  // console.log(this)
    store.dispatch({
      type: ADD_TODO,
      text: this.input.value
    })
    this.input.value = ""
  }

  render() {
    return (
        <div>
          <input type="text" ref={ node => {
            this.input = node
          }}/>   
          <button onClick={ () => this.handleClick() }>Add</button>
        </div>
    )
  }
}


// TodoList components
const Todo = ({
  onClick,
  text,
  completed
}) => (
  <li     
    onClick={onClick}
    style={{
      textDecoration: 
        completed? 
          "line-through":
          "none"
        }} 
  >
    {text}
  </li>
)

const TodoList = ({
  todos, 
  onTodoClick 
}) => (
  <ul>
    {todos.map(todo =>
      <Todo 
        key={todo.id} 
        {...todo} 
        onClick={() => onTodoClick(todo.id)} 
      />
    )}
  </ul>
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

class VisibleTodoList extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { todos, visibilityFilter } = store.getState()
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    return (
      <TodoList todos={visibleTodos} onTodoClick={ id => store.dispatch({
        type: TOGGLE_TODO,
        id
      })}/>
    )
  }
}


const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)


// Final render

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
