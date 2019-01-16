var express = require('express');
var router = express.Router();
var requestController = require('../controllers/RequestController');
var request = require('../models/request');

router.get('/', function(req, res, next){
  requestController.search({}, function(err, result){
    var response = {data: result};
      res.send(response);
  });
});



//RETRIEVE SPECIFIC DATA
// router.post('/basic-search', function(req, res, next) {
//   var data = req.body;
//   console.log("DATA FOR CART SEARCH---> " + JSON.stringify(data));
//   cart.find(data, function(err, result) {
//       objResponse = {result: "success", data: result}
//       // console.log("DATA FOR SEARCH--------------> " + JSON.stringify(result))
//     res.send(objResponse)
//   }).sort({createdAt:-1});
// });



//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  requestController.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response))
  });
});


//RETRIEVE BY ID
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  requestController.view(id, function(err, result){
    // console.log("FORM DATAqqq---> " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

//DELETE

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var formData = {is_deleted: true};
  requestController.delete(id, formData, function(err, result){
    // console.log("formData--->" + JSON.stringify(result))
    res.send(result)
  });
});


router.post('/:id', function(req, res, next){
  var id = req.params.id;
  var formData = req.body;
  requestController.update(id, formData, function(err, result){
    // console.log("formData--->" + JSON.stringify(result))
    res.send(result)
  });
});




module.exports = router;
