var router = module.exports = require('express').Router()

var routes = require('./routes')

router.use('/user',routes.user)
router.use('/auth',routes.auth)
router.use('/course',routes.course)
router.use('/university',routes.university)
router.use('/event',routes.event)
