import React, { useContext } from 'react';
class edituseroption extends Component {
    constructor(props) {
        super(props);
    
        this.state={
          "jwt":props.jwt,
          "currentuser":props.user,
          "selecteduser":props.selecteduser
        };
      }
}