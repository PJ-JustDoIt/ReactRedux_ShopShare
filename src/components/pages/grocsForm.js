



"use strict"

import React from 'react';
import {MenuItem,InputGroup,DropdownButton,Image,Col,Row,Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import {findDOMNode} from 'react-dom';   
import axios from 'axios';  

import {postGrocs,deleteGrocs,getGrocs,resetButton} from '../../actions/grocsActions';

 class GrocsForm extends React.Component{
  constructor() {
	 super();
	 this.state = {
	 images:[{}],
	 img:''
	 }
  }



 componentDidMount(){
 	this.props.getGrocs();					

	 //GET IMAGES FROM API
	 axios.get('/api/images')   
	  .then(function(response){
		    this.setState({images:response.data});
		    }.bind(this)
	       ).catch(function(err){ this.setState({images:'error loading image files from the server', img:''})
	     }.bind(this))
 }


// to post a groc entry submitted in the form into the state as a state update and into db.
  handleSubmit(){        
    const groc=[{
      itemname: findDOMNode(this.refs.itemname).value,
      description: findDOMNode(this.refs.description).value,
      images:findDOMNode(this.refs.image).value,
      itemquantity: findDOMNode(this.refs.itemquantity).value,
    }]
    this.props.postGrocs(groc);
  }

  // Deletes selected groc in db and updates UI
  onDelete(){
  	let grocId=findDOMNode(this.refs.delete).value;
  	this.props.deleteGrocs(grocId);     
  }

   handleSelect(img){        
	 this.setState({
	 img: '/images/'+ img
	 })
  }

  resetForm(){
  	
 //RESET THE Button
	 this.props.resetButton();
	 findDOMNode(this.refs.itemname).value = '';
	 findDOMNode(this.refs.description).value = '';
	 findDOMNode(this.refs.itemquantity).value = '';
	 this.setState({img:''});
 }

  render(){

		const grocsList=this.props.grocs.map(function(grocsArr){   
			return(
				<option key={grocsArr._id}> {grocsArr._id} </option>   
			)
		})


		const imgList =                 
			this.state.images.map(function(imgArr, i){   
			 return(
			  <MenuItem key={i} eventKey={imgArr.name} onClick={this.handleSelect.bind(this,imgArr.name)}>{imgArr.name} </MenuItem>
			 )
	 	}, this)    													


		return(
			<Well>
			 <Row>

			  <Col xs={12} sm={6}>
			   <Panel>
			     <InputGroup>
				 <FormControl type="text" ref="image" value={this.state.img} />
				 <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Select Image" bsStyle="primary"> {imgList} </DropdownButton>
				 </InputGroup>
                 <Image src={this.state.img} responsive/>
 			   </Panel>
              </Col>

              <Col xs={12} sm={6}>
               <Panel>
			    <FormGroup controlId="itemname" validationState={this.props.validation}>
			      <ControlLabel>Item Name</ControlLabel>
			      <FormControl type="text" placeholder="Enter Name" ref="itemname" />			
			       <FormControl.Feedback/>	  			
			    </FormGroup>

			    <FormGroup controlId="description" validationState={this.props.validation}>
			      <ControlLabel>Item Description</ControlLabel>
			      <FormControl type="text" placeholder="Enter Description" ref="description" />			
			       <FormControl.Feedback/>
			    </FormGroup>

			    <FormGroup controlId="quantiy" validationState={this.props.validation}>
			      <ControlLabel>Item Quantity</ControlLabel>
			      <FormControl type="text" placeholder="Enter Quantity" ref="itemquantity" />			
			       <FormControl.Feedback/>
			    </FormGroup>

			    <Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
					 {(!this.props.msg)?("Save Grocery Item"):(this.props.msg)}
 				</Button>
			   </Panel>

			   <Panel style={{marginTop:'25px'}} >
			       <FormGroup controlId="formControlsSelect">						
	      				<ControlLabel>Select a Grocery Item id to delete</ControlLabel>
	      				<FormControl ref="delete" componentClass="select" placeholder="Select">
	        			<option value="select">select</option>									
	        			{grocsList}
	      				</FormControl>
    			   </FormGroup>
    			   <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Grocery Item</Button>
               </Panel>

              </Col>
             </Row> 
			</Well>     
		)
  }

}





function mapStateToProps(state){  
	return {
		grocs:state.grocs.grocs,
		msg: state.grocs.msg,
	    style: state.grocs.style,
	    validation: state.grocs.validation 
	}
}	


function mapDispatchToProps(dispatch){  
	return bindActionCreators({
		postGrocs,
		deleteGrocs,
		getGrocs,
		resetButton
	},dispatch)    
}	

export default connect(mapStateToProps,mapDispatchToProps)(GrocsForm);	 