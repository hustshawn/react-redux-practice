import React from 'react'
import fetch from 'isomorphic-fetch'

// if in client side , can use jQuery to call API with below
// import axios from 'axios'
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
    // console.log(this.props)
    const { dispatch } = this.props

    dispatch(fetchingCompany())

    // return fetch(`http://localhost:8000/etadmin/companies/`).then(
    // axios.get("http://rest.learncode.academy/api/wstern/users")
    // .then((response) => {
    //   dispatch({
    //     yourAction()
    //   })
    // })
    return fetch(`http://localhost:8000/etadmin/companies/`, {credentials: 'include'}).then(
    // return fetch(`http://rest.learncode.academy/api/wstern/users`).then(
      response => response.json())
      .then(json => dispatch({ type: 'LOAD_COMPANY_SUCCESS', payload: json}),
      err => dispatch({type: 'LOAD_COMPANY_FAILURE', payload: err})
      )
  }

  componentDidMount() {
    console.log('Component Mounted')
    this.loadData()
  }

  render() {
    console.log(this.props)
    const { companies, isLoading } = this.props
    if ( isLoading) {
      return <h1>Loading...</h1>
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
  companies: state.companies.companies,
  isLoading: state.companies.isLoading
}))(CompanyList)