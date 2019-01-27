var user = require('../models/user');
var mod = user;

var BaseCRUD = {
  save: function(obj, callback){
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(search, callback){
    user.find(search, function(err, list){
      callback(err, list);
    });
  },
  fetchAll: function(search, callback){
    user.find({}, function(err, list){
      callback(err, list);
    });
  },
  view: function(id, callback){
    user.findById(id, function(err, result){
      callback(err, result);
    })
  },
  delete: function(id, formData, callback){
    user.findByIdAndUpdate(id, {$set: {is_deleted: true}}, function(err, result){
      callback(err, result);
    });
  },
  update: function(id, formData, callback){
    user.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  }
};

module.exports = BaseCRUD;
