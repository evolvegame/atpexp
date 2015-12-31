/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/offers', require('./api/offer'));
  
  app.use('/api/customer', require('./api/customer'));
  app.use('/api/economy', require('./api/economy'));
  app.use('/api/offer', require('./api/offer'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/rounds', require('./api/round'));
  app.use('/api/team', require('./api/team'));
  app.use('/api/projects', require('./api/projects'));
  app.use('/api/departments', require('./api/departments'));
  app.use('/api/industry', require('./api/industry'));
  app.use('/api/country', require('./api/country'));
  app.use('/api/ratingBands', require('./api/ratingBands'));
  app.use('/api/locale-fr', require('./api/france'));
  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
