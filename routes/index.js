const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// get /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// get /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

// get /register
router.get('/register', function(req, res, next) {
  return res.render('register', { title: 'Register' });
});

// post/register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.password &&
    req.body.confirmPassword) {

      // handle matching passwords
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      // create object with form input
      const userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };
      // use schema's 'create' method to insert document into mongodb
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });

      // handle fields left blank
    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

// get /login
router.get('/login', function(req, res, next) {
  return res.render('login', { title: 'Login' });
});

// post /Login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('Email & Password are required.');
    err.status = 401;
    return next(err);
  }
});

// get /profile
router.get('/profile', function(req, res, next) {
  if (! req.session.userId) {
    const err = new Error("You need to login to view this page");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
      .exec(function(error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render('profile', {title: 'Profile', name: user.name});
        }
      });
});

module.exports = router;
