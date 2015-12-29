'use strict';

var express = require('express');
var controller = require('./team.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/avatar', auth.isAuthenticated(), controller.changeAvatar);
router.put('/:id/team', auth.isAuthenticated(), controller.teamSettings);
router.put('/:id/:switchStatus/project', auth.isAuthenticated(), controller.teamCompany);
router.put('/:id/department', auth.isAuthenticated(), controller.teamDepartment);
router.put('/:round/:strategyName/:buyerCountry/:buyerIndustry/:strategyRatingBand1/:strategyRatingBand2/:strategyRatingBand3/:strategyRatingBand4/:strategyRatingBand5/risk', auth.isAuthenticated(), controller.addRisk);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id/deleteRisk', auth.isAuthenticated(), controller.deleteRisk);
router.post('/', controller.create);
module.exports = router;
