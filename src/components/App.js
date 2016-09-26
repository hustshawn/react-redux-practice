import React from 'react'

import Nav from './Nav'
import '../index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
