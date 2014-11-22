var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var db = require('../db/database.js')
var session = require('../db/session.js')
var passport = require('passport')
var User = require('../db/User.js')
var CourseModel = require('../models/CourseModel.js')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize())
router.use(passport.session())

//CourseModel
router.post('/course',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  var course = new CourseModel()
  //console.log('user.js: req.body ', req.body)
  if(!course.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
  User.getUniversityByUserID(req.user.profile.id,function(e,university) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    //else return res.status(201).json({id:id})
    course.set('university',university)
    User.addCourse(course,req.user.profile.id,function(e,id) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    else return res.status(201)
	})
    return res.status(500)
  })
})

//CourseCollection
router.get('/courses',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  User.get(req.user.profile.id,function(e,user) {
    //console.log('user.js: ', e)
    //console.log('user.js: user: ', user)
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!user) res.status(500).json(new Error('user not found'))
    User.getCoursesByUniversity(user.university,function(e,courses) {
      //console.log('user.js: ', e)
      //console.log('user.js: courses: ', courses)
      if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
      if(!courses) res.status(500).json(new Error('user not found'))
      res.status(200).json(courses)
    })
  })
})
