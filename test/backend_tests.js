var assert = require('assert')
var models = require('../v1/models')
//var app = require('../index')
//var course_route = require('../v1/routes/course')
//var db_user = require('../v1/db/user')
var color = require('cli-color')
var pass = 0
var fail = 0
var verbosity = 0
var cookie
var http=require('http');

//TODO: randomize course id so that insert functions properly, give sane error message when ID overlaps,
// and course must have unique combination of these values
// error: duplicate key value violates unique constraint "courses_department_number_section_semester_key"

var test_user_1 = { firstName: "Larry" , lastName: "Test", id: 5 };
var test_user_2 = { firstName: "Larry" , lastName: "Test", id: -666 };
var test_course_1 = { university:1,id:5,title:"Theory of Something",department:"CS",number:491,section:001,start:"2015-02-01T04:05:06" ,end: "2015-02-30T04:05:06"};
var test_event = {id:1,userid:10,parnetid:2,courseid:3,title:"Test Event!",start:"2015-02-01T04:05:06",end:"2015-02-30T04:05:06",type:0,data:"this is test event data",status:"in progress"}
var test_course_2 = { university:1,id:1366442,title:"Theory off Something",location:"my fdick",instructor:"my othfer dick",semester:"fall",department:"CS",number:491,section:032,start:"20150201" ,end: "20150228"};
				
//check command args for verbose mode
process.argv.forEach(function (val, index, array) {
  if (val ==  "-v" || val == "--verbose"){
    verbosity = 1
  }
  //console.log(index + ': ' + val);
});

console.log('INFO: we are going to set verbose mode anyways for now')
verbosity = 1


/*
 Things to consider/double check:
type checking for strings...
length checking for strings... will postgres automatically chop the string? 
* do i need to return an error if a varchar(50) input is too long?
*/ 


//after the login, the functions are called in the callback of the login,
//so that we are logged in and have session ID
//TODO: change to async.series or whatever - doesnt work because HTTP callbacks,
//  node will call all the functions in order but they dont wait for the return
//TODO: add tests for database functions
user_model_validation_test_1() 
user_model_validation_test_2()
course_model_validation_test_1()
event_model_validation_test_1() 
backend_server_test_1()
//backend_user_registration_test_1()
//async.series([
backend_login_test_1()
// - backend_get_user_test_1()
// - backend_create_course_test_1()
// - backend_create_event_test_1()
// - backend_get_courses_test_1()
// - backend_get_universities_test_1()
// - backend_get_events_test_1()
// - backend_get_user_courses_test_1()
console.log("backend model tests: " + fail + color.red(" Failed"))
console.log("backend model tests: " + pass + color.green(" Passed"))

function user_model_validation_test_1() {
	try{
		var user = new models.User()
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
		assert.notEqual(course.set(test_course_1,{validate:true}),false, "Backend Course Model Validation Test 1")//should throw an exception
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
		fail++
	}
}

function backend_server_test_1(){
	try{
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/',
		  method: 'GET'
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Test 1 - GET localhost:5000/ " + "["+color.green("PASS")+"]")
			pass++
      if(verbosity == 1)
			  console.log(str)
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend Test 1 - GET localhost:5000/ " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		fail++
	}
}


function backend_login_test_1(){
	try{
		var login_parameters = 'email=test@test.net'
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/auth/login',
		  method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Login Test 1 " + "["+color.green("PASS")+"]")
			pass++
      if(verbosity == 1)
			  console.log(str)
			headers = JSON.stringify(response.headers)
			//console.log(response)
			//console.log(headers)
			idlocation = headers.search('connect.sid')
			cookie = headers.substr(idlocation,headers.search('; Path')-idlocation)
			if(verbosity == 1)
			  console.log('Cookie:', cookie)
			//call more tests after logging in
			backend_get_user_test_1()
			backend_create_course_test_1()
			backend_create_event_test_1()
			backend_get_courses_test_1()
			backend_get_universities_test_1()
			backend_get_events_test_1()
			backend_get_user_courses_test_1()
		  });
		}
		var req = http.request(request, callback);
		req.write(login_parameters)
		req.end()
	}catch( Exception ){
	    console.log("Backend Login Test 1 " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		fail++
	}
}
function backend_get_user_test_1(){
	try{
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/user',
		  method: 'GET',
		  headers: {'Cookie': cookie}
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend user Test " + "["+color.green("PASS")+"]")
			pass++
			if(verbosity == 1)
			  console.log(str);
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend user Test " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		fail++
	}
}

function backend_get_universities_test_1(){
	try{
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/university/universities',
		  method: 'GET',
		  headers: {'Cookie': cookie}
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend universities test 1 " + "["+color.green("PASS")+"]")
			pass++
			if(verbosity == 1)
			  console.log(str);
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend universities test 1 " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		fail++
	}
}
function backend_create_course_test_1(){
	try{
		var course = new models.Course()
		assert.notEqual(course.set(test_course_2,{validate:true}),false, "Backend Course Model Validation Test 1")//should throw an exception
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/course',
		  method: 'POST',
		  headers: { 
			  Cookie: cookie,
			  'Content-Type': 'application/json'
		   }
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Create Course Test 1 " + "["+color.green("PASS")+"]")
			pass++
			if(verbosity == 1)
			  console.log(str)
		  });
		}
		var req = http.request(request, callback);
		req.write(JSON.stringify(test_course_2))
		req.end()
	}catch( Exception ){
	    console.log("Backend Create Course Test 1  " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(course)
		fail++
	}
}

function backend_create_event_test_1(){
	try{
		var event = new models.Event()
		var test_event = {id:1,userid:10,parnetid:2,courseid:3,title:"Test Event!",start:"2015-02-01T04:05:06",end:"2015-02-30T04:05:06",type:0,data:"this is test event data",status:"in progress"}
		assert.notEqual(event.set(test_event,{validate:true}),false, "Backend Create Event Test 1")//should throw an exception
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/event/event',
		  method: 'POST',
		  headers: { 
			  Cookie: cookie,
			  'Content-Type': 'application/json'
		   }
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend Create Event Test 1 " + "["+color.green("PASS")+"]")
			pass++
			if(verbosity == 1)
			  console.log(str)
		  });
		}
		var req = http.request(request, callback);
		req.write(JSON.stringify(test_event))
		req.end()
	}catch( Exception ){
	    console.log("Backend Create Event Test 1  " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		console.log(event)
		fail++
	}
}
function backend_get_courses_test_1(){
	try{
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/course/courses',
		  method: 'GET',
		  headers: {'Cookie': cookie}
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend get courses Test 1 - GET /v1/course/courses " + "["+color.green("PASS")+"]")
			pass++
			if(verbosity == 1)
        console.log("INFO: this function returns all the courses - we're not going to print them")
			  //console.log(str)
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend get courses Test 1 - GET /v1/course/courses " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		fail++
	}
}
function backend_get_events_test_1(){
	try{
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/event/events',
		  method: 'GET',
		  headers: {'Cookie': cookie}
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend get events Test 1 - GET /v1/event/events " + "["+color.green("PASS")+"]")
			pass++
			if(verbosity == 1)
			  console.log(str)
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend get events Test 1 - GET /v1/event/events " + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
		fail++
	}
}
function backend_get_user_courses_test_1(){
	try{
		var request={
		  host: 'localhost',
		  port: 5000,
		  path: '/v1/user/courses',
		  method: 'GET',
		  headers: {'Cookie': cookie}
		}
		callback = function(response) {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			if(str)
			console.log("Backend get user courses Test 1 - GET /v1/user/courses " + "["+color.green("PASS")+"]")
			pass++
      if(verbosity == 1)
        console.log(str)
		  });
		}
		var req = http.request(request, callback);
		req.end()
	}catch( Exception ){
	    console.log("Backend get user courses Test 1 - GET /v1/user/courses" + "["+color.red("FAIL")+"]")
		console.log(Exception.message)
		console.log(Exception)
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
			if(verbosity == 1)
			  console.log(str)
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
