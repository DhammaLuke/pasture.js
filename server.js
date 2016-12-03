// initialize express
var express = require('express');
var app = express();
// update all requirements
var bodyParser = require('body-parser');
// initialize ORM
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
// allow cows to graze in teh file pasture
var Cow = require('./models/cow');

// configure bodyParser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port
var port = 1337;

// create router
var router = express.Router();

// register routes to /api
app.use('/api', router);

// middleware to log all reqs
router.use(function(req, res, next) {
  // logloglog
  console.log('Mooooo!');
  // continue to next routes
  next();
});

// test router & route for root
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the pasture!' });
});


// routes for /cows
router.route('/cows')
  // add a cow
  .post(function(req, res) {
    var cow = new Cow();
    cow.name = req.body.name;
    cow.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Another moo for you!' });
    });
  })
  // get a cow
  .get(function(req, res) {
    Cow.find(function(err, cows) {
      if (err) {
        res.send(err);
      }
      res.json(cows);
    })
  });

// routes for a specific cow
router.route('/cows/:cow_id')
  // get specific cow
  .get(function(req, res) {
    Cow.findById(req.params.cow_id, function(err, cow) {
      if (err) {
        res.send(err);
      }
      res.json(cow);
    });
  })
  // update specific cow
  .put(function(req, res) {
    // find specific cow
    Cow.findById(req.params.cow_id, function(err, cow) {
      if (err) {
        res.send(err);
      }
      // update cow info
      cow.name = req.body.name;
      // save teh cow
      cow.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Oh youz a fancy cow now!'});
      });
    });
  })
  // delete specific cow
  .delete(function(req, res) {
    Cow.remove({
      _id: req.params.cow_id
    }, function(err, cow) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "The Cow has been slaughtered... R.I.P Cow :'("});
    });
  });

// start server
app.listen(port);
console.log("You're now grazing on port " + port);
