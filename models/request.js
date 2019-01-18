var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var requestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});


var Request = mongoose.model('Request', requestSchema);
module.exports = Request;
