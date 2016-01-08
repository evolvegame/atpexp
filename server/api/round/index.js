'use strict';

var express = require('express');
var controller = require('./round.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/currentRound', controller.currentRound);
router.post('/', controller.addRound);
router.put('/:entryId',controller.endCurrRound)

module.exports = router;
