import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'

class LinkButton extends React.Component {

  render() {
    const { path, label } = this.props
    return (
      <FlatButton
        containerElement={
          <Link to={ path } />
        }
        label={ label }/>
    )
  }
}

export default LinkButton