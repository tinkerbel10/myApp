var express = require('express');
var router = express.Router();
var userRequest = require('../models/userRequest');
var requestTransactionMethod = require('../models/requestTransMethod');


router.get('/', function(req, res, next){
  let userDetails = [];
  userRequest.find(function(err, list){
    if(list.length) {
      list.forEach(async item => {
        requestTransactionMethod.find({requestId: item.id }, (err, result) => {
          list.method = result.payment_method
          // TODO implement async/await
          userDetails.push(list);
        });
      });
      res.send(userDetails);
    } else {
      res.send(list);
    }
  });
});


module.exports = router;
