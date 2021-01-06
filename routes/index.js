var express = require('express');
var router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/token', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    const token = jwt.sign({
      _id: user._id,
      username: user.username
    }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.json({ token: token });
  })(req, res, next);
})

const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
module.exports = {
  router,
  users,
  posts,
  comments
};
