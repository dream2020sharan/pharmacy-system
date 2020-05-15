import React from "react";



class AddStors extends React.Component {
    constructor(props) {
        super(props);
    
        this.state={
          "jwt":props.jwt,
          "handler":props.getAllUsers
        };
      }
      addstore=()=>{
    
        let store = {
            "brandName":document.getElementById("addstorebrand").value,
            "address":document.getElementById("addstoreaddress").value
        };
        let url = "http://localhost:8080/addnewstore";  
      
        fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization":'Bearer '+ this.state.jwt
            },
            body: JSON.stringify(store),
          }).then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              
               alert(result.description);
           //    this.props.handler();
               }
          );
      }
     
      render(){
          return (
            
              <div className="form-group col-xs-4">
                <label for="addstorebrand">Brand Name:</label><input class="form-control" type="text" id="addstorebrand"/>
                 <label for="addstoreaddress">Address:</label><textarea class="form-control" id="addstoreaddress" rows="3"></textarea>
                <input class="btn btn-primary" type="button" value="Add Store" onClick={this.addstore} />  
              </div> 
          );
      }
    }
    export default AddStors;