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
  return res.render('contact', { title: 'Contact' })
})

module.exports = router;
