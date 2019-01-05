var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var tokenizer = require("../util/jwt-tokenizer");
var UserModel = require('../models/user');
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/ipostmo-auth/login');
}
var currentProfileGlobal = {}
module.exports = function(passport){
var AuthenticationController = require('../controllers/AuthenticationController');
router.get('/signup', function(req, res){
		res.render('auth/signup');
});

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
          resultMessage: "Congratulations, You have successfully registered to Autozon",
          userId: signup._id,
          firstName: signup.first_name,
          lastName: signup.last_name
      }
    }
    return res.send(objRegister);
  })(req, res, next);
 });


 router.get('/signup-portal', function(req, res){
  res.render('auth/signupPortal');
});

 router.post('/signup-portal',function(req, res, next) {
  passport.authenticate('signupPortal',{ session: true },function(err, signup, info) {
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
          resultMessage: "Congratulations, New portal user had successfully registered to Autozon",
          userId: signup._id,
          retailer_id: signup.retailer_id,
          retailer_name: signup.retailer_name
      }
    }
    return res.send(objRegister);
  })(req, res, next);
 });



 router.get('/token', function(req, res) {
   var user = {username: "akousername", fullname: "akofullname"};
   var token = tokenizer.sign(user);
   res.send(token);
 });

 router.get('/decode', tokenizer.verify, function(req, res, next) {
   res.send(JSON.stringify(req.decoded));
 });

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', function(req, res, next) {
  console.log("USER FIELD--> " + JSON.stringify(req.body))
  passport.authenticate('login', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (! user) {
      var objLoginFailed = {
        message : 'failed',
        authorize : 'false'
      }
      return res.send(objLoginFailed);
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      var token = tokenizer.sign(user);
      var objLoginSuccess = {
        message : 'success',
        authorize : 'true',
        token : token,
        user
      }
      return res.send(objLoginSuccess);
    });
  })(req, res, next);
});

router.get('/login-portal', function(req, res) {
  res.render('auth/loginPortal');
});

router.post('/login-portal', function(req, res, next) {
  passport.authenticate('loginPortal', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (! user) {
      var objLoginFailed = {
        message : 'failed',
        authorize : 'false'
      }
      return res.send(objLoginFailed);
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      var token = tokenizer.sign(user);
      var objLoginSuccess = {
        message : 'success',
        authorize : 'true',
        token : token,
        user
      }
      return res.send(objLoginSuccess);
    });
  })(req, res, next);
});

//var tokenUser = tokenizer.verify;
//var currentObjectId = "2rOrhGKkY3";
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
    objProfile = {
      message: "success",
      currentUser:{
        currentObjectId : req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        contact_number: req.user.contact_number,
        userType: req.user.userType,
        carType: req.user.carType,
        driverPlateNumber: req.user.driverPlateNumber
      }
    }
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
      'contact_number' : req.body.contact_number,
      'shipping_province_1' : req.body.shipping_province_1,
      'shipping_municipality_1' : req.body.shipping_municipality_1,
      'shipping_city_1' : req.body.shipping_city_1,
      'shipping_other_notes_1' : req.body.shipping_other_notes_1,
      'shipping_province_2' : req.body.shipping_province_2,
      'shipping_municipality_2' : req.body.shipping_municipality_2,
      'shipping_city_2' : req.body.shipping_city_2,
      'shipping_other_notes_2' : req.body.shipping_other_notes_2
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

//module.exports = router;
	return router;
}
