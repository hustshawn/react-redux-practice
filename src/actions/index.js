/*********************  Actions  *************************/
import * as api from '../api'
import { getIsFetching } from '../reducers'
import * as schema from './schema'
import { normalize } from 'normalizr'

export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"
export const SHOW_ALL = "SHOW_ALL"
export const SHOW_ACTIVE = "SHOW_ACTIVE"
export const SHOW_COMPLETED = "SHOW_COMPLETED"

const requestTodos = (filter) => ({
  type: 'FETCH_TODOS_REQUEST',
  filter
})

const receiveTodos = (response, filter) => ({
  type: 'FETCH_TODOS_SUCCESS',
  response,
  filter
})

const fetchTodosFailure = (error, filter) => ({
    type: 'FETCH_TODOS_FAILURE',
    filter,
    message: error.message || 'Something went wrong'
  })
  // The grouped action creator that accepts the filter and call API, 
  // then dispatch the action 
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch(requestTodos(filter))
  return api.fetchTodos(filter).then(
    response => {

      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        response: normalize(response, schema.arrayOfTodos),
        filter
      })
    },
    error => {
      dispatch(fetchTodosFailure(error, filter))
    })
}


export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    // console.log('normalized response',
    //   normalize(response, schema.todo)
    //   )
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  })

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO',
      response
    })
  })
