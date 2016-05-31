'use strict';

var express = require('express');
var controller = require('./gamecontrol.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/:switchStatus/toggleGameControl', controller.toggleGameControl);

module.exports = router;