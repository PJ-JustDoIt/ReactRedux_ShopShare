


"use strict"

export function grocsReducers(state={  
  grocs:[]},action){   
		switch(action.type){
		    case "GET_GROCS":                                 
		            
		    return {...state,grocs:[...action.payload]};
		    break;



		    case "POST_GROC":
	
		    return {...state, grocs:[...state.grocs,...action.payload], msg:'Saved! Click to continue', style:'success',validation:'success'}     
		    break;

			case "POST_GROC_REJECTED":
			return {...state, msg:'Please try again', style:'danger', validation:'error'}
			break;

			case "RESET_BUTTON":
			return {...state, msg:null,style:'primary', validation:null}
			break;



			case "DELETE_GROC":
			// Create a copy of the current array of grocs
			const currentGrocToDelete =[...state.grocs]
			// Determine at which index in grocs array is the groc to be deleted
			const indexToDelete = currentGrocToDelete.findIndex(  
			function(groc){
			 return groc._id == action.payload;
			})
			//use slice to remove the groc at the specified index
			return {grocs:[...currentGrocToDelete.slice(0,indexToDelete),...currentGrocToDelete.slice(indexToDelete +1)]}
			break;

		    case "UPDATE_GROC":
		    // Create a copy of the current array of grocs
			const currentGrocToUpdate =[...state.grocs]
			// Determine at which index in grocs array is the groc to be deleted
			const indexToUpdate =currentGrocToUpdate.findIndex(
			function(groc){
			 return groc._id === action.payload._id;
			})
			// Create a new groc object with the new values and with the same array index of the item we want to replace. 
			const newGrocToUpdate = {...currentGrocToUpdate[indexToUpdate],itemname: action.payload.itemname}
			// This Log has the purpose to show you how newGrocToUpdate looks like
			console.log("what is the newGrocToUpdate",newGrocToUpdate);
			//use slice to remove the groc at the specified index, replace with the new object and concatenate witht he rest of items in the array
			return {grocs:[...currentGrocToUpdate.slice(0,indexToUpdate), newGrocToUpdate,...currentGrocToUpdate.slice(indexToUpdate +1)]}
			break;
		 }
		 return state;
		}
