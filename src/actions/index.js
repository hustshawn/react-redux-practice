
export const ADD_TODO = "ADD_TODO"
export function addTodo(text) {
  // console.log("in actions, value:", text)
  return {
    type: ADD_TODO,
    text
  }
}