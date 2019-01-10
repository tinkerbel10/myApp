var userRequest = require('../models/userRequest');
var mod = userRequest;

var BaseCRUD = {
  save: function(obj, callback){
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(search, callback){
    userRequest.find(function(err, list){
      callback(err, list);
    });
  },
  fetchAll: function(search, callback){
    userRequest.find({}, function(err, list){
      callback(err, list);
    });
  },
  view: function(id, callback){
    userRequest.findById(id, function(err, result){
      callback(err, result);
    })
  },
  delete: function(id, formData, callback){
    userRequest.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  },
  update: function(id, formData, callback){
    userRequest.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  }
};

module.exports = BaseCRUD;
