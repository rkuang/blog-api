const createError = require('http-errors');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

module.exports = {
  get_post_list: (req, res, next) => {
    Post.find().exec((err, posts) => {
      if (err) return next(err);
      res.json({posts: posts});
    });
  },

  get_post_detail: (req, res, next) => {
    Post.findById(req.params.id).exec((err, post) => {
      if (err) return next(err);
      if (!post) return next(createError(404));
      res.json({
        post: post
      });
    });
  },

  create_post: [
    body('title', '`title` cannot be empty').trim().notEmpty().escape(),
    body('content', '`content` cannot be empty').trim().notEmpty().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.status(400).json(errors.array());
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        published: req.body.published
      });
      post.save((err, post) => {
        if (err) return next(err);
        res.status(201).json(post);
      })
    }
  ]
}
