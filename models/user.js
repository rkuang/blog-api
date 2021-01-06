const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

UserSchema.virtual('fullname').get(function() {
  return this.firstname + " " + this.lastname;
});

UserSchema.virtual('url').get(function() {
  return "/users/" + this._id;
});

UserSchema.pre('save', function(next) {
  const hash = this.password;

  this.password = hash;
  next();
});

UserSchema.methods.verifyPassword = function(password) {
  return password === this.password;
};

module.exports = mongoose.model('User', UserSchema);
