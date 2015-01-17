var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var db = require('../db/database.js')
var session = require('../db/session.js')
var passport = require('passport')
var User = require('../db/User.js')
var CourseModel = require('../models/CourseModel.js')
var EventModel = require('../models/EventModel.js')
var ParentEventModel = require('../models/ParentEventModel.js')
var later = require('later')
var pg = require('pg')
var async = require('async')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize())
router.use(passport.session())

//CourseModel
router.post('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  var course = new CourseModel()
  if(!course.set(req.body,{validate:true})) {
    return res.status(400).json({e:course.validationError})
  }
  //Open DB connection
  var client = new pg.Client(db.connectionParameters)
  async.waterfall([
    function getUserUniversity(cb){
      User.getUniversityByUserID(req.user.profile.id,function(e,university) {
        //dont do this, remove this for production build, gives attackers too much info
        if(e) return cb(e, 500, "Error getting University from User data")
        if(!university) return cb(e, 400, "No University found for User")
        course.set('university',university)
        cb(e,course)
      })
    },
    function addUserEvent(course, cb){
      User.addCourse(course,req.user.profile.id,function(e,id){
        var parent = new ParentEventModel()
        parent.set(course.toJSON())
        parent.set('cid',id)
        cid = id
        cb(e,cid,id, parent)
      })
    },
    function addUserParentEvent(cid, id, parent, cb){
      User.addParentEvent(parent, function(e,id){
        var events = req.body.events
        cb(e,events, cid, id)
      })
    },
    function connect(events, cid, id, cb){
      client.connect(function(e){
        cb(e,events,cid,id)
      })
    },
    function query(events, cid, id, cb){
      client.query('BEGIN()', function(e, result){
        async.each(events, function(item, cb){
          var sched = later.parse.cron(item.cron)
          var courseStart = new Date(course.attributes.start)
          var courseEnd = new Date(course.attributes.end)
          var dates = later.schedule(sched).next(1092,courseStart,courseEnd)
          async.each(dates, function(date, cb){
            var courseEvent = new EventModel({
              userid: req.user.profile.id,
              parentid: id,
              courseid: cid,
              title: course.attributes.title,
              start: date.toJSON(),
              end: new Date(date.setSeconds(date.getSeconds() + item.duration)).toISOString(),
              type: 0
            })
            db(User.insertCommand(EventModel,courseEvent.toJSON()), function(e, rows, result) {
              res.write(JSON.stringify({id:result.rows[0].id}))
              return res.end()
            })
            cb(e)
          })
          cb(e)
        })
        cb(e)
      })
    }
  ],
  function(e){
    client.end()
    if (e) return res.status(500).json(e)
  })
})

//CourseCollection
router.get('/courses',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  User.get(req.user.profile.id,function(e,user) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!user) res.status(500).json(new Error('user not found'))
    User.getCoursesByUniversity(user.university,function(e,courses) {
      if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
      if(!courses) res.status(500).json(new Error('user not found'))
      res.status(200).json(courses)
    })
  })
})
