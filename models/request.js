var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var requestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String},
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});


var Request = mongoose.model('Request', requestSchema);
module.exports = Request;
