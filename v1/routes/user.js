var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var db = require('../db/database.js')
var session = require('../db/session.js')
var passport = require('passport')
var User = require('../db/User.js')
var UserModel = require('../models/UserModel.js')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize())
router.use(passport.session())


router.post('/',function(req,res) {
  var user = new UserModel()
  if(!user.set(req.body,{validate:true})){
    return res.status(400).json({e:user.validationError})
  }
  User.insert(user,function(e,id) {
    if(e) return res.status(500).json(e)
    req.login(id,function(e) {
      if(e) return res.status(500).json(e)
      return res.status(201).json({id:id})
    })
  })
})

router.put('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Not Logged In"))
   var user = new UserModel()
  if(!user.set(req.body,{validate:true})){
    return res.status(400).json({e:user.validationError})
  }
  user.set('id',req.user.profile.id)
  User.update(user,function(e,id) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    else return res.status(201).json({id:id})
  })
})

router.get('/',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  console.log(req.user)
  User.get(req.user.profile.id,function(e,user) {
    console.log(e)
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!user) res.status(500).json(new Error('user not found'))
    res.status(200).json(user)
  })
})
