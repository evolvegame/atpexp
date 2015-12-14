var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (Team, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      Team.findOne({ 'members.email' :  email },{'members.$': 1}, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        console.log('passport.js : '+user);
        return done(null, user);
      });
    }
  ));
};