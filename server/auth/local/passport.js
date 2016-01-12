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
          return done(null, false, { message: 'The email and password you entered don\'t match.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'The email and password you entered don\'t match.' });
        }
        //console.log('passport.js : '+user);
        return done(null, user);
      });
    }
  ));
};