var userReuest = require('../models/userRequest');
var mod = userReuest;

var BaseCRUD = {
  save: function(obj, callback){
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(search, callback){
    userReuest.find(function(err, list){
      callback(err, list);
    });
  },
  fetchAll: function(search, callback){
    userReuest.find({}, function(err, list){
      callback(err, list);
    });
  },
  view: function(id, callback){
    userReuest.findById(id, function(err, result){
      callback(err, result);
    })
  },
  delete: function(id, formData, callback){
    userReuest.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  },
  update: function(id, formData, callback){
    userReuest.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  }
};

module.exports = BaseCRUD;
