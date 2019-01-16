var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var requestSchema = new Schema({
  requestId: { type: String, required: true },
  payment_method: { type: String},
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});


var requestTransMethod = mongoose.model('requestTransMethod', requestSchema);
module.exports = requestTransMethod;
