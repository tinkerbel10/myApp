var express = require('express');
var router = express.Router();
var roleController = require('../controllers/roleController');

router.get('/', function(req, res, next){
  roleController.search({is_deleted: false}, function(err, result){
    var response = {data: result};
      res.send(response);
  });
});

//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  roleController.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response))
  });
});


//RETRIEVE BY ID
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  roleController.view(id, function(err, result){
    res.send(JSON.stringify(result));
  });
});

//DELETE

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var formData = {is_deleted: true};
  roleController.delete(id, formData, function(err, result){
    res.send(result)
  });
});


router.post('/:id', function(req, res, next){
  var id = req.params.id;
  var formData = req.body;
  roleController.update(id, formData, function(err, result){
    res.send(result)
  });
});

module.exports = router;
