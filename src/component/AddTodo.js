import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import store from '../store'


class AddTodo extends React.Component {
  
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()
    console.log(state)
    const { dispatch } = this.props
    let input
    // const { onAddClick } = this.props
    return (
      <div>
        <input type="text" ref={node => {
          input = node
        }} />
        <button onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''
        }}>Add</button>
      </div>
    )
  }
}


export default connect()(AddTodo)