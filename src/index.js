import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './store'
import { Provider } from 'react-redux'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// class Provider extends Component {
  
//   getChildContext() {
//     return {
//       store: this.props.store
//     }
//   }

//   render() {
//     return this.props.children
//   }
// }

// Provider.childContextTypes = {
//   store: React.PropTypes.object
// }

