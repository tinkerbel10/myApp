var express = require('express');
var router = express.Router();
var tokenizer = require("../util/jwt-tokenizer");
const jwt = require('jsonwebtoken');
var UserModel = require('../models/user');
var UserController = require('../controllers/UserController');

var AuthenticationController = require('../controllers/AuthenticationController');


module.exports = function(passport){


router.post('/signup',function(req, res, next) {
  passport.authenticate('signup',{ session: true },function(err, signup, info) {
    console.log("info--> " + JSON.stringify(signup));
    if (err) {
      return next(err);
    }
    if (! signup) {
      var objRegister = {
        message: "failed",
        result: "failed",
        resultMessage: "Username or Email is already Exists"
        }
    }else{
      var objRegister = {
          message: "success",
          result: "success",
          resultMessage: "Congratulations, You have successfully registered",
          userId: signup._id,
          firstName: signup.first_name,
          lastName: signup.last_name
      }
    }
    return res.send(objRegister);
  })(req, res, next);
 });


 router.get('/decode', tokenizer.verifyJwtToken, function(req, res, next) {
  jwt.verify(req.token, 'mySecretKey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
 });

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (! user) {
      return res.sendStatus(401);
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      //delete password
      user.password = '';
      var token = jwt.sign({user}, 'mySecretKey' , { expiresIn: '1h' });
      // var objLoginSuccess = {
      //   message : 'success',
      //   authorize : 'true',
      //   token : token,
      //   user
      // }
      var objLoginSuccess = {
        token : token
      }
      return res.send(objLoginSuccess);
    });
  })(req, res, next);
});

router.get('/me', function(req, res){
if(!req.user){
  var objMe = {message: "failed",result: "Please Login First"}
}else{
  console.log("THIS IS MEEE-> " + req.user);
  var objMe = {
    message: "success",
    currentUser:{
      id : req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email
    }
  }
}
  res.send(objMe);
});

router.get('/profile', function(req, res){
  if(req.user){
   objProfile = req.user;
    // objProfile = {
    //   message: "success",
    //   currentUser:{
    //     currentObjectId : req.user._id,
    //     first_name: req.user.first_name,
    //     last_name: req.user.last_name,
    //     email: req.user.email,
    //     contact_number: req.user.contact_number,
    //     userType: req.user.userType,
    //     carType: req.user.carType,
    //     driverPlateNumber: req.user.driverPlateNumber
    //   }
    // }
    // console.log('here');
  }else{
    objProfile = {message: "failed",result: "Please Login First"}
  }
  res.send(objProfile);
});

router.get('/get-profile', function(req, res){
  var userId = req.query.objectId;
  AuthenticationController.profile(userId, function(err, list){
    var user = list[0];
    res.send(user);
  });
});

router.post('/update-profile', function(req, res){
  var currentObjectId = req.body.currentObjectId;
  console.log("object id for update ------------->" + currentObjectId);
  var setFieldsForUpdate = {
      'first_name' : req.body.first_name,
      'last_name' : req.body.last_name,
      'contact_number' : req.body.contact_number
    }

  UserModel.update({'_id': currentObjectId},
  {$set: setFieldsForUpdate
  },function(err, result){
    if (err) {
      obj = {message: "failed",resultMessage: "Failed to update, Please make sure you completed the form"}
    }else{
      obj = {message: "success",resultMessage: "Congratulations, Your Profile is Updated!"}
    }
    console.log("this is obj" + JSON.stringify(obj));
    res.send(obj)
  });
});



router.post('/update-password/:currentObjectId', function(req, res){
  var currentObjectId = req.params.currentObjectId;
  var newPassword = req.body.password
  var hashPassword = AuthenticationController.makeHashPassword(newPassword);
  UserModel.update({'_id': currentObjectId},
  {$set: {
      password : hashPassword
    }
  },function(err, result){
    if(err){
      var objUpdatePassword = {
        message: "failed",
        resultMessage: "Failed to update, Please try again",
      }
      res.send("Failed to update your password. Please Try Again");
    }else{
      /*if(req.user){
        req.session.destroy();
      }*/
      var objUpdatePassword = {
        message: "success",
        resultMessage: "Your password is successfully updated",
      }
      // res.render("auth/forgot-redirect");
      res.send(objUpdatePassword);
    }

  });
});

router.get('/logout', function(req, res) {
  if(req.user){
    req.session.destroy();
    objLogout = {message: "success",resultMessage: "Congratulations, You have successfully logged out."}
  }else{
    objLogout = {message: "failed",resultMessage: "Failed to Logout! Make sure you're Logged in!"}
  }
  res.send(objLogout);
});

router.get('/all', function(req, res, next) {
  UserController.search({}, function(error, results){
    var response = {data: results};
    res.send(response);
  });
});

//get user by ID
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  UserController.view(id, function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});

//FOR UPDATING
router.post('/:id', function(req, res, next) {
  var data = req.body;
  var id = req.params.id;
  UserController.update(id, data ,function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});

//FOR DELLETING
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  UserController.delete(id, function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});
//module.exports = router;
	return router;
}
