var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var AuthenticationController = require('../controllers/AuthenticationController');

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
            // return done(null, false, 'User Already Exists');
            return done(null, false, req.flash('message','User Already Exists'));
          }else {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.email = req.body.email;
            newUser.first_name = req.body.first_name;
            newUser.last_name = req.body.last_name;
            newUser.contact_number = req.body.contact_number;
            newUser.user_type = req.body.user_type;
            newUser.role_id = req.body.role_id;
            newUser.role_name= req.body.role_name;
            newUser.created_at = new Date();
            newUser.updated_at = new Date();
            newUser.save(function(err) {
              if (err){
                return done(null, err);                                                    
              }
                AuthenticationController.sendMailVerify(req.body, newUser.id);
              return done(null, true, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );
}
