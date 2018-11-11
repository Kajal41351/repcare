var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  User = require('./models/user'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  app = express();
mongoose.connect('mongodb://localhost/auth_demo_app');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'Rusty is the best and cutest dog in the world',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  phone: String,
  description: String,
  mecname: String,
  problem: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/repcare/request', function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('data', { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - add new campground to DB
app.post('/request', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var phone = req.body.phone;
  var desc = req.body.description;
  var problem = req.body.problem;
  var mecname = req.body.mecname;
  var newCampground = {
    name: name,
    phone: phone,
    description: desc,
    problem: problem,
    mecname: mecname
  };
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/repcare');
    }
  });
});

//============
// ROUTES
//============

app.get('/', function(req, res) {
  res.render('landing.ejs');
});

app.get('/secret', isLoggedIn, function(req, res) {
  res.render('req.ejs');
});

// Auth Routes

//handling user sign up
app.post('/signup', function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render('signup');
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/repcare');
      });
    }
  );
});

// LOGIN ROUTES
//render login form
app.get('/login', function(req, res) {
  res.render('login');
});
app.get('/login1', function(req, res) {
  res.render('login1');
});
//login logic
//middleware
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/repcare',
    failureRedirect: '/login'
  }),
  function(req, res) {}
);
app.post(
  '/login1',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  }),
  function(req, res) {}
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login1');
}

//routes

//landing routes

app.get('/', function(req, res) {
  res.render('landing');
});

//intro routes

app.get('/repcare', function(req, res) {
  res.render('intro');
});

//home routes
app.get('/home', function(req, res) {
  res.render('home');
});

//Service routes
app.get('/Service', function(req, res) {
  res.render('Service');
});

//Gallery routes
app.get('/Gallery', function(req, res) {
  res.render('Gallery');
});

//Login routes
app.get('/Login', function(req, res) {
  res.render('Login');
});
//Signup routes
app.get('/Signup', function(req, res) {
  res.render('Signup');
});

//Testimonials routes
app.get('/Test', function(req, res) {
  res.render('Test');
});

//listening to port
app.listen(port, function() {
  console.log('Server is started....');
});
