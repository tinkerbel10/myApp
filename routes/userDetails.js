var express = require('express');
var router = express.Router();
const serviceRequest = require('../models/service'); //MODel
// var serviceTransactionMethod = require('../controller/serviceTransactionController'); //controller


// router.get('/', function(req, res, next){
//   let userDetails = [];
//   serviceRequest.find(function(err, list){
//     if(list.length) {
//       list.forEach(async item => {
//         serviceTransactionMethod.find({requestId: item.id }, (err, result) => {
//           list.method = result.payment_method
//           // TODO implement async/await
//           userDetails.push(list);
//         });
//       });
//       res.send(userDetails);
//     } else {
//       res.send(list);
//     }
//   });
// });


router.get('/transaction-dashboard', (req, res, next) =>{
  let transactionArray = [];
  let { id } = req.query;
  serviceRequest.findOne({id:id}, (err, result) => {
    if(err){
      return res.send(500, {error_code:500, error_messege:err});
    }
    transactionArray.push(result.name)
    return res.send(200, {result:result})
  })
});

module.exports = router;
