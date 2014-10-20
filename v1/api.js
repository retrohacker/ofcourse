var User = require('./routes/user.js')
var router = module.exports = require('express').Router()

router.use('/user',User)
