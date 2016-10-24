/*********************  Actions  *************************/
import { v4 } from 'node-uuid'
import * as api from '../api'


export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"
export const SHOW_ALL = "SHOW_ALL"
export const SHOW_ACTIVE = "SHOW_ACTIVE"
export const SHOW_COMPLETED = "SHOW_COMPLETED"

export const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const receiveTodos = (response, filter) => ({
    type: 'RECEIVE_TODOS',
    response,
    filter
})

// The grouped action creator that accepts the filter and call API, 
// then dispatch the action 
export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(response, filter)
    )

export const addTodo = (text) => ({
    type: ADD_TODO,
    id: v4(),
    text
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

