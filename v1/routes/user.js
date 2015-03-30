var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')
var async = require('async')
var pg = require('pg')
var db = require('../db')
var models = require('../models')
var logger = require('../../logger')
var later = require('later')

router.use(bodyParser.json())
router.use(db.session)
router.use(passport.initialize())
router.use(passport.session())

router.get('/course/:id/events', function (req, res, next) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  db.user.getEventsByCourseID(req.user.profile.id,req.params.id,function(e,events) {
    if(e) {
      logger.error('database error fetching events', e)
      return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    }
    if(!events) res.status(500).json('no events found')
    res.status(200).json(events)
  })
});

router.post('/',function(req,res) {
  var user = new models.User()
  if(!user.set(req.body,{validate:true})){
    return res.status(400).json({e:user.validationError})
  }
  db.user.insert(user,function(e,id) {
    if(e) {
      logger.error('database error saving user data to database', e)
      return res.status(500).json(e)
    }
    req.login(id,function(e) {
      if(e) {
        logger.error('redis/passport login error', e)
        return res.status(500).json(e)
      }return res.status(201).json({id:id})
    })
  })
})

router.put('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Not Logged In")
   var user = new models.User()
  if(!user.set(req.body,{validate:true})){
  logger.error('new user registration model validation error', e)  
    return res.status(400).json({e:user.validationError})
  }
  user.set('id',req.user.profile.id)
  db.user.update(user,function(e,id) {
    if(e) {
      logger.error('database insert new user error', e)  
      return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    }
    else return res.status(201).json({id:id})
  })
})

router.get('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  db.user.get(req.user.profile.id,function(e,user) {
    if(e) {
      logger.error('database error: could not fetch user', e)  
      return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    }if(!user) return res.status(500).json('user not found')
    return res.status(200).json(user)
  })
})

router.get('/courses', function (req, res, next) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  async.waterfall([
    function getUserCourseIDs(cb){
      db.user.getUserCourseIDs(req.user.profile.id, function(e,courseIDs){
        return cb(e, courseIDs)
      })
    },
    function getCoursesByCourseIDs(courseIDs, cb){
      async.map(courseIDs,function(course, cb){
        db.user.getCourse(course.cid,cb)
      },cb)
    },
    function sendResponse(courses) {
      res.status(200).json(courses)
    }
  ],
  function(e,courses){
    if(e) {
      logger.error('get courses error ', e)
      return res.status(500).end(e.stack+"\n"+JSON.stringify(e))
    }
  })
})

router.post('/course', function(req,res,next) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  async.waterfall([
    function joinCourse(cb) {
      db.user.joinCourse(req.body.cid , req.body.uid, cb)
    },
    function getParentEvents(course,cb) {
      console.log("Fetching Parent Events")
      db.db('select * from parent_events join courses on parent_events.cid = courses.id where cid=$1',[req.body.cid],cb)
    },
    function generateEvents(rows,result,cb) {
      console.log(JSON.stringify(rows))
      async.each(rows,function(row,cb) {
        var crons = JSON.parse(row.cron)
        async.each(crons,function(cron,cb) {
          var sched = later.parse.cron(cron.cron)
          var courseStart = new Date(row.start)
          var courseEnd = new Date(row.end)
          var dates = later.schedule(sched).next(1096,courseStart,courseEnd)
          // We need to create all physical dates that are generated from it
          async.each(dates, function(date,cb){
            console.log(date.toJSON())
            var courseEvent = new models.Event({
              userid: req.user.profile.id,
              parentid: row.id,
              courseid: row.cid,
              title: row.title,
              start: date.toJSON(),
              end: new Date(date.setSeconds(date.getSeconds() + cron.duration)).toISOString(),
              type: 0
            })
            var insert = db.sql.insert(models.Event,courseEvent.toJSON())
            console.log("Inserting event")
            db.db(insert.str,insert.arr, cb)
          },cb)
        },cb)
      },cb)
    }
  ],
  function(e) {
    if(e) {
      logger.error('database error: could not add user to course ', e)
      return res.status(500).end()
    }
    return res.status(200).end()
  })
})
