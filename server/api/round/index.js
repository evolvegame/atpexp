'use strict';

var express = require('express');
var controller = require('./round.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.newRound);
router.put('/:id', controller.calculateRound);

module.exports = router;