import React from 'react'

import Nav from './Nav'
import '../index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
// const App = () => (
//   <div>
//     {this.props.children}
//   </div>
// )

// export default App
