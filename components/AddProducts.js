import React from "react";



class AddProducts extends React.Component {
    constructor(props) {
        super(props);
    
        this.state={
          "jwt":props.jwt,
          "handler":props.getAllUsers
        };
      }
      addproduct=()=>{
      
        let product = {
            "name":document.getElementById("addname").value,
            "price":document.getElementById("addprice").value,
            "manufacturer":document.getElementById("addmanufacturer").value,
            "description":document.getElementById("adddescription").value,
            "chemicalformula":document.getElementById("addchemicalformula").value
        };
        let url = "http://localhost:8080/api/products/addProduct";  
      
        fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization":'Bearer '+ this.state.jwt
            },
            body: JSON.stringify(product),
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
                 <label for="addname">Name:</label><input class="form-control" type="text" id="addname"/>
                 <label for="addprice">Price:</label><input class="form-control" type="email" id="addprice"/>
                 <label for="addmanufacturer">Manufacturer:</label><input class="form-control" type="text" id="addmanufacturer"/>
                 <label for="adddescription">Description :</label> <input class="form-control" type="text" id="adddescription" />
                 <label for="addchemicalformula">Chemical Formula:</label><input class="form-control" type="text" id="addchemicalformula"/>
                  <input class="btn btn-primary" type="button" value="Add Product" onClick={this.addproduct} />  
              </div> 
          );
      }
    }
    export default AddProducts;