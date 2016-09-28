import React from 'react'
import FilterLink from './FilterLink'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../actions'
// Footer - presentational component 
const Footer = () => (
  <p> 
   Show:
    {' '}
    <FilterLink filter={SHOW_ALL} label="All"/>
    {' '}
    <FilterLink filter={SHOW_ACTIVE} label="Active" />
    {' '}
    <FilterLink filter={SHOW_COMPLETED} label="Completed" />
  </p>
)

export default Footer