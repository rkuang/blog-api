const createError = require('http-errors');

const User = require('../models/user');

module.exports = {
  get_user_list: (req, res, next) => {
    User.find().select('-password').exec((err, users) => {
      if (err) return next(err);
      res.json({users: users});
    });
  },

  get_user_detail: (req, res, next) => {
    User.findById(req.params.id).select('-password').exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(createError(404));
      res.json({
        user: user
      });
    });
  }
}
