import React, { Component } from 'react'

class TodoList extends Component {
  
  renderList() {
    // console.log(this)
    return this.props.todos.map(todo => {
      return <li key={todo}>{todo}</li>
    })
  }  

  render() {
    return (
      <div>        
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }

} 

export default TodoList