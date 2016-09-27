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

  handleLeftIconButtonTouchTap = () => {
    this.setState({
      open: !this.state.open
    })
  }

  getStyle = () => ({
    title: {
      paddingLeft: 20
    }
  })
   
  render() {
    const { title } = this.getStyle()

    return (
     <div>
        <AppBar 
        onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
        title="My App Bar"
        titleStyle={title}
        iconElementRight={
          <div>
            <LinkButton path="companies" label="Company"/>
            <LinkButton path="todos" label="Todos"/>
          </div>
        }
        showMenuIconButton={true}
        zDepth={0}
        />
        <Drawer 
          open={this.state.open} 
          docked={false} 
          onRequestChange={(open, reason) => {
            this.setState({open:false})
            console.log(reason)
          }}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
     </div>

    )
  }
}

export default Nav
