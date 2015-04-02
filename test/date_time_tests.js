var http=require('http');
var pg = require('pg-query')
var connString = process.env.DATABASE_URL || "postgres://postgres@127.0.0.1:5432/postgres"

var color = require('cli-color')

register_new_user()
get_session()

console.log('INFO: default is verbose mode for now \n')
verbosity = 1

/** 
 * 
 * places to test for date/time:
 * POST /v1/course
 * 
 * 
 * 
 * */

function register_new_user(){
  try{
    var testName = "Backend Test 2 - register new user"
    var user= JSON.stringify({"firstName":"Test User First Name","lastName":"Test User Last Name","university":"1","id":420,"email":"test@test.net"})
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
        str += chunk;
      });
      response.on('end', function () {
        if(str)
          console.log('register new user - got a response')
        if(verbosity == 1)
          console.log(str + '\n')
      });
    }
    var req = http.request(request, callback);
    req.write(user)
    req.on('error', function(error) {
      console.log(testName + " ["+color.red("FAIL")+"]")
      if(verbosity == 1)
        console.log(error)
    });
    req.end()
  }catch( Exception ){
    console.log(testName + " ["+color.red("FAIL")+"]")
    console.log(Exception.message)
    console.log(Exception)
    console.log(event)
  }
}
function get_session(){
  try{
    var testName = 'Test Client Series 1'
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
        console.log(color.green("Successfully logged on"))
      headers = JSON.stringify(response.headers)
      //console.log(response)
      //console.log(headers)
      idlocation = headers.search('connect.sid')
      cookie = headers.substr(idlocation,headers.search('; Path')-idlocation)
      if(verbosity == 1){
        console.log('Cookie:', cookie)
        console.log(str + '\n')
      }
      join_course_test_1()
      //call more tests after logging in
      //backend_get_user_test_1()
      //backend_create_course_test_1()
      //backend_create_event_test_1()
      //backend_get_courses_test_1()
      //backend_get_universities_test_1()
      backend_get_events_test_1()
      backend_get_user_courses_test_1()
      });
    }
    var req = http.request(request, callback);
    req.on('error', function(error) {
      console.log(testName + "["+color.red("FAIL")+"]")
      if(verbosity == 1)
        console.log(error)
    });
    req.write(login_parameters)
    req.end()
  }catch( Exception ){
    console.log(testName + "["+color.red("FAIL")+"]")
    console.log(Exception.message)
    console.log(Exception)
  }
}



function join_course_test_1(){
  try{
    var testName = "join course test 1"
    var params = JSON.stringify({"cid":"3043","uid":"420"})
    var request={
      host: 'localhost',
      port: 5000,
      path: '/v1/user/course',
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
        if(str.indexOf("error") > -1) {
          console.log(testName + " ["+color.red("FAIL")+"]")
        }
        if(str)
          console.log(testName + " ["+color.green("PASS")+"]")
        if(verbosity == 1)
          console.log(str + '\n')
      });
    }
    var req = http.request(request, callback);
    req.write(params)
    req.on('error', function(error) {
      console.log(testName + " ["+color.red("FAIL")+"]")
      if(verbosity == 1)
        console.log(error)
    });
    req.end()
  }catch( Exception ){
    console.log(testName + " ["+color.red("FAIL")+"]")
    console.log(Exception.message)
    console.log(Exception)
    console.log(course)
  }
}

function backend_get_events_test_1(){
  try{
    var testName = "Backend get events Test 1 - GET /v1/event/events"
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
          console.log(testName + " ["+color.green("PASS")+"]")
        if(verbosity == 1)
          console.log(str + '\n')
      });
    }
    var req = http.request(request, callback);
    req.on('error', function(error) {
      console.log(testName + " ["+color.red("FAIL")+"]")
      if(verbosity == 1)
        console.log(error)
    });
    req.end()
  }catch( Exception ){
    console.log(testName + " ["+color.red("FAIL")+"]")
    console.log(Exception.message)
    console.log(Exception)
  }
}
function backend_get_user_courses_test_1(){
  try{
    var testName = "Backend get user courses Test 1 - GET /v1/user/courses"
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
          console.log(testName + " ["+color.green("PASS")+"]")
        if(verbosity == 1)
          console.log(str + '\n')
      });
    }
    var req = http.request(request, callback);
    req.on('error', function(error) {
      console.log(testName + " ["+color.red("FAIL")+"]")
      if(verbosity == 1)
        console.log(error)
    });
    req.end()
  }catch( Exception ){
    console.log(testName + " ["+color.red("FAIL")+"]")
    console.log(Exception.message)
    console.log(Exception)
  }
}
