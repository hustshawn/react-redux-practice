import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import './index.css';
import { Provider, connect } from 'react-redux'
import { loadState, saveState } from './localStorage'

const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"

const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
const SHOW_ALL = 'SHOW_ALL'
const SHOW_ACTIVE = 'SHOW_ACTIVE'
const SHOW_COMPLETED = 'SHOW_COMPLETED'

let currentTodo = 0

/*********************  Actions **********************/
const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: currentTodo++,
    text
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

/*********************  End Actions **********************/

/*********************  Reducers *************************/

// todo -reducer , handle the each todo's action
const todo = (state, action) => {
  switch(action.type) {
    case ADD_TODO: 
      return {
        id: action.id,
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



const filterReducer = (
    state = SHOW_ALL,
    action
  ) => {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:{
      // console.log(action)
      return action.filter
    }
      
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
/********************* End Reducers **********************/

const appReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: filterReducer
})

const persistedState = loadState()
// const middleware = applyMiddleware(logger())
// const store = createStore(appReducer, middleware)
const store = createStore(
  appReducer,
  persistedState
)

store.subscribe( () => {
  saveState(store.getState())
})
/*********************  Components ***********************/

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

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link)


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


let AddTodo = ({
  dispatch
}) => {
  let input 
  return (
      <div>
        <input type="text" ref={ node => {
          input = node
        }}/>   
        <button onClick={ () => {
          dispatch(addTodo(input.value))
          input.value = "" 
        }}>Add</button>
      </div>
  )
}

AddTodo = connect()(AddTodo)

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

let TodoList = ({
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


const App = () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
)

/*********************  End Components ***********************/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
