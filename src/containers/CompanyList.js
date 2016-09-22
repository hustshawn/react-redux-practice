import React from 'react'
import fetch from 'isomorphic-fetch'

// if in client side , can use jQuery to call API with below
import { connect } from 'react-redux'

class CompanyList extends React.Component {
  
  loadData() {

    const { dispatch } = this.props
    dispatch({
      type: "COMPANIES",
      payload: fetch(`http://localhost:8000/etadmin/companies/`, {credentials: 'include'}).then(response => response.json())
    })

  }

  componentDidMount() {
    console.log('Component Mounted')
    this.loadData()
  }

  render() {
    const { companies, isLoading } = this.props
    return (
       <ul>
        { companies.map((comp, id) => 
            <li key={id}>{ comp.name }</li>
          )
        }
      </ul>

    )
  }
}


export default connect(state => {
  console.log(state.companyState)
  return {
  companies: state.companyState.companies,
  isLoading: state.companyState.isLoading
}})(CompanyList)