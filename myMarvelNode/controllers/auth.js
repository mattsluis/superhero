var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
});

router.post('/login', function(req, res) {
  // proving we get the username and password
  var user = req.body.username;
  var pass = req.body.password;
  db.user.authenticate(user, pass, function(err, user) {
    // user successfully logged in.
    if (err) {
      res.send(err);
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/landing-pad');
    } else {
      res.send('user and/or password invalid');
    }
  });
});


router.get('/signup', function(req, res) {
  res.render('signup', {alerts: req.flash()});
});


router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {
      username: req.body.username,
    },
    defaults: {
      password: req.body.password
    }
  }).spread(function(user, isNew) {
    if (isNew) {
      res.redirect('/landing-pad');
    } else {
      req.flash('danger', 'Username already taken. Please choose another.')
      res.redirect('/auth/signup');
    }
  }).catch(function(err) {
    req.flash('danger', err.message);
    res.redirect('/auth/signup')
  });
});

module.exports = router;
