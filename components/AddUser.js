import React from "react";



class AddUser extends React.Component {
    constructor(props) {
        super(props);
    
        this.state={
          "jwt":props.jwt,
          "handler":props.getAllUsers
        };
      }
      adduser=()=>{
        var e = document.getElementById("adduserlocationid");
        var strUser = e.options[e.selectedIndex].value;

        var i = document.getElementById("adduseraccess");
        var strUser1 = i.options[e.selectedIndex].value;
        

        let user = {
            "email":document.getElementById("adduseremail").value,
            "name":document.getElementById("addusername").value,
            "designation":document.getElementById("adduserdesignation").value,
            "password":document.getElementById("adduserpassword").value,
            "qualification":document.getElementById("adduserqualification").value,
            "locationid":strUser,
            "access":strUser1
        };
        let url = "http://localhost:8080/api/users/saveNewUser";  
      
        fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization":'Bearer '+ this.state.jwt
            },
            body: JSON.stringify(user),
          }).then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              
               alert(result.description);
               this.props.handler();
               }
          );
      }
      getallstores=()=>{
        let url = "";  
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
      render(){
          return (
            
              <div className="form-group col-xs-4">
                 <label for="addusername">Name:</label><input class="form-control" type="text" id="addusername"/>
                 <label for="adduseremail">Email:</label><input class="form-control" type="email" id="adduseremail"/>
                 <label for="adduserdesignation">Designation:</label><input class="form-control" type="text" id="adduserdesignation"/>
                 <label for="adduserpassword">password :</label> <input class="form-control" type="password" id="adduserpassword" />
                 <label for="adduserqualification">qualification:</label><input class="form-control" type="text" id="adduserqualification"/>
                 <label for="adduserlocationid">locationId:</label>
                    <select class="form-control" id="adduserlocationid">
                         <option class="form-control" value="0">Audi</option>
                    </select> 
                    <label for="adduseraccess">access: </label> 
                    <select class="form-control" id="adduseraccess">
                         <option class="form-control" value="0">pharmacist</option>
                         <option class="form-control" value="1">Store admin </option>
                         <option class="form-control" value="2">Super Admin</option>
                    </select>  
                  <input class="btn btn-primary" type="button" value="Add user" onClick={this.adduser} />  
              </div> 
          );
      }
    }
    export default AddUser;