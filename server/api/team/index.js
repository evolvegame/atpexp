'use strict';

var express = require('express');
var controller = require('./team.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/avatar', auth.isAuthenticated(), controller.changeAvatar);
router.put('/:id/team', auth.isAuthenticated(), controller.teamSettings);
router.put('/:id/company', auth.isAuthenticated(), controller.teamCompany);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
module.exports = router;
