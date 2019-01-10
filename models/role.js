var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var roleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String},
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});


var Role = mongoose.model('Role', roleSchema);
module.exports = Role;
