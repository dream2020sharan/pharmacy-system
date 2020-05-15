import React from 'react';
import { Products } from './components/Products';
import  Basket  from "./components/Basket";

class Search extends React.Component {
    constructor(props) {
        super(props);
  
        // set initial state
        // do not use setState in constructor, write state directly
        this.state = {
          product_data : [], // will contain weather of five days in array
          isLoaded : false,  // will be true after data have been received from server
          error : null ,
          username :null,
          cartItems: []
        };
      }


    componentDidMount=()=> {
        let url='https://jsonplaceholder.typicode.com/'
        let search_query = document.getElementById("query").value;
        // AJAX call using fetch. Make sure the dress server is running !
        // see https://reactjs.org/docs/faq-ajax.html

        fetch(url+search_query)
        .then(
            (response)=> {
                // here full fetch response object
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => { 
                        //console.log(json_response);                       
                        this.setState({
                            product_data:json_response, // data received from server
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    })

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "dress not found", db_data:{}}
                            product_data: {}, // no data received from server
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    weather_data: {}, // no data received from server
                });
            }
        )
    }

    handleAddToCart = (e, product) => {
        this.setState(state => {
            console.log(e);
            console.log(product);
          const cartItems = state.cartItems;
          let productAlreadyInCart = false;
    
          cartItems.forEach(cp => {
            if (cp.id === product.id) {
              cp.count += 1;
              productAlreadyInCart = true;
            }
          });
    
          if (!productAlreadyInCart) {
            cartItems.push({ ...product, count: 1 });
          }
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          console.log(cartItems);
          return { cartItems: cartItems };
        });
      };

      handleRemoveFromCart = (e, product) => {
        this.setState(state => {
          const cartItems = state.cartItems.filter(a => a.id !== product.id);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          return { cartItems: cartItems };
        });
      };

    render(){
        if(this.state.isLoaded){            
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <label className="col-md-2" for="usr">Search Product:</label>
                                <input type="text" className="col-md-4" id="query" />
                                <button className="col-md-2 btn-primary"  onClick={()=>this.componentDidMount()}>Submit</button>
                            </div>
                            <div className="row">                                
                                {
                                this.state.product_data.map(item => (
                                    <Products 
                                        imageURL={item.url} 
                                        title={item.title} 
                                        price={item.id} 
                                        index={item.id} 
                                        key={item.id} 
                                        handleAddToCart={this.handleAddToCart}
                                        products={item}/>
                                    ))
                                }                            
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Basket
                                cartItems={this.state.cartItems}
                                handleRemoveFromCart={this.handleRemoveFromCart}
                            />
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container">
                    <div className="row">
                        <label className="col-md-2" for="usr">Search Product:</label>
                        <input type="text" className="col-md-4" id="query" />
                        <button className="col-md-2 btn-primary"  onClick={()=>this.componentDidMount()}>Submit</button>
                    </div>
                </div>
            )
        }
    }
}

export default Search;