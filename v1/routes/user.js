var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var db = require('../db/database.js')
var UserModel = require('../models/UserModel.js')

router.use(bodyParser.json())

router.post('/',function(req,res) {
  var user = new UserModel()
  if(!user.set(req.body,{validate:true}))
    return res.status(400).json({e:user.validationError})
  db('INSERT INTO users("fname", "lname", "id", "email", "university") VALUES(\'' + user.attributes.firstName + '\', \'' + user.attributes.lastName + '\', \'' +user.attributes.id + '\', \'' + user.attributes.email + '\', \'' + user.attributes.university + '\')')
  res.status(501).json(new Error("Endpoint not implemented"))
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
