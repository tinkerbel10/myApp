var express = require('express');
var router = express.Router();
var serviceTransactionController = require('../controllers/serviceTransactionController');
var serviceTransaction = require('../models/serviceTransaction');

router.get('/', function(req, res, next){
  serviceTransactionController.search({is_deleted: false}, function(err, result){
    var response = {data: result};
      res.send(response);
  });
});


//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  serviceTransactionController.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response))
  });
});


//RETRIEVE BY ID
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  serviceTransactionController.view(id, function(err, result){
    res.send(JSON.stringify(result));
  });
});

//DELETE
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var formData = {is_deleted: true};
  serviceTransactionController.delete(id, formData, function(err, result){
    res.send(result)
  });
});


router.post('/:id', function(req, res, next){
  var id = req.params.id;
  var formData = req.body;
  serviceTransactionController.update(id, formData, function(err, result){
    res.send(result)
  });
});

module.exports = router;
