/*********************  Actions  *************************/
import { v4 } from 'node-uuid'
import * as api from '../api'
import {getIsFetching} from '../reducers'


export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"
export const SHOW_ALL = "SHOW_ALL"
export const SHOW_ACTIVE = "SHOW_ACTIVE"
export const SHOW_COMPLETED = "SHOW_COMPLETED"

const requestTodos = (filter) => ({
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
export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve()
    }

    dispatch(requestTodos(filter))
    return api.fetchTodos(filter).then(response =>{
        dispatch(receiveTodos(response, filter))
    })
}

export const addTodo = (text) => ({
    type: ADD_TODO,
    id: v4(),
    text
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

