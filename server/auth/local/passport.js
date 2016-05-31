var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (Team, config,GameControl) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      Team.findOne({'members.email' :  new RegExp(email,"i")},{'role':1,'members.$': 1}, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'The email and password you entered don\'t match.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'The email and password you entered don\'t match.' });
        }
        console.log('Logged in user'+JSON.stringify(user));
        GameControl.find({}, function (err, gamecontrol) {
        if(err) return done(err);
        if(gamecontrol[0].gameonoffcontrol && user.role != 'admin'){
          return done(null, false, { message: 'The game is stopped for calculation purpose.Please wait and try after some time!!!!' });
        }
        
        return done(null, user);
        });
      });
    }
  ));
};