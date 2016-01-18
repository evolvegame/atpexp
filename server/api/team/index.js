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
router.put('/:id/:round/:strategyName/:buyerCountry/:buyerIndustry/:strategyRatingBand1/:strategyRatingBand2/:strategyRatingBand3/:strategyRatingBand4/:strategyRatingBand5/modifyRisk', auth.isAuthenticated(), controller.modifyRisk);
router.put('/:round/:marketBusinessName/:price/:cld/:buyer1Country/:buyer1Industry/:buyer1Rating/:buyer1Cla/:buyer1RiskAcceptance/:buyer2Country/:buyer2Industry/:buyer2Rating/:buyer2Cla/:buyer2RiskAcceptance/:buyer3Country/:buyer3Industry/:buyer3Rating/:buyer3Cla/:buyer3RiskAcceptance/makeOffer', auth.isAuthenticated(), controller.makeOffer);
router.put('/:id/:round/:marketBusinessName/:price/:cld/:buyer1Country/:buyer1Industry/:buyer1Rating/:buyer1Cla/:buyer1RiskAcceptance/:buyer2Country/:buyer2Industry/:buyer2Rating/:buyer2Cla/:buyer2RiskAcceptance/:buyer3Country/:buyer3Industry/:buyer3Rating/:buyer3Cla/:buyer3RiskAcceptance/modifyOffer', auth.isAuthenticated(), controller.modifyOffer);
router.put('/:id/deleteOffer', auth.isAuthenticated(), controller.deleteOffer);
router.post('/', controller.create);
router.get('/:previousRoundNumber/getAllTeamRankings', controller.getAllTeamRankings);
router.get('/:id/roundLevelInformation', auth.isAuthenticated(), controller.roundLevelInformation);
router.get('/:id/miniDashboardInfo', auth.isAuthenticated(), controller.miniDashboardInfo);
router.put('/:id/:memberId/:password/resetPassword', auth.isAuthenticated(), controller.resetPassword);
router.post('/saveOffer', controller.saveOffer);
module.exports = router;
