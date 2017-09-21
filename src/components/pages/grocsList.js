

 "use strict"

import React from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import {getGrocs} from '../../actions/grocsActions';   
import {Carousel,Grid,Col,Row,Button} from 'react-bootstrap';   
import GrocsForm from './grocsForm';       
import Cart from './cart';

import GrocItem from './grocItem';

class GrocsList extends React.Component{

  componentDidMount(){
  	this.props.getGrocs();   
  }

  render(){
  
  	const grocsList=this.props.grocs.map(function(grocsArr){   
  		return(
               <Col xs={12} sm={6} md={4} key={grocsArr._id}>
                 <GrocItem 
                     _id={grocsArr._id}                        
                     itemname={grocsArr.itemname}
                     description={grocsArr.description}
                     images={grocsArr.images}
                     itemquantity={grocsArr.itemquantity}/>
                </Col>

  		)
  	})


  	return(
  		<Grid>

       <Row>
        <Carousel style={{marginLeft:'10vw',marginRight:'10vw',marginTop:'0vw',marginBottom:'10vw',border:'3px solid #252526'}}>
          <Carousel.Item>
            <img width={900} height={300} alt="700x300" src="/images/Grocery_image8.jpg"/>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>  
          <Carousel.Item>
            <img width={900} height={300} alt="700x300" src="/images/Grocery_image7.jpg"/>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>  
          <Carousel.Item>
            <img width={900} height={300} alt="700x300" src="/images/Grocery_image4.jpg"/>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> 
  
       </Row>




  		 <Row>
         {grocsList}     
       </Row>

       <Row style={{marginTop:'15vh'}}>
          <Cart/>
       </Row>

      </Grid>
    ) ;	    

  }
}  


function mapStateToProps(state){  
	return {grocs:state.grocs.grocs}      
}	


function mapDispatchToProps(dispatch){  
	return bindActionCreators({getGrocs:getGrocs},dispatch)    
}	


 
export default connect(mapStateToProps,mapDispatchToProps)(GrocsList);  