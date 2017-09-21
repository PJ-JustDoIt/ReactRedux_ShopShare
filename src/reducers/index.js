"use strict"

import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {grocsReducers} from './grocsReducers';
import {cartReducers} from './cartReducers';

//HERE COMBINE THE REDUCERS 
export default combineReducers({   
  grocs: grocsReducers,
  cart: cartReducers
})
