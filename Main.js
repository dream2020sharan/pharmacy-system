import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import admin from "./components/admin";
import Usermanagement from "./components/Usermanagement";
import Logout from "./components/Logout";
import StoreManagement from "./components/StoreManagement";
import ManageProducts from "./components/ManageProducts";

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            islogin : false,
            jwt:"",
            user : ""
        }
      }

  loginSubmitFunction=(event)=>{
    event.preventDefault();
    let email=document.getElementById('email').value;
    let pass=document.getElementById('pass').value;
    let data = {
        "email":email,
        "password":pass
    };
    fetch('http://localhost:8080/authenticate', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      if(result.hasOwnProperty('jwt')){
        console.log("inside ");
        this.setState({jwt : result.jwt});
        this.setState({islogin : true});
        console.log(this.state.islogin);
        this.getUserDetails();
        localStorage.setItem('keys', result.jwt);
        }
        else{
          console.log("inside but on else");
        }
       }
  );
  }    
   getUserDetails=()=>{
     fetch('http://localhost:8080/user', {
       
       method: 'POST',
       headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization":'Bearer '+ this.state.jwt
       }
     }).then(res => res.json())
     .then(
       (result) => {
         console.log(result);
        
            this.setState({user : result});
          }
     );
   }

  render() {
    if(!this.state.islogin){
        return (
                <div>

                    


                    <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label htmlfor="username" className="text-info">Username:</label><br/>
                                <input type="text" name="username" id="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlfor="password" className="text-info">Password:</label><br/>
                                <input type="text" name="password" id="pass" className="form-control"/>
                            </div>
                            <div class="form-group">
                                <label htmlfor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br/>
                                <input type="submit" name="submit"  onClick={this.loginSubmitFunction}  className="btn btn-info btn-md" value="submit" />
                            </div>
                            <div id="register-link" className="text-right">
                                <a href="#" className="text-info">Register here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>      
                </div>    
            )
    }
    else{
        return (
  <div>
            
        <HashRouter>
        <div>
          <h1>Pharmacy</h1>
 



          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li  class="nav-item"><NavLink to="/product">Product/Cart</NavLink></li>
            <li  class="nav-item"><NavLink to="/stuff">Store Inventry</NavLink></li>
            <li  class="nav-item"><NavLink to="/contact">My Details</NavLink></li>

            {
              (this.state.user.access===1||this.state.user.access===2)?<li class="nav-item"><NavLink to="/Admin">Admin</NavLink></li>:""
            }{
              (this.state.user.access===2)?<li class="nav-item"><NavLink to="/adminstore">Store Admin</NavLink></li>:""
            }
            {
            (this.state.user.access===2)?<li class="nav-item"><NavLink to="/ManageProducts">Manage products</NavLink></li>:""
            }
             <li  class="nav-item"><NavLink to="/logout">Logout</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/product" component={Home}/>
            <Route path="/stuff" component={Stuff}/>
            <Route
              path='/contact'
              component={() => <Contact jwt={this.state.jwt} />}
            />
           
            {
              (this.state.user.access===1||this.state.user.access===2)? <Route path='/admin' component={() => <Usermanagement jwt={this.state.jwt} currentuser={this.state.user} />}/>:""}
          {    (this.state.user.access===2)? <Route path='/adminstore' component={() => <StoreManagement jwt={this.state.jwt} currentuser={this.state.user} />}/>:""}
       
          {    (this.state.user.access===2)? <Route path='/ManageProducts' component={() => <ManageProducts jwt={this.state.jwt} currentuser={this.state.user} />}/>:""}
            <Route path="/logout" component={() => <Logout jwt={this.state.jwt} islogin={this.state.islogin} />}/>
          </div>
        </div>
        </HashRouter>
        </div>
    );
  }}
}
 
export default Main;