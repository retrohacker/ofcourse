var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')

var db = require('../db/database.js')
var session = require('../db/session.js')
var User = require('../db/User.js')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize())
router.use(passport.session())

router.get('/universities',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  User.getUniversities(function(e,universities) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!universities) res.status(500).json(new Error('user not found'))
    res.status(200).json(universities)
  })
})
