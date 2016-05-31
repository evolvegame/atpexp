'use strict';

var express = require('express');
var controller = require('./customer.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.get('/:id/getGlobalCustomers', auth.isAuthenticated(), controller.getGlobalCustomers);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/:id/:count/updateOfferCount', auth.isAuthenticated(), controller.updateOfferCount);
router.get('/1/getOfferAnalysis', auth.isAuthenticated(), controller.getOfferAnalysis);
router.get('/:revenueStr/:weatherStr/:round/getLocalCustomerForFilter', auth.isAuthenticated(), controller.getLocalCustomerForFilter);
router.get('/1/:country/getLocalCustomers', auth.isAuthenticated(), controller.getLocalCustomers);
router.put('/1/updateLocalOffers', auth.isAuthenticated(), controller.updateLocalOffers);
router.get('/1/totalNumOfResources', auth.isAuthenticated(), controller.totalNumOfResources);
module.exports = router;