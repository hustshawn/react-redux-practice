import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan500 } from 'material-ui/styles/colors'
import { Link } from 'react-router'
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { browserHistory } from 'react-router'


let SelectableList = MakeSelectable(List)

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

  handleMenuItemClick = () => {
    this.setState({
      open: false
    })
  }
  handleRequestChangeList = (event, value) => {
    browserHistory.push(value)
    this.setState({
      open: false
    })
  }
  getStyle = () => ({
    title: {
      paddingLeft: 20
    },
    itemButton: {
      width: '100%',
    marginLeft: 0,
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative'
      // opacity:0
    }
  })

   
  render() {
    const style = this.getStyle()
    const title = 'App Bar'
    console.log(this)
    return (
     <div>
        <AppBar 
        onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
        title={title}
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
          <AppBar title={title} />
          <SelectableList
            value={location.pathname}
            onChange={this.handleRequestChangeList}
           >
            <Subheader>Selectable Contacts</Subheader>
            <ListItem
              value={"companies"}
              primaryText="Companies"
            />
            <ListItem
              value={"todos"}
              primaryText="Todos"
            />
          </SelectableList>
        </Drawer>
     </div>

    )
  }
}

export default Nav
