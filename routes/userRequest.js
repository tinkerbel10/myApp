var express = require('express');
var router = express.Router();
var userRequestController = require('../controllers/userRequestController');
var cart = require('../models/userRequest');

router.get('/', function(req, res, next){
  userRequestController.search({}, function(err, result){
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
  userRequestController.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response))
  });
});


//RETRIEVE BY ID
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  userRequestController.view(id, function(err, result){
    // console.log("FORM DATAqqq---> " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

//DELETE

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var formData = {is_deleted: true};
  userRequestController.delete(id, formData, function(err, result){
    // console.log("formData--->" + JSON.stringify(result))
    res.send(result)
  });
});


router.post('/:id', function(req, res, next){
  var id = req.params.id;
  var formData = req.body;
  userRequestController.update(id, formData, function(err, result){
    // console.log("formData--->" + JSON.stringify(result))
    res.send(result)
  });
});




module.exports = router;
