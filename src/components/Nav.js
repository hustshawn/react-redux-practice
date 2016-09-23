import React from 'react'
import { Link } from 'react-router'

class Nav extends React.Component {

  render() {
    return (
      <ul>
        <li><Link to="companies">Companies</Link></li>
        <li><Link to="todos">Todos</Link></li>
      </ul>
    )
  }
}

export default Nav
