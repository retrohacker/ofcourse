var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')

var db = require('../db/database.js')
var session = require('../db/session.js')
var User = require('../db/User.js')

var EventModel = require('../models/EventModel.js')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize())
router.use(passport.session())

//EventModel
router.post('/event',function(req,res) {
  console.log('user.js: ', req.user)
  console.log('user.js: ', req.body)
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  var userEvent = new EventModel()
  //console.log('user.js: req.body ', req.body)
  if(!userEvent.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
  User.addEvent(userEvent,req.user.profile.id,function(e,id) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    else return res.status(201).json({id:id})
  })
})


//EventCollection
router.get('/events',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  User.getEvents(req.user.profile.id,function(e,events) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!events) res.status(500).json(new Error('no events for this user'))
    res.status(200).json(events)
  })
})
