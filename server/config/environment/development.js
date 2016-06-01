'use strict';

// Development specific configuration
// ==================================
// go in app.js for seeddb true or false
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/atpexp-dev'
  },

  seedDB: false
};
