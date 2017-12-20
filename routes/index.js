const express = require('express');
const router = express.Router();

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
  return res.render('register', { title: 'Register'});
});

// get /login
router.get('/login', function(req, res, next) {
  return res.render('login', { title: 'Login' });
});

// post /Login
router.post('/login', function(req, res, next) {
  return res.render('login', { title: 'Login' });
});

module.exports = router;
