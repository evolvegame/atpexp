'use strict';

var express = require('express');
var controller = require('./round.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/currentRound', controller.currentRound);
router.post('/', controller.newRound);
router.put('/:id', controller.calculateRound);

module.exports = router;