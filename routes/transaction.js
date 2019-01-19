var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transactionController');

router.get('/', function(req, res, next){
  transactionController.search({is_deleted: false}, function(err, result){
    var response = {data: result};
      res.send(response);
  });
});

router.post('/', function(req, res, next) {
  var data = req.body;
  transactionController.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response))
  });
});


//RETRIEVE BY ID
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  transactionController.view(id, function(err, result){
    res.send(JSON.stringify(result));
  });
});

//DELETE

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var formData = {is_deleted: true};
  transactionController.delete(id, formData, function(err, result){
    res.send(result)
  });
});


router.post('/:id', function(req, res, next){
  var id = req.params.id;
  var formData = req.body;
  transactionController.update(id, formData, function(err, result){
    res.send(result)
  });
});




module.exports = router;
