'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  tempUploadDir: '/public/assets/img/uploads/temp',

  targetUploadDir: '/public/assets/img/uploads',

  // Server port
  
  port: process.env.VCAP_APP_PORT || 9000,
  host:process.env.VCAP_APP_HOST || 'localhost',
  // Should we populate the DB with sample data?
  seedDB: process.env.ENABLE_SEED,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'atr-exp-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
