var express = require('express');
var router = express.Router();

const Comment = require('../models/comment');

/* GET comments listing. */
router.get('/', function(req, res, next) {
  Comment.find((err, comments) => {
    if (err) return next(err);
    res.json({ comments: comments });
  })
});

module.exports = router;
