const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user || !user.verifyPassword(password))
      return done(null, false, { message: 'Invalid credentials' });
    return done(null, user, { message: 'User logged in' });
  })
}))

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) return done(err);
    return done(null, payload);
  })
}))

module.exports = passport;
