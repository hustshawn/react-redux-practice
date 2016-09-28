import React from 'react'
import fetch from 'isomorphic-fetch'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { BootstrapTable }  from 'react-bootstrap-table';
import { TableHeaderColumn as BsTableHeaderColumn } from 'react-bootstrap-table'
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import '../App.css'

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
        padding: 10,
        // paddingTop: 100,
        // margin: 100,
        // marginLeft: 100,
        // marginRight: 100,
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
    
    const options = {
      afterInsertRow: ()=> { console.log("After insert")},
      onRowClick: (row) => {console.log("on row click: ", row)},
      onAddRow: (row) => { console.log("on add row")}
    }

    const onRowSelect = (row, isSelected) => {
      console.log(row);
      console.log("selected: " + isSelected)
    }

    const selectRowProp = {
      mode: "radio",
      clickToSelect: false,
      bgColor: "rgb(238, 193, 213)",
      onSelect: onRowSelect
    };

    if (isLoading) {

      return (
        <RefreshIndicator
          size={50}
          left={10}
          top={0}
          status="loading"
          style={styles.refresh}
        />
      )
    }

    return(
        <Card className="Card-Container" >
          <BootstrapTable data={companies} pagination={true} insertRow={true} options={options} selectRow={selectRowProp} deleteRow={true} striped={true} hover={true} search={true} searchPlaceholder={"Search ..."} >
            <BsTableHeaderColumn dataField="id" isKey={true} width="100" dataAlign="center" dataSort={true}>ID</BsTableHeaderColumn>
            <BsTableHeaderColumn dataField="name" dataSort={true} width="200" >Name</BsTableHeaderColumn>
            <BsTableHeaderColumn dataField="code" dataSort={true} >Company Code</BsTableHeaderColumn>
          </BootstrapTable>
        </Card>
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