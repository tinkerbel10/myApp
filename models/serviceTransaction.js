var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceTransactionSchema = new Schema({
  name: String,
  service_id: { type: String, required: true},
  transaction_id: { type: String},
  customerName: { type: String, required: true},
  employeeName: { type: String, required: true},
  description: { type: String},
  status: {type: String},
  cost: {type: String},
  notes: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});

var ServiceTransaction = mongoose.model('ServiceTransaction', serviceTransactionSchema);
module.exports = ServiceTransaction;
