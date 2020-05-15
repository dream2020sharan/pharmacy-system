import React, { Component } from "react";
 
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state={
      "jwt":props.jwt,
      "userProfile":""
    };
  }
  componentDidMount(){
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
         this.setState({"userProfile":result});
          
          }
     );
      }
  render() {
    return (
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">designation</th>
          <th scope="col">qualification</th>
          <th scope="col">locationid</th>
          <th scope="col">access</th>
          <th scope="col">email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{this.state.userProfile.id}</td>
          <td>{this.state.userProfile.username}</td>
          <td>@{this.state.userProfile.designation}</td>

          <td>{this.state.userProfile.qualification}</td>
          <td>{this.state.userProfile.locationId}</td>
          <td>{this.state.userProfile.access}</td>
          <td>{this.state.userProfile.email}</td>
        </tr>
      </tbody>
    </table>
    );
  }
}
 
export default Contact;