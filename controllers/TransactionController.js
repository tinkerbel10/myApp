var transaction = require('../models/transaction');
var mod = transaction;

var BaseCRUD = {
  save: function(obj, callback){
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(search, callback){
    transaction.find(function(err, list){
      callback(err, list);
    });
  },
  fetchAll: function(search, callback){
    transaction.find({}, function(err, list){
      callback(err, list);
    });
  },
  view: function(id, callback){
    transaction.findById(id, function(err, result){
      callback(err, result);
    })
  },
  delete: function(id, formData, callback){
    transaction.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  },
  update: function(id, formData, callback){
    transaction.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  }
};

module.exports = BaseCRUD;
