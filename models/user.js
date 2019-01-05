// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
  //username: { type: String, required: true, unique: true },
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true},
  password: { type: String, required: true },
  first_name: String,
  last_name: String,
  birthdate: String,
  contact_number: String,
  userType: String,
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', userSchema);
module.exports = User;
