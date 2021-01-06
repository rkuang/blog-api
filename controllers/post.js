const createError = require('http-errors');

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
  }
}
