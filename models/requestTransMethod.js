var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var requestSchema = new Schema({
  requestId: { type: String, required: true },
  payment_method: { type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});


var requestTransMethod = mongoose.model('requestTransMethod', requestSchema);
module.exports = requestTransMethod;
