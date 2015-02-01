var router = module.exports = require('express').Router()

var bodyParser = require('body-parser')
var passport = require('passport')
var Facebook = require('passport-facebook').Strategy
var LocalStrategy = require('passport-local').Strategy;

var db = require('../db')

var FacebookModel = require('../models/FacebookModel.js')
var UserModel = require('../models/UserModel.js')

router.use(bodyParser.urlencoded())
router.use(db.session)
router.use(passport.initialize());
router.use(passport.session());

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/callback',
            passport.authenticate('facebook',{ successRedirect:'/',
                                               failureRedirect:'/facebook'}))

router.post('/login',
  passport.authenticate('local',{ successRedirect: '/#home',
                                  failureRedirect: '/#login' })
);

//TODO: LocalStrategy implementation needs much refactoring
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'email'
  },
  function(username, password, done) {
    db.user.getUserByEmail(username,function(e,user){
      if(e) return done(e, false, { message: 'Incorrect username.' });
      if(user){
        return done(null, user.id);
      }
      return done(null, false,  { message: 'authentication error...' })
    })
  }
));

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
  db.facebook.updateOrCreate({model:FacebookModel,values:new FacebookModel(profile)},function(e,id) {
    if(e) cb(e)
    cb(null,id)
  })
}
