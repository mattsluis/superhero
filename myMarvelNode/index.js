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


app.use(bodyParser.urlencoded({ extended: false }))

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

app.use('/auth' ,authCtrl);
// app.use(searchCtrl);

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/search', function(req, res) {
  res.render('search', {heroes: []});
});



app.post('/search', function(req,res) {
  var query = req.body.query;
  console.log(query)

  marvel.characters.findByName(query)
    .fail(function() {
      console.log("error");
    })
    .done(function(response) {
      console.log(response.data)

      res.send({heroes: response.data})
    });
});

app.get('/landing-pad', function(req,res) {
  res.render('landing-pad')
});
app.get('/scenarios-user', function(req,res) {
  res.render('scenarios-user')
});

app.post('/scenarios-user', function(req, res) {
  var addScenario = req.body;
  console.log(addScenario);
  db.scenario.create(addScenario)
  .then(function(scenario) {
    console.log("adding collection to users");
    console.log(req.currentUser);
    if (req.currentUser) {
      req.currentUser.addScenario(scenario);
      res.status(200).send('Added to Collection');
    } else {
      res.status(500).send("Please Log In");
      res.redirect('/');
    }
  });
});

// post collection
// app.post('/collection', function(req, res) {
//   var addToCollection = req.body;
//   console.log("saving collection");
//   console.log(addToCollection);
//   console.log("creating collection");
//   db.collection.create(addToCollection).then(function(collection) {
//     console.log("adding collection to users");
//     console.log(req.currentUser);
//     if (req.currentUser) {
//       req.currentUser.addCollection(collection);
//       res.status(200).send('Added to Collection');
//     } else {
//       res.status(500).send("Please Log In");
//       res.redirect('/');
//     }
//   });
// });

//
// no ajax query
// app.get('/results', function(req,res) {
//   var query = req.query.q;
//
//   marvel.characters.findByName(query)
//     .fail(function() {
//       console.log("error");
//     })
//     .done(function(response) {
//       console.log(response.data)
//
//       res.render('results', {heroes: response.data, q: query})
//     });
// });
//



var port=3000;
app.listen(process.env.PORT || port);
