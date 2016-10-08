import React from 'react'
import { Link } from 'react-router'

const FilterLink = ({ filter, children }) => {

  console.log("FILTER LINKE filter", filter)
  const routerPrefix = '/todos/'
  return (
    <Link
      to={routerPrefix + filter}
      activeStyle={{
        textDecoration: 'none',
        color: 'black'
      }}
      >
      {children}
    </Link>
  )
}

// class FilterLink extends React.Component {
//   // componentWillMount(nextProps) {
//   //   console.log(this.props)
//   //   console.log(nextProps)
//   // }
//   componentWillReceiveProps(nextProps) {
//         console.log(this.props)
//     console.log(nextProps)
//   }
//   render() {
//     var debug = console.log.bind(window.console)

//     const routerPrefix = '/todos/'
//     const {filter, children } = this.props
//     console.log("FILTER LINK filter", filter)
//     return (
//       <Link
//         to={ routerPrefix + filter}
//         activeStyle={{
//           textDecoration: 'none',
//           color: 'black'
//         }}
//         >
//         {children}
//       </Link>
//     )

//   }
// }

export default FilterLink

// import React from 'react'
// import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
// import {Link} from 'react-router'
// import FlatButton from 'material-ui/FlatButton';
// /*********************  Components ***********************/

// // Presentational component
// const TopLink = ({
//   onClick,
//   active,
//   label,
//   filter
// }) => {
//   console.log("TODO LINK PROPS", active, label, filter)
//   if (active) {
//     return  <Link to={filter === 'all'? 'all' : filter}>
//               <FlatButton
//                 primary={true}
//                 onTouchTap={onClick}
//                 disabled={active}
//                 label={label} />
//               </Link>
//   }
//   return (
//    <Link to={filter === 'all'? 'all' : filter}>
//      <FlatButton
//       primary={true}
//       onTouchTap={onClick}
//       label={label} />
//    </Link>
//   )
// }

// const mapStateToLinkProps = (
//   state,
//   ownProps
// ) => {
//   console.log("MAP STATE TO PROPS",ownProps.filter)
//   return {
//     active: ownProps.filter === state.visibilityFilter
//   }
// }

// const mapDispatchToLinkProps = (
//   dispatch,
//   ownProps
// ) => {
//   // console.log(ownProps)
//  return {
//     onClick: ()=> {
//       dispatch(setVisibilityFilter(ownProps.filter))
//     }
// }
// }

// const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(TopLink)
// export default FilterLink