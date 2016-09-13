import React, { Component } from 'react'
// import { addTodo } from '../actions'
class AddTodo extends React.Component {

  handleClick(e) {
    console.log(this.refs)
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddTodo(text)
    node.value = ""
  }
  render() {
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>Add</button>
      </div>
    )
  }
}

export default AddTodo