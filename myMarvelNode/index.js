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
    db.user.findById(req.session.userId)
    .then(function(user) {
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

app.get('/', function(req, res) {
  db.scenario.findAll()
  .then(function(scenarios) {
    res.render('index', {scenarios: scenarios})
  });
});

app.get('/landing-pad', function(req,res) {
  res.render('landing-pad')
});

app.get('/search', function(req, res) {
  res.render('search');
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

// app.get('/fight', function(req,res) {
//   res.render('fight', {
//     scenario: req.body
//
//   })
//
// });

// app.get('/fight/:scenario_id', function(req,res){
//
// })
//


app.get('/fight/:id', function(req,res) {
    var scenId = req.params.id;
    console.log(scenId)
  db.scenario.findById(scenId)
  .then(function(scenario){
    console.log(scenario)
    res.render('fight', {
      'scenarios': scenario
    })
  })
});

app.get('/scenarios-user', function(req, res) {
  console.log(req.currentUser.id)
  db.scenario.findAll({where:
    {userId: req.currentUser.id}
  }).then(function(scenario) {
      res.render('scenarios-user',
      {scenarios: JSON.stringify(scenario)}
    )
  });
});

app.post('/scenarios-user', function(req, res) {
  var addScenario = req.body;
  console.log('Incoming Fight!', addScenario);
  db.scenario.create(addScenario)
  .then(function(scenario) {
    console.log("adding collection to users");
    console.log(req.currentUser);
    if (req.currentUser) {
      req.currentUser.addScenario(scenario);
      res.status(200).send('Added to myScenarios');
    } else {
      res.status(500).send("Log In");
      res.redirect('/');
    }
  });
});

app.delete('/scenarios-user', function(req,res) {
  var deleteId = req.body.id;
  console.log(deleteId);
  db.scenario.find({where:
    {id: deleteId}
  })
  .then(function(scenario) {
    scenario.destroy()
    .then(function() {
      console.log("Destroyed");
      res.sendStatus(200);
    });
  });
});


var port=3000;
app.listen(process.env.PORT || port);
