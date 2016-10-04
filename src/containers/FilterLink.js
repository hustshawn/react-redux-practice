import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import FlatButton from 'material-ui/FlatButton';
/*********************  Components ***********************/

// Presentational component
const Link = ({
  onClick,
  active,
  label
}) => {
  if (active) {
    return  <FlatButton
              primary={true}
              onTouchTap={onClick}
              disabled={active}
              label={label} />
  }
  return (
    <FlatButton
      primary={true}
      onTouchTap={onClick}
      label={label} />
  )
}

const mapStateToLinkProps = (
  state,
  ownProps
) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => ({
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
})

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link)
export default FilterLink