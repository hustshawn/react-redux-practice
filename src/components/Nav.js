import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';

class Nav extends React.Component {

  render() {
    return (
      <ul>
        <RaisedButton label="Button"/>
        <li><Link to="companies">Companies</Link></li>
        <li><Link to="todos">Todos</Link></li>
      </ul>
    )
  }
}

export default Nav
