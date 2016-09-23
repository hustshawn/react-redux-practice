import React from 'react'
import AppBar from 'material-ui/AppBar'

import LinkButton from './LinkButton'

class Nav extends React.Component {

  render() {
    return (
      <AppBar title="My App Bar" iconElementRight={
        <div>
          <LinkButton path="companies" label="Company"/>
          <LinkButton path="todos" label="Todos"/>
        </div>
      } />
    )
  }
}

export default Nav
