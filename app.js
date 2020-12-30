require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var app = express();

// mongoose setup
const mongoose = require('mongoose');

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log('connection error: ', err);
  else console.log('connected to mongodb');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var routes = require('./routes');

app.use('/users', routes.users);
app.use('/posts', routes.posts);
app.use('/comments', routes.comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError &&
      err.kind === 'ObjectId' &&
      err.path === '_id' &&
      !mongoose.isValidObjectId(err.value)) {
    res.status(404);
    res.json({
      message: 'Object not found.'
    });
  } else {
    res.status(err.status || 500);
    res.send(err);
  }
});

module.exports = app;
