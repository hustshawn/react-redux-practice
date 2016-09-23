import React from 'react'
import AppBar from 'material-ui/AppBar'

import LinkButton from './LinkButton'

class Nav extends React.Component {

  render() {
    const style ={
      title: {
        paddingLeft: 20,
      }
    }
    return (
      <AppBar 
        title="My App Bar"
        titleStyle={style.title} 
        iconElementRight={
          <div>
            <LinkButton path="companies" label="Company"/>
            <LinkButton path="todos" label="Todos"/>
          </div>
        }
        showMenuIconButton={false}
        />
    )
  }
}

export default Nav
