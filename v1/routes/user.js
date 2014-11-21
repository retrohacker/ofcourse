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

router.get('/course/:id/events', function (req, res, next) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  console.log('user.js: hurr durr you hit a link', req.params);
  console.log(req.params.id)
  User.getEventsByCourseID(req.user.profile.id,req.params.id,function(e,events) {
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!events) res.status(500).json(new Error('no events found'))
    res.status(200).json(events)
  })
});

router.post('/user',function(req,res) {
  //NEEDS SESSION ID AUTHENTICAITON...?
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

router.put('/user',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
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

router.get('/user',function(req,res) {
  if(!req.user || !req.user.profile || !req.user.profile.id) return res.status(401).json(new Error("Please login"))
  User.get(req.user.profile.id,function(e,user) {
    console.log(e)
    if(e) return res.status(500).json(e)//dont do this, remove this for production build, gives attackers too much info
    if(!user) res.status(500).json(new Error('user not found'))
    res.status(200).json(user)
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
