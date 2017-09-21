// Describes Routes

 "use strict"

//REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//REACT-ROUTER
import {Router, Route, IndexRoute,browserHistory} from 'react-router';

import {applyMiddleware,createStore} from 'redux'; 
import logger from 'redux-logger';  
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

//IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postGrocs,deleteGrocs,updateGrocs} from './actions/grocsActions';







//STEP 1 CREATE store with an Array of objects
const middleware=applyMiddleware(thunk,logger);         
														 
//const middleware=applyMiddleware(logger);
const store = createStore(reducers,middleware);        




import GrocsList from './components/pages/grocsList';
import Cart from './components/pages/cart';
import GrocsForm from './components/pages/grocsForm';
import Main from './main';



const Routes = (					
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={GrocsList} />			
			    <Route path="/admin" component={GrocsForm} />   
				<Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>
);

render(
	Routes,document.getElementById('app')
);

