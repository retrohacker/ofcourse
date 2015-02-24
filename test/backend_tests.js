var assert = require('assert')
var models = require('../v1/models')
//var app = require('../index')
//var course_route = require('../v1/routes/course')
//var db_user = require('../v1/db/user')
var color = require('cli-color')
var pass = 0
var fail = 0

var http=require('http');

function user_model_validation_test_1() {
	try{
		var user = new models.User()
		var test_user_1 = { firstName: "Larry" , lastName: "Test", id: 5 };
		assert.notEqual(user.set(test_user_1,{validate:true}), false, "Backend User Model Validation Test 1")
		console.log("Backend User Model Validation Test 1" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
	    console.log("Backend user Model Validation Test 1" + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(user)
		fail++
	}
}

function user_model_validation_test_2() {
	try{
		var user = new models.User()
		var test_user_2 = { firstName: "Larry" , lastName: "Test", id: -666 };
		assert.equal(user.set(test_user_2,{validate:true}),false, "Backend User Model Validation Test 2")//should throw an exception
		console.log("Backend User Model Validation Test 2" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
	    console.log("Backend User Model Validation Test 2" + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(user)
		fail++
	}
}

function course_model_validation_test_1() {
	try{
		var course = new models.Course()
		var test_course = { university:1,id:5,title:"Theory of Something",department:"CS",number:491,section:001,start:"2015-02-01T04:05:06" ,end: "2015-02-30T04:05:06"};
		assert.notEqual(course.set(test_course,{validate:true}),false, "Backend Course Model Validation Test 1")//should throw an exception
		console.log("Backend Course Model Validation Test 1" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
	    console.log("Backend Course Model Validation Test 1" + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(course)
		fail++
	}
}

function event_model_validation_test_1() {
	try{
		var event = new models.Event()
		var test_event = {id:1,userid:10,parnetid:2,courseid:3,title:"Test Event!",start:"2015-02-01T04:05:06",end:"2015-02-30T04:05:06",type:0,data:"this is test event data",status:"in progress"}
		assert.notEqual(event.set(test_event,{validate:true}),false, "Backend Event Model Validation Test 1")//should throw an exception
		console.log("Backend Event Model Validation Test 1" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
	    console.log("Backend Event Model Validation Test 1" + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

function university_model_validation_test_1() {
	try{
		var university = new models.University()
		var test_university = {}
		assert.notEqual(university.set(test_university,{validate:true}),false, "Backend University Model Validation Test 1")//should throw an exception
		console.log("Backend University Model Validation Test 1" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
	    console.log("Backend University Model Validation Test 1" + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

function backend_server_test_1(){
	try{
		//make the request object
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/',
		  method: 'GET'
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			//console.log('data:' + chunk)
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Test 1 - GET localhost:5000/ " + "["+color.green("PASS")+"]")
			pass++
			//console.log(str);
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend Test 1 - GET localhost:5000/ " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

function backend_login_test_1(){
	try{

		/*   { 'user-agent': 'curl/7.26.0',
     host: 'localhost:5000',
     'content-length': '19',
     'content-type': 'application/x-www-form-urlencoded' },
     * 
     *  sessionID: 'v5MBfZCTDi_piqhscnIMXhBrggUtKUE6',

     *
	*/
	
		var login_parameters = 'email=test@test.net'
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/auth/login',
		  method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            //'Content-Length': post_data.length
          }
		  //form:'email=test@test.net'
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			//console.log('data:' + chunk)
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Login Test 1 " + "["+color.green("PASS")+"]")
			pass++
			console.log(str);
			console.log(response.headers)
		  });
		}
		var req = http.request(request, callback);
		req.write(login_parameters)
		req.end()
	}catch( Exception ){
	    console.log("Backend Login Test 1 " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

function backend_user_registration_test_1(){
	try{
		//make the request object
		//'' 
		var user= JSON.stringify({"firstName":"TestGuy1","lastName":"TestGuy1","university":"1","id":420,"email":"test@test.net"})
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/user',
		  method: 'POST',
		  headers: { 
			  'Content-Type': 'application/json'
		   }
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			//console.log('data:' + chunk)
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Test 2 - register new user " + "["+color.green("PASS")+"]")
			pass++
			console.log(str);
		  });
		}
		var req = http.request(request, callback);
		req.write(user)
		req.end()
	}catch( Exception ){
	    console.log("Backend Test 2 - register new user " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

function backend_get_user_test_1(){
	try{
		//make the request object
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/user',
		  method: 'GET'
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			//console.log('data:' + chunk)
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend user Test - GET /v1/user " + "["+color.green("PASS")+"]")
			pass++
			console.log(str);
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend user Test - GET /v1/user " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

function backend_create_course_test_1(){
	try{
		//make the request object
		//'' 
		var course = new models.Course()
		var test_course = { university:1,id:5,title:"Theory of Something",department:"CS",number:491,section:001,start:"2015-02-01T04:05:06" ,end: "2015-02-30T04:05:06"};
		assert.notEqual(course.set(test_course,{validate:true}),false, "Backend Course Model Validation Test 1")//should throw an exception
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/course',
		  method: 'POST',
		  headers: { 
			  'Content-Type': 'application/json'
		   }
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			//console.log('data:' + chunk)
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Create Course Test 1 " + "["+color.green("PASS")+"]")
			pass++
			console.log(str);
		  });
		}
		var req = http.request(request, callback);
		req.write(JSON.stringify(test_course))
		req.end()
	}catch( Exception ){
	    console.log("Backend Create Course Test 1  " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}

//TODO: add tests for database functions

user_model_validation_test_1() 
user_model_validation_test_2()
course_model_validation_test_1()
event_model_validation_test_1() 
backend_server_test_1()
backend_login_test_1()
backend_user_registration_test_1()
backend_get_user_test_1()
backend_create_course_test_1()
console.log(fail + color.red(" Failed"))
console.log(pass + color.green(" Passed"))

