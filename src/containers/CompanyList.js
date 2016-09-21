import React from 'react'
import fetch from 'isomorphic-fetch'

import { connect } from 'react-redux'

const fetchingCompany = () => ({
  type: 'FETCHING_COMPANY',
  isLoading: true
})

const loadCompanySuccess = (response) => {
  return {
    type: 'LOAD_COMPANY_SUCCESS',
    response,
    isLoading: false
  }
}

const loadCompanyFailure = (err) => {
  return {
    type: 'LOAD_COMPANY_FAILURE',
    err,
    isLoading: false
  }
}



class CompanyList extends React.Component {
  
  loadData() {
    
    const { dispatch } = this.props

    dispatch(fetchingCompany())

    return fetch(`http://localhost:8000/etadmin/companies/`).then(
      response => dispatch(loadCompanySuccess(response)),
      err => dispatch(loadCompanyFailure(err))
      )
  }

  componentDidMount() {
    console.log('Component Mounted')
    this.props.companies = this.loadData()
  }

  render() {
    console.log(this.props)
    const { companies } = this.props
    if ( companies.isLoading) {
      return <p>Loading...</p>
    }
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

export default connect(state => ({
  companies: state.companies.companies
}))(CompanyList)