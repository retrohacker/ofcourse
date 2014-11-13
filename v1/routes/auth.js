var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var passport = require('passport')
var Facebook = require('passport-facebook').Strategy
var session = require('../db/session.js')
var UserModel = require('../models/UserModel.js')
var FacebookModel = require('../models/FacebookModel.js')
var facebookDB = require('../db/Facebook.js')

router.use(bodyParser.json())
router.use(session)
router.use(passport.initialize());
router.use(passport.session());

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/callback',passport.authenticate('facebook',{ successRedirect:'/', failureRedirect:'/facebook'}))

passport.use(new Facebook({
    clientID: "623965211045732",
    clientSecret: "aef606266e12688633565ce9083778b6",
    callbackURL: "http://www.ofcourse.link/v1/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var obj = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fbid: profile.id,
      access_token: accessToken,
      link: profile.profileUrl,
      update_time: profile._json.updated_time
    }
    updateFacebookUser(obj,done)
  }
))

passport.serializeUser(function(id,done) {
  done(null,id)
})

passport.deserializeUser(function(id,done) {
  done(null,{profile:{id:id}})
})

function updateFacebookUser(profile,cb) {
  facebookDB.updateOrCreate({model:FacebookModel,values:new FacebookModel(profile)},function(e,id) {
    if(e) cb(e)
    cb(null,id)
  })  
}


