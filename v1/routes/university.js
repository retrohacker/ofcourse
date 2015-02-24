var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')
var db = require('../db')

router.use(bodyParser.json())
router.use(db.session)
router.use(passport.initialize())
router.use(passport.session())

router.get('/universities',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json("Please login")
  db.user.getUniversities(function(e,universities) {
    if(e) {
      logger.error('database error getting university', e)
      return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    }
    if(!universities) return res.status(500).json('user not found')
    return res.status(200).json(universities)
  })
})
