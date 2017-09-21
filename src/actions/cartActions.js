

"use strict"
import axios from 'axios';


// GET CART - gets all cart info from db and does state update for UI 
export function getCart(){
	 return function(dispatch){
	 axios.get('/api/cart')							
	 .then(function(response){              
	 dispatch({type:"GET_CART",
	 payload:response.data})
	 })
     .catch(function(err){					
       dispatch({type:"GET_CART_REJECTED",msg:"error when getting the cart from session"})
     })
  }
}



// ADD TO CART
export function addToCart(cart){
	return function(dispatch){
	 axios.post("/api/cart", cart)						
	 .then(function(response){		
	 dispatch({type:"ADD_TO_CART",						
	           payload:response.data})
	 })
	 .catch(function(err){
	dispatch({type:"ADD_TO_CART_REJECTED", 
		      msg:'error when adding to the cart'})
	})
 }
}

// DELETE FROM CART  
export function deleteCartItem(cart){ 
	return function(dispatch){
	 axios.post("/api/cart", cart)				
	 .then(function(response){
	 dispatch({type:"DELETE_CART_ITEM",            
	payload:response.data})
	 })
	 .catch(function(err){

	dispatch({type:"DELETE_CART_ITEM_REJECTED", msg:
	'error when deleting an item from the cart'})
	 })
 }
}


// UPDATE CART  - update cart with new quantity in db and state UI
export function updateCart(_id,unit,cart){

		  // Create a copy of the current array of grocs
		  const currentGrocToUpdate =cart
		  // Determine at which index in grocs array is the groc to be updated
	      const indexToUpdate =currentGrocToUpdate.findIndex(
		  function(groc){
			 return groc._id === _id;
		  })
		  const newGrocToUpdate={...currentGrocToUpdate[indexToUpdate],quantity:currentGrocToUpdate[indexToUpdate].quantity+unit};  
		  let cartUpdate = [...currentGrocToUpdate.slice(0,indexToUpdate), newGrocToUpdate,...currentGrocToUpdate.slice(indexToUpdate +1)];

return function(dispatch){
	 axios.post("/api/cart", cartUpdate)     
	 .then(function(response){
	 dispatch({type:"UPDATE_CART",            
	           payload:response.data})
	 })
	 .catch(function(err){
	dispatch({type:"UPDATE_CART_REJECTED", 
		      msg:'error when adding to the cart'})
	 })
 }

}