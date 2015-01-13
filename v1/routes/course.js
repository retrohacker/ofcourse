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
    return res.status(400).json({e:user.validationError})
  }

  async.waterfall([
    function getUserUniversity(cb){
      User.getUniversityByUserID(req.user.profile.id,function(e,university) {
        //dont do this, remove this for production build, gives attackers too much info
        if(e) return res.status(500).json(e)
        if(!university) return res.status(400).json(e)
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
        cb(e,cid,id)
      })
    },
    function addUserParentEvent(cid, id, cb){
      var events = req.body.events
      var client = new pg.Client(db.connectionParameters)
      cb(null,client,events, cid, id)
    },
    function connect(client ,events, cid, id, cb){
      client.connect(function(e){
        cb(e,client,events,cid,id)
      })
    },
    function query(client, events, cid, id, cb){
      client.query('BEGIN()', function(e, result){
        for (item in events){
          var sched = later.parse.cron(events[item].cron)
          var courseStart = new Date(course.attributes.start)
          var courseEnd = new Date(course.attributes.end)
          var dates = later.schedule(sched).next(1092,courseStart,courseEnd)
          for (date in dates){
            var courseEvent = new EventModel({
              userid: req.user.profile.id,
              parentid: id,
              courseid: cid,
              title: course.attributes.title,
              start: dates[date].toJSON(),
              end: new Date(dates[date].setSeconds(dates[date].getSeconds() + events[item].duration)).toISOString(),
              type: 0
            })
            var results = db(User.insertCommand(EventModel,courseEvent.toJSON()), function(e, rows, result) {
              if(e) console.log(e)
                res.write(JSON.stringify({id:result.rows[0].id}))
                return res.end()
            })
          }
        }
        client.end()
        cb(e)
      })
    }
  ],
  function(e){
    if (e) console.log("Fail" + e)
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
