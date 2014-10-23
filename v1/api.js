var User = require('./routes/user.js')
var Auth = require('./routes/auth.js')
var router = module.exports = require('express').Router()

router.use('/user',User)
router.use('/auth',Auth)
