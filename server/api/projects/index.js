'use strict';

var express = require('express');
var controller = require('./projects.controller');
var config = require('../../config/environment');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
