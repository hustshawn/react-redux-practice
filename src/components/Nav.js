import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import spacing from 'material-ui/styles/spacing';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan500 } from 'material-ui/styles/colors'
import { Link } from 'react-router'
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { browserHistory } from 'react-router'
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import zIndex from 'material-ui/styles/zIndex'
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';

let SelectableList = MakeSelectable(List)

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false,
      muiTheme: getMuiTheme()
    };
  }

  handleLeftIconButtonTouchTap = () => {
    this.setState({
      open: !this.state.open,
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
    appBar: {
      position: 'fixed',
      // Needed to overlap the examples
      zIndex: zIndex.appBar + 1,
      top: 0,
    },
    title: {
      paddingLeft: 20
    },
    root: {
      paddingTop: spacing.desktopKeylineIncrement,
      minHeight: 400,
    },
    footer: {
      backgroundColor: grey900,
      textAlign: 'center',
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
    console.log(this.state)
    let docked = false;
    let showMenuIconButton = true;
    const {
      prepareStyles,
    } = this.state.muiTheme;

    if (this.props.width === LARGE && title !== '') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      style.navDrawer = {
        zIndex: style.appBar.zIndex - 1,
      };
      style.root.paddingLeft = 256;
      style.footer.paddingLeft = 256;
    }
    return (
     <div>
       
        <AppBar 
        onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
        showMenuIconButton={true}
        title={title}
        zDepth={0}
        />
           {title !== '' ?
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
              })}
            </div>
          </div> :
          children
        }
        <Drawer 
          open={this.state.open} 
          docked={false} 
          onRequestChange={(open, reason) => {
            this.setState({open:false})
          }}>
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
              primaryText="Todos App"
            />
          </SelectableList>
        </Drawer>
     </div>

    )
  }
}

export default Nav
