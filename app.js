var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  User = require('./models/user'),
  LocalStrategy = require('passport-local'),
  Worker = require('./models/worker'),
  Worker1 = require('./models/worker1'),
  Comment = require('./models/comment'),
  passportLocalMongoose = require('passport-local-mongoose'),
  app = express();
mongoose.connect('mongodb://localhost/auth_demo_app16');
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
  problem: String,
  category: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

var feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String
});
var Feedback = mongoose.model('Feedback', feedbackSchema);
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
  var category = req.body.category;
  var newCampground = {
    name: name,
    phone: phone,
    description: desc,
    problem: problem,
    mecname: mecname,
    category: category
  };
  // Create a new campground and save to DB

  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/success');
    }
  });
});
//CREATE - add new feedback to DB
app.post('/feedback', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var email = req.body.email;
  var desc = req.body.description;

  var newFeedback = {
    name: name,
    email: email,
    description: desc
  };
  // Create a new campground and save to DB
  Feedback.create(newFeedback, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/test');
    }
  });
});
app.get('/repcare/feedback', function(req, res) {
  // Get all campgrounds from DB
  Feedback.find({}, function(err, allFeedback) {
    if (err) {
      console.log(err);
    } else {
      res.render('feedback', { feedback: allFeedback });
    }
  });
});
//============
// ROUTES
//============

app.get('/', function(req, res) {
  res.render('landing.ejs');
});

app.get('/secret', function(req, res) {
  res.render('req1.ejs');
});
app.get('/secret/:id', isLoggedIn, function(req, res) {
  Worker.findById(req.params.id, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('req', { worker: allCampgrounds });
    }
  });
});

app.get('/success', isLoggedIn, function(req, res) {
  res.render('success.ejs');
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
      } else {
        passport.authenticate('local')(req, res, function() {
          res.redirect('/repcare');
        });
      }
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
  res.redirect('/repcare');
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

// //Service routes
// app.get('/Service', function(req, res) {
//   res.render('Service');
// });

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

//Write to us routes
app.get('/Test', function(req, res) {
  res.render('Test');
});
//Testimonials routes
app.get('/testimonials', function(req, res) {
  res.render('testimonials');
});
//CREATE - add new campground to DB
app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var address = req.body.address;
  var phone = req.body.phone;
  var email = req.body.email;
  var newCampground = {
    name: name,
    image: image,
    address: address,
    phone: phone,
    email: email
  };
  // Create a new campground and save to DB
  Worker.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/Service');
    }
  });
});
//NEW - show form to create new campground
app.get('/worker/new', function(req, res) {
  res.render('new');
});

//INDEX - show all worker
app.get('/Service', function(req, res) {
  // Get all worker from DB
  Worker.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('Service', { worker: allCampgrounds });
    }
  });
});

// SHOW - shows more info about one campground
app.get('/worker/:id', function(req, res) {
  //find the campground with provided ID
  Worker.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show template with that campground
        res.render('show', { worker: foundCampground });
      }
    });
});

// ====================
// COMMENTS ROUTES
// ====================

app.get('/worker/:id/comments/new', function(req, res) {
  // find campground by id
  Worker.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render('new1', { worker: campground });
    }
  });
});

app.post('/worker/:id/comments', function(req, res) {
  //lookup campground using ID
  Worker.findById(req.params.id, function(err, worker) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          // worker.comments.push(comment);
          // worker.save();
          res.redirect('/worker/' + worker._id);
        }
      });
    }
  });
  //create new comment
  //connect new comment to campground
  //redirect campground show page
});
app.get('/comment', function(req, res) {
  // Get all campgrounds from DB
  Comment.find({}, function(err, allFeedback) {
    if (err) {
      console.log(err);
    } else {
      res.render('newcomment', { comment: allFeedback });
    }
  });
});

//listening to port
app.listen(port, function() {
  console.log('Server is started....');
});
