const createError = require('http-errors');

const Comment = require('../models/comment');

module.exports = {
  get_comment_list: (req, res, next) => {
    Comment.find({post: req.query.post}).exec((err, comments) => {
      if (err) return next(err);
      res.json({comments: comments});
    });
  },

  get_comment_detail: (req, res, next) => {
    Comment.findById(req.params.id).exec((err, comment) => {
      if (err) return next(err);
      if (!comment) return next(createError(404));
      res.json({
        comment: comment
      });
    });
  }
}
