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


// app.get('/results', function(req,res) {
//   var query = req.query.q;
//   // console.log(query);
//   marvel.characters.findByName(query)
//     .then(console.log)
//     .fail(console.log('error'))
//     .done(console.log('success'));
// });
// app.get('/results', function(req,res,err) {
//   var query = req.query.q;
//   marvel.characters.findByName(query, function(err,res,body) {
//     var data = JSON.parse(body);
//     if (!err && response.statusCode === 200 && data.results) {
//       res.render('searchResult', {legos: data.results, q: query});
//     } else {
//       res.render('error');
//     }
//   })
// });
// var data = JSON.parse(body);
//     if (!err && response.statusCode === 200 && data.results) {
//       res.render('searchResult', {legos: data.results, q: query});
//     } else {
//       res.render('error');
//     }
app.get('/results', function(req,res) {
  var query = req.query.q;
  console.log(query)
  marvel.characters.findByName(query, function(err, response, body){
    var data = JSON.stringify(body)
if (!err && response.statusCode === 200 && data.results) {
  res.render('results', {heros: data.results, q: query});
} else {
  res.render('error');
}
})
})



var port=3000;
app.listen(process.env.PORT || port);
