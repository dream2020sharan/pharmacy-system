import React from "react";
import AddUser from "./AddUser";

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
 

class Usermanagement extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      "jwt":props.jwt,
      "currentuser":props.currentuser
    };

    
  }
  getAllUsers=()=>{
    fetch('http://localhost:8080/api/users/getUsersByAccess/?id='+this.state.currentuser.id, {
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
    this.getAllUsers();
      }
      changetab1=()=>{
        document.getElementById("li1").classList.add("active");
        document.getElementById("li2").classList.remove("active");
        document.getElementById("viewusers").style.display = "block";
        document.getElementById("addusr").style.display = "none";
  
      }
      changetab2=()=>{
        document.getElementById("li1").classList.remove("active");
        document.getElementById("li2").classList.add("active");
        document.getElementById("viewusers").style.display = "none";
        document.getElementById("addusr").style.display = "block";
      }
  searchUsers=()=>{
    let value = document.getElementById("userSearch").value;
    console.log(value);
    if(value==""){
      this.getAllUsers();
    }
    else{
      let url = 'http://localhost:8080/api/users/searchUsersByAccess?search='+value;
      console.log(url);
    fetch(url, {
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
  }    
  render() {

    const columns = [
      {
        name: 'Id #',
        selector: 'id',
        sortable: true,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        right: true,
      },
      {
        name: 'designation',
        selector: 'designation',
        sortable: true,
      },
      {
        name: 'qualification',
        selector: 'qualification',
        sortable: true,
      },
      {
        name: 'locationId',
        selector: 'locationId',
        sortable: true,
      },
      {
        name: 'access',
        selector: 'access',
        sortable: true,
      },
    ];

    let users1 = this.state.users;
    if(users1!=null && users1.length>0){
     
    return (
      <div>
<ul class="nav nav-tabs" role="tablist">
    <li id="li1" role="presentation" onClick={this.changetab1} class="active"><a data-target="#tab1" role="tab" data-toggle="tab">View Users</a></li>
    <li id="li2" role="presentation" onClick={this.changetab2} ><a data-target="#tab2" role="tab" data-toggle="tab">Add Users</a></li>
</ul>


  <div id="viewusers" style={{display:"block"}}>
        <div className="input-group">
      <span className="input-group-addon">Text</span>
      <input  type="text" className="form-control" name="msg"placeholder="Search Users" id="userSearch" onChange={this.searchUsers} />
    </div>
        <DataTable
    title="Users"
    columns={columns}
    data={users1}
    conditionalRowStyles={customStyles}
    pagination={true}
  />
</div>
     

      <div id="addusr" style={{display:"none"}} >
<AddUser jwt={this.state.jwt}  handler = {this.getAllUsers} />

</div>   
    </div>
   
    );
  }
  else{
    return <p>No data found</p>
  }
}

}
 
export default Usermanagement;