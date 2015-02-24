var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')

var db = require('../db')
var models = require('../models')
var logger = require('../../logger')

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
