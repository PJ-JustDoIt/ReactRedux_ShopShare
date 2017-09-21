


"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem,updateCart,getCart} from '../../actions/cartActions';



class Cart extends React.Component{

 componentDidMount(){
            this.props.getCart();            
 }

 // delete a groc with a specific _id and send the updated cart ( after deleteion ) for state UI and db update
 onDelete(_id){

			const currentGrocToDelete =this.props.cart;
			// Determine at which index in array is the groc to be deleted
			const indexToDelete = currentGrocToDelete.findIndex(  
			function(cart){
			 return cart._id === _id;
			})
			//use slice to remove the groc at the specified index
			let cartAfterDelete= [...currentGrocToDelete.slice(0,indexToDelete),...currentGrocToDelete.slice(indexToDelete +1)];


 			this.props.deleteCartItem(cartAfterDelete);
 }


onIncrement(_id){
 this.props.updateCart(_id,1,this.props.cart);
}

onDecrement(_id,quantity){
	if(quantity>1){
      this.props.updateCart(_id,-1,this.props.cart);}
}


// To show the Modal only if clicked on "PROCEED TO CHECKOUT"
constructor(){
 super();
 this.state={showModal:false}
}

open(){
	this.setState({showModal:true});
}

close(){
	this.setState({showModal:false});
}

 render(){
     if(this.props.cart[0])
       {return this.renderCart();}
     else
       {return this.renderEmpty();}	
 }

 renderEmpty(){
 	return(<div></div>)
 }

 renderCart(){
	 const cartItemsList = this.props.cart.map(function(cartArr){
	 	return(
	 	 <Panel key={cartArr._id}>
	 	   <Row>
	 	     <Col xs={12} sm={4}>
	 	       <h6>{cartArr.itemname}</h6><span>    </span>   
	 	     </Col>
	 	     <Col xs={12} sm={2}>
	 	       <h6> Qty Requested :  <Label bsStyle="primary"> {cartArr.itemquantity} </Label> </h6>
	 	     </Col>
	 	     <Col xs={12} sm={2}>
	 	       <h6>Qty Bought :  <Label bsStyle="success">{cartArr.quantity}</Label></h6>
	 	     </Col>	 
	 	     <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth:'300px'}}>   
                <Button onClick={this.onDecrement.bind(this,cartArr._id,cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this,cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this,cartArr._id)} bsSize="small">DELETE</Button>
              </ButtonGroup>
             </Col>	     
	 	    </Row>
	 	 </Panel>      
	 	)
	 },this)


	 return(
	   <Panel header="My Cart" bsStyle='success' style={{marginLeft:'3vw',marginRight:'3vw'}}>
	    {cartItemsList}
	    <Row>
	      <Col xs={12}>
	      </Col>
	    </Row>  




        {/* Taken from React Bootstrap official website - Basic Overlay */}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>  
          <Modal.Header closeButton>								        
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <p> Your SMS will be sent shortly. </p>
          </Modal.Body>
          <Modal.Footer>
          <Col xs={6}>
          </Col> 
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>



	   </Panel> 
	 )  
  }
}

 function mapStateToProps(state){  
  return{
    cart: state.cart.cart,
    totalAmount:state.cart.totalAmount  
  }
 }


function mapDispatchToProps(dispatch){  
	return bindActionCreators({deleteCartItem:deleteCartItem,updateCart:updateCart,getCart:getCart},dispatch)    
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart);