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
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  var userEvent = new models.Event()
  if(!userEvent.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
  db.user.addEvent(userEvent,req.user.profile.id,function(e,id) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    else return res.status(201).json({id:id})
  })
})


router.get('/events',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  db.user.getEvents(req.user.profile.id,function(e,events) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!events) res.status(500).json(new Error('no events for this user'))
    res.status(200).json(events)
  })
})

router.put('/event',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  var result = db.sql.update(models.Event, req.body)
  db.db(result,function(e,rows,result) {
    if(e) return res.status(500).json(e)
  })
  res.status(200).json(result)
})
