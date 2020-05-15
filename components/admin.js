import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import { CartContext } from '../CartContext';
import Usermanagement from "./Usermanagement";
import Manageusers from "./Manageusers";
class admin extends Component {
    constructor(props) {
        super(props);
    
        this.state={
          "jwt":props.jwt,
          "currentuser":props.user
        };
      }
      render(){
          return(
<div>
            <ul className="header">
            <li><NavLink to="/Usermanagement">User Management</NavLink></li>
              </ul>              
              <div  className="content">
              <Route path="/Usermanagement" component={Manageusers}/>
              </div>
{/* 
Manageusers
  <Route
  path='/Usermanagement'
  component={() => <Usermanagement jwt={this.state.jwt} currentuser={this.state.currentuser} />}
/> */}
</div>

          );
      }
}
export default admin;