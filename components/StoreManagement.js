import React, { Component } from 'react';
import AddStors from "./AddStors";

import DataTable from 'react-data-table-component';

const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };
   
class StoreManagement extends Component {
    constructor(props) {
        super(props);
        this.state={
          "jwt":props.jwt,
          "currentuser":props.currentuser
        };
    
        
      }
      getAllStores=()=>{
        fetch('http://localhost:8080/getallstore', {
          method: 'get',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":'Bearer '+ this.state.jwt
          }
        }).then(res => res.json())
        .then(
          (result) => {
            console.log(result.data);
            this.setState({"users":result.data});
             
             }
        );
      }
      componentDidMount(){
        this.getAllStores();
          }
          changetab1=()=>{
            document.getElementById("li1store").classList.add("active");
            document.getElementById("li2store").classList.remove("active");
            document.getElementById("viewusersstore").style.display = "block";
            document.getElementById("addstore").style.display = "none";
      
          }
          changetab2=()=>{
            document.getElementById("li1store").classList.remove("active");
            document.getElementById("li2store").classList.add("active");
            document.getElementById("viewusersstore").style.display = "none";
            document.getElementById("addstore").style.display = "block";
          }
     
      render() {
    
        const columns = [
          {
            name: 'Id #',
            selector: 'id',
            sortable: true,
          },
          {
            name: 'BrandName',
            selector: 'brandName',
            sortable: true,
            right: true,
          },
          {
            name: 'Address',
            selector: 'address',
            sortable: true,
          }
        ];
    
        let users1 = this.state.users;
        if(users1!=null && users1.length>0){
         
        return (
          <div>
    <ul class="nav nav-tabs" role="tablist">
        <li id="li1store" role="presentation" onClick={this.changetab1} class="active"><a data-target="#tab1" role="tab" data-toggle="tab">View Stores</a></li>
        <li id="li2store" role="presentation" onClick={this.changetab2} ><a data-target="#tab2" role="tab" data-toggle="tab">Add Stores</a></li>
    </ul>
    
    
      <div id="viewusersstore" style={{display:"block"}}>
            
            <DataTable
        title="Store"
        columns={columns}
        data={users1}
        conditionalRowStyles={customStyles}
        pagination={true}
      />
    </div>
         
    
          <div id="addstore" style={{display:"none"}} >
    <AddStors jwt={this.state.jwt}  handler = {this.getAllUsers} />
    
    </div>   
        </div>
       
        );
      }
      else{
        return <p>No data found</p>
      }
    }
    
    }
     
    export default StoreManagement;