import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { createStore } from 'redux'
import './index.css';
// import store from './store'
// import { Provider } from 'react-redux'



const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
// Reducer
const todosReducer = (state=[], action) => {
  console.log(state)
  console.log(action)
  switch(action.type){
    case ADD_TODO: {
      return (
        [...state,
          {
            id: action.id,
            text:action.text,
            completed: false
          }
        ] 
      )
    }
    case TOGGLE_TODO: {
      return state.map(todo => {
        if (todo.id !== action.id){
          return todo
        } else {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
      })
    }
    default:
      return state
  }
}

const store = createStore(todosReducer)

let currentTodo = 0
console.log("store:",store)
store.dispatch({type:ADD_TODO, id: currentTodo++, text: 'A'})
store.dispatch({type:ADD_TODO, id: currentTodo++, text: 'B'})
store.dispatch({type:ADD_TODO, id: currentTodo++, text: 'C'})
store.dispatch({type:ADD_TODO, id: currentTodo++, text: 'D'})
store.dispatch({type:ADD_TODO, id: currentTodo++, text: 'E'})
// store.dispatch({type:ADD_TODO, todo: 'B'})

class App extends React.Component {
  render() {
    console.log(store.getState())
    return (
      <div>
   
        <TodoList store={store.getState()}/>
      </div>
    )
  }
}

const TodoList = ({ store }) => (
  <ul>
    { store.map((todo) => {
      return (
      <li key={todo.id}>{todo.text}</li>
        )
    })}
  </ul>
)

const render = () => {
  ReactDOM.render(
    
      <App />,

    document.getElementById('root')
  );
}
store.subscribe(render)
render()