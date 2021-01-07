const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = {
  get_comment_list: (req, res, next) => {
    Comment.find(req.query).exec((err, comments) => {
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
  },

  create_comment: [
    body('content', '`content` cannot be empty').trim().notEmpty().escape(),
    body('post', '`post` cannot be empty').trim().notEmpty().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json(errors.array());
      Post.findById(req.body.post, (err, post) => {
        if (err) return next(err);
        if (!post) return res.status(404).json({
          message: `Post ${req.body.post} Not Found`
        });
        const comment = new Comment({
          content: req.body.content,
          author: req.user._id,
          post: req.body.post
        });
        comment.save((err, comment) => {
          if (err) return next(err);
          res.status(201).json(comment);
        });
      });
    }
  ]
}
