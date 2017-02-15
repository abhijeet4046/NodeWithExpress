var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/EmpDB"); // connect to our database

var db=mongoose.connection
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 8383;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var EmpModel=require('./Model/Employee.js')

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    //res.json({ message: 'hooray! welcome to our apiiiiii!' });
  //  res.sendFile(__dirname + '/index.html');
    res.json({ message: 'hooray! welcome to our API' });
});

router.route('/Employee').post(function(req,res)
{
	var emp = new EmpModel();
	emp.ID=1;
	emp.Name=req.body.Name;
	emp.Dept=req.body.Dept;

	emp.save(function(err){
		if (err) {
			console.log(err)
		}
		else		
		{
			res.json('Record created successfully');
		}
	})


}).get(function (req,res) {
	EmpModel.find(function(err,employees)
	{
		if (err) 
		{
			console.log(err)
		}
		else
		{
			res.json(employees);
		}
	})
})
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(8181);
console.log('Magic happens on port '+8181);