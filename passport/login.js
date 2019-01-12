var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var tokenizer = require("../util/jwt-tokenizer");
module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
						User.findOne({$or: [{"username" : username}, {"email" : username}]},
                function(err, user) {
                    if (err)
                        return done(err);
                    if (!user){
                        // console.log('User Not Found with username '+ username);
                        return done(null, false, 'User not found');
                        // return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, 'Invalid Username or password');
                    }
                    return done(null, user);
                }
            );
        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

}
