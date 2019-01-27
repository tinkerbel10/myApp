var role = require('../models/role');
var mod = role;

var BaseCRUD = {
  save: function(obj, callback){
    var newObject = new mod(obj);
    newObject.save(function (err, singleObject) {
        callback(err, singleObject);
    });
  },
  search: function(search, callback){
    role.find({is_deleted: false}, function(err, list){
      callback(err, list);
    });
  },
  fetchAll: function(search, callback){
    role.find({}, function(err, list){
      callback(err, list);
    });
  },
  view: function(id, callback){
    role.findById(id, function(err, result){
      callback(err, result);
    })
  },
  delete: function(id, formData, callback){
    role.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  },
  update: function(id, formData, callback){
    role.findByIdAndUpdate(id, {$set: formData}, function(err, result){
      callback(err, result);
    });
  }
};

module.exports = BaseCRUD;
