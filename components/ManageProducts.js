import React, { Component } from 'react';
import AddProducts from "./AddProducts";


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
   
class ManageProducts extends Component {
    constructor(props) {
        super(props);
        this.state={
          "jwt":props.jwt,
          "currentuser":props.currentuser
        };
    
        
      }
      getAllProducts=()=>{
        fetch('http://localhost:8080/api/products/getProducts', {
          method: 'get',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":'Bearer '+ this.state.jwt
          }
        }).then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({"users":result});
             
             }
        );
      }
      componentDidMount(){
        this.getAllProducts();
          }
          changetab1=()=>{
            document.getElementById("li1products").classList.add("active");
            document.getElementById("li2products").classList.remove("active");
            document.getElementById("viewproducts").style.display = "block";
            document.getElementById("addproducts").style.display = "none";
      
          }
          changetab2=()=>{
            document.getElementById("li1products").classList.remove("active");
            document.getElementById("li2products").classList.add("active");
            document.getElementById("viewproducts").style.display = "none";
            document.getElementById("addproducts").style.display = "block";
          }
     
      render() {
    
        const columns = [
          {
            name: 'Name',
            selector: 'name',
            sortable: true,
          },
          {
            name: 'price',
            selector: 'price',
            sortable: true,
            right: true
          },
          {
            name: 'manufacturer',
            selector: 'manufacturer',
            sortable: true,
          },
          {
            name: 'chemicalformula',
            selector: 'chemicalformula',
            sortable: true,
            right: true,
          },
          {
            name: 'description',
            selector: 'description',
            sortable: true,
          }
        ];
    
        let users1 = this.state.users;
        console.log(users1);
        if(users1!=null && users1.length>0){
         
        return (
          <div>
    <ul class="nav nav-tabs" role="tablist">
        <li id="li1products" role="presentation" onClick={this.changetab1} class="active"><a data-target="#tab1" role="tab" data-toggle="tab">View Products</a></li>
        <li id="li2products" role="presentation" onClick={this.changetab2} ><a data-target="#tab2" role="tab" data-toggle="tab">Add Products</a></li>
    </ul>
    
    
      <div id="viewproducts" style={{display:"block"}}>
            
            <DataTable
        title="Products"
        columns={columns}
        data={users1}
        conditionalRowStyles={customStyles}
        pagination={true}
      />
    </div>
         
    
          <div id="addproducts" style={{display:"none"}} >
    <AddProducts jwt={this.state.jwt}  handler = {this.getAllProducts} />
    
    </div>   
        </div>
       
        );
      }
      else{
        return <p>No data found</p>
      }
    }
    
    }
     
    export default ManageProducts;