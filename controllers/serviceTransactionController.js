var serviceTransaction = require('../models/serviceTransaction');
var mod = serviceTransaction;

var BaseCRUD = {
  save: function(obj, callback){
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(search, callback){
    serviceTransaction.find({is_deleted: false}, function(err, list){
      callback(err, list);
    });
  },
  fetchAll: function(search, callback){
    serviceTransaction.find({}, function(err, list){
      console.log("asdasd"+JSON.stringify(list))
      callback(err, list);
    });
  },
  view: function(id, callback){
    serviceTransaction.findById(id, function(err, result){
      callback(err, result);
    })
  },
  delete: function(id, formData, callback){
    serviceTransaction.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  },
  update: function(id, formData, callback){
    serviceTransaction.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  }
};

module.exports = BaseCRUD;
