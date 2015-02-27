var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')

var db = require('../db')
var models = require('../models')

router.use(bodyParser.json())
router.use(db.session)
router.use(passport.initialize())
router.use(passport.session())

router.get('/course/:id/events', function (req, res, next) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  db.user.getEventsByCourseID(req.user.profile.id,req.params.id,function(e,events) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!events) res.status(500).json(new Error('no events found'))
    res.status(200).json(events)
  })
});

router.post('/',function(req,res) {
  var user = new models.User()
  if(!user.set(req.body,{validate:true})){
    return res.status(400).json({e:user.validationError})
  }
  db.user.insert(user,function(e,id) {
    if(e) return res.status(500).json(e)
    req.login(id,function(e) {
      if(e) return res.status(500).json(e)
      return res.status(201).json({id:id})
    })
  })
})

router.put('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Not Logged In"))
   var user = new models.User()
  if(!user.set(req.body,{validate:true})){
    return res.status(400).json({e:user.validationError})
  }
  user.set('id',req.user.profile.id)
  db.user.update(user,function(e,id) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    else return res.status(201).json({id:id})
  })
})

router.get('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  db.user.get(req.user.profile.id,function(e,user) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!user) res.status(500).json(new Error('user not found'))
    res.status(200).json(user)
  })
})

router.get('/courses', function (req, res, next) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  async.waterfall([
    function getUserCourseIDs(cb){
      db.user.getUserCourseIDs(req.user.profile.id, function(e,courseIDs){
	  if(e) {
        logger.error('database error: could not fetch user', e)  
      }
      return cb(e, courseIDs)
      })
    },
    function getCoursesByCourseIDs(courseIDs, cb){
      async.each(courseIDs,function(course, cb){
		    db.user.getCourse(course.cid,function(e,course){
	        if(e) {
            logger.error('database error: /user/courses: ', e)  
          }
          res.write(JSON.stringify(course)) 
          return res.end()
        }) 
      },cb)
    }
  ],
  function(e,courses){
    client.end()    
    if(e) {
      logger.error('get courses error ', e)
      return res.status(500).end(e.stack+"\n"+JSON.stringify(e))
    }
    return res.end()
  })
})
