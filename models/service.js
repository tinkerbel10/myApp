var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var serviceSchema = new Schema({
  name: {type: String},
  description: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});


var service = mongoose.model('Service', serviceSchema);
module.exports = service;
