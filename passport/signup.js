var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done) {
      findOrCreateUser = function(){
        User.findOne({$or: [{"username" : username}, {"email" : req.body.email}]}, function(err, user) {
          if (err){
            return done(err);
          }
          if (user) {
            return done(null, false, 'User Already Exists');
          }else {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = req.body.password;
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
                // console.log('Error in Saving user: '+ err);   
                return done(null, err);                                                    
              }
              var email = req.body.email;
              var newObjectId = newUser._id;
                // AuthenticationController.sendMailVerify(email, newObjectId)
                //sendMail(email, newObjectId);
              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );
}
