var express = require('express');
var router = express.Router();

const Post = require('../models/post');

/* GET posts listing. */
router.get('/', function(req, res, next) {
  Post.find((err, posts) => {
    if (err) return next(err);
    res.json({ posts: posts} );
  });
});

module.exports = router;
