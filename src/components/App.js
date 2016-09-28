import React from 'react'

import Nav from './Nav'
import '../index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../App.css'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends React.Component {

  render() {

    return (
      <MuiThemeProvider>
        <div className="HolyGrail">
          <Nav className="HolyGrail-nav"/>
            <div className="HolyGrail-content" style={{margin: 50}} >
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
