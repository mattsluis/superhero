//external dependencies
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');
var request = require('request');

//local dependencies
var app = express();
var authCtrl = require('./controllers/auth');
var searchCtrl = require('./controllers/auth');
var db = require('./models'); //every model represents a table in our table base


//marvel api wrapper
var apiMarvel = require('marvel-api');
var marvel = apiMarvel.createClient({
  publicKey: process.env.MARVEL_KEY_PUBLIC,
  privateKey: process.env.MARVEL_KEY_PRIVATE
});

app.set('view engine', 'ejs');
app.use(ejsLayouts);


app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));
app.use(session({
  secret: 'ShuperShecretMarvelEncryption',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    })
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.use(authCtrl);
// app.use(searchCtrl);

app.get('/', function(req, res) {
  res.render('index');
});


app.get('/results', function(req,res) {
  var query = req.query.q;

  marvel.characters.findByName(query)
    .fail(function() {
      console.log("error");
    })
    .done(function(response) {
      console.log(response.data)
      console.log(response.data.name)
      res.send('results', {heros: response.data, q: query})
    });
});

// WORKS!!! NO AJAX!!
// app.get('/results', function(req,res) {
//   var query = req.query.q;
//
//   marvel.characters.findByName(query)
//     .fail(function() {
//       console.log("error");
//     })
//     .done(function(response) {
//       console.log(response.data)
//       console.log(response.data.name)
//       // res.render('results', {heros: response.data, q: query})
//     });
// });




var port=3000;
app.listen(process.env.PORT || port);
