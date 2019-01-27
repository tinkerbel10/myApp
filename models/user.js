// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true},
  password: { type: String},
  first_name:  { type: String},
  last_name: { type: String},
  contact_number: { type: String},
  role_id: { type: String},
  role_name: { type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false},
  is_verified:{type: Boolean, default: false}
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
