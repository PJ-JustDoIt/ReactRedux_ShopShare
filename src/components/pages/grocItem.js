

import React from 'react';
import {Image,Row,Col,Well,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions';



class GrocItem extends React.Component{

handleCart(){
    const groc = [...this.props.cart, {     
      _id:this.props._id,
      itemname:this.props.itemname,
      description:this.props.description,
      images: this.props.images,
      itemquantity:this.props.itemquantity,
      quantity:1
    }];
    
    // update db and state UI for cart with new quantity
    // CHECK IF CART IS EMPTY .
    // If cart is not empty
    if(this.props.cart.length>0){
     let _id=this.props._id;
     let cartIndex=this.props.cart.findIndex(function(cart){
     	return cart._id===_id;})
     // If item is not in cart already 	
     if(cartIndex===-1){
     	this.props.addToCart(groc);                            
      }	else
      { //WE NEED TO UPDATE QUANTITY
        this.props.updateCart(_id,1,this.props.cart)          
      }
    }else
    // if cart is empty
    {
     this.props.addToCart(groc);              
    }
  
  this.state.isBought=!this.state.isBought;
}


 constructor(){
   super();
   this.state = {
     isClicked:false,
     isBought:false
    };
   }

 onReadMore(){
    this.setState({isClicked:true})
 }

render(){
	return(
		<Well>
		 <Row>
		  <Col xs={12} sm={4}>                           
       <Image src={this.props.images} responsive/>   
      </Col>
      <Col xs={6} sm={8}>                            
             <h6> {this.props.itemname}  </h6>
             <p>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0,50)):(this.props.description)}
              <button className='link' onClick={this.onReadMore.bind(this)}> {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...readmore'):('')}
              </button> 
             </p>
             <h6> Qty :  {this.props.itemquantity}  </h6>
             <Button onClick={this.handleCart.bind(this)} bsStyle={(this.state.isBought)?("success"):("danger")}> {(this.state.isBought)?("Bought"):("Buy now")} </Button>        
		  </Col>
		 </Row>
		</Well>
    )
  }
}



function mapStateToProps(state){   
  return{
    cart: state.cart.cart          
  }
 }

function mapDispatchToProps(dispatch){  
	return bindActionCreators({addToCart:addToCart,updateCart:updateCart},dispatch)    
}

export default connect(mapStateToProps,mapDispatchToProps)(GrocItem);