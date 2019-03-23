var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceTransactionSchema = new Schema({
  service_name: { type: String},
  service_id: { type: String},
  pay_type: { type: String},
  customer_id: { type: String},
  customer_name: {type: String},
  employee_id: { type: String},
  employee_name: {type: String},
  description: { type: String},
  status: {type: String},
  materials: {type: String},
  theoretical_cost: {type: String},
  actual_cost: {type: String},
  service_fee: {type: String},
  notes: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  is_deleted: {type:Boolean, default:false}
});

var ServiceTransaction = mongoose.model('ServiceTransaction', serviceTransactionSchema);
module.exports = ServiceTransaction;
