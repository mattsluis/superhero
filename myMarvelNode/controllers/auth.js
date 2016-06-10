var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
});

router.post('/login', function(req, res) {
  // proving we get the userName and password
  var user = req.body.userName;
  var pass = req.body.password;
  console.log("credentials", user, pass);
  db.user.authenticate(user, pass, function(err, user) {
    // user successfully logged in.
    if (err) {
      res.send({error: err, bonus: "bonus"});
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      req.flash('user and/or password invalid');
    }
  });
});


router.get('/signup', function(req, res) {
  res.render('signup', {alerts: req.flash()});
});


router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {
      userName: req.body.userName,
    },
    defaults: {
      password: req.body.password
    }
  }).spread(function(user, isNew) {
    if (isNew) {
      res.redirect('/landing-pad');
    } else {
      req.flash('danger', 'userName already taken. Please choose another.')
      res.redirect('/auth/signup');
    }
  }).catch(function(err) {
    req.flash('danger', err.message);
    res.redirect('/auth/signup')
  });
});

module.exports = router;
