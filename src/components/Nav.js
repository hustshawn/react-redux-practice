import React from 'react'
import AppBar from 'material-ui/AppBar'

import LinkButton from './LinkButton'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  toggle () {
    console.log(this.state)
    this.setState({open: !this.state.open})
  }
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
        // onLeftIconButtonTouchTap={this.toggle}
        iconElementLeft={
          <Drawer open={false}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        }
        iconElementRight={
          <div>
            <LinkButton path="companies" label="Company"/>
            <LinkButton path="todos" label="Todos"/>
          </div>
        }
        showMenuIconButton={true}
        />
    )
  }
}

export default Nav
