import React, { Component } from 'react';
class Logout extends Component {
    constructor(props) {
        super(props);
      }
      componentDidMount() {
        localStorage.clear();
       // this.props.jwt="";
       // this.props.islogin=false;
      }
      render() {
        return null
      }
    }
    export default Logout;