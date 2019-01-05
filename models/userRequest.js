var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRequestSchema = new Schema({

  description: { type: String, required: true},
  status: { type: String, required: true },
  transaction_status: String,
  userId: String,
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});

var UserRequest = mongoose.model('UserRequest', userRequestSchema);
module.exports = UserRequest;
