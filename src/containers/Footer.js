import React from 'react'
import FilterLink from './FilterLink'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../actions'
// Footer - presentational component 
const Footer = () => (
  <p> 
   Show:
    {' '}
    <FilterLink filter='all' > all</FilterLink>
    {' '}
    <FilterLink filter='active' >active</FilterLink>
    {' '}
    <FilterLink filter='completed'>completed</FilterLink>
  </p>
)

export default Footer