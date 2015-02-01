var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')
var later = require('later')
var pg = require('pg')

var db = require('../db')
var models = require('../models')

router.use(bodyParser.json())
router.use(db.session)
router.use(passport.initialize())
router.use(passport.session())

router.post('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  var course = new models.Course()
  if(!course.set(req.body,{validate:true})) {
    return res.status(400).json({e:user.validationError})
  }
  db.user.getUniversityByUserID(req.user.profile.id,function(e,university) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!university) return res.status(400).json(e)
    course.set('university',university)
    db.user.addCourse(course,req.user.profile.id,function(e,id){
      if(e) console.log(e)
      var parent = new models.ParentEvent()
      parent.set(course.toJSON())
      parent.set('cid',id)
      cid = id
      db.user.addParentEvent(parent, function(e,id){
        //Create children events!
        var events = req.body.events
        console.log(events)
        //Creat client and transfer out of pool
        var client = new pg.Client(db.db.connectionParameters)
        client.connect(function(e) {
          client.query('BEGIN()', function(e, result){
            for (item in events){
              var sched = later.parse.cron(events[item].cron)
              var courseStart = new Date(course.attributes.start)
              var courseEnd = new Date(course.attributes.end)
              var dates = later.schedule(sched).next(1092,courseStart,courseEnd)
              for (date in dates){
                console.log(dates[date])
                console.log(events[item])
                console.log(dates[date].getSeconds())
                console.log(events[item])
                var courseEvent = new models.Event({
                  userid: req.user.profile.id,
                  parentid: id,
                  courseid: cid,
                  title: course.attributes.title,
                  start: dates[date].toJSON(),
                  end: new Date(dates[date].setSeconds(dates[date].getSeconds() + events[item].duration)).toISOString(),
                  type: 0
                });
                var results = db.db(db.user.insertCommand(models.Event,courseEvent.toJSON()), function(e, rows, result) {
                  if(e) console.log(e)
                  res.write(JSON.stringify({id:result.rows[0].id}))
                  return res.end()
                })
              }
            }
            client.end();
          })
        })
      })
    })
  })
})

//CourseCollection
router.get('/courses',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  db.user.get(req.user.profile.id,function(e,user) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!user) res.status(500).json(new Error('user not found'))
    db.user.getCoursesByUniversity(user.university,function(e,courses) {
      if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
      if(!courses) res.status(500).json(new Error('user not found'))
      res.status(200).json(courses)
    })
  })
})
