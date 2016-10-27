import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
// let AddTodo = ({
//   dispatch
// }) => {
//   let input 
//   return (
//     <div>
//       <TextField 
//         id='todo-input'
//         type='text'
//         floatingLabelText='Input todo'
//         name='input'
//         value={input}>  

//       </TextField>
//       <RaisedButton
//         primary={true} 
//         label="Add"
//         onClick={ () => {
//           console.log("INPUT VALUE", input)
//           // dispatch(addTodo(input)) 
//         }}
//       />
//     </div>
//   )
// }

let AddTodo = ({
  dispatch
}) => {
  let input 
  return (
    <div>
    <input 
      type="text"
      name="value"
      onChange={(e) => input=e.target.value}/>
      <button
        onClick={(e)=> {
          dispatch(addTodo(input))
        } }
      >ADD
      </button>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo