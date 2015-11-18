/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Economy = require('../api/economy/economy.model');
var User = require('../api/user/user.model');
var Round = require('../api/round/round.model');
var Offer = require('../api/offer/offer.model');
var Customer = require('../api/customer/customer.model');

Economy.find({}).remove(function() {
  Economy.create({
    name: 'The Netherlands',
    code: 'nl',
    data: [ 0.8003861280158162, 0.045766294933855534, -0.6947634089738131, 1.0423763510771096, -6.254311721306294, -3.5027207620441914, -2.2497135661542416, 1.5811434090137482 ],
    color: '#8085e9',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'United Kingdom',
    code: 'uk',
    data: [ -0.026513680815696716, 0.2596322614699602, -0.1250465209595859, 2.8261713362298906, -7.136834310833365, -2.2033122358843684, -1.4405681150965393, 0.015430223196744919 ],
    color: '#FFB5B5',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Belgium',
    code: 'be',
    data: [ -0.6562195150181651, 0.11077185114845634, 0.23349183844402432, 2.34032182674855, -6.759704993572086, -2.0585665591061115, -2.492034892551601, 0.302150113042444 ],
    color: '#F0B9C8',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Denmark',
    code: 'dk',
    data: [ -0.9196586459875107, 0.13821730902418494, -0.9347781427204609, 1.1386968726292253, -7.786528206430376, -3.951033269520849, -1.9604201037436724, 1.3003937010653317 ],
    color: '#FF7DFF',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'France',
    code: 'fr',
    data: [ -0.6949694897048175, -0.6939964257180691, -0.8149882447905838, 1.622665659058839, -6.786399125121534, -2.8938535563647747, -1.7596458555199206, 0.016040905378758907 ],
    color: '#D881ED',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Germany',
    code: 'de',
    data: [ 0.590273751411587, 0.4887602822855115, 0.5239529423415661, 1.4203002243302763, -6.867954595480114, -2.2798612830229104, -1.6375332847237587, 1.2295234790071845 ],
    color: '#B7B7FF',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Italy',
    code: 'it',
    data: [ -0.33001929288730025, -0.9513893672265112, -0.5672847307287157, 2.9655071436427534, -7.362776417285204, -3.87276827218011, -1.5541076408699155, 0.2987943203188479 ],
    color: '#A6DEEE',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Spain',
    code: 'es',
    data: [ 0.6791468365117908, -0.6211771187372506, -0.8421393241733313, 2.8032962209545076, -6.845766146667302, -3.6098085129633546, -1.1863819574937224, 1.1088872393593192 ],
    color: '#CFE7E2',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Control',
    code: 'control',
    data: [ 1.59, 1.24, 1.66, 3.52, -5.14, -1.54, -0.1, 2.93 ],
    color: '#ccc',
    draggableY: true,
    type: 'line',
    marker: true,
    hover: true
  }, function() {
      console.log('** Finished populating economy.')
    }
  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Team 1',
    email: 'team1',
    password: 'team1',
    slogan: '',
    members: []
  },{
    provider: 'local',
    role: 'admin',
    name: 'Emanuel',
    email: 'emanuel@atradius.com',
    password: 'admin',
    slogan: '',
    members: [{text:'emanuel.de.graaff@atradius.com'},{text:'jonathan.elsen@atradius.com'}]
  },{
    provider: 'local',
    role: 'admin',
    name: 'Jonathan',
    email: 'jonathan@atradius.com',
    password: 'admin',
    slogan: '',
    members: [{text:'jonathan.elsen@atradius.com'}]
  }, function() {
      console.log('** Finished populating teams.');
    }
  );
});

Round.find({}).remove(function() {
  Round.create({
    currentRound: 0,
    calculated: false
  }, function() {
      console.log('** Beginning with round zero...');
    }
  );
});

Offer.find({}).remove(function() {});

Customer.find({}).remove(function() {
  Customer.create({
    name:"Ajo",
    region:"West-Europe",
    regionCode:"we",
    country:"The Netherlands",
    countryCode:"nl",
    industry:"Services",
    industryCode:"ser",
    buyerPortfolio:[
      {region:"West-Europe",regionCode:"we",country:"Belgium",countryCode:"be",industry:"Food",industryCode:"foo",tpe:3579440},
      {region:"West-Europe",regionCode:"we",country:"Germany",countryCode:"de",industry:"Finance",industryCode:"fin",tpe:1587862},
      {region:"South-America",regionCode:"sa",country:"Argentina",countryCode:"ar",industry:"Finance",industryCode:"fin",tpe:3159834}
    ],
    inGame:true,
    hasPolicy:true,
    policyHolder:[{teamId:"123",inRound:0}]
  },{
    name:"Bope",
    region:"West-Europe",
    regionCode:"we",
    country:"Germany",
    countryCode:"de",
    industry:"Machines",
    industryCode:"mac",
    buyerPortfolio:[
      {region:"West-Europe",regionCode:"we",country:"The Netherlands",countryCode:"nl",industry:"Paper",industryCode:"pap",tpe:2674760},
      {region:"West-Europe",regionCode:"we",country:"Germany",countryCode:"de",industry:"Electronics",industryCode:"ele",tpe:2185842},
      {region:"West-Europe",regionCode:"we",country:"Spain",countryCode:"es",industry:"Food",industryCode:"foo",tpe:2604121}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  },{
    name:"Calcent",
    region:"West-Europe",
    regionCode:"we",
    country:"United Kingdom",
    countryCode:"gb",
    industry:"Construction",
    industryCode:"con",
    buyerPortfolio:[
      {region:"West-Europe",regionCode:"we",country:"The Netherlands",countryCode:"nl",industry:"Paper",industryCode:"pap",tpe:2674760},
      {region:"West-Europe",regionCode:"we",country:"United Kingdom",countryCode:"gb",industry:"Paper",industryCode:"pap",tpe:3085462},
      {region:"West-Europe",regionCode:"we",country:"France",countryCode:"fr",industry:"Transport",industryCode:"tra",tpe:1109134}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  },{
    name:"Dolent",
    region:"West-Europe",
    regionCode:"we",
    country:"Spain",
    countryCode:"es",
    industry:"Metals",
    industryCode:"met",
    buyerPortfolio:[
      {region:"West-Europe",regionCode:"we",country:"Spain",countryCode:"es",industry:"Agriculture",industryCode:"agr",tpe:1374770},
      {region:"West-Europe",regionCode:"we",country:"Spain",countryCode:"es",industry:"Transport",industryCode:"tra",tpe:2385722},
      {region:"West-Europe",regionCode:"we",country:"The Netherlands",countryCode:"nl",industry:"Services",industryCode:"ser",tpe:3129154}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  },{
    name:"Enible",
    region:"South-America",
    regionCode:"sa",
    country:"Argentina",
    countryCode:"ar",
    industry:"Textiles",
    industryCode:"tex",
    buyerPortfolio:[
      {region:"South-America",regionCode:"sa",country:"Brazil",countryCode:"br",industry:"Consumer Durables",industryCode:"csr",tpe:6374462},
      {region:"South-America",regionCode:"sa",country:"Colombia",countryCode:"co",industry:"Chemicals",industryCode:"che",tpe:5035472},
      {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Services",industryCode:"ser",tpe:4139164}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  },{
    name:"Exil",
    region:"South-America",
    regionCode:"sa",
    country:"Brazil",
    countryCode:"br",
    industry:"Finance",
    industryCode:"fin",
    buyerPortfolio:[
      {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Paper",industryCode:"pap",tpe:5344761},
      {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Machines",industryCode:"mac",tpe:6235721},
      {region:"West-Europe",regionCode:"we",country:"United Kingdom",countryCode:"gb",industry:"Food",industryCode:"foo",tpe:3335162}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  },{
    name:"Forosis",
    region:"South-America",
    regionCode:"sa",
    country:"Chille",
    countryCode:"cl",
    industry:"Electronics",
    industryCode:"ele",
    buyerPortfolio:[
      {region:"South-America",regionCode:"sa",country:"Colombia",countryCode:"co",industry:"Metals",industryCode:"met",tpe:7314465},
      {region:"South-America",regionCode:"sa",country:"Brazil",countryCode:"br",industry:"Metals",industryCode:"met",tpe:5833729},
      {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Textiles",industryCode:"tex",tpe:5934721}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  },{
    name:"Capiz",
    region:"South-America",
    regionCode:"sa",
    country:"Colombia",
    countryCode:"co",
    industry:"Transport",
    industryCode:"tra",
    buyerPortfolio:[
      {region:"South-America",regionCode:"sa",country:"Argentina",countryCode:"ar",industry:"Finance",industryCode:"fin",tpe:6114764},
      {region:"South-America",regionCode:"sa",country:"Brazil",countryCode:"br",industry:"Metals",industryCode:"met",tpe:5833729},
      {region:"South-America",regionCode:"sa",country:"Colombia",countryCode:"co",industry:"Paper",industryCode:"pap",tpe:6335761}
    ],
    inGame:true,
    hasPolicy:false,
    policyHolder:[]
  }, function() {
      console.log('** Creating the market...');
    })
});
