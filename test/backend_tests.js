var assert = require('assert')
var models = require('../v1/models')
var color = require('cli-color')

function user_model_validation_test_1() {
	try{
		var user = new models.User()
		var test_user_1 = { firstName: "Larry" , lastName: "Test", id: 5 };
		assert.notEqual(user.set(test_user_1,{validate:true}), false, "User Validation Test 1")
		console.log("User Validation Test 1" + "["+color.green("PASS")+"]")
	}catch( Exception ){
		console.log(Exception.message + "["+color.red("FAIL")+"]\n")
	}
}

function user_model_validation_test_2() {
	try{
		var user = new models.User()
		var test_user_2 = { firstName: "Larry" , lastName: "Test", id: -666 };
		assert.equal(user.set(test_user_2,{validate:true}),false, "User Validation Test 2")//should throw an exception
		console.log("User Validation Test 2" + "["+color.green("PASS")+"]")
	}catch( Exception ){
		console.log(Exception.message + "["+color.red("FAIL")+"]\n")
	}
}

function course_model_validation_test_1() {
	var course = new models.Course()
}

user_model_validation_test_1() 
user_model_validation_test_2() 

