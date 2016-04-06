//vendor libraryes
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//models
var User = require('./models/user.js');
//servises
var jwt = require('./services/jwt.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done){
  done(null, user.id);
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

var strategyOptions = {
  usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {
  var searchUser = {
    email: email
  };
  User.findOne(searchUser, function(err, user) {
    if(err) { return done(err) };
    if(!user) {
      return done(null, false, {
        message: 'Wrong email'
      })
    }
    user.comparePasswords(password, function(err, isMuch){
      if(err) { return done(err) };
      if(!isMuch) {
        return done(null, false, {
          message: 'Wrong password'
          });
      };
      return done(null, user);
    })
  })
});

var registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {
  var searchUser = {
    email: email
  };
  User.findOne(searchUser, function(err, user) {
    if(err) { return done(err) };
    if(user) {
      return done(null, false, {
        message: 'email already exists'
      })
    };
    var newUser = new User({
      email: email,
      password: password
    });
    newUser.save(function(err){
      done(null, newUser);
    });
  });
});

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/login', passport.authenticate('local-login'), function (req, res) {
  require('./controllers/auth.js').createSendToken(jwt, req.user, res);
});

app.post('/register', passport.authenticate('local-register'), function (req, res) {
  require('./controllers/auth.js').createSendToken(jwt, req.user, res);
});

app.get('/jobs', function (req, res) {
  require('./controllers/jobs.js').getJobs(jwt, req, res);
});

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function() {
  console.log('api is listening on', server.address().port);
});
