var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');
var tokenizer = require("../util/jwt-tokenizer");

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if(err) {
                next(err);
            }
            user.token = tokenizer.sign(user);
            done(err, user);
        });
    });

    login(passport);
    signup(passport);

}
