var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()

router.use(bodyParser.json())

var users = []

router.post('/',function(req,res) {
  return res.status(201).json({id:users.push(obj)-1})
})

router.get('/:id',function(req,res) {
  if(Number.isNaN(Number(req.params.id)))
    return res.status(400).json({error:'id is not a number'})
  if(users[req.params.id] === null)
    return res.status(404).json({error:'user does not exist'})
  res.json(users[req.params.id])
})

router.put('/:id',function(req,res) {
  if(Number.isNaN(Number(req.params.id)))
    return res.status(400).json({error:'id is not a number'})
  if(users[req.params.id] === null)
    return res.status(404).json({error:'user does not exist'})
  users[req.params.id] = req.body
  return res.status(200)
})

router.delete('/:id',function(req,res) {
  if(Number.isNaN(Number(req.params.id)))
    return res.status(400).json({error:'id is not a number'})
  users[req.params.id] = null
})
