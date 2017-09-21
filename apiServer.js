


var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);  

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs - accessing the mongo database
var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost:27017/grocshop'); 									// for localhost on your laptop
mongoose.connect('mongodb://shopshare:shopshare3@ds061076.mlab.com:61076/shopshare');       // For mlab db

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));



// --->>> SET UP SESSIONS <<<----
app.use(session({
	 secret: 'mySecretString',   
	 saveUninitialized: false,    
	 resave:false,	
	 cookie:{maxAge:1000*60*60*24*2},	  
	 store: new MongoStore({mongooseConnection:db, ttl: 2 * 24 * 60 * 60})  
}))

 // SAVE SESSION CART API 
 app.post('/cart', function(req, res){
	 var cart = req.body;
	 req.session.cart = cart;              
	 req.session.save(function(err){		
	 if(err){
	  console.log('# API  POST CART SESSION: ',err);;
	 }
	 res.json(req.session.cart);         
	 })
 });
 // GET SESSION CART API
 app.get('/cart', function(req, res){
	 if(typeof req.session.cart !=='undefined'){     
	 res.json(req.session.cart);
	 }
 });
//--->>> END SESSION SET UP <<<----



var Grocs=require('./models/grocs.js');

//POST a form http request to db -  CRUD ie., adds a groc from form to db
app.post('/grocs', function(req, res){
 var groc = req.body;                    
 Grocs.create(groc, function(err, grocs){    
 if(err){
  console.log('# API POST GROCS: ', err);
 }
 res.json(grocs);						
 })
});


//GET all items in db - CRUD
app.get('/grocs', function(req, res){
 Grocs.find(function(err, grocs){			
 if(err){
  console.log('# API GET GROCS: ', err);
 }
 res.json(grocs);							
 })
});

// DELETE item from db - CRUD
app.delete('/grocs/:_id', function(req, res){
 var query = {_id: req.params._id};
 Grocs.remove(query, function(err, grocs){
 if(err){
  console.log('# API DELETE GROCS: ',err);
 }
 res.json(grocs);							
 })
});


// UPDATE item in db - CRUD
app.put('/grocs/:_id', function(req, res){
 var groc = req.body;									
 var query = req.params._id;							

 var update = {
	 '$set':{
	 itemname:groc.itemname,
	 description:groc.description,
	 image:groc.image,
	 itemquantity:groc.itemquantity
	 }
 };

 var options = {new: true};
 Grocs.findOneAndUpdate(query, update,options, function(err, grocs){
	 if(err){
	  console.log('# API UPDATE GROCS: ',err);    
	 }
	 res.json(grocs);
 })
})
//END APIs


//Get grocs images - from server
app.get('/images', function(req, res){
	 const imgFolder = __dirname +'/public/images/';
	 // REQUIRE FILE SYSTEM
	 const fs = require('fs');
	 //READ ALL FILES IN THE DIRECTORY
	 fs.readdir(imgFolder, function(err,files){
	 if(err){
	  return console.error(err);
	  }
	 //CREATE AN EMPTY ARRAY
	 const filesArr = [];
	 // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE THE ARRAY
	 files.forEach(function(file){
	  filesArr.push({name: file});
	 });
	 // SEND THE JSON RESPONSE WITH THE ARRAY of image filenames
	 res.json(filesArr);       // return json response
	 })
 })

//Reverse Proxy server setup to listen in port 3001              
app.listen(3001, function(err){
 if(err){
 return console.log(err);
 }
 console.log('API Sever is listening on http://localhost:3001');   
});