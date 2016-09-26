import React from 'react'
import fetch from 'isomorphic-fetch'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { BootstrapTable }  from 'react-bootstrap-table';
import { TableHeaderColumn as BsTableHeaderColumn } from 'react-bootstrap-table'
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

// if in client side , can use jQuery to call API with below
import { connect } from 'react-redux'

class CompanyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
      onCellClick: this.onCellClick()
    };
  }


  /* Material UI */

  onCellClick() {
    console.log("cell click")
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };
  /* Material UI */

  loadData() {

    const { dispatch } = this.props
    dispatch({
      type: "COMPANIES",
      payload: fetch(`http://localhost:8000/etadmin/companies/`, {credentials: 'include', mode: 'cors'}).then(response => response.json())
    })

  }


  componentDidMount() {
    // console.log(BootstrapTable)
    this.loadData()
  }


// products will be presented by react-bootstrap-table

render() {

    const { companies, isLoading } = this.props
    const styles = {
      container: {
        paddingTop: 100,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        position: 'relative',
      },
      refresh: {
        
        position: 'relative',
      },
      propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
      },
      propToggleHeader: {
        margin: '20px auto 10px',
      },
    }

    const onAfterSaveCell =(row, cellName, cellValue) =>{
      console.log("Save cell '"+cellName+"' with value '"+cellValue+"'");
      console.log("Thw whole row :");
      console.log(row);
    }

    const cellEditProp = {
      mode: "click",
      blurToSave: false,
      afterSaveCell: onAfterSaveCell
    }

    function onRowSelect(row, isSelected){
      console.log(row);
      console.log("selected: " + isSelected)
    }

    var selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)",
      onSelect: onRowSelect
    };

    if (isLoading) {
      return (
        <h1>  Loading...</h1>
      )
      return (
        <RefreshIndicator
          size={50}
          left={10}
          top={0}
          status="loading"
          style={style.refresh}
        />
      )
    }

    return(
    
      <div style={styles.container}>  
        <BootstrapTable data={companies}  pagination={true} insertRow={true} selectRow={selectRowProp} deleteRow={true} striped={true} hover={true} search={true} searchPlaceholder={"Search ..."} >
          <BsTableHeaderColumn dataField="id" isKey={true} width="" dataAlign="center" dataSort={true}>ID</BsTableHeaderColumn>
          <BsTableHeaderColumn dataField="name" dataSort={true} >Name</BsTableHeaderColumn>
          <BsTableHeaderColumn dataField="code" dataSort={true} >Company Code</BsTableHeaderColumn>
        </BootstrapTable>
      </div>
      )
}

  // render() {
  //   const { companies, isLoading } = this.props
  //   const style = {
  //     container: {
  //       position: 'relative',
  //     },
  //     refresh: {
  //       display: '',
  //       position: 'relative',
  //     },
  //   }
  //   if (isLoading) {
  //     return (
  //       <RefreshIndicator
  //         size={50}
  //         left={10}
  //         top={0}
  //         status="loading"
  //         style={style.refresh}

  //       />
  //     )
  //   }
  //   return (
  //      <ul>
  //       { companies.map((comp, id) => 
  //           <li key={id}>{ comp.name }</li>
  //         )
  //       }
  //     </ul>
  //   )
  // }
}


export default connect(state => {
  console.log(state.companyState)
  return {
  companies: state.companyState.companies,
  isLoading: state.companyState.isLoading
}})(CompanyList)