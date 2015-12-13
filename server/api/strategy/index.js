'use strict';

var express = require('express');
var controller = require('./strategy.controller');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', controller.destroy);

module.exports = router;