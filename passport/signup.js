var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var tokenizer = require("../util/jwt-tokenizer");


var AuthenticationController = require('../controllers/AuthenticationController');
module.exports = function(passport){
  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done) {
      findOrCreateUser = function(){
        // User.findOne({$or: [{"username" : username}, {"email" : req.body.email}]}, function(err, user) {
        User.findOne({$or: [{"email" : req.body.email}]}, function(err, user) {
          if (err){
            console.log('Error in SignUp: '+ err);
            return done(err);
          }
          if (user) {
            console.log("------------------------?" + user);
            return done(null, false, req.flash('message','User Already Exists'));
          }else {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = createHash(password);
            newUser.email = req.body.email;
            newUser.first_name = req.body.first_name;
            newUser.last_name = req.body.last_name;
            newUser.contact_number = req.body.contact_number;
            newUser.userType = req.body.userType;
            newUser.birthdate = req.body.birthdate;
            newUser.createdAt = new Date();
            newUser.updatedAt = new Date();
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+ err);                                                       
              }
              // console.log('User Registration succesful');
              // var handleActionButton = "<button class = 'btn btn-danger' id = 'btnDelete' data-id = '"+ newUser._id +"' data-module='user'> <span class = 'fa fa-trash-o'></span> Delete</button>    <button class = 'btn btn-primary' id = 'btnView' data-id = '"+ newUser._id +"' data-module='user'> <span class = 'fa fa-info-circle'></span> View</button>";
              // var formDataUpdate = {action: handleActionButton};
              // User.findByIdAndUpdate(newUser._id, { $set: formDataUpdate} ,function (err, singleObjectUpdate) {
              //   console.log("DATA FOR UPDATE ACTION IN CREATE USER---> " + JSON.stringify(singleObjectUpdate));
              // });

              var email = req.body.email;
              var newObjectId = newUser._id;
                AuthenticationController.sendMailVerify(email, newObjectId)
                //sendMail(email, newObjectId);
              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );

  var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
}
