import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { createStore } from 'redux'
import './index.css';
import expect from 'expect'
// import store from './store'
// import { Provider } from 'react-redux'



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
      return state.map(t => {
            todo(t, action)
        })
    default:
      return state
  }
}

const store = createStore(todosReducer)


class App extends React.Component {
  handleClick() {
    // console.log(this)
    store.dispatch({
      type: ADD_TODO,
      text: this.input.value
    })
    this.input.value = ""
  }



  render() {
  // console.log(store.getState())
    return (
      <div>
        <div>
        <input type="text" ref={ node => {
          this.input = node
        }}/>   
        <button onClick={ () => this.handleClick() }>Add</button>
        </div>
        <TodoList todos={store.getState()} />
      </div>
    )
  }
}

const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {console.log(todos)}
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
    
      <App />,

    document.getElementById('root')
  );
}
store.subscribe(render)
render()