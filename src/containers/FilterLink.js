import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
/*********************  Components ***********************/

// Presentational component
const Link = ({
  onClick,
  active,
  children
}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#" onClick={onClick}>
      { children }
    </a>
  )
}

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link)
export default FilterLink