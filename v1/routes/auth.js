var bodyParser = require('body-parser')
var router = module.exports = require('express').Router()
var passport = require('passport')
var Facebook = require('passport-facebook').Strategy
var session = require('../db/session.js')
var UserModel = require('../models/UserModel.js')
var FacebookModel = require('../models/FacebookModel.js')
var facebookDB = require('../db/Facebook.js')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/User.js')

router.use(bodyParser.urlencoded())
router.use(session)
router.use(passport.initialize());
router.use(passport.session());

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/callback',passport.authenticate('facebook',{ successRedirect:'/', failureRedirect:'/facebook'}))

//TODO: refactor and clean up login sequence
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }//where does this next callback come from...
    if (!user) { console.log('no user returned from passport.authenticate...')
      return res.redirect('/#login'); }
    req.logIn(user, function(err) {//passport.authenticate should already call req.login automatically?
      if (err) { return next(err); }//this is a giant pile of hack wtf is even going on
      console.log('login successful, redirecting to /#home')
      return res
      //return res.redirect('/#home');
      //return res.send(user)
    });
  })(req, res, next);
});

//TODO: LocalStrategy implementation needs much refactoring
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'email'
  },
  function(username, password, done) {
    //console.log(username)
   // console.log(password)
    console.log('EXECUTING PASSPORT LOCAL STRATEGY...')
    User.getUserByEmail(username,function(e,user){
      if(e) console.log(e)
      if(e) return done(e, false, { message: 'Incorrect username.' });
      if(user){
        console.log(user)
        return done(null, user);
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
  facebookDB.updateOrCreate({model:FacebookModel,values:new FacebookModel(profile)},function(e,id) {
    if(e) cb(e)
    cb(null,id)
  })  
}


