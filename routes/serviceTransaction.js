var express = require('express');
var router = express.Router();
var serviceTransactionController = require('../controllers/serviceTransactionController');
var ServiceController = require('../controllers/ServiceController');
var serviceTransaction = require('../models/serviceTransaction');
const service = require('../models/service');
router.get('/', function(req, res, next){
  serviceTransactionController.search({is_deleted: false}, function(err, result){
    var response = {data: result};
      res.send(response);
  });
});
router.get('/transaction-detailes', function(req, res, next){
  let arrayResult = [];
  let transItemId;
  let transItemName;
  let ctr = 0;
  serviceTransactionController.search({}, function(err, results){
    async function getService(data){
     var result = await service.findById(data)
     return result;
    }
  
    results.forEach(element => {
   
      getService(element.service_id).then(getServiceResult=>{
        ctr++
        let answer = {
          id:element._id,
          description:element.name,
          status:element.status,
          service_id:  getServiceResult._id,
          service_name:getServiceResult.name
        }
        arrayResult.push(answer);
      console.log("asdasdsa "+JSON.stringify(arrayResult))
      
      if(ctr === results.length){
        return res.send(200, {msg:arrayResult})
      }
      })

    });

   
 
  })

 
})

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
