var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')

var db = require('../db')
var models = require('../models')

router.use(bodyParser.json())
router.use(db.session)
router.use(passport.initialize())
router.use(passport.session())

router.post('/event',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  var userEvent = new models.Event()
  if(!userEvent.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
  db.user.addEvent(userEvent,req.user.profile.id,function(e,id) {
    if(e) {
      logger.error('database error inserting event', e)
      return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    }
    else return res.status(201).json({id:id})
  })
})


router.get('/events',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  db.user.getEvents(req.user.profile.id,function(e,events) {
    if(e) {
      logger.error('database error getting events', e)
      return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    }
    if(!events) return res.status(500).json('no events for this user')
    return res.status(200).json(events)
  })
})
