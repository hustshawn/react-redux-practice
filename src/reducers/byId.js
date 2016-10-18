const byId = (state ={}, action) => {
  switch(action.type) {
    case 'RECEIVE_TODOS':
      const nextState = {...state}
      action.response.forEach(todo => {
        nextState[todo.id] = todo
      })
    default:
      return state
  }
}

export default byId

export const getTodo = (state, id) => state[id]