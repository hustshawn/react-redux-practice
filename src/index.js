import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { createStore } from 'redux'
import './index.css';
// import store from './store'
// import { Provider } from 'react-redux'



const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
let currentTodo = 0
// Reducer
const todosReducer = (state=[], action) => {
  switch(action.type){
    case ADD_TODO: {
      return (
        [...state,
          {
            id: currentTodo++,
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


class App extends React.Component {
  handleClick() {
    const node = this.refs.ref
    store.dispatch({
      type: ADD_TODO,
      text: node.value
    })
    node.value = ""
  }

  render() {
    // console.log(this)
    return (
      <div>
        <div>
        <input type="text" ref="ref"/>   
        <button onClick={ () => this.handleClick() }>Add</button>
        </div>
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


// Final render
const render = () => {
  ReactDOM.render(
    
      <App />,

    document.getElementById('root')
  );
}
store.subscribe(render)
render()