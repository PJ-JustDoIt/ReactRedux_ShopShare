


"use strict"
import axios from 'axios';


// GET A GROC
export function getGrocs(){




	//Below connects to the server db side	- gets all grocs objects from db and does UI update
	 return function(dispatch){
 		axios.get("/api/grocs")				
 			.then(function(response){
 		dispatch({type:"GET_GROCS",         
		payload:response.data})
 		})
 		.catch(function(err){
 		dispatch({type:"GET_GROCS_REJECTED",
		payload:err})
 		})
	 }
}



// POST A GROC
export function postGrocs(groc){


	
    //Below connects to the server db side and updates UI 	
	return function(dispatch){
	  axios.post("/api/grocs", groc)		    
	   .then(function(response){				
	     dispatch({type:"POST_GROC",            
	     payload:response.data})
	  }).catch(function(err){                   
	 dispatch({type:"POST_GROC_REJECTED",payload:"there was an error while posting a new groc"}) 
	 })
    }
}


// DELETE A GROC
export function deleteGrocs(id){


    //Below connects to the server db side and deletes groc in db . Does  UI update with all other grocs after deleting required groc
    return function(dispatch){
 		axios.delete("/api/grocs/" + id)
 		.then(function(response){				
 		dispatch({type:"DELETE_GROC",
		payload:id})
       })
    .catch(function(err){
      dispatch({type:"DELETE_GROC_REJECTED",
		payload:err})
 	 })
 	}
}

//UPDATE A GROC
export function updateGrocs(groc){
	return{										
		type:"UPDATE_GROC",
		payload:groc
        }	
}

// RESET FORM BUTTON
export function resetButton(){
 return {
  type:"RESET_BUTTON"
 }
}