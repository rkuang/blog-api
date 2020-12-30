var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().select('-password').exec((err, users) => {
    if (err) return next(err);
    res.json({users: users});
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id).select('-password').exec((err, user) => {
    if (err) return next(err);
    if (!user) return next(createError(404));
    res.json({
      user: user
    });
  });
});

module.exports = router;
