var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var roleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});


var Role = mongoose.model('Role', roleSchema);
module.exports = Role;
