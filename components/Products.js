import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

export const Products = (props) => {
  
  
  
  const [cart, setCart] = useContext(CartContext);
  const addToCart = (e, product) => {
    const tshirt = { title: props.title, price: props.price };
    setCart(currentState => [...currentState, tshirt]);
    props.handleAddToCart(e, product);  
  
  }
  return (
    <div className="col-md-4">
      <div className="thumbnail text-center">
        <a href={props.index}> 
          <img src={props.imageURL} alt={props.imageURL} width="200" height="200"/>
          <p>{props.title}</p>
        </a>
        
        <b>{props.price}</b>
        {/* <h2>Key: {props.index}</h2> */}
        <button className="btn btn-primary" onClick={(e)=>addToCart(e, props.products)}>Add to cart</button>
        <hr />
      </div>      
    </div>
  )
}