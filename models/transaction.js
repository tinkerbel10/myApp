var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var transactionSchema = new Schema({
  name: { type: String},
  payment_method: { type: String},
  description: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});


var transaction = mongoose.model('Transaction', transactionSchema);
module.exports = transaction;
