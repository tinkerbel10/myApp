var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRequestSchema = new Schema({
  name: String,
  description: { type: String, required: true},
  status: { type: String, required: true },
  transaction_status: String,
  user_id: String,
  last_name: String,
  first_name: String,
  user_role: String,
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});

var UserRequest = mongoose.model('UserRequest', userRequestSchema);
module.exports = UserRequest;
