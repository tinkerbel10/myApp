var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt');
module.exports = function(passport){

	passport.use('login', new LocalStrategy({
				passReqToCallback : true
		},
		function(req, username, password, done) {
			User.findOne({$or: [{"username" : username}, {"email" : username}]},function(err, user) {
			if (err)
					return done(err);
			if (!user){
					return done(null, false, req.flash('message', 'User Not found.'));
			}
			if (!isValidPassword(user, password)){
					return done(null, req.flash('message', 'Invalid Password'));
			}
			if(!user.is_verified){
				return done(null, req.flash('message', 'Email not verified'))
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
