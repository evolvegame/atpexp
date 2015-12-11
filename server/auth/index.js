'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var Team = require('../api/team/team.model');

// Passport Configuration
require('./local/passport').setup(Team, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;