var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var db = require('../db/database.js')
var UserModel = require('../models/UserModel.js')
var session = require('../db/session.js')
var passport = require('passport')
var User = require('../db/User.js')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize())
router.use(passport.session())


router.post('/5555',function(req,res) {
  var user = new UserModel()
  if(!user.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
  User.insert(user,function(e,id) {
    if(e) return res.status(500).json(e)
    req.login(id,function(e) {
      if(e) return res.status(500).json(e)
      return res.status(201).json({id:id})
    })
  })
})

router.post('/login',passport.authenticate('local'),function(req,res) {
  var user = new UserModel()
  if(!user.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
    req.login(user.email,function(e) {
      if(e) return res.status(500).json(e)
      return res.status(201).json({id:id})
    })
})

router.get('/:id',function(req,res) {
  /*
  if(Number.isNaN(Number(req.params.id)))
    return res.status(400).json({error:'id is not a number'})
  if(users[req.params.id] === null)
    return res.status(404).json({error:'user does not exist'})
  res.json(users[req.params.id])
  */
  res.status(501).json(new Error("Endpoint not implemented"))
})

router.put('/:id',function(req,res) {
  /*
  if(Number.isNaN(Number(req.params.id)))
    return res.status(400).json({error:'id is not a number'})
  if(users[req.params.id] === null)
    return res.status(404).json({error:'user does not exist'})
  users[req.params.id] = req.body
  return res.status(200)
  */
  res.status(501).json(new Error("Endpoint not implemented"))
})

router.delete('/:id',function(req,res) {
  /*
  if(Number.isNaN(Number(req.params.id)))
    return res.status(400).json({error:'id is not a number'})
  users[req.params.id] = null
  */
  res.status(501).json(new Error("Endpoint not implemented"))
})
