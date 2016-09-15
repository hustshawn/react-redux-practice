import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import './index.css';


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
const visibilityFilter = (
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
// // Combined reducer
const FilterLink = ({
  filter,
  children
}) => {
  return (
    <a href="#" onClick={e=> {
      e.preventDefault();
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      })
    }}>
      { children }
    </a>
  )
}

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

const appReducer = combineReducers({
  todos: todosReducer,
  // visibleTodos: visibleTodos,
  visibilityFilter
})

const store = createStore(appReducer)

// store.dispatch({
//   type: SET_VISIBILITY_FILTER,
//   filter: SHOW_COMPLETED
// })

class App extends React.Component {

  render() {
    const { todos, visibilityFilter } = this.props
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    return (
      <div>
        <AddTodo />
        <TodoList todos={visibleTodos} />
   
      </div>
    )
  }
}


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

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => 
      <li key={todo.id} 
        style={{
          textDecoration: 
            todo.completed? 
              "line-through": "none"
            }} 
        onClick={ () => store.dispatch({
          type: TOGGLE_TODO,
          id: todo.id
        })}>
        {todo.text}
      </li>
      )
    } 
  </ul>
)


// Final render
const render = () => {
  ReactDOM.render(
    
      <App {...store.getState()}/>,

    document.getElementById('root')
  );
}
store.subscribe(render)
render()