var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var passport = require('passport')
var Facebook = require('passport-facebook').Strategy
var session = require('express-session')

passport.use(new Facebook({
    clientID: "623965211045732",
    clientSecret: "aef606266e12688633565ce9083778b6",
    callbackURL: "https://ofcourseapp.herokuapp.com/v1/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //do stuff here
    var user = {
      accessToken:accessToken,
      refreshToken:refreshToken,
      profile:profile
    }
    done(null,user)
  }
))

passport.serializeUser(function(user,done) {
  done(null,user.profile.id)
})

router.use(bodyParser.json())
router.use(session({secret:"#fuckitshipit"}))
router.use(passport.initialize());
router.use(passport.session());

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/callback',passport.authenticate('facebook',{ successRedirect:'/', failureRedirect:'/facebook'}))

router.get('/',function(req,res) {
  return res.status(200).json({"auth":"true"})
})
