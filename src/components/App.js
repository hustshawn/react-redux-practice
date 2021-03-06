import React, {PropTypes} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {darkWhite, lightWhite, grey900 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {spacing, zIndex} from 'material-ui/styles'
import Subheader from 'material-ui/Subheader'
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth'

import ContentFooter from './ContentFooter'
import '../index.css'
import '../App.css'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

let SelectableList = MakeSelectable(List)

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      muiTheme: getMuiTheme()
    };
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },
    }

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleLeftIconButtonTouchTap = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  }

  handleRequestChangeList = (event, value) => {
    browserHistory.push(value)
    this.setState({
      navDrawerOpen: false
    })
  }

  handleOnRequestChangeNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open
    })
  }
  handleDrawTitleTouchTap = () => {
    browserHistory.push('/')
  }

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    })
  }
  
  render() {
    const {
      location,
      children,
    } = this.props
    let {
      navDrawerOpen,
    } = this.state

    const {
      prepareStyles,
    } = this.state.muiTheme
    const styles = this.getStyles()

    const title = "App Bar"
    let docked = false
    let showMenuIconButton = true
    if (this.props.width === LARGE && title !== '') {
      docked = true
      navDrawerOpen = true
      showMenuIconButton = false

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      }
      styles.root.paddingLeft = 256
      styles.footer.paddingLeft = 256
    }
    return (
      <MuiThemeProvider>
        <div className="HolyGrail">
          <AppBar 
            onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
            showMenuIconButton={showMenuIconButton}
            title={title}
            zDepth={0}
          />
          <Drawer
            open={navDrawerOpen}
            docked={docked}
            onRequestChange={this.handleOnRequestChangeNavDrawer}
            containerStyle={{zIndex: zIndex.drawer - 100}}
            >
            <AppBar 
              title={title}
              showMenuIconButton={false}
              onTitleTouchTap={this.handleDrawTitleTouchTap} />
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
                value={"todos/"}
                primaryText="Todos App"
              />
            </SelectableList>
          </Drawer>

          <div className="HolyGrail-content" style={{margin: 50}} >
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
          </div>

          <ContentFooter
            style={styles.footer}>
             <p style={prepareStyles(styles.p)}>
              {'Code Crafted With Heart By '}
              <a style={styles.a} href="https://twitter.com/hustshawn">
                @Shawn&nbsp;Zhang
              </a>
              {' Powered By '}
              <a
                style={styles.a}
                href="https://facebook.github.io/react/"
              >
              React.js
              </a> {' & '}
              <a
                style={styles.a}
                href="https://material-ui.com"
              >
              Material-UI
              </a>.
            </p>
            <IconButton
              iconStyle={styles.iconButton}
              iconClassName="a fa-bitbucket-square"
              href="https://github.com/hustshawn"
            />

          </ContentFooter>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default withWidth()(App)