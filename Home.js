import React, { Component } from "react";

import { Cart } from './Cart';
import { CartProvider } from './CartContext';
import  Search from './Search';
 
class Home extends Component {
  //  componentDidMount(){
  //       fetch('http://localhost:8080/api/storeproducts/getStoreProductById/'+0, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8"
  //   }
  // }).then(res => res.json())
  // .then(
  //   (result) => {
  //     console.log(result);
  //     this.setState({jwt : result.jwt});
  //     this.setState({islogin : true});
  //     console.log(this.state.islogin);
  //      }
  // );
  //  }

  render() {
    return (
      <CartProvider>    
      <div>
      
        <Search />        
      </div>
     </CartProvider>
    );
  }
}
 
export default Home;