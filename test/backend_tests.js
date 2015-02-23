var assert = require('assert')
var models = require('../v1/models')
//var app = require('../index')
//var course_route = require('../v1/routes/course')
//var db_user = require('../v1/db/user')
var color = require('cli-color')
var pass = 0
var fail = 0

function user_model_validation_test_1() {
	try{
		var user = new models.User()
		var test_user_1 = { firstName: "Larry" , lastName: "Test", id: 5 };
		assert.notEqual(user.set(test_user_1,{validate:true}), false, "Backend User Model Validation Test 1")
		console.log("Backend User Model Validation Test 1" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
		console.log(Exception.message + "["+color.red("FAIL")+"]")
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
		console.log(Exception.message + "["+color.red("FAIL")+"]\n")
		console.log(Exception)
		console.log(user)
		fail++
	}
}

function course_model_validation_test_1() {
	try{
		var course = new models.Course()
		var test_course = { university:1,id:5,title:"Theory of Something",department:"CS",number:491,section:001,start:"2015-02-01T04:05:06" ,end: "2015-02-30T04:05:06"};
		assert.notEqual(course.set(test_course,{validate:true}),false, "Backend User Model Validation Test 1")//should throw an exception
		console.log("Backend Course Model Validation Test 1" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
		console.log(Exception.message + "["+color.red("FAIL")+"]\n")
		console.log(Exception)
		console.log(course)
		fail++
	}
}

//TODO: add tests for database functions

/*
function user_database_test_1(){
	//console.log(db_user)
	try{
		//console.log(db_user.insert.toString())
		var user = new models.User()
		var test_user_1 = { firstName: "Larryf" , lastName: "Testf", id: 2238 };
		user.set(test_user_1,{validate:true})
		console.log(db_user.insert(user,function(e,id) {
			if(e) return e
			if(id) return id
			//if(e) throw(e)
			//if(e) return res.status(500).json(e)
			//req.login(id,function(e) {
			//  if(e) return res.status(500).json(e)
			//  return res.status(201).json({id:id})
			//})
		}))
		//assert.equal(user.set(test_user_2,{validate:true}),false, "User Validation Test 2")//should throw an exception
		console.log("User Database Test 2" + "["+color.green("PASS")+"]")
		pass++
	}catch( Exception ){
		console.log(Exception.message + "["+color.red("FAIL")+"]\n")
		fail++
	}
}
*/

user_model_validation_test_1() 
user_model_validation_test_2()
course_model_validation_test_1() 
//user_database_test_1() 
console.log(fail + color.red(" Failed"))
console.log(pass + color.green(" Passed"))

