/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Economy = require('../api/economy/economy.model');
var Round = require('../api/round/round.model');
var Offer = require('../api/offer/offer.model');
var Customer = require('../api/customer/customer.model');
var Team = require('../api/team/team.model');
var Industry = require('../api/industry/industry.model');
var Country = require('../api/country/country.model');
var France = require('../api/france/france.model');
var Projects = require('../api/projects/projects.model');
var Departments = require('../api/departments/departments.model');
var RatingBands = require('../api/ratingBands/ratingBand.model');
var LossRatio = require('../api/customer/lossratio.model');

Team.find({}).remove(function() {
  try {
    Team.create(
      {
        provider: 'local',
        password: 'Tester1' ,
        name:'Team A',
        slogan:'Make the Difference',
        picture:'evolve-avatar.png',
        teamCountry: "USA",
        capital: 750,
        experienceScore: 50,
        role:'user',
        customer:[],
        members :[
                  {name :'User1',email: 'user1@atradius.com' },
                ],
                offer:[],
                roundLevelInformation: [{
                    round: 1,
                    capital: 0,
                    premium: 0,
                    claims: 0,
                    grossIncome: 0,
                    claimsRatio: 0,
                    profit: 0,
                    investment: 0,
                    experienceScore: 0,
                    salesforceSize: 0,
                    underwriterDepartmentSize: 0,
                    iTMaintenance: 0,
                    marketingBudget: 0,
                    facilities: 0,
                    totalExpense: 0,
                    rankingPosition: 0,
                    experienceScoreAmount:60000,
                    customers:0
                  }]
      },
      {
        provider: 'local',
        password: 'Tester1' ,
        name:'Team B',
        slogan:'Make the Difference',
        picture:'evolve-avatar.png',
        teamCountry: "USA",
        capital: 750,
        experienceScore: 50,
        customer:[],
        role:'user',
        members :[
                  {name :'User2',email: 'user2@atradius.com' },
                ],
                offer:[],
                roundLevelInformation: [{
                    round: 1,
                    capital: 0,
                    premium: 0,
                    claims: 0,
                    grossIncome: 0,
                    claimsRatio: 0,
                    profit: 0,
                    investment: 0,
                    experienceScore: 0,
                    salesforceSize: 0,
                    underwriterDepartmentSize: 0,
                    iTMaintenance: 0,
                    marketingBudget: 0,
                    facilities: 0,
                    totalExpense: 0,
                    rankingPosition: 0,
                    experienceScoreAmount:90000,
                    customers:0
                  }]
      },
        {
          provider: 'local',
          password: 'Tester1' ,
          name:'Team C',
          slogan:'Make the Difference',
          picture:'evolve-avatar.png',
          teamCountry: "USA",
          capital: 750,
          experienceScore: 50,
          customer:[],
          role:'user',
          members :[
                    {name :'User3',email: 'user3@atradius.com'}
                  ],
                  offer:[],
                  roundLevelInformation: [{
                      round: 1,
                      capital: 0,
                      premium: 0,
                      claims: 0,
                      grossIncome: 0,
                      claimsRatio: 0,
                      profit: 0,
                      investment: 0,
                      experienceScore: 0,
                      salesforceSize: 0,
                      underwriterDepartmentSize: 0,
                      iTMaintenance: 0,
                      marketingBudget: 0,
                      facilities: 0,
                      totalExpense: 0,
                      rankingPosition: 0,
                      experienceScoreAmount:70000,
                      customers:0
                    }]
        }
        ,
        {
          provider: 'local',
          password: 'Tester1' ,
          name:'Team D',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 7750000,
          experienceScore: 60,
          customer:[],
          role:'user',
          members :[
                    {name :'User8',email: 'user8@atradius.com' }
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 7750000,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:10000,
              customers:0
            }]
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team E',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          role:'user',
          customer:[],
          members :[
                    {name :'User9',email: 'user9@atradius.com' }
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 0,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:34200,
              customers:0
            }]
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team F',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          customer:[],
          role:'user',
          members :[
                    {name :'User10',email: 'user10@atradius.com' }
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 0,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:45000,
              customers:0
            }],
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team G',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          role:'user',
          experienceScore: 60,
          members :[
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[],
          customer :
           [],
          roundLevelInformation: [{
              round: 1,
              capital: 0,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:23420,
              customers:0
            }]
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team H',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          role:'user',
          customer :
          [],
          members :[
                    {name :'User13',email: 'user13@atradius.com'}
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 0,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:98800,
              customers:0
            }]
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team I',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          customer:[],
          role:'user',
          members :[
                    {name :'User14',email: 'user14@atradius.com'}
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 0,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:100200,
              customers:0
            }]
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team J',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          customer:[],
          role:'user',
          members :[
                    {name :'User15',email: 'user15@atradius.com'}
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 0,
              premium: 0,
              claims: 0,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 0,
              experienceScoreAmount:120000,
              customers:0
            }]
        }
        ,{
          provider: 'local',
          password: 'admin' ,
          name:'Team Admin',
          slogan:'Do it youself',
          picture:'evolve-avatar.png',
          role:'admin',
          teamCountry: "NL",
          capital: 5000000,
          experienceScore: 75,
          members :[
                    {name :'Rajasekaran',email: 'raj@atradius.com' },
                    {name :'Ranagarajan',email: 'ranga@atradius.com' },
                    {name :'Jonathan',email: 'jonathan@atradius.com'},
                    {name :'Emanuel',email: 'emanuel@atradius.com'},
                    {name :'Prajakta',email: 'prajakta@atradius.com'}
                    ],
          offer:[],
          roundLevelInformation: [{
              round: 1,
              capital: 4,
              premium: 0,
              claims: 3,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 20,
              customers:0
            }/*,{
              round: 2,
              capital: 5,
              premium: 0,
              claims: 2,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 2,
              customers:0
            },{
              round: 3,
              capital: 0,
              premium: 0,
              claims: 1,
              grossIncome: 0,
              claimsRatio: 0,
              profit: 0,
              investment: 0,
              experienceScore: 0,
              salesforceSize: 0,
              underwriterDepartmentSize: 0,
              iTMaintenance: 0,
              marketingBudget: 0,
              facilities: 0,
              totalExpense: 0,
              rankingPosition: 15,
              customers:0
            }*/],
          riskStrategy :[
                                   { round: 1,
                                   strategyId: 1,
                                     strategyName: 'Strategy 1',
                                     buyerCountry: 'Belgium',
                                     buyerIndustry: ['Food','Aviation'],
                                     strategyRatingBand1: 95,
                                     strategyRatingBand2: 85,
                                     strategyRatingBand3: 80,
                                     strategyRatingBand4: 75,
                                     strategyRatingBand5: 40
                                     },
                                     {
                                       round: 1,
                                       strategyId: 2,
                                       strategyName: 'Strategy 2',
                                       buyerCountry: 'Germany',
                                       buyerIndustry: ['Finance','Electronics'],
                                       strategyRatingBand1: 95,
                                       strategyRatingBand2: 85,
                                       strategyRatingBand3: 80,
                                       strategyRatingBand4: 75,
                                       strategyRatingBand5: 40
                                     },
                                     {
                                       round: 1,
                                       strategyId: 3,
                                       strategyName: 'Strategy 3',
                                       buyerCountry: 'Argentina',
                                       buyerIndustry: ['Finance','Insurance'],
                                       strategyRatingBand1: 95,
                                       strategyRatingBand2: 85,
                                       strategyRatingBand3: 80,
                                       strategyRatingBand4: 75,
                                       strategyRatingBand5: 40
                                     },{
                                       round: 1,
                                       strategyId: 4,
                                       strategyName: 'Strategy 4',
                                       buyerCountry: 'The Netherlands',
                                       buyerIndustry: ['Paper','Telecom'],
                                       strategyRatingBand1: 12,
                                       strategyRatingBand2: 15,
                                       strategyRatingBand3: 23,
                                       strategyRatingBand4: 56,
                                       strategyRatingBand5: 80
                                     },{
                                       round: 1,
                                       strategyId: 5,
                                       strategyName: 'Strategy 5',
                                       buyerCountry: ['France','Spain'],
                                       buyerIndustry: ['Electronics','Food'],
                                       strategyRatingBand1: 12,
                                       strategyRatingBand2: 15,
                                       strategyRatingBand3: 23,
                                       strategyRatingBand4: 56,
                                       strategyRatingBand5: 80
                                     }
                                       ]},
                                      function() {

                                     }, function() {

                                       console.log('** Finished populating Teams and Users.');
                                     }
    );
        }
        catch(e){
          console.log(e);
        }

  });

Departments.find({}).remove(function(){
    Departments.create(
    {
      name: 'Local Sales',
      size: [
      {unit: 'Small', cost: 200000 },
      {unit: 'Medium', cost: 300000},
      {unit: 'Large', cost: 400000},
      {unit: 'Huge', cost: 1000000}
      ]
    },{
      name: 'Global Sales',
      size: [
      {unit: 'Small', cost: 200000 },
      {unit: 'Medium', cost: 300000},
      {unit: 'Large', cost: 400000},
      {unit: 'Huge', cost: 1000000}
      ]
    },{
      name: 'Marketing',
      size: [
      {unit: 'Small', cost: 200000 },
      {unit: 'Medium', cost: 300000},
      {unit: 'Large', cost: 400000},
      {unit: 'Huge', cost: 1000000}
      ]
    },{
      name: 'IT',
      size: [
      {unit: 'Small', cost: 200000 },
      {unit: 'Medium', cost: 300000},
      {unit: 'Large', cost: 400000},
      {unit: 'Huge', cost: 1000000}
      ]
    },{
      name: 'Risk',
      size: [
      {unit: 'Small', cost: 200000 },
      {unit: 'Medium', cost: 300000},
      {unit: 'Large', cost: 400000},
      {unit: 'Huge', cost: 1000000}
      ]
    }

    );

  });

Projects.find({}).remove(function(){
  Projects.create({
    type: 'Compliance',
    name: 'Standard Formula',
    amount: 100000
  },{
    type: 'Compliance',
    name: 'Internal Model',
    amount: 2000000
  },{
    type: 'IT',
    name: 'Website',
    amount: 5000
  },{
    type: 'IT',
    name: 'UW system',
    amount: 100000
  },{
    type: 'IT',
    name: 'Claims system',
    amount: 50000
  },{
    type: 'IT',
    name: 'App',
    amount: 20000
  },{
    type: 'Marketing',
    name: 'Newspaper',
    amount: 5000
  },{
    type: 'Marketing',
    name: 'radio',
    amount: 10000
  },{
    type: 'Marketing',
    name: 'television',
    amount: 20000
  },{
    type: 'Marketing',
    name: 'internet',
    amount: 40000
  },{
    type: 'Strategy',
    name: 'Expand',
    amount: 100000
  },{
    type: 'Strategy',
    name: 'Evolve',
    amount: 50000
  },{
    type: 'Strategy',
    name: 'Innovate',
    amount: 5000
  }
  );
});

RatingBands.find({}).remove(function(){
    RatingBands.create({
      sno: 1,
      ratingFrom: 1,
      ratingTo: 30
    },{
      sno: 2,
       ratingFrom: 31,
       ratingTo: 40
    },{
      sno: 3,
      ratingFrom: 41,
      ratingTo: 50
    },{
      sno: 4,
      ratingFrom: 51,
      ratingTo: 60
    },{
      sno: 5,
      ratingFrom: 60,
      ratingTo: 100
    }
    );
  });



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

Round.find({}).remove(function() {
  Round.create( {
    round: 1,
    roundName:'Round 1',
    roundStart: '15-Dec-2015',
    roundEnd: '30-Dec-2015',
    currentRoundFlag:true,
    calculationFlag:false
  }, function() {
    console.log('** Beginning with round zero...');
  }
  );
});

Offer.find({}).remove(function() {});

Customer.find({}).remove(function() {
  Customer.create({
    name:"Ajo",
    revenue:100000,
    turnover:5000000,
    region:"West-Europe",
    regionCode:"we",
    country:"The Netherlands",
    minOfferScore:1,
    businessRisk: 40,
    countryCode:"nl",
    industry:"Services",
    industryCode:"ser",
    experienceScoreNeeded:5,
    offerCount:0,
    buyerPortfolio:[
                    {region:"West-Europe",regionCode:"we",country:"Belgium",countryCode:"be",industry:"Food",industryCode:"foo",tpe:3579440,rating:30,cla:44678},
                    {region:"West-Europe",regionCode:"we",country:"Germany",countryCode:"de",industry:"Finance",industryCode:"fin",tpe:1587862,rating:60,cla:23455},
                    {region:"South-America",regionCode:"sa",country:"Argentina",countryCode:"ar",industry:"Finance",industryCode:"fin",tpe:3159834,rating:5,cla:45678}
                    ],
                    inGame:true,
                    hasPolicy:true,
                    policyHolder:[{teamId:"123",inRound:0}]
  },{
    name:"Bope",
    revenue:200000,
    turnover:9000000,
    region:"West-Europe",
    regionCode:"we",
    country:"Germany",
    countryCode:"de",
    minOfferScore:1,
    industry:"Machines",
    industryCode:"mac",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"West-Europe",regionCode:"we",country:"The Netherlands",countryCode:"nl",industry:"Paper",industryCode:"pap",tpe:2674760,rating:5,cla:45674},
                    {region:"West-Europe",regionCode:"we",country:"Germany",countryCode:"de",industry:"Electronics",industryCode:"ele",tpe:2185842,rating:5,cla:34567},
                    {region:"West-Europe",regionCode:"we",country:"Spain",countryCode:"es",industry:"Food",industryCode:"foo",tpe:2604121,rating:5,cla:54252}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  },{
    name:"Calcent",
    revenue:700000,
    turnover:15000000,
    region:"West-Europe",
    regionCode:"we",
    country:"United Kingdom",
    countryCode:"gb",
    minOfferScore:1,
    industry:"Construction",
    industryCode:"con",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"West-Europe",regionCode:"we",country:"The Netherlands",countryCode:"nl",industry:"Paper",industryCode:"pap",tpe:2674760,rating:5,cla:54252},
                    {region:"West-Europe",regionCode:"we",country:"United Kingdom",countryCode:"gb",industry:"Paper",industryCode:"pap",tpe:3085462,rating:5,cla:54252},
                    {region:"West-Europe",regionCode:"we",country:"France",countryCode:"fr",industry:"Transport",industryCode:"tra",tpe:1109134,rating:5,cla:54252}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  },{
    name:"Dolent",
    revenue:300000,
    turnover:25000000,
    region:"West-Europe",
    regionCode:"we",
    country:"Spain",
    countryCode:"es",
    minOfferScore:1,
    industry:"Metals",
    industryCode:"met",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"West-Europe",regionCode:"we",country:"Spain",countryCode:"es",industry:"Agriculture",industryCode:"agr",tpe:1374770,rating:5,cla:54252},
                    {region:"West-Europe",regionCode:"we",country:"Spain",countryCode:"es",industry:"Transport",industryCode:"tra",tpe:2385722,rating:5,cla:54252},
                    {region:"West-Europe",regionCode:"we",country:"The Netherlands",countryCode:"nl",industry:"Services",industryCode:"ser",tpe:3129154,rating:5,cla:54252}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  },{
    name:"Enible",
    revenue:100000,
    turnover:5000000,
    region:"South-America",
    regionCode:"sa",
    country:"Argentina",
    countryCode:"ar",
    minOfferScore:1,
    industry:"Textiles",
    industryCode:"tex",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"South-America",regionCode:"sa",country:"Brazil",countryCode:"br",industry:"Consumer Durables",industryCode:"csr",tpe:6374462,rating:5,cla:54252},
                    {region:"South-America",regionCode:"sa",country:"Colombia",countryCode:"co",industry:"Chemicals",industryCode:"che",tpe:5035472,rating:5,cla:54252},
                    {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Services",industryCode:"ser",tpe:4139164,rating:5,cla:54252}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  },{
    name:"Exil",
    revenue:100000,
    turnover:5000000,
    region:"South-America",
    regionCode:"sa",
    country:"Brazil",
    countryCode:"br",
    minOfferScore:1,
    industry:"Finance",
    industryCode:"fin",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Paper",industryCode:"pap",tpe:5344761,rating:5,cla:54252},
                    {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Machines",industryCode:"mac",tpe:6235721,rating:5,cla:54252},
                    {region:"West-Europe",regionCode:"we",country:"United Kingdom",countryCode:"gb",industry:"Food",industryCode:"foo",tpe:3335162,rating:5,cla:54252}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  },{
    name:"Forosis",
    revenue:100000,
    turnover:5000000,
    region:"South-America",
    regionCode:"sa",
    country:"Chille",
    countryCode:"cl",
    minOfferScore:1,
    industry:"Electronics",
    industryCode:"ele",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"South-America",regionCode:"sa",country:"Colombia",countryCode:"co",industry:"Metals",industryCode:"met",tpe:7314465,rating:5,cla:43533},
                    {region:"South-America",regionCode:"sa",country:"Brazil",countryCode:"br",industry:"Metals",industryCode:"met",tpe:5833729,rating:5,cla:45656},
                    {region:"South-America",regionCode:"sa",country:"Chille",countryCode:"cl",industry:"Textiles",industryCode:"tex",tpe:5934721,rating:5,cla:47235}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  },{
    name:"Capiz",
    revenue:100000,
    turnover:5000000,
    region:"South-America",
    regionCode:"sa",
    country:"Colombia",
    countryCode:"co",
    minOfferScore:1,
    industry:"Transport",
    industryCode:"tra",
    experienceScoreNeeded:50,
    offerCount:0,
    buyerPortfolio:[
                    {region:"South-America",regionCode:"sa",country:"Argentina",countryCode:"ar",industry:"Finance",industryCode:"fin",tpe:6114764,rating:5,cla:4},
                    {region:"South-America",regionCode:"sa",country:"Brazil",countryCode:"br",industry:"Metals",industryCode:"met",tpe:5833729,rating:5,cla:4},
                    {region:"South-America",regionCode:"sa",country:"Colombia",countryCode:"co",industry:"Paper",industryCode:"pap",tpe:6335761,rating:5,cla:4}
                    ],
                    inGame:true,
                    hasPolicy:false,
                    policyHolder:[]
  }, function() {
    console.log('** Creating the market...');
  })
});


Industry.find({}).remove(function() {
  try {
    Industry.create(
        {    sno: '1',    industry: 'Agriculture' },
        {    sno: '2',   industry : 'Chemicals'},
        {     sno: '3',    industry : 'Construction'
        },
        {    sno: '4',    industry: 'Construction Materials' },
        {    sno: '5',   industry : 'Consumer Durables'},
        {     sno: '6',    industry : 'Electronics'
        },
        {    sno: '7',    industry: 'Finance' },
        {    sno: '8',   industry : 'Food'},
        {     sno: '9',    industry : 'Machines'
        },
        {    sno: '10',    industry: 'Metals' },
        {    sno: '11',   industry : 'Paper'},
        {     sno: '12',     industry : 'Services'
        },  {    sno: '13',   industry : 'Textiles'},
        {     sno: '14',     industry : 'Transport'
        }
        ,function() {
          console.log('** Finished populating Industry');
        }
    );
  }
  catch(e){
    console.log(e);
  }

});

LossRatio.find({}).remove(function() {
    try{
        LossRatio.create(
            {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Agriculture",
	"MeanEL": 0.001861527,
	"StandardDeviationEL": 0.006394338
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Chemicals",
	"MeanEL": 0.001630337,
	"StandardDeviationEL": 0.008873186
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Construction",
	"MeanEL": 0.003865775,
	"StandardDeviationEL": 0.006122873
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Construction Materials",
	"MeanEL": 0.006332847,
	"StandardDeviationEL": 0.005389492
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00335737,
	"StandardDeviationEL": 0.006247415
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Electronics",
	"MeanEL": 0.003797955,
	"StandardDeviationEL": 0.006240935
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Finance",
	"MeanEL": 0.003473436,
	"StandardDeviationEL": 0.014490127
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Food",
	"MeanEL": 0.002469676,
	"StandardDeviationEL": 0.0146922
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Machines",
	"MeanEL": 0.001500127,
	"StandardDeviationEL": 0.004016736
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Metals",
	"MeanEL": 0.004108767,
	"StandardDeviationEL": 0.014401408
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Paper",
	"MeanEL": 0.007167418,
	"StandardDeviationEL": 0.006144057
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Textiles",
	"MeanEL": 0.004742645,
	"StandardDeviationEL": 0.008564779
}, {
	"Country": "(Azores) PORTUGAL",
	"Industry": "Transport",
	"MeanEL": 0.004724277,
	"StandardDeviationEL": 0.013143424
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Agriculture",
	"MeanEL": 0.001520866,
	"StandardDeviationEL": 0.005936271
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Chemicals",
	"MeanEL": 0.001397868,
	"StandardDeviationEL": 0.008415119
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Construction",
	"MeanEL": 0.001959059,
	"StandardDeviationEL": 0.005664806
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Construction Materials",
	"MeanEL": 0.001471716,
	"StandardDeviationEL": 0.004931425
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001360602,
	"StandardDeviationEL": 0.005789348
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Electronics",
	"MeanEL": 0.0011198,
	"StandardDeviationEL": 0.005782868
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Finance",
	"MeanEL": 0.001102498,
	"StandardDeviationEL": 0.01403206
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Food",
	"MeanEL": 0.001722031,
	"StandardDeviationEL": 0.014234133
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Machines",
	"MeanEL": 0.001380259,
	"StandardDeviationEL": 0.003558669
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Metals",
	"MeanEL": 0.001590257,
	"StandardDeviationEL": 0.013943341
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Paper",
	"MeanEL": 0.001894417,
	"StandardDeviationEL": 0.00568599
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Services",
	"MeanEL": 0.001683496,
	"StandardDeviationEL": 0.021220962
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Textiles",
	"MeanEL": 0.002058867,
	"StandardDeviationEL": 0.008106712
}, {
	"Country": "(Canary Islands) SPAIN",
	"Industry": "Transport",
	"MeanEL": 0.001174116,
	"StandardDeviationEL": 0.012685357
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Agriculture",
	"MeanEL": 0.003007432,
	"StandardDeviationEL": 0.007498931
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Chemicals",
	"MeanEL": 0.002373967,
	"StandardDeviationEL": 0.009977779
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Construction",
	"MeanEL": 0.002400692,
	"StandardDeviationEL": 0.007227465
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Construction Materials",
	"MeanEL": 0.003730579,
	"StandardDeviationEL": 0.006494084
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Consumer Durables",
	"MeanEL": 0.007494638,
	"StandardDeviationEL": 0.007352008
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Electronics",
	"MeanEL": 0.001305363,
	"StandardDeviationEL": 0.007345528
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Finance",
	"MeanEL": 0.001082014,
	"StandardDeviationEL": 0.015594719
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Food",
	"MeanEL": 0.003978428,
	"StandardDeviationEL": 0.015796792
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Machines",
	"MeanEL": 0.006400246,
	"StandardDeviationEL": 0.005121329
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Metals",
	"MeanEL": 0.00238795,
	"StandardDeviationEL": 0.015506
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Paper",
	"MeanEL": 0.003087171,
	"StandardDeviationEL": 0.007248649
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Services",
	"MeanEL": 0.001858899,
	"StandardDeviationEL": 0.022783621
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Textiles",
	"MeanEL": 0.003803103,
	"StandardDeviationEL": 0.009669371
}, {
	"Country": "(Madeira) PORTUGAL",
	"Industry": "Transport",
	"MeanEL": 0.003681013,
	"StandardDeviationEL": 0.014248017
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Agriculture",
	"MeanEL": 0.001325766,
	"StandardDeviationEL": 0.006952799
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Chemicals",
	"MeanEL": 0.001483479,
	"StandardDeviationEL": 0.009431647
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Construction",
	"MeanEL": 0.008272966,
	"StandardDeviationEL": 0.006681334
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Construction Materials",
	"MeanEL": 0.001036153,
	"StandardDeviationEL": 0.005947953
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001336496,
	"StandardDeviationEL": 0.006805876
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Electronics",
	"MeanEL": 0.002824748,
	"StandardDeviationEL": 0.006799396
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Food",
	"MeanEL": 0.000636511,
	"StandardDeviationEL": 0.015250661
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Machines",
	"MeanEL": 0.000337233,
	"StandardDeviationEL": 0.004575197
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Metals",
	"MeanEL": 0.002785507,
	"StandardDeviationEL": 0.014959869
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Paper",
	"MeanEL": 0.002653366,
	"StandardDeviationEL": 0.006702518
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Services",
	"MeanEL": 0.000435514,
	"StandardDeviationEL": 0.02223749
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Textiles",
	"MeanEL": 0.001689814,
	"StandardDeviationEL": 0.00912324
}, {
	"Country": "(Spanish Morocco) SPAIN",
	"Industry": "Transport",
	"MeanEL": 0.002128587,
	"StandardDeviationEL": 0.013701885
}, {
	"Country": "(West Bank) ISRAEL",
	"Industry": "Food",
	"MeanEL": 0.001350426,
	"StandardDeviationEL": 0.014157578
}, {
	"Country": "(West Bank) ISRAEL",
	"Industry": "Textiles",
	"MeanEL": 0.001094778,
	"StandardDeviationEL": 0.008030157
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.001166128,
	"StandardDeviationEL": 0.006020773
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.00032217,
	"StandardDeviationEL": 0.008499621
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Construction",
	"MeanEL": 0.000460411,
	"StandardDeviationEL": 0.005749307
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.00080446,
	"StandardDeviationEL": 0.005015926
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000461036,
	"StandardDeviationEL": 0.00587385
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Electronics",
	"MeanEL": 0.000341724,
	"StandardDeviationEL": 0.005867369
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.000706058,
	"StandardDeviationEL": 0.014116561
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Food",
	"MeanEL": 0.000801663,
	"StandardDeviationEL": 0.014318634
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.001569915,
	"StandardDeviationEL": 0.003643171
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.00031011,
	"StandardDeviationEL": 0.014027842
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Paper",
	"MeanEL": 0.000475756,
	"StandardDeviationEL": 0.005770491
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Services",
	"MeanEL": 0.000471581,
	"StandardDeviationEL": 0.021305463
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Textiles",
	"MeanEL": 0.001071805,
	"StandardDeviationEL": 0.008191213
}, {
	"Country": "Abu Dhabi (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.00013789,
	"StandardDeviationEL": 0.012769858
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.001037011,
	"StandardDeviationEL": 0.005963496
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.000649132,
	"StandardDeviationEL": 0.008442344
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Construction",
	"MeanEL": 0.000846851,
	"StandardDeviationEL": 0.00569203
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.00068816,
	"StandardDeviationEL": 0.004958649
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00070941,
	"StandardDeviationEL": 0.005816573
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Electronics",
	"MeanEL": 0.001157868,
	"StandardDeviationEL": 0.005810093
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.001158447,
	"StandardDeviationEL": 0.014059284
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Food",
	"MeanEL": 0.000830665,
	"StandardDeviationEL": 0.014261357
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.000794081,
	"StandardDeviationEL": 0.003585894
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.000649133,
	"StandardDeviationEL": 0.013970565
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Paper",
	"MeanEL": 0.000714536,
	"StandardDeviationEL": 0.005713214
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Services",
	"MeanEL": 0.000942422,
	"StandardDeviationEL": 0.021248186
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Textiles",
	"MeanEL": 0.001334296,
	"StandardDeviationEL": 0.008133936
}, {
	"Country": "Ajman (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.000725667,
	"StandardDeviationEL": 0.012712582
}, {
	"Country": "Albania",
	"Industry": "Agriculture",
	"MeanEL": 0.003437358,
	"StandardDeviationEL": 0.006001724
}, {
	"Country": "Albania",
	"Industry": "Chemicals",
	"MeanEL": 0.001949751,
	"StandardDeviationEL": 0.008480572
}, {
	"Country": "Albania",
	"Industry": "Construction",
	"MeanEL": 0.001743439,
	"StandardDeviationEL": 0.005730258
}, {
	"Country": "Albania",
	"Industry": "Construction Materials",
	"MeanEL": 0.002890738,
	"StandardDeviationEL": 0.004996877
}, {
	"Country": "Albania",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003891139,
	"StandardDeviationEL": 0.005854801
}, {
	"Country": "Albania",
	"Industry": "Electronics",
	"MeanEL": 0.002780737,
	"StandardDeviationEL": 0.005848321
}, {
	"Country": "Albania",
	"Industry": "Food",
	"MeanEL": 0.003327008,
	"StandardDeviationEL": 0.014299585
}, {
	"Country": "Albania",
	"Industry": "Machines",
	"MeanEL": 0.002236343,
	"StandardDeviationEL": 0.003624122
}, {
	"Country": "Albania",
	"Industry": "Metals",
	"MeanEL": 0.002443715,
	"StandardDeviationEL": 0.014008793
}, {
	"Country": "Albania",
	"Industry": "Paper",
	"MeanEL": 0.003596222,
	"StandardDeviationEL": 0.005751442
}, {
	"Country": "Albania",
	"Industry": "Services",
	"MeanEL": 0.003570786,
	"StandardDeviationEL": 0.021286414
}, {
	"Country": "Albania",
	"Industry": "Textiles",
	"MeanEL": 0.002931804,
	"StandardDeviationEL": 0.008172164
}, {
	"Country": "Albania",
	"Industry": "Transport",
	"MeanEL": 0.00237571,
	"StandardDeviationEL": 0.01275081
}, {
	"Country": "Algeria",
	"Industry": "Agriculture",
	"MeanEL": 0.00115819,
	"StandardDeviationEL": 0.006604994
}, {
	"Country": "Algeria",
	"Industry": "Chemicals",
	"MeanEL": 0.00253138,
	"StandardDeviationEL": 0.009083842
}, {
	"Country": "Algeria",
	"Industry": "Construction",
	"MeanEL": 0.001474424,
	"StandardDeviationEL": 0.006333528
}, {
	"Country": "Algeria",
	"Industry": "Construction Materials",
	"MeanEL": 0.001064231,
	"StandardDeviationEL": 0.005600147
}, {
	"Country": "Algeria",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001302907,
	"StandardDeviationEL": 0.006458071
}, {
	"Country": "Algeria",
	"Industry": "Electronics",
	"MeanEL": 0.006008845,
	"StandardDeviationEL": 0.006451591
}, {
	"Country": "Algeria",
	"Industry": "Finance",
	"MeanEL": 0.001287179,
	"StandardDeviationEL": 0.014700782
}, {
	"Country": "Algeria",
	"Industry": "Food",
	"MeanEL": 0.00236841,
	"StandardDeviationEL": 0.014902855
}, {
	"Country": "Algeria",
	"Industry": "Machines",
	"MeanEL": 0.000841429,
	"StandardDeviationEL": 0.004227392
}, {
	"Country": "Algeria",
	"Industry": "Metals",
	"MeanEL": 0.003998075,
	"StandardDeviationEL": 0.014612063
}, {
	"Country": "Algeria",
	"Industry": "Paper",
	"MeanEL": 0.001409359,
	"StandardDeviationEL": 0.006354712
}, {
	"Country": "Algeria",
	"Industry": "Services",
	"MeanEL": 0.001997733,
	"StandardDeviationEL": 0.021889684
}, {
	"Country": "Algeria",
	"Industry": "Textiles",
	"MeanEL": 0.001587277,
	"StandardDeviationEL": 0.008775434
}, {
	"Country": "Algeria",
	"Industry": "Transport",
	"MeanEL": 0.000952271,
	"StandardDeviationEL": 0.013354079
}, {
	"Country": "American Samoa",
	"Industry": "Agriculture",
	"MeanEL": 0.003940848,
	"StandardDeviationEL": 0.006241439
}, {
	"Country": "American Samoa",
	"Industry": "Construction Materials",
	"MeanEL": 0.00638522,
	"StandardDeviationEL": 0.005236592
}, {
	"Country": "American Samoa",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003993277,
	"StandardDeviationEL": 0.006094516
}, {
	"Country": "American Samoa",
	"Industry": "Electronics",
	"MeanEL": 0.0000137255,
	"StandardDeviationEL": 0.006088036
}, {
	"Country": "American Samoa",
	"Industry": "Textiles",
	"MeanEL": 0.004051412,
	"StandardDeviationEL": 0.008411879
}, {
	"Country": "Andorra",
	"Industry": "Agriculture",
	"MeanEL": 0.001639974,
	"StandardDeviationEL": 0.006293833
}, {
	"Country": "Andorra",
	"Industry": "Chemicals",
	"MeanEL": 0.00084473,
	"StandardDeviationEL": 0.008772681
}, {
	"Country": "Andorra",
	"Industry": "Construction",
	"MeanEL": 0.001209895,
	"StandardDeviationEL": 0.006022368
}, {
	"Country": "Andorra",
	"Industry": "Construction Materials",
	"MeanEL": 0.00314413,
	"StandardDeviationEL": 0.005288986
}, {
	"Country": "Andorra",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002408269,
	"StandardDeviationEL": 0.00614691
}, {
	"Country": "Andorra",
	"Industry": "Electronics",
	"MeanEL": 0.001414043,
	"StandardDeviationEL": 0.00614043
}, {
	"Country": "Andorra",
	"Industry": "Finance",
	"MeanEL": 0.001033353,
	"StandardDeviationEL": 0.014389622
}, {
	"Country": "Andorra",
	"Industry": "Food",
	"MeanEL": 0.001878543,
	"StandardDeviationEL": 0.014591694
}, {
	"Country": "Andorra",
	"Industry": "Machines",
	"MeanEL": 0.002178139,
	"StandardDeviationEL": 0.003916231
}, {
	"Country": "Andorra",
	"Industry": "Metals",
	"MeanEL": 0.001605927,
	"StandardDeviationEL": 0.014300902
}, {
	"Country": "Andorra",
	"Industry": "Paper",
	"MeanEL": 0.000884147,
	"StandardDeviationEL": 0.006043551
}, {
	"Country": "Andorra",
	"Industry": "Services",
	"MeanEL": 0.003679163,
	"StandardDeviationEL": 0.021578524
}, {
	"Country": "Andorra",
	"Industry": "Textiles",
	"MeanEL": 0.004372497,
	"StandardDeviationEL": 0.008464274
}, {
	"Country": "Andorra",
	"Industry": "Transport",
	"MeanEL": 0.001350504,
	"StandardDeviationEL": 0.013042919
}, {
	"Country": "Angola",
	"Industry": "Chemicals",
	"MeanEL": 0.000734253,
	"StandardDeviationEL": 0.008395428
}, {
	"Country": "Angola",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000845867,
	"StandardDeviationEL": 0.005769657
}, {
	"Country": "Angola",
	"Industry": "Electronics",
	"MeanEL": 0.000735605,
	"StandardDeviationEL": 0.005763177
}, {
	"Country": "Angola",
	"Industry": "Food",
	"MeanEL": 0.001203256,
	"StandardDeviationEL": 0.014214441
}, {
	"Country": "Angola",
	"Industry": "Machines",
	"MeanEL": 0.000715724,
	"StandardDeviationEL": 0.003538978
}, {
	"Country": "Angola",
	"Industry": "Metals",
	"MeanEL": 0.000723742,
	"StandardDeviationEL": 0.013923649
}, {
	"Country": "Anguilla",
	"Industry": "Chemicals",
	"MeanEL": 0.004024839,
	"StandardDeviationEL": 0.008612956
}, {
	"Country": "Anguilla",
	"Industry": "Consumer Durables",
	"MeanEL": 0.005799009,
	"StandardDeviationEL": 0.005987185
}, {
	"Country": "Anguilla",
	"Industry": "Food",
	"MeanEL": 0.005047543,
	"StandardDeviationEL": 0.014431969
}, {
	"Country": "Anguilla",
	"Industry": "Services",
	"MeanEL": 0.003779204,
	"StandardDeviationEL": 0.021418798
}, {
	"Country": "Anguilla",
	"Industry": "Transport",
	"MeanEL": 0.002659483,
	"StandardDeviationEL": 0.012883193
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Chemicals",
	"MeanEL": 0.011540798,
	"StandardDeviationEL": 0.011524359
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Construction Materials",
	"MeanEL": 0.005460411,
	"StandardDeviationEL": 0.008040664
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Consumer Durables",
	"MeanEL": 0.012512204,
	"StandardDeviationEL": 0.008898588
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Finance",
	"MeanEL": 0.01260868,
	"StandardDeviationEL": 0.017141299
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Food",
	"MeanEL": 0.008021825,
	"StandardDeviationEL": 0.017343372
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Machines",
	"MeanEL": 0.011371374,
	"StandardDeviationEL": 0.006667909
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Services",
	"MeanEL": 0.031147984,
	"StandardDeviationEL": 0.024330201
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Textiles",
	"MeanEL": 0.012572389,
	"StandardDeviationEL": 0.011215951
}, {
	"Country": "Antigua & Barbuda",
	"Industry": "Transport",
	"MeanEL": 0.011905396,
	"StandardDeviationEL": 0.015794596
}, {
	"Country": "Argentina",
	"Industry": "Agriculture",
	"MeanEL": 0.019458185,
	"StandardDeviationEL": 0.006144122
}, {
	"Country": "Argentina",
	"Industry": "Chemicals",
	"MeanEL": 0.018741776,
	"StandardDeviationEL": 0.00862297
}, {
	"Country": "Argentina",
	"Industry": "Consumer Durables",
	"MeanEL": 0.018028774,
	"StandardDeviationEL": 0.005997199
}, {
	"Country": "Argentina",
	"Industry": "Electronics",
	"MeanEL": 0.017971394,
	"StandardDeviationEL": 0.005990719
}, {
	"Country": "Argentina",
	"Industry": "Finance",
	"MeanEL": 0.01790548,
	"StandardDeviationEL": 0.01423991
}, {
	"Country": "Argentina",
	"Industry": "Food",
	"MeanEL": 0.013631286,
	"StandardDeviationEL": 0.014441983
}, {
	"Country": "Argentina",
	"Industry": "Metals",
	"MeanEL": 0.019168985,
	"StandardDeviationEL": 0.014151191
}, {
	"Country": "Argentina",
	"Industry": "Paper",
	"MeanEL": 0.018969364,
	"StandardDeviationEL": 0.00589384
}, {
	"Country": "Argentina",
	"Industry": "Services",
	"MeanEL": 0.020219529,
	"StandardDeviationEL": 0.021428812
}, {
	"Country": "Argentina",
	"Industry": "Textiles",
	"MeanEL": 0.017546661,
	"StandardDeviationEL": 0.008314562
}, {
	"Country": "Armenia",
	"Industry": "Chemicals",
	"MeanEL": 0.00540672,
	"StandardDeviationEL": 0.008912149
}, {
	"Country": "Armenia",
	"Industry": "Construction Materials",
	"MeanEL": 0.000936822,
	"StandardDeviationEL": 0.005428454
}, {
	"Country": "Armenia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002081386,
	"StandardDeviationEL": 0.006286378
}, {
	"Country": "Armenia",
	"Industry": "Finance",
	"MeanEL": 0.001479233,
	"StandardDeviationEL": 0.014529089
}, {
	"Country": "Armenia",
	"Industry": "Food",
	"MeanEL": 0.000900533,
	"StandardDeviationEL": 0.014731162
}, {
	"Country": "Armenia",
	"Industry": "Transport",
	"MeanEL": 0.00340682,
	"StandardDeviationEL": 0.013182386
}, {
	"Country": "Aruba",
	"Industry": "Chemicals",
	"MeanEL": 0.000908137,
	"StandardDeviationEL": 0.008593824
}, {
	"Country": "Aruba",
	"Industry": "Construction",
	"MeanEL": 0.001589888,
	"StandardDeviationEL": 0.00584351
}, {
	"Country": "Aruba",
	"Industry": "Construction Materials",
	"MeanEL": 0.002379125,
	"StandardDeviationEL": 0.005110129
}, {
	"Country": "Aruba",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002890729,
	"StandardDeviationEL": 0.005968053
}, {
	"Country": "Aruba",
	"Industry": "Electronics",
	"MeanEL": 0.000691102,
	"StandardDeviationEL": 0.005961573
}, {
	"Country": "Aruba",
	"Industry": "Finance",
	"MeanEL": 0.000827222,
	"StandardDeviationEL": 0.014210764
}, {
	"Country": "Aruba",
	"Industry": "Food",
	"MeanEL": 0.001389559,
	"StandardDeviationEL": 0.014412837
}, {
	"Country": "Aruba",
	"Industry": "Machines",
	"MeanEL": 0.001682019,
	"StandardDeviationEL": 0.003737374
}, {
	"Country": "Aruba",
	"Industry": "Metals",
	"MeanEL": 0.003263703,
	"StandardDeviationEL": 0.014122045
}, {
	"Country": "Aruba",
	"Industry": "Services",
	"MeanEL": 0.001166738,
	"StandardDeviationEL": 0.021399666
}, {
	"Country": "Aruba",
	"Industry": "Textiles",
	"MeanEL": 0.003111171,
	"StandardDeviationEL": 0.008285416
}, {
	"Country": "Aruba",
	"Industry": "Transport",
	"MeanEL": 0.001623606,
	"StandardDeviationEL": 0.012864061
}, {
	"Country": "Australia",
	"Industry": "Agriculture",
	"MeanEL": 0.001709453,
	"StandardDeviationEL": 0.006402449
}, {
	"Country": "Australia",
	"Industry": "Chemicals",
	"MeanEL": 0.000990626,
	"StandardDeviationEL": 0.008881297
}, {
	"Country": "Australia",
	"Industry": "Construction",
	"MeanEL": 0.002441904,
	"StandardDeviationEL": 0.006130983
}, {
	"Country": "Australia",
	"Industry": "Construction Materials",
	"MeanEL": 0.002115492,
	"StandardDeviationEL": 0.005397602
}, {
	"Country": "Australia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000923285,
	"StandardDeviationEL": 0.006255526
}, {
	"Country": "Australia",
	"Industry": "Electronics",
	"MeanEL": 0.001537274,
	"StandardDeviationEL": 0.006249046
}, {
	"Country": "Australia",
	"Industry": "Finance",
	"MeanEL": 0.000885027,
	"StandardDeviationEL": 0.014498237
}, {
	"Country": "Australia",
	"Industry": "Food",
	"MeanEL": 0.001315762,
	"StandardDeviationEL": 0.01470031
}, {
	"Country": "Australia",
	"Industry": "Machines",
	"MeanEL": 0.001688305,
	"StandardDeviationEL": 0.004024847
}, {
	"Country": "Australia",
	"Industry": "Metals",
	"MeanEL": 0.001409907,
	"StandardDeviationEL": 0.014409518
}, {
	"Country": "Australia",
	"Industry": "Paper",
	"MeanEL": 0.000556429,
	"StandardDeviationEL": 0.006152167
}, {
	"Country": "Australia",
	"Industry": "Services",
	"MeanEL": 0.001060907,
	"StandardDeviationEL": 0.021687139
}, {
	"Country": "Australia",
	"Industry": "Textiles",
	"MeanEL": 0.002614136,
	"StandardDeviationEL": 0.008572889
}, {
	"Country": "Australia",
	"Industry": "Transport",
	"MeanEL": 0.001357642,
	"StandardDeviationEL": 0.013151535
}, {
	"Country": "Austria",
	"Industry": "Agriculture",
	"MeanEL": 0.000744264,
	"StandardDeviationEL": 0.006039583
}, {
	"Country": "Austria",
	"Industry": "Chemicals",
	"MeanEL": 0.000673391,
	"StandardDeviationEL": 0.008518431
}, {
	"Country": "Austria",
	"Industry": "Construction",
	"MeanEL": 0.000660237,
	"StandardDeviationEL": 0.005768117
}, {
	"Country": "Austria",
	"Industry": "Construction Materials",
	"MeanEL": 0.000763527,
	"StandardDeviationEL": 0.005034736
}, {
	"Country": "Austria",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000705133,
	"StandardDeviationEL": 0.00589266
}, {
	"Country": "Austria",
	"Industry": "Electronics",
	"MeanEL": 0.000816629,
	"StandardDeviationEL": 0.00588618
}, {
	"Country": "Austria",
	"Industry": "Finance",
	"MeanEL": 0.00039487,
	"StandardDeviationEL": 0.014135371
}, {
	"Country": "Austria",
	"Industry": "Food",
	"MeanEL": 0.000737233,
	"StandardDeviationEL": 0.014337444
}, {
	"Country": "Austria",
	"Industry": "Machines",
	"MeanEL": 0.00060352,
	"StandardDeviationEL": 0.003661981
}, {
	"Country": "Austria",
	"Industry": "Metals",
	"MeanEL": 0.00044415,
	"StandardDeviationEL": 0.014046652
}, {
	"Country": "Austria",
	"Industry": "Paper",
	"MeanEL": 0.000557157,
	"StandardDeviationEL": 0.005789301
}, {
	"Country": "Austria",
	"Industry": "Services",
	"MeanEL": 0.001328826,
	"StandardDeviationEL": 0.021324273
}, {
	"Country": "Austria",
	"Industry": "Textiles",
	"MeanEL": 0.001038946,
	"StandardDeviationEL": 0.008210023
}, {
	"Country": "Austria",
	"Industry": "Transport",
	"MeanEL": 0.000801547,
	"StandardDeviationEL": 0.012788668
}, {
	"Country": "Azerbaijan",
	"Industry": "Chemicals",
	"MeanEL": 0.000893084,
	"StandardDeviationEL": 0.008492048
}, {
	"Country": "Azerbaijan",
	"Industry": "Construction",
	"MeanEL": 0.0019059,
	"StandardDeviationEL": 0.005741734
}, {
	"Country": "Azerbaijan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001753422,
	"StandardDeviationEL": 0.005866277
}, {
	"Country": "Azerbaijan",
	"Industry": "Electronics",
	"MeanEL": 0.002632786,
	"StandardDeviationEL": 0.005859797
}, {
	"Country": "Azerbaijan",
	"Industry": "Machines",
	"MeanEL": 0.001688891,
	"StandardDeviationEL": 0.003635598
}, {
	"Country": "Azerbaijan",
	"Industry": "Metals",
	"MeanEL": 0.0000980085,
	"StandardDeviationEL": 0.014020269
}, {
	"Country": "Azerbaijan",
	"Industry": "Textiles",
	"MeanEL": 0.001066025,
	"StandardDeviationEL": 0.00818364
}, {
	"Country": "Azerbaijan",
	"Industry": "Transport",
	"MeanEL": 0.001479233,
	"StandardDeviationEL": 0.012762286
}, {
	"Country": "Bahamas",
	"Industry": "Chemicals",
	"MeanEL": 0.001136402,
	"StandardDeviationEL": 0.008587535
}, {
	"Country": "Bahamas",
	"Industry": "Construction",
	"MeanEL": 0.003850467,
	"StandardDeviationEL": 0.005837222
}, {
	"Country": "Bahamas",
	"Industry": "Construction Materials",
	"MeanEL": 0.002654022,
	"StandardDeviationEL": 0.005103841
}, {
	"Country": "Bahamas",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003076989,
	"StandardDeviationEL": 0.005961764
}, {
	"Country": "Bahamas",
	"Industry": "Electronics",
	"MeanEL": 0.003515318,
	"StandardDeviationEL": 0.005955284
}, {
	"Country": "Bahamas",
	"Industry": "Finance",
	"MeanEL": 0.003755867,
	"StandardDeviationEL": 0.014204476
}, {
	"Country": "Bahamas",
	"Industry": "Food",
	"MeanEL": 0.002558669,
	"StandardDeviationEL": 0.014406549
}, {
	"Country": "Bahamas",
	"Industry": "Metals",
	"MeanEL": 0.00051811,
	"StandardDeviationEL": 0.014115757
}, {
	"Country": "Bahamas",
	"Industry": "Services",
	"MeanEL": 0.001791817,
	"StandardDeviationEL": 0.021393378
}, {
	"Country": "Bahamas",
	"Industry": "Textiles",
	"MeanEL": 0.004333532,
	"StandardDeviationEL": 0.008279128
}, {
	"Country": "Bahamas",
	"Industry": "Transport",
	"MeanEL": 0.002055936,
	"StandardDeviationEL": 0.012857773
}, {
	"Country": "Bahrain",
	"Industry": "Agriculture",
	"MeanEL": 0.000676447,
	"StandardDeviationEL": 0.006066591
}, {
	"Country": "Bahrain",
	"Industry": "Chemicals",
	"MeanEL": 0.00049669,
	"StandardDeviationEL": 0.008545439
}, {
	"Country": "Bahrain",
	"Industry": "Construction",
	"MeanEL": 0.00220699,
	"StandardDeviationEL": 0.005795125
}, {
	"Country": "Bahrain",
	"Industry": "Construction Materials",
	"MeanEL": 0.000779554,
	"StandardDeviationEL": 0.005061744
}, {
	"Country": "Bahrain",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000837921,
	"StandardDeviationEL": 0.005919668
}, {
	"Country": "Bahrain",
	"Industry": "Electronics",
	"MeanEL": 0.000622038,
	"StandardDeviationEL": 0.005913188
}, {
	"Country": "Bahrain",
	"Industry": "Finance",
	"MeanEL": 0.001055278,
	"StandardDeviationEL": 0.01416238
}, {
	"Country": "Bahrain",
	"Industry": "Food",
	"MeanEL": 0.00111669,
	"StandardDeviationEL": 0.014364452
}, {
	"Country": "Bahrain",
	"Industry": "Machines",
	"MeanEL": 0.001760141,
	"StandardDeviationEL": 0.003688989
}, {
	"Country": "Bahrain",
	"Industry": "Metals",
	"MeanEL": 0.000426361,
	"StandardDeviationEL": 0.01407366
}, {
	"Country": "Bahrain",
	"Industry": "Paper",
	"MeanEL": 0.000776828,
	"StandardDeviationEL": 0.005816309
}, {
	"Country": "Bahrain",
	"Industry": "Services",
	"MeanEL": 0.001008423,
	"StandardDeviationEL": 0.021351282
}, {
	"Country": "Bahrain",
	"Industry": "Textiles",
	"MeanEL": 0.000770594,
	"StandardDeviationEL": 0.008237031
}, {
	"Country": "Bahrain",
	"Industry": "Transport",
	"MeanEL": 0.001300555,
	"StandardDeviationEL": 0.012815677
}, {
	"Country": "Bangladesh",
	"Industry": "Agriculture",
	"MeanEL": 0.003568471,
	"StandardDeviationEL": 0.006172594
}, {
	"Country": "Bangladesh",
	"Industry": "Chemicals",
	"MeanEL": 0.001343225,
	"StandardDeviationEL": 0.008651442
}, {
	"Country": "Bangladesh",
	"Industry": "Construction Materials",
	"MeanEL": 0.001820252,
	"StandardDeviationEL": 0.005167748
}, {
	"Country": "Bangladesh",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001116665,
	"StandardDeviationEL": 0.006025671
}, {
	"Country": "Bangladesh",
	"Industry": "Electronics",
	"MeanEL": 0.001563381,
	"StandardDeviationEL": 0.006019191
}, {
	"Country": "Bangladesh",
	"Industry": "Finance",
	"MeanEL": 0.00339738,
	"StandardDeviationEL": 0.014268383
}, {
	"Country": "Bangladesh",
	"Industry": "Food",
	"MeanEL": 0.001440063,
	"StandardDeviationEL": 0.014470456
}, {
	"Country": "Bangladesh",
	"Industry": "Machines",
	"MeanEL": 0.001898324,
	"StandardDeviationEL": 0.003794992
}, {
	"Country": "Bangladesh",
	"Industry": "Metals",
	"MeanEL": 0.001170938,
	"StandardDeviationEL": 0.014179664
}, {
	"Country": "Bangladesh",
	"Industry": "Services",
	"MeanEL": 0.003417152,
	"StandardDeviationEL": 0.021457285
}, {
	"Country": "Bangladesh",
	"Industry": "Textiles",
	"MeanEL": 0.001036397,
	"StandardDeviationEL": 0.008343035
}, {
	"Country": "Bangladesh",
	"Industry": "Transport",
	"MeanEL": 0.001292589,
	"StandardDeviationEL": 0.01292168
}, {
	"Country": "Barbados",
	"Industry": "Agriculture",
	"MeanEL": 0.003945775,
	"StandardDeviationEL": 0.008737978
}, {
	"Country": "Barbados",
	"Industry": "Chemicals",
	"MeanEL": 0.003154351,
	"StandardDeviationEL": 0.011216826
}, {
	"Country": "Barbados",
	"Industry": "Construction",
	"MeanEL": 0.004360939,
	"StandardDeviationEL": 0.008466512
}, {
	"Country": "Barbados",
	"Industry": "Construction Materials",
	"MeanEL": 0.003392215,
	"StandardDeviationEL": 0.007733131
}, {
	"Country": "Barbados",
	"Industry": "Consumer Durables",
	"MeanEL": 0.004584246,
	"StandardDeviationEL": 0.008591055
}, {
	"Country": "Barbados",
	"Industry": "Electronics",
	"MeanEL": 0.0083685,
	"StandardDeviationEL": 0.008584575
}, {
	"Country": "Barbados",
	"Industry": "Finance",
	"MeanEL": 0.003483744,
	"StandardDeviationEL": 0.016833766
}, {
	"Country": "Barbados",
	"Industry": "Food",
	"MeanEL": 0.00507345,
	"StandardDeviationEL": 0.017035839
}, {
	"Country": "Barbados",
	"Industry": "Machines",
	"MeanEL": 0.003346639,
	"StandardDeviationEL": 0.006360376
}, {
	"Country": "Barbados",
	"Industry": "Metals",
	"MeanEL": 0.011823276,
	"StandardDeviationEL": 0.016745047
}, {
	"Country": "Barbados",
	"Industry": "Paper",
	"MeanEL": 0.004522854,
	"StandardDeviationEL": 0.008487696
}, {
	"Country": "Barbados",
	"Industry": "Services",
	"MeanEL": 0.002675457,
	"StandardDeviationEL": 0.024022668
}, {
	"Country": "Barbados",
	"Industry": "Textiles",
	"MeanEL": 0.00352642,
	"StandardDeviationEL": 0.010908418
}, {
	"Country": "Barbados",
	"Industry": "Transport",
	"MeanEL": 0.021343165,
	"StandardDeviationEL": 0.015487063
}, {
	"Country": "Belarus",
	"Industry": "Agriculture",
	"MeanEL": 0.01734225,
	"StandardDeviationEL": 0.015259335
}, {
	"Country": "Belarus",
	"Industry": "Chemicals",
	"MeanEL": 0.016236461,
	"StandardDeviationEL": 0.017738183
}, {
	"Country": "Belarus",
	"Industry": "Construction Materials",
	"MeanEL": 0.030825346,
	"StandardDeviationEL": 0.014254488
}, {
	"Country": "Belarus",
	"Industry": "Consumer Durables",
	"MeanEL": 0.014571036,
	"StandardDeviationEL": 0.015112412
}, {
	"Country": "Belarus",
	"Industry": "Electronics",
	"MeanEL": 0.003511923,
	"StandardDeviationEL": 0.015105932
}, {
	"Country": "Belarus",
	"Industry": "Food",
	"MeanEL": 0.017462967,
	"StandardDeviationEL": 0.023557196
}, {
	"Country": "Belarus",
	"Industry": "Machines",
	"MeanEL": 0.020872998,
	"StandardDeviationEL": 0.012881733
}, {
	"Country": "Belarus",
	"Industry": "Metals",
	"MeanEL": 0.022521271,
	"StandardDeviationEL": 0.023266404
}, {
	"Country": "Belarus",
	"Industry": "Paper",
	"MeanEL": 0.003080149,
	"StandardDeviationEL": 0.015009053
}, {
	"Country": "Belarus",
	"Industry": "Services",
	"MeanEL": 0.023432002,
	"StandardDeviationEL": 0.030544026
}, {
	"Country": "Belarus",
	"Industry": "Textiles",
	"MeanEL": 0.024291428,
	"StandardDeviationEL": 0.017429775
}, {
	"Country": "Belarus",
	"Industry": "Transport",
	"MeanEL": 0.077398532,
	"StandardDeviationEL": 0.022008421
}, {
	"Country": "Belgium",
	"Industry": "Agriculture",
	"MeanEL": 0.00091052,
	"StandardDeviationEL": 0.006289248
}, {
	"Country": "Belgium",
	"Industry": "Chemicals",
	"MeanEL": 0.000849178,
	"StandardDeviationEL": 0.008768095
}, {
	"Country": "Belgium",
	"Industry": "Construction",
	"MeanEL": 0.001045872,
	"StandardDeviationEL": 0.006017782
}, {
	"Country": "Belgium",
	"Industry": "Construction Materials",
	"MeanEL": 0.00077111,
	"StandardDeviationEL": 0.005284401
}, {
	"Country": "Belgium",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000725094,
	"StandardDeviationEL": 0.006142325
}, {
	"Country": "Belgium",
	"Industry": "Electronics",
	"MeanEL": 0.000875065,
	"StandardDeviationEL": 0.006135844
}, {
	"Country": "Belgium",
	"Industry": "Finance",
	"MeanEL": 0.001588362,
	"StandardDeviationEL": 0.014385036
}, {
	"Country": "Belgium",
	"Industry": "Food",
	"MeanEL": 0.000682355,
	"StandardDeviationEL": 0.014587109
}, {
	"Country": "Belgium",
	"Industry": "Machines",
	"MeanEL": 0.000975132,
	"StandardDeviationEL": 0.003911646
}, {
	"Country": "Belgium",
	"Industry": "Metals",
	"MeanEL": 0.000983088,
	"StandardDeviationEL": 0.014296317
}, {
	"Country": "Belgium",
	"Industry": "Paper",
	"MeanEL": 0.001040447,
	"StandardDeviationEL": 0.006038966
}, {
	"Country": "Belgium",
	"Industry": "Services",
	"MeanEL": 0.001027799,
	"StandardDeviationEL": 0.021573938
}, {
	"Country": "Belgium",
	"Industry": "Textiles",
	"MeanEL": 0.000845206,
	"StandardDeviationEL": 0.008459688
}, {
	"Country": "Belgium",
	"Industry": "Transport",
	"MeanEL": 0.001121494,
	"StandardDeviationEL": 0.013038333
}, {
	"Country": "Belize",
	"Industry": "Agriculture",
	"MeanEL": 0.036527545,
	"StandardDeviationEL": 0.006211455
}, {
	"Country": "Belize",
	"Industry": "Chemicals",
	"MeanEL": 0.035331712,
	"StandardDeviationEL": 0.008690303
}, {
	"Country": "Belize",
	"Industry": "Consumer Durables",
	"MeanEL": 0.011067804,
	"StandardDeviationEL": 0.006064532
}, {
	"Country": "Belize",
	"Industry": "Electronics",
	"MeanEL": 0.034303307,
	"StandardDeviationEL": 0.006058051
}, {
	"Country": "Belize",
	"Industry": "Finance",
	"MeanEL": 0.034353552,
	"StandardDeviationEL": 0.014307243
}, {
	"Country": "Belize",
	"Industry": "Food",
	"MeanEL": 0.026278738,
	"StandardDeviationEL": 0.014509316
}, {
	"Country": "Benin",
	"Industry": "Agriculture",
	"MeanEL": 0.002113648,
	"StandardDeviationEL": 0.005909642
}, {
	"Country": "Benin",
	"Industry": "Construction",
	"MeanEL": 0.001884219,
	"StandardDeviationEL": 0.005638177
}, {
	"Country": "Benin",
	"Industry": "Construction Materials",
	"MeanEL": 0.000988416,
	"StandardDeviationEL": 0.004904795
}, {
	"Country": "Benin",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001263466,
	"StandardDeviationEL": 0.005762719
}, {
	"Country": "Benin",
	"Industry": "Electronics",
	"MeanEL": 0.001855518,
	"StandardDeviationEL": 0.005756239
}, {
	"Country": "Benin",
	"Industry": "Food",
	"MeanEL": 0.001221389,
	"StandardDeviationEL": 0.014207503
}, {
	"Country": "Benin",
	"Industry": "Paper",
	"MeanEL": 0.00184441,
	"StandardDeviationEL": 0.00565936
}, {
	"Country": "Benin",
	"Industry": "Services",
	"MeanEL": 0.001528133,
	"StandardDeviationEL": 0.021194333
}, {
	"Country": "Bermuda",
	"Industry": "Agriculture",
	"MeanEL": 0.00025129,
	"StandardDeviationEL": 0.007787739
}, {
	"Country": "Bermuda",
	"Industry": "Chemicals",
	"MeanEL": 0.001554102,
	"StandardDeviationEL": 0.010266587
}, {
	"Country": "Bermuda",
	"Industry": "Construction",
	"MeanEL": 0.002643404,
	"StandardDeviationEL": 0.007516273
}, {
	"Country": "Bermuda",
	"Industry": "Construction Materials",
	"MeanEL": 0.000962349,
	"StandardDeviationEL": 0.006782892
}, {
	"Country": "Bermuda",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000338142,
	"StandardDeviationEL": 0.007640816
}, {
	"Country": "Bermuda",
	"Industry": "Electronics",
	"MeanEL": 0.002917258,
	"StandardDeviationEL": 0.007634336
}, {
	"Country": "Bermuda",
	"Industry": "Finance",
	"MeanEL": 0.013783994,
	"StandardDeviationEL": 0.015883527
}, {
	"Country": "Bermuda",
	"Industry": "Food",
	"MeanEL": 0.001337587,
	"StandardDeviationEL": 0.0160856
}, {
	"Country": "Bermuda",
	"Industry": "Machines",
	"MeanEL": 0.00216668,
	"StandardDeviationEL": 0.005410137
}, {
	"Country": "Bermuda",
	"Industry": "Metals",
	"MeanEL": 0.001082823,
	"StandardDeviationEL": 0.015794808
}, {
	"Country": "Bermuda",
	"Industry": "Paper",
	"MeanEL": 0.002445193,
	"StandardDeviationEL": 0.007537457
}, {
	"Country": "Bermuda",
	"Industry": "Services",
	"MeanEL": 0.001912514,
	"StandardDeviationEL": 0.023072429
}, {
	"Country": "Bermuda",
	"Industry": "Textiles",
	"MeanEL": 0.004535512,
	"StandardDeviationEL": 0.009958179
}, {
	"Country": "Bermuda",
	"Industry": "Transport",
	"MeanEL": 0.002088038,
	"StandardDeviationEL": 0.014536824
}, {
	"Country": "Bhutan",
	"Industry": "Finance",
	"MeanEL": 0.009037145,
	"StandardDeviationEL": 0.013934201
}, {
	"Country": "Bolivia",
	"Industry": "Chemicals",
	"MeanEL": 0.002184942,
	"StandardDeviationEL": 0.009251104
}, {
	"Country": "Bolivia",
	"Industry": "Construction Materials",
	"MeanEL": 0.00590888,
	"StandardDeviationEL": 0.005767409
}, {
	"Country": "Bolivia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001098583,
	"StandardDeviationEL": 0.006625333
}, {
	"Country": "Bolivia",
	"Industry": "Electronics",
	"MeanEL": 0.001135826,
	"StandardDeviationEL": 0.006618853
}, {
	"Country": "Bolivia",
	"Industry": "Finance",
	"MeanEL": 0.001318585,
	"StandardDeviationEL": 0.014868045
}, {
	"Country": "Bolivia",
	"Industry": "Machines",
	"MeanEL": 0.001555895,
	"StandardDeviationEL": 0.004394654
}, {
	"Country": "Bolivia",
	"Industry": "Metals",
	"MeanEL": 0.003255945,
	"StandardDeviationEL": 0.014779325
}, {
	"Country": "Bolivia",
	"Industry": "Paper",
	"MeanEL": 0.001841658,
	"StandardDeviationEL": 0.006521974
}, {
	"Country": "Bolivia",
	"Industry": "Services",
	"MeanEL": 0.001421306,
	"StandardDeviationEL": 0.022056947
}, {
	"Country": "Bolivia",
	"Industry": "Textiles",
	"MeanEL": 0.001402827,
	"StandardDeviationEL": 0.008942696
}, {
	"Country": "Bolivia",
	"Industry": "Transport",
	"MeanEL": 0.007192615,
	"StandardDeviationEL": 0.013521342
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Chemicals",
	"MeanEL": 0.003851,
	"StandardDeviationEL": 0.008422495
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Construction",
	"MeanEL": 0.003239216,
	"StandardDeviationEL": 0.005672181
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Construction Materials",
	"MeanEL": 0.003969637,
	"StandardDeviationEL": 0.0049388
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002271479,
	"StandardDeviationEL": 0.005796724
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Electronics",
	"MeanEL": 0.003324863,
	"StandardDeviationEL": 0.005790244
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Food",
	"MeanEL": 0.003351604,
	"StandardDeviationEL": 0.014241508
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Paper",
	"MeanEL": 0.003549467,
	"StandardDeviationEL": 0.005693365
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Services",
	"MeanEL": 0.003552549,
	"StandardDeviationEL": 0.021228337
}, {
	"Country": "Bonaire, Sint Eustatius and Saba",
	"Industry": "Transport",
	"MeanEL": 0.001563466,
	"StandardDeviationEL": 0.012692732
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Agriculture",
	"MeanEL": 0.00262909,
	"StandardDeviationEL": 0.005990716
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Chemicals",
	"MeanEL": 0.003881222,
	"StandardDeviationEL": 0.008469564
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Construction",
	"MeanEL": 0.001903931,
	"StandardDeviationEL": 0.005719251
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Construction Materials",
	"MeanEL": 0.002953423,
	"StandardDeviationEL": 0.004985869
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002275837,
	"StandardDeviationEL": 0.005843793
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Electronics",
	"MeanEL": 0.003089369,
	"StandardDeviationEL": 0.005837313
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Food",
	"MeanEL": 0.003068296,
	"StandardDeviationEL": 0.014288577
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Machines",
	"MeanEL": 0.003246847,
	"StandardDeviationEL": 0.003613114
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Metals",
	"MeanEL": 0.002700102,
	"StandardDeviationEL": 0.013997785
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Paper",
	"MeanEL": 0.001821614,
	"StandardDeviationEL": 0.005740434
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Services",
	"MeanEL": 0.003629244,
	"StandardDeviationEL": 0.021275407
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Textiles",
	"MeanEL": 0.002515175,
	"StandardDeviationEL": 0.008161156
}, {
	"Country": "Bosnia & Herzegovina",
	"Industry": "Transport",
	"MeanEL": 0.00392468,
	"StandardDeviationEL": 0.012739802
}, {
	"Country": "Botswana",
	"Industry": "Chemicals",
	"MeanEL": 0.000174256,
	"StandardDeviationEL": 0.008540265
}, {
	"Country": "Botswana",
	"Industry": "Construction Materials",
	"MeanEL": 0.002045214,
	"StandardDeviationEL": 0.00505657
}, {
	"Country": "Botswana",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000949358,
	"StandardDeviationEL": 0.005914494
}, {
	"Country": "Botswana",
	"Industry": "Electronics",
	"MeanEL": 0.000507704,
	"StandardDeviationEL": 0.005908013
}, {
	"Country": "Botswana",
	"Industry": "Finance",
	"MeanEL": 0.000686158,
	"StandardDeviationEL": 0.014157205
}, {
	"Country": "Botswana",
	"Industry": "Machines",
	"MeanEL": 0.001529946,
	"StandardDeviationEL": 0.003683815
}, {
	"Country": "Botswana",
	"Industry": "Metals",
	"MeanEL": 0.000954084,
	"StandardDeviationEL": 0.014068486
}, {
	"Country": "Botswana",
	"Industry": "Paper",
	"MeanEL": 0.000407549,
	"StandardDeviationEL": 0.005811135
}, {
	"Country": "Botswana",
	"Industry": "Services",
	"MeanEL": 0.0000954495,
	"StandardDeviationEL": 0.021346107
}, {
	"Country": "Botswana",
	"Industry": "Textiles",
	"MeanEL": 0.000520038,
	"StandardDeviationEL": 0.008231857
}, {
	"Country": "Botswana",
	"Industry": "Transport",
	"MeanEL": 0.001332861,
	"StandardDeviationEL": 0.012810502
}, {
	"Country": "Brazil",
	"Industry": "Agriculture",
	"MeanEL": 0.003045361,
	"StandardDeviationEL": 0.006388156
}, {
	"Country": "Brazil",
	"Industry": "Chemicals",
	"MeanEL": 0.002193944,
	"StandardDeviationEL": 0.008867003
}, {
	"Country": "Brazil",
	"Industry": "Construction",
	"MeanEL": 0.002429003,
	"StandardDeviationEL": 0.00611669
}, {
	"Country": "Brazil",
	"Industry": "Construction Materials",
	"MeanEL": 0.0052829,
	"StandardDeviationEL": 0.005383309
}, {
	"Country": "Brazil",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001563855,
	"StandardDeviationEL": 0.006241233
}, {
	"Country": "Brazil",
	"Industry": "Electronics",
	"MeanEL": 0.002312246,
	"StandardDeviationEL": 0.006234752
}, {
	"Country": "Brazil",
	"Industry": "Finance",
	"MeanEL": 0.002512114,
	"StandardDeviationEL": 0.014483944
}, {
	"Country": "Brazil",
	"Industry": "Food",
	"MeanEL": 0.001714764,
	"StandardDeviationEL": 0.014686017
}, {
	"Country": "Brazil",
	"Industry": "Machines",
	"MeanEL": 0.005319542,
	"StandardDeviationEL": 0.004010554
}, {
	"Country": "Brazil",
	"Industry": "Metals",
	"MeanEL": 0.000710492,
	"StandardDeviationEL": 0.014395225
}, {
	"Country": "Brazil",
	"Industry": "Paper",
	"MeanEL": 0.004819986,
	"StandardDeviationEL": 0.006137874
}, {
	"Country": "Brazil",
	"Industry": "Services",
	"MeanEL": 0.001281884,
	"StandardDeviationEL": 0.021672846
}, {
	"Country": "Brazil",
	"Industry": "Textiles",
	"MeanEL": 0.005444173,
	"StandardDeviationEL": 0.008558596
}, {
	"Country": "Brazil",
	"Industry": "Transport",
	"MeanEL": 0.001337177,
	"StandardDeviationEL": 0.013137241
}, {
	"Country": "Brunei",
	"Industry": "Chemicals",
	"MeanEL": 0.000312059,
	"StandardDeviationEL": 0.00842674
}, {
	"Country": "Brunei",
	"Industry": "Construction",
	"MeanEL": 0.000338086,
	"StandardDeviationEL": 0.005676426
}, {
	"Country": "Brunei",
	"Industry": "Construction Materials",
	"MeanEL": 0.001035262,
	"StandardDeviationEL": 0.004943045
}, {
	"Country": "Brunei",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000834108,
	"StandardDeviationEL": 0.005800969
}, {
	"Country": "Brunei",
	"Industry": "Electronics",
	"MeanEL": 0.000608448,
	"StandardDeviationEL": 0.005794488
}, {
	"Country": "Brunei",
	"Industry": "Food",
	"MeanEL": 0.000914717,
	"StandardDeviationEL": 0.014245753
}, {
	"Country": "Brunei",
	"Industry": "Machines",
	"MeanEL": 0.000822298,
	"StandardDeviationEL": 0.00357029
}, {
	"Country": "Brunei",
	"Industry": "Metals",
	"MeanEL": 0.000928471,
	"StandardDeviationEL": 0.013954961
}, {
	"Country": "Brunei",
	"Industry": "Services",
	"MeanEL": 0.0000259356,
	"StandardDeviationEL": 0.021232582
}, {
	"Country": "Brunei",
	"Industry": "Transport",
	"MeanEL": 0.001488521,
	"StandardDeviationEL": 0.012696977
}, {
	"Country": "Bulgaria",
	"Industry": "Agriculture",
	"MeanEL": 0.0014373,
	"StandardDeviationEL": 0.006313212
}, {
	"Country": "Bulgaria",
	"Industry": "Chemicals",
	"MeanEL": 0.001435553,
	"StandardDeviationEL": 0.00879206
}, {
	"Country": "Bulgaria",
	"Industry": "Construction",
	"MeanEL": 0.002350464,
	"StandardDeviationEL": 0.006041746
}, {
	"Country": "Bulgaria",
	"Industry": "Construction Materials",
	"MeanEL": 0.002273544,
	"StandardDeviationEL": 0.005308365
}, {
	"Country": "Bulgaria",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001777403,
	"StandardDeviationEL": 0.006166289
}, {
	"Country": "Bulgaria",
	"Industry": "Electronics",
	"MeanEL": 0.000952511,
	"StandardDeviationEL": 0.006159808
}, {
	"Country": "Bulgaria",
	"Industry": "Finance",
	"MeanEL": 0.001613804,
	"StandardDeviationEL": 0.014409
}, {
	"Country": "Bulgaria",
	"Industry": "Food",
	"MeanEL": 0.001514093,
	"StandardDeviationEL": 0.014611073
}, {
	"Country": "Bulgaria",
	"Industry": "Machines",
	"MeanEL": 0.001445541,
	"StandardDeviationEL": 0.00393561
}, {
	"Country": "Bulgaria",
	"Industry": "Metals",
	"MeanEL": 0.001557225,
	"StandardDeviationEL": 0.014320281
}, {
	"Country": "Bulgaria",
	"Industry": "Paper",
	"MeanEL": 0.001385911,
	"StandardDeviationEL": 0.00606293
}, {
	"Country": "Bulgaria",
	"Industry": "Services",
	"MeanEL": 0.001098222,
	"StandardDeviationEL": 0.021597902
}, {
	"Country": "Bulgaria",
	"Industry": "Textiles",
	"MeanEL": 0.002503178,
	"StandardDeviationEL": 0.008483652
}, {
	"Country": "Bulgaria",
	"Industry": "Transport",
	"MeanEL": 0.002776102,
	"StandardDeviationEL": 0.013062297
}, {
	"Country": "Burkina Faso",
	"Industry": "Chemicals",
	"MeanEL": 0.002249422,
	"StandardDeviationEL": 0.008389127
}, {
	"Country": "Burkina Faso",
	"Industry": "Construction Materials",
	"MeanEL": 0.001684814,
	"StandardDeviationEL": 0.004905432
}, {
	"Country": "Burkina Faso",
	"Industry": "Food",
	"MeanEL": 0.001836873,
	"StandardDeviationEL": 0.01420814
}, {
	"Country": "Burkina Faso",
	"Industry": "Metals",
	"MeanEL": 0.001818226,
	"StandardDeviationEL": 0.013917348
}, {
	"Country": "Burkina Faso",
	"Industry": "Paper",
	"MeanEL": 0.001618363,
	"StandardDeviationEL": 0.005659997
}, {
	"Country": "Cambodia",
	"Industry": "Chemicals",
	"MeanEL": 0.001098603,
	"StandardDeviationEL": 0.008360815
}, {
	"Country": "Cambodia",
	"Industry": "Construction",
	"MeanEL": 0.001293668,
	"StandardDeviationEL": 0.005610502
}, {
	"Country": "Cambodia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001060031,
	"StandardDeviationEL": 0.005735044
}, {
	"Country": "Cambodia",
	"Industry": "Electronics",
	"MeanEL": 0.000994802,
	"StandardDeviationEL": 0.005728564
}, {
	"Country": "Cambodia",
	"Industry": "Finance",
	"MeanEL": 0.001795055,
	"StandardDeviationEL": 0.013977756
}, {
	"Country": "Cambodia",
	"Industry": "Food",
	"MeanEL": 0.001593188,
	"StandardDeviationEL": 0.014179829
}, {
	"Country": "Cambodia",
	"Industry": "Paper",
	"MeanEL": 0.001591638,
	"StandardDeviationEL": 0.005631686
}, {
	"Country": "Cambodia",
	"Industry": "Textiles",
	"MeanEL": 0.001564732,
	"StandardDeviationEL": 0.008052408
}, {
	"Country": "Cambodia",
	"Industry": "Transport",
	"MeanEL": 0.001533728,
	"StandardDeviationEL": 0.012631053
}, {
	"Country": "Cameroon",
	"Industry": "Agriculture",
	"MeanEL": 0.001204676,
	"StandardDeviationEL": 0.006234244
}, {
	"Country": "Cameroon",
	"Industry": "Chemicals",
	"MeanEL": 0.001636857,
	"StandardDeviationEL": 0.008713092
}, {
	"Country": "Cameroon",
	"Industry": "Construction",
	"MeanEL": 0.001601618,
	"StandardDeviationEL": 0.005962779
}, {
	"Country": "Cameroon",
	"Industry": "Construction Materials",
	"MeanEL": 0.001648647,
	"StandardDeviationEL": 0.005229397
}, {
	"Country": "Cameroon",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001783082,
	"StandardDeviationEL": 0.006087321
}, {
	"Country": "Cameroon",
	"Industry": "Electronics",
	"MeanEL": 0.00184092,
	"StandardDeviationEL": 0.006080841
}, {
	"Country": "Cameroon",
	"Industry": "Finance",
	"MeanEL": 0.001332478,
	"StandardDeviationEL": 0.014330033
}, {
	"Country": "Cameroon",
	"Industry": "Food",
	"MeanEL": 0.001745111,
	"StandardDeviationEL": 0.014532105
}, {
	"Country": "Cameroon",
	"Industry": "Machines",
	"MeanEL": 0.001816219,
	"StandardDeviationEL": 0.003856642
}, {
	"Country": "Cameroon",
	"Industry": "Metals",
	"MeanEL": 0.00149132,
	"StandardDeviationEL": 0.014241313
}, {
	"Country": "Cameroon",
	"Industry": "Paper",
	"MeanEL": 0.001818762,
	"StandardDeviationEL": 0.005983962
}, {
	"Country": "Cameroon",
	"Industry": "Services",
	"MeanEL": 0.004158071,
	"StandardDeviationEL": 0.021518935
}, {
	"Country": "Cameroon",
	"Industry": "Textiles",
	"MeanEL": 0.002016653,
	"StandardDeviationEL": 0.008404684
}, {
	"Country": "Cameroon",
	"Industry": "Transport",
	"MeanEL": 0.002991711,
	"StandardDeviationEL": 0.01298333
}, {
	"Country": "Canada",
	"Industry": "Agriculture",
	"MeanEL": 0.001409952,
	"StandardDeviationEL": 0.00630328
}, {
	"Country": "Canada",
	"Industry": "Chemicals",
	"MeanEL": 0.001038288,
	"StandardDeviationEL": 0.008782128
}, {
	"Country": "Canada",
	"Industry": "Construction",
	"MeanEL": 0.002686641,
	"StandardDeviationEL": 0.006031815
}, {
	"Country": "Canada",
	"Industry": "Construction Materials",
	"MeanEL": 0.002190607,
	"StandardDeviationEL": 0.005298434
}, {
	"Country": "Canada",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001967385,
	"StandardDeviationEL": 0.006156357
}, {
	"Country": "Canada",
	"Industry": "Electronics",
	"MeanEL": 0.000838116,
	"StandardDeviationEL": 0.006149877
}, {
	"Country": "Canada",
	"Industry": "Finance",
	"MeanEL": 0.000716257,
	"StandardDeviationEL": 0.014399069
}, {
	"Country": "Canada",
	"Industry": "Food",
	"MeanEL": 0.002490145,
	"StandardDeviationEL": 0.014601142
}, {
	"Country": "Canada",
	"Industry": "Machines",
	"MeanEL": 0.001811506,
	"StandardDeviationEL": 0.003925678
}, {
	"Country": "Canada",
	"Industry": "Metals",
	"MeanEL": 0.001871683,
	"StandardDeviationEL": 0.014310349
}, {
	"Country": "Canada",
	"Industry": "Paper",
	"MeanEL": 0.001977171,
	"StandardDeviationEL": 0.006052999
}, {
	"Country": "Canada",
	"Industry": "Services",
	"MeanEL": 0.00250882,
	"StandardDeviationEL": 0.021587971
}, {
	"Country": "Canada",
	"Industry": "Textiles",
	"MeanEL": 0.002275549,
	"StandardDeviationEL": 0.008473721
}, {
	"Country": "Canada",
	"Industry": "Transport",
	"MeanEL": 0.001612311,
	"StandardDeviationEL": 0.013052366
}, {
	"Country": "Cape Verde",
	"Industry": "Agriculture",
	"MeanEL": 0.00262573,
	"StandardDeviationEL": 0.006043496
}, {
	"Country": "Cape Verde",
	"Industry": "Chemicals",
	"MeanEL": 0.001391725,
	"StandardDeviationEL": 0.008522344
}, {
	"Country": "Cape Verde",
	"Industry": "Construction Materials",
	"MeanEL": 0.001507785,
	"StandardDeviationEL": 0.005038649
}, {
	"Country": "Cape Verde",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001606225,
	"StandardDeviationEL": 0.005896573
}, {
	"Country": "Cape Verde",
	"Industry": "Electronics",
	"MeanEL": 0.001732413,
	"StandardDeviationEL": 0.005890093
}, {
	"Country": "Cape Verde",
	"Industry": "Food",
	"MeanEL": 0.001603954,
	"StandardDeviationEL": 0.014341357
}, {
	"Country": "Cape Verde",
	"Industry": "Metals",
	"MeanEL": 0.001787495,
	"StandardDeviationEL": 0.014050565
}, {
	"Country": "Cape Verde",
	"Industry": "Paper",
	"MeanEL": 0.002307272,
	"StandardDeviationEL": 0.005793214
}, {
	"Country": "Cape Verde",
	"Industry": "Textiles",
	"MeanEL": 0.000938051,
	"StandardDeviationEL": 0.008213936
}, {
	"Country": "Cape Verde",
	"Industry": "Transport",
	"MeanEL": 0.001484753,
	"StandardDeviationEL": 0.012792582
}, {
	"Country": "Cayman Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.002554409,
	"StandardDeviationEL": 0.009499481
}, {
	"Country": "Cayman Islands",
	"Industry": "Construction",
	"MeanEL": 0.004205316,
	"StandardDeviationEL": 0.006749167
}, {
	"Country": "Cayman Islands",
	"Industry": "Construction Materials",
	"MeanEL": 0.002264142,
	"StandardDeviationEL": 0.006015786
}, {
	"Country": "Cayman Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002361984,
	"StandardDeviationEL": 0.00687371
}, {
	"Country": "Cayman Islands",
	"Industry": "Electronics",
	"MeanEL": 0.001271258,
	"StandardDeviationEL": 0.00686723
}, {
	"Country": "Cayman Islands",
	"Industry": "Finance",
	"MeanEL": 0.004579393,
	"StandardDeviationEL": 0.015116422
}, {
	"Country": "Cayman Islands",
	"Industry": "Food",
	"MeanEL": 0.004335267,
	"StandardDeviationEL": 0.015318494
}, {
	"Country": "Cayman Islands",
	"Industry": "Machines",
	"MeanEL": 0.009551518,
	"StandardDeviationEL": 0.004643031
}, {
	"Country": "Cayman Islands",
	"Industry": "Metals",
	"MeanEL": 0.000786963,
	"StandardDeviationEL": 0.015027702
}, {
	"Country": "Cayman Islands",
	"Industry": "Paper",
	"MeanEL": 0.001824184,
	"StandardDeviationEL": 0.006770351
}, {
	"Country": "Cayman Islands",
	"Industry": "Services",
	"MeanEL": 0.005197276,
	"StandardDeviationEL": 0.022305324
}, {
	"Country": "Cayman Islands",
	"Industry": "Textiles",
	"MeanEL": 0.002339856,
	"StandardDeviationEL": 0.009191073
}, {
	"Country": "Cayman Islands",
	"Industry": "Transport",
	"MeanEL": 0.001252432,
	"StandardDeviationEL": 0.013769719
}, {
	"Country": "Chad",
	"Industry": "Food",
	"MeanEL": 0.02289732,
	"StandardDeviationEL": 0.014136274
}, {
	"Country": "Chile",
	"Industry": "Agriculture",
	"MeanEL": 0.003630897,
	"StandardDeviationEL": 0.006207738
}, {
	"Country": "Chile",
	"Industry": "Chemicals",
	"MeanEL": 0.000549622,
	"StandardDeviationEL": 0.008686586
}, {
	"Country": "Chile",
	"Industry": "Construction",
	"MeanEL": 0.001305778,
	"StandardDeviationEL": 0.005936272
}, {
	"Country": "Chile",
	"Industry": "Construction Materials",
	"MeanEL": 0.001451569,
	"StandardDeviationEL": 0.005202891
}, {
	"Country": "Chile",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001560642,
	"StandardDeviationEL": 0.006060815
}, {
	"Country": "Chile",
	"Industry": "Electronics",
	"MeanEL": 0.000883878,
	"StandardDeviationEL": 0.006054335
}, {
	"Country": "Chile",
	"Industry": "Finance",
	"MeanEL": 0.001015148,
	"StandardDeviationEL": 0.014303526
}, {
	"Country": "Chile",
	"Industry": "Food",
	"MeanEL": 0.000938824,
	"StandardDeviationEL": 0.014505599
}, {
	"Country": "Chile",
	"Industry": "Machines",
	"MeanEL": 0.001645547,
	"StandardDeviationEL": 0.003830136
}, {
	"Country": "Chile",
	"Industry": "Metals",
	"MeanEL": 0.001414948,
	"StandardDeviationEL": 0.014214807
}, {
	"Country": "Chile",
	"Industry": "Paper",
	"MeanEL": 0.001440188,
	"StandardDeviationEL": 0.005957456
}, {
	"Country": "Chile",
	"Industry": "Services",
	"MeanEL": 0.000370237,
	"StandardDeviationEL": 0.021492428
}, {
	"Country": "Chile",
	"Industry": "Textiles",
	"MeanEL": 0.000627112,
	"StandardDeviationEL": 0.008378178
}, {
	"Country": "Chile",
	"Industry": "Transport",
	"MeanEL": 0.002066168,
	"StandardDeviationEL": 0.012956823
}, {
	"Country": "China",
	"Industry": "Agriculture",
	"MeanEL": 0.002697655,
	"StandardDeviationEL": 0.006121688
}, {
	"Country": "China",
	"Industry": "Chemicals",
	"MeanEL": 0.000991711,
	"StandardDeviationEL": 0.008600535
}, {
	"Country": "China",
	"Industry": "Construction",
	"MeanEL": 0.000850419,
	"StandardDeviationEL": 0.005850222
}, {
	"Country": "China",
	"Industry": "Construction Materials",
	"MeanEL": 0.000998006,
	"StandardDeviationEL": 0.005116841
}, {
	"Country": "China",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000947239,
	"StandardDeviationEL": 0.005974765
}, {
	"Country": "China",
	"Industry": "Electronics",
	"MeanEL": 0.001429996,
	"StandardDeviationEL": 0.005968284
}, {
	"Country": "China",
	"Industry": "Finance",
	"MeanEL": 0.000375085,
	"StandardDeviationEL": 0.014217476
}, {
	"Country": "China",
	"Industry": "Food",
	"MeanEL": 0.000857956,
	"StandardDeviationEL": 0.014419549
}, {
	"Country": "China",
	"Industry": "Machines",
	"MeanEL": 0.001187439,
	"StandardDeviationEL": 0.003744086
}, {
	"Country": "China",
	"Industry": "Metals",
	"MeanEL": 0.001187579,
	"StandardDeviationEL": 0.014128757
}, {
	"Country": "China",
	"Industry": "Paper",
	"MeanEL": 0.001519359,
	"StandardDeviationEL": 0.005871406
}, {
	"Country": "China",
	"Industry": "Services",
	"MeanEL": 0.000631317,
	"StandardDeviationEL": 0.021406378
}, {
	"Country": "China",
	"Industry": "Textiles",
	"MeanEL": 0.001304222,
	"StandardDeviationEL": 0.008292128
}, {
	"Country": "China",
	"Industry": "Transport",
	"MeanEL": 0.0009142,
	"StandardDeviationEL": 0.012870773
}, {
	"Country": "Christmas Island",
	"Industry": "Food",
	"MeanEL": 0.001481784,
	"StandardDeviationEL": 0.014136274
}, {
	"Country": "Colombia",
	"Industry": "Agriculture",
	"MeanEL": 0.001906308,
	"StandardDeviationEL": 0.006161151
}, {
	"Country": "Colombia",
	"Industry": "Chemicals",
	"MeanEL": 0.002133826,
	"StandardDeviationEL": 0.008639999
}, {
	"Country": "Colombia",
	"Industry": "Construction",
	"MeanEL": 0.002518487,
	"StandardDeviationEL": 0.005889685
}, {
	"Country": "Colombia",
	"Industry": "Construction Materials",
	"MeanEL": 0.003120738,
	"StandardDeviationEL": 0.005156304
}, {
	"Country": "Colombia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00383222,
	"StandardDeviationEL": 0.006014228
}, {
	"Country": "Colombia",
	"Industry": "Electronics",
	"MeanEL": 0.002054434,
	"StandardDeviationEL": 0.006007747
}, {
	"Country": "Colombia",
	"Industry": "Finance",
	"MeanEL": 0.002004623,
	"StandardDeviationEL": 0.014256939
}, {
	"Country": "Colombia",
	"Industry": "Food",
	"MeanEL": 0.00168499,
	"StandardDeviationEL": 0.014459012
}, {
	"Country": "Colombia",
	"Industry": "Machines",
	"MeanEL": 0.00311776,
	"StandardDeviationEL": 0.003783549
}, {
	"Country": "Colombia",
	"Industry": "Metals",
	"MeanEL": 0.00200566,
	"StandardDeviationEL": 0.01416822
}, {
	"Country": "Colombia",
	"Industry": "Paper",
	"MeanEL": 0.001825249,
	"StandardDeviationEL": 0.005910869
}, {
	"Country": "Colombia",
	"Industry": "Services",
	"MeanEL": 0.001937766,
	"StandardDeviationEL": 0.021445841
}, {
	"Country": "Colombia",
	"Industry": "Textiles",
	"MeanEL": 0.003420196,
	"StandardDeviationEL": 0.008331591
}, {
	"Country": "Colombia",
	"Industry": "Transport",
	"MeanEL": 0.001488945,
	"StandardDeviationEL": 0.012910236
}, {
	"Country": "Comoros",
	"Industry": "Food",
	"MeanEL": 0.019578082,
	"StandardDeviationEL": 0.014400103
}, {
	"Country": "Comoros",
	"Industry": "Transport",
	"MeanEL": 0.022744026,
	"StandardDeviationEL": 0.012851327
}, {
	"Country": "Congo",
	"Industry": "Chemicals",
	"MeanEL": 0.033011524,
	"StandardDeviationEL": 0.00845767
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Agriculture",
	"MeanEL": 0.001278423,
	"StandardDeviationEL": 0.006021336
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Chemicals",
	"MeanEL": 0.0017092,
	"StandardDeviationEL": 0.008500184
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Construction",
	"MeanEL": 0.002077585,
	"StandardDeviationEL": 0.00574987
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Construction Materials",
	"MeanEL": 0.001502949,
	"StandardDeviationEL": 0.005016489
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001308461,
	"StandardDeviationEL": 0.005874413
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Electronics",
	"MeanEL": 0.001688187,
	"StandardDeviationEL": 0.005867933
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Finance",
	"MeanEL": 0.002838066,
	"StandardDeviationEL": 0.014117124
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Food",
	"MeanEL": 0.001460823,
	"StandardDeviationEL": 0.014319197
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Machines",
	"MeanEL": 0.001965252,
	"StandardDeviationEL": 0.003643734
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Paper",
	"MeanEL": 0.001990032,
	"StandardDeviationEL": 0.005771054
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Services",
	"MeanEL": 0.002531359,
	"StandardDeviationEL": 0.021306026
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Textiles",
	"MeanEL": 0.001771857,
	"StandardDeviationEL": 0.008191776
}, {
	"Country": "Congo Brazzaville",
	"Industry": "Transport",
	"MeanEL": 0.00078847,
	"StandardDeviationEL": 0.012770421
}, {
	"Country": "Cook Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001280115,
	"StandardDeviationEL": 0.005751156
}, {
	"Country": "Cook Islands",
	"Industry": "Food",
	"MeanEL": 0.001299834,
	"StandardDeviationEL": 0.01419594
}, {
	"Country": "Cook Islands",
	"Industry": "Services",
	"MeanEL": 0.001606981,
	"StandardDeviationEL": 0.021182769
}, {
	"Country": "Costa Rica",
	"Industry": "Agriculture",
	"MeanEL": 0.002047609,
	"StandardDeviationEL": 0.007110638
}, {
	"Country": "Costa Rica",
	"Industry": "Chemicals",
	"MeanEL": 0.00276487,
	"StandardDeviationEL": 0.009589486
}, {
	"Country": "Costa Rica",
	"Industry": "Construction",
	"MeanEL": 0.000978141,
	"StandardDeviationEL": 0.006839172
}, {
	"Country": "Costa Rica",
	"Industry": "Construction Materials",
	"MeanEL": 0.002399152,
	"StandardDeviationEL": 0.006105791
}, {
	"Country": "Costa Rica",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001337968,
	"StandardDeviationEL": 0.006963715
}, {
	"Country": "Costa Rica",
	"Industry": "Electronics",
	"MeanEL": 0.006071574,
	"StandardDeviationEL": 0.006957235
}, {
	"Country": "Costa Rica",
	"Industry": "Finance",
	"MeanEL": 0.001527468,
	"StandardDeviationEL": 0.015206426
}, {
	"Country": "Costa Rica",
	"Industry": "Food",
	"MeanEL": 0.002859645,
	"StandardDeviationEL": 0.015408499
}, {
	"Country": "Costa Rica",
	"Industry": "Machines",
	"MeanEL": 0.003347145,
	"StandardDeviationEL": 0.004733036
}, {
	"Country": "Costa Rica",
	"Industry": "Metals",
	"MeanEL": 0.010032502,
	"StandardDeviationEL": 0.015117707
}, {
	"Country": "Costa Rica",
	"Industry": "Paper",
	"MeanEL": 0.000766482,
	"StandardDeviationEL": 0.006860356
}, {
	"Country": "Costa Rica",
	"Industry": "Services",
	"MeanEL": 0.002130526,
	"StandardDeviationEL": 0.022395328
}, {
	"Country": "Costa Rica",
	"Industry": "Textiles",
	"MeanEL": 0.001719841,
	"StandardDeviationEL": 0.009281078
}, {
	"Country": "Costa Rica",
	"Industry": "Transport",
	"MeanEL": 0.003345011,
	"StandardDeviationEL": 0.013859723
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Agriculture",
	"MeanEL": 0.007072901,
	"StandardDeviationEL": 0.006399679
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Chemicals",
	"MeanEL": 0.005852685,
	"StandardDeviationEL": 0.008878527
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Construction Materials",
	"MeanEL": 0.004977264,
	"StandardDeviationEL": 0.005394832
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002123948,
	"StandardDeviationEL": 0.006252756
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Electronics",
	"MeanEL": 0.00845281,
	"StandardDeviationEL": 0.006246276
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Finance",
	"MeanEL": 0.001766209,
	"StandardDeviationEL": 0.014495467
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Food",
	"MeanEL": 0.00309159,
	"StandardDeviationEL": 0.01469754
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Metals",
	"MeanEL": 0.009220281,
	"StandardDeviationEL": 0.014406748
}, {
	"Country": "Cote D'Ivoire",
	"Industry": "Textiles",
	"MeanEL": 0.008704327,
	"StandardDeviationEL": 0.008570119
}, {
	"Country": "Croatia",
	"Industry": "Agriculture",
	"MeanEL": 0.011157541,
	"StandardDeviationEL": 0.007322643
}, {
	"Country": "Croatia",
	"Industry": "Chemicals",
	"MeanEL": 0.002106791,
	"StandardDeviationEL": 0.009801491
}, {
	"Country": "Croatia",
	"Industry": "Construction",
	"MeanEL": 0.002259768,
	"StandardDeviationEL": 0.007051178
}, {
	"Country": "Croatia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001416235,
	"StandardDeviationEL": 0.006317797
}, {
	"Country": "Croatia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002252157,
	"StandardDeviationEL": 0.00717572
}, {
	"Country": "Croatia",
	"Industry": "Electronics",
	"MeanEL": 0.00192772,
	"StandardDeviationEL": 0.00716924
}, {
	"Country": "Croatia",
	"Industry": "Finance",
	"MeanEL": 0.003090731,
	"StandardDeviationEL": 0.015418432
}, {
	"Country": "Croatia",
	"Industry": "Food",
	"MeanEL": 0.002072222,
	"StandardDeviationEL": 0.015620505
}, {
	"Country": "Croatia",
	"Industry": "Machines",
	"MeanEL": 0.001234975,
	"StandardDeviationEL": 0.004945041
}, {
	"Country": "Croatia",
	"Industry": "Metals",
	"MeanEL": 0.001237516,
	"StandardDeviationEL": 0.015329712
}, {
	"Country": "Croatia",
	"Industry": "Paper",
	"MeanEL": 0.001459567,
	"StandardDeviationEL": 0.007072362
}, {
	"Country": "Croatia",
	"Industry": "Services",
	"MeanEL": 0.002395995,
	"StandardDeviationEL": 0.022607334
}, {
	"Country": "Croatia",
	"Industry": "Textiles",
	"MeanEL": 0.002983878,
	"StandardDeviationEL": 0.009493084
}, {
	"Country": "Croatia",
	"Industry": "Transport",
	"MeanEL": 0.002419663,
	"StandardDeviationEL": 0.014071729
}, {
	"Country": "Curaçao",
	"Industry": "Agriculture",
	"MeanEL": 0.001272071,
	"StandardDeviationEL": 0.006098892
}, {
	"Country": "Curaçao",
	"Industry": "Chemicals",
	"MeanEL": 0.002990472,
	"StandardDeviationEL": 0.00857774
}, {
	"Country": "Curaçao",
	"Industry": "Construction",
	"MeanEL": 0.001103631,
	"StandardDeviationEL": 0.005827427
}, {
	"Country": "Curaçao",
	"Industry": "Construction Materials",
	"MeanEL": 0.002925068,
	"StandardDeviationEL": 0.005094046
}, {
	"Country": "Curaçao",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001713401,
	"StandardDeviationEL": 0.005951969
}, {
	"Country": "Curaçao",
	"Industry": "Electronics",
	"MeanEL": 0.001858467,
	"StandardDeviationEL": 0.005945489
}, {
	"Country": "Curaçao",
	"Industry": "Finance",
	"MeanEL": 0.002076099,
	"StandardDeviationEL": 0.014194681
}, {
	"Country": "Curaçao",
	"Industry": "Food",
	"MeanEL": 0.001661717,
	"StandardDeviationEL": 0.014396754
}, {
	"Country": "Curaçao",
	"Industry": "Machines",
	"MeanEL": 0.003638977,
	"StandardDeviationEL": 0.00372129
}, {
	"Country": "Curaçao",
	"Industry": "Metals",
	"MeanEL": 0.00182707,
	"StandardDeviationEL": 0.014105962
}, {
	"Country": "Curaçao",
	"Industry": "Paper",
	"MeanEL": 0.003455412,
	"StandardDeviationEL": 0.005848611
}, {
	"Country": "Curaçao",
	"Industry": "Services",
	"MeanEL": 0.002576313,
	"StandardDeviationEL": 0.021383583
}, {
	"Country": "Curaçao",
	"Industry": "Textiles",
	"MeanEL": 0.001119169,
	"StandardDeviationEL": 0.008269333
}, {
	"Country": "Curaçao",
	"Industry": "Transport",
	"MeanEL": 0.002401613,
	"StandardDeviationEL": 0.012847978
}, {
	"Country": "Cyprus",
	"Industry": "Agriculture",
	"MeanEL": 0.003405247,
	"StandardDeviationEL": 0.006269149
}, {
	"Country": "Cyprus",
	"Industry": "Chemicals",
	"MeanEL": 0.001878712,
	"StandardDeviationEL": 0.008747997
}, {
	"Country": "Cyprus",
	"Industry": "Construction",
	"MeanEL": 0.000720415,
	"StandardDeviationEL": 0.005997683
}, {
	"Country": "Cyprus",
	"Industry": "Construction Materials",
	"MeanEL": 0.002987039,
	"StandardDeviationEL": 0.005264302
}, {
	"Country": "Cyprus",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002485062,
	"StandardDeviationEL": 0.006122226
}, {
	"Country": "Cyprus",
	"Industry": "Electronics",
	"MeanEL": 0.002389813,
	"StandardDeviationEL": 0.006115745
}, {
	"Country": "Cyprus",
	"Industry": "Finance",
	"MeanEL": 0.001246711,
	"StandardDeviationEL": 0.014364937
}, {
	"Country": "Cyprus",
	"Industry": "Food",
	"MeanEL": 0.002277753,
	"StandardDeviationEL": 0.01456701
}, {
	"Country": "Cyprus",
	"Industry": "Machines",
	"MeanEL": 0.004582099,
	"StandardDeviationEL": 0.003891547
}, {
	"Country": "Cyprus",
	"Industry": "Metals",
	"MeanEL": 0.001854911,
	"StandardDeviationEL": 0.014276218
}, {
	"Country": "Cyprus",
	"Industry": "Paper",
	"MeanEL": 0.001788353,
	"StandardDeviationEL": 0.006018867
}, {
	"Country": "Cyprus",
	"Industry": "Services",
	"MeanEL": 0.00157949,
	"StandardDeviationEL": 0.021553839
}, {
	"Country": "Cyprus",
	"Industry": "Textiles",
	"MeanEL": 0.001350389,
	"StandardDeviationEL": 0.008439589
}, {
	"Country": "Cyprus",
	"Industry": "Transport",
	"MeanEL": 0.001997684,
	"StandardDeviationEL": 0.013018234
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Agriculture",
	"MeanEL": 0.001381147,
	"StandardDeviationEL": 0.006166159
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Chemicals",
	"MeanEL": 0.001365984,
	"StandardDeviationEL": 0.008645007
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Construction",
	"MeanEL": 0.002509679,
	"StandardDeviationEL": 0.005894693
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Construction Materials",
	"MeanEL": 0.000736398,
	"StandardDeviationEL": 0.005161312
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001646086,
	"StandardDeviationEL": 0.006019236
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Electronics",
	"MeanEL": 0.000823265,
	"StandardDeviationEL": 0.006012756
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Food",
	"MeanEL": 0.001311764,
	"StandardDeviationEL": 0.01446402
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Paper",
	"MeanEL": 0.003612564,
	"StandardDeviationEL": 0.005915877
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Textiles",
	"MeanEL": 0.003612564,
	"StandardDeviationEL": 0.008336599
}, {
	"Country": "Cyprus (Turkish Sector)",
	"Industry": "Transport",
	"MeanEL": 0.003005642,
	"StandardDeviationEL": 0.012915245
}, {
	"Country": "Czech Republic",
	"Industry": "Agriculture",
	"MeanEL": 0.000868528,
	"StandardDeviationEL": 0.00614692
}, {
	"Country": "Czech Republic",
	"Industry": "Chemicals",
	"MeanEL": 0.001202081,
	"StandardDeviationEL": 0.008625768
}, {
	"Country": "Czech Republic",
	"Industry": "Construction",
	"MeanEL": 0.00166944,
	"StandardDeviationEL": 0.005875454
}, {
	"Country": "Czech Republic",
	"Industry": "Construction Materials",
	"MeanEL": 0.00314116,
	"StandardDeviationEL": 0.005142073
}, {
	"Country": "Czech Republic",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002073838,
	"StandardDeviationEL": 0.005999997
}, {
	"Country": "Czech Republic",
	"Industry": "Electronics",
	"MeanEL": 0.001100684,
	"StandardDeviationEL": 0.005993517
}, {
	"Country": "Czech Republic",
	"Industry": "Finance",
	"MeanEL": 0.000595597,
	"StandardDeviationEL": 0.014242709
}, {
	"Country": "Czech Republic",
	"Industry": "Food",
	"MeanEL": 0.001552032,
	"StandardDeviationEL": 0.014444781
}, {
	"Country": "Czech Republic",
	"Industry": "Machines",
	"MeanEL": 0.001430581,
	"StandardDeviationEL": 0.003769318
}, {
	"Country": "Czech Republic",
	"Industry": "Metals",
	"MeanEL": 0.001027274,
	"StandardDeviationEL": 0.014153989
}, {
	"Country": "Czech Republic",
	"Industry": "Paper",
	"MeanEL": 0.001816193,
	"StandardDeviationEL": 0.005896638
}, {
	"Country": "Czech Republic",
	"Industry": "Services",
	"MeanEL": 0.001920137,
	"StandardDeviationEL": 0.021431611
}, {
	"Country": "Czech Republic",
	"Industry": "Textiles",
	"MeanEL": 0.001436419,
	"StandardDeviationEL": 0.00831736
}, {
	"Country": "Czech Republic",
	"Industry": "Transport",
	"MeanEL": 0.001338126,
	"StandardDeviationEL": 0.012896006
}, {
	"Country": "Denmark",
	"Industry": "Agriculture",
	"MeanEL": 0.000730927,
	"StandardDeviationEL": 0.006168869
}, {
	"Country": "Denmark",
	"Industry": "Chemicals",
	"MeanEL": 0.000406745,
	"StandardDeviationEL": 0.008647717
}, {
	"Country": "Denmark",
	"Industry": "Construction",
	"MeanEL": 0.001368252,
	"StandardDeviationEL": 0.005897404
}, {
	"Country": "Denmark",
	"Industry": "Construction Materials",
	"MeanEL": 0.000863201,
	"StandardDeviationEL": 0.005164023
}, {
	"Country": "Denmark",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001009171,
	"StandardDeviationEL": 0.006021946
}, {
	"Country": "Denmark",
	"Industry": "Electronics",
	"MeanEL": 0.00057541,
	"StandardDeviationEL": 0.006015466
}, {
	"Country": "Denmark",
	"Industry": "Finance",
	"MeanEL": 0.000929843,
	"StandardDeviationEL": 0.014264658
}, {
	"Country": "Denmark",
	"Industry": "Food",
	"MeanEL": 0.001058757,
	"StandardDeviationEL": 0.014466731
}, {
	"Country": "Denmark",
	"Industry": "Machines",
	"MeanEL": 0.000840745,
	"StandardDeviationEL": 0.003791267
}, {
	"Country": "Denmark",
	"Industry": "Metals",
	"MeanEL": 0.000961609,
	"StandardDeviationEL": 0.014175938
}, {
	"Country": "Denmark",
	"Industry": "Paper",
	"MeanEL": 0.00097328,
	"StandardDeviationEL": 0.005918588
}, {
	"Country": "Denmark",
	"Industry": "Services",
	"MeanEL": 0.000960629,
	"StandardDeviationEL": 0.02145356
}, {
	"Country": "Denmark",
	"Industry": "Textiles",
	"MeanEL": 0.00153981,
	"StandardDeviationEL": 0.00833931
}, {
	"Country": "Denmark",
	"Industry": "Transport",
	"MeanEL": 0.00119463,
	"StandardDeviationEL": 0.012917955
}, {
	"Country": "Djibouti",
	"Industry": "Agriculture",
	"MeanEL": 0.021964391,
	"StandardDeviationEL": 0.023726863
}, {
	"Country": "Djibouti",
	"Industry": "Chemicals",
	"MeanEL": 0.020567949,
	"StandardDeviationEL": 0.026205711
}, {
	"Country": "Djibouti",
	"Industry": "Construction Materials",
	"MeanEL": 0.018560969,
	"StandardDeviationEL": 0.022722016
}, {
	"Country": "Djibouti",
	"Industry": "Consumer Durables",
	"MeanEL": 0.020856472,
	"StandardDeviationEL": 0.02357994
}, {
	"Country": "Djibouti",
	"Industry": "Electronics",
	"MeanEL": 0.021331796,
	"StandardDeviationEL": 0.02357346
}, {
	"Country": "Djibouti",
	"Industry": "Food",
	"MeanEL": 0.020542961,
	"StandardDeviationEL": 0.032024724
}, {
	"Country": "Djibouti",
	"Industry": "Paper",
	"MeanEL": 0.021967256,
	"StandardDeviationEL": 0.023476581
}, {
	"Country": "Djibouti",
	"Industry": "Services",
	"MeanEL": 0.128424835,
	"StandardDeviationEL": 0.039011553
}, {
	"Country": "Djibouti",
	"Industry": "Transport",
	"MeanEL": 0.020448544,
	"StandardDeviationEL": 0.030475949
}, {
	"Country": "Dominica",
	"Industry": "Agriculture",
	"MeanEL": 0.003560652,
	"StandardDeviationEL": 0.006474133
}, {
	"Country": "Dominica",
	"Industry": "Chemicals",
	"MeanEL": 0.003988992,
	"StandardDeviationEL": 0.008952981
}, {
	"Country": "Dominica",
	"Industry": "Construction Materials",
	"MeanEL": 0.003973909,
	"StandardDeviationEL": 0.005469286
}, {
	"Country": "Dominica",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003273887,
	"StandardDeviationEL": 0.00632721
}, {
	"Country": "Dominica",
	"Industry": "Food",
	"MeanEL": 0.004818779,
	"StandardDeviationEL": 0.014771994
}, {
	"Country": "Dominica",
	"Industry": "Services",
	"MeanEL": 0.007803315,
	"StandardDeviationEL": 0.021758824
}, {
	"Country": "Dominica",
	"Industry": "Transport",
	"MeanEL": 0.00415269,
	"StandardDeviationEL": 0.013223219
}, {
	"Country": "Dominican Republic",
	"Industry": "Agriculture",
	"MeanEL": 0.001090479,
	"StandardDeviationEL": 0.007162173
}, {
	"Country": "Dominican Republic",
	"Industry": "Chemicals",
	"MeanEL": 0.00368854,
	"StandardDeviationEL": 0.009641021
}, {
	"Country": "Dominican Republic",
	"Industry": "Construction",
	"MeanEL": 0.002360923,
	"StandardDeviationEL": 0.006890708
}, {
	"Country": "Dominican Republic",
	"Industry": "Construction Materials",
	"MeanEL": 0.002666315,
	"StandardDeviationEL": 0.006157327
}, {
	"Country": "Dominican Republic",
	"Industry": "Consumer Durables",
	"MeanEL": 0.010303486,
	"StandardDeviationEL": 0.00701525
}, {
	"Country": "Dominican Republic",
	"Industry": "Electronics",
	"MeanEL": 0.002533911,
	"StandardDeviationEL": 0.00700877
}, {
	"Country": "Dominican Republic",
	"Industry": "Finance",
	"MeanEL": 0.000885287,
	"StandardDeviationEL": 0.015257962
}, {
	"Country": "Dominican Republic",
	"Industry": "Food",
	"MeanEL": 0.002006158,
	"StandardDeviationEL": 0.015460035
}, {
	"Country": "Dominican Republic",
	"Industry": "Machines",
	"MeanEL": 0.0026898,
	"StandardDeviationEL": 0.004784571
}, {
	"Country": "Dominican Republic",
	"Industry": "Metals",
	"MeanEL": 0.001740724,
	"StandardDeviationEL": 0.015169242
}, {
	"Country": "Dominican Republic",
	"Industry": "Paper",
	"MeanEL": 0.001720507,
	"StandardDeviationEL": 0.006911892
}, {
	"Country": "Dominican Republic",
	"Industry": "Services",
	"MeanEL": 0.001229312,
	"StandardDeviationEL": 0.022446864
}, {
	"Country": "Dominican Republic",
	"Industry": "Textiles",
	"MeanEL": 0.002806296,
	"StandardDeviationEL": 0.009332614
}, {
	"Country": "Dominican Republic",
	"Industry": "Transport",
	"MeanEL": 0.001952155,
	"StandardDeviationEL": 0.013911259
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.000974065,
	"StandardDeviationEL": 0.006040513
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.000455629,
	"StandardDeviationEL": 0.008519361
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Construction",
	"MeanEL": 0.000619158,
	"StandardDeviationEL": 0.005769047
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.001600686,
	"StandardDeviationEL": 0.005035666
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001126676,
	"StandardDeviationEL": 0.00589359
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Electronics",
	"MeanEL": 0.001698597,
	"StandardDeviationEL": 0.00588711
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.000569027,
	"StandardDeviationEL": 0.014136301
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Food",
	"MeanEL": 0.00136085,
	"StandardDeviationEL": 0.014338374
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.000833322,
	"StandardDeviationEL": 0.003662911
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.000564989,
	"StandardDeviationEL": 0.014047582
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Paper",
	"MeanEL": 0.002045921,
	"StandardDeviationEL": 0.005790231
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Services",
	"MeanEL": 0.000609244,
	"StandardDeviationEL": 0.021325203
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Textiles",
	"MeanEL": 0.000786945,
	"StandardDeviationEL": 0.008210953
}, {
	"Country": "Dubai (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.000188837,
	"StandardDeviationEL": 0.012789598
}, {
	"Country": "East Timor",
	"Industry": "Consumer Durables",
	"MeanEL": 0.0092523,
	"StandardDeviationEL": 0.005732854
}, {
	"Country": "East Timor",
	"Industry": "Food",
	"MeanEL": 0.009748676,
	"StandardDeviationEL": 0.014177639
}, {
	"Country": "Ecuador",
	"Industry": "Agriculture",
	"MeanEL": 0.003883885,
	"StandardDeviationEL": 0.007039411
}, {
	"Country": "Ecuador",
	"Industry": "Chemicals",
	"MeanEL": 0.003643411,
	"StandardDeviationEL": 0.009518259
}, {
	"Country": "Ecuador",
	"Industry": "Construction",
	"MeanEL": 0.003127764,
	"StandardDeviationEL": 0.006767945
}, {
	"Country": "Ecuador",
	"Industry": "Construction Materials",
	"MeanEL": 0.006385588,
	"StandardDeviationEL": 0.006034564
}, {
	"Country": "Ecuador",
	"Industry": "Consumer Durables",
	"MeanEL": 0.010849399,
	"StandardDeviationEL": 0.006892488
}, {
	"Country": "Ecuador",
	"Industry": "Electronics",
	"MeanEL": 0.003510885,
	"StandardDeviationEL": 0.006886008
}, {
	"Country": "Ecuador",
	"Industry": "Finance",
	"MeanEL": 0.004049286,
	"StandardDeviationEL": 0.015135199
}, {
	"Country": "Ecuador",
	"Industry": "Food",
	"MeanEL": 0.002324959,
	"StandardDeviationEL": 0.015337272
}, {
	"Country": "Ecuador",
	"Industry": "Machines",
	"MeanEL": 0.002755615,
	"StandardDeviationEL": 0.004661809
}, {
	"Country": "Ecuador",
	"Industry": "Metals",
	"MeanEL": 0.007933891,
	"StandardDeviationEL": 0.01504648
}, {
	"Country": "Ecuador",
	"Industry": "Paper",
	"MeanEL": 0.003547977,
	"StandardDeviationEL": 0.006789129
}, {
	"Country": "Ecuador",
	"Industry": "Services",
	"MeanEL": 0.003041174,
	"StandardDeviationEL": 0.022324101
}, {
	"Country": "Ecuador",
	"Industry": "Textiles",
	"MeanEL": 0.002394106,
	"StandardDeviationEL": 0.009209851
}, {
	"Country": "Ecuador",
	"Industry": "Transport",
	"MeanEL": 0.003878182,
	"StandardDeviationEL": 0.013788496
}, {
	"Country": "Egypt",
	"Industry": "Agriculture",
	"MeanEL": 0.003707251,
	"StandardDeviationEL": 0.006788786
}, {
	"Country": "Egypt",
	"Industry": "Chemicals",
	"MeanEL": 0.005825173,
	"StandardDeviationEL": 0.009267634
}, {
	"Country": "Egypt",
	"Industry": "Construction",
	"MeanEL": 0.002367899,
	"StandardDeviationEL": 0.00651732
}, {
	"Country": "Egypt",
	"Industry": "Construction Materials",
	"MeanEL": 0.002759699,
	"StandardDeviationEL": 0.005783939
}, {
	"Country": "Egypt",
	"Industry": "Consumer Durables",
	"MeanEL": 0.008422491,
	"StandardDeviationEL": 0.006641863
}, {
	"Country": "Egypt",
	"Industry": "Electronics",
	"MeanEL": 0.002876632,
	"StandardDeviationEL": 0.006635382
}, {
	"Country": "Egypt",
	"Industry": "Finance",
	"MeanEL": 0.004818679,
	"StandardDeviationEL": 0.014884574
}, {
	"Country": "Egypt",
	"Industry": "Food",
	"MeanEL": 0.002050858,
	"StandardDeviationEL": 0.015086647
}, {
	"Country": "Egypt",
	"Industry": "Machines",
	"MeanEL": 0.001861325,
	"StandardDeviationEL": 0.004411184
}, {
	"Country": "Egypt",
	"Industry": "Metals",
	"MeanEL": 0.002354869,
	"StandardDeviationEL": 0.014795855
}, {
	"Country": "Egypt",
	"Industry": "Paper",
	"MeanEL": 0.00170663,
	"StandardDeviationEL": 0.006538504
}, {
	"Country": "Egypt",
	"Industry": "Services",
	"MeanEL": 0.002384746,
	"StandardDeviationEL": 0.022073476
}, {
	"Country": "Egypt",
	"Industry": "Textiles",
	"MeanEL": 0.001613188,
	"StandardDeviationEL": 0.008959226
}, {
	"Country": "Egypt",
	"Industry": "Transport",
	"MeanEL": 0.003725132,
	"StandardDeviationEL": 0.013537871
}, {
	"Country": "El Salvador",
	"Industry": "Agriculture",
	"MeanEL": 0.00344527,
	"StandardDeviationEL": 0.007376769
}, {
	"Country": "El Salvador",
	"Industry": "Chemicals",
	"MeanEL": 0.00149652,
	"StandardDeviationEL": 0.009855617
}, {
	"Country": "El Salvador",
	"Industry": "Construction",
	"MeanEL": 0.004473372,
	"StandardDeviationEL": 0.007105303
}, {
	"Country": "El Salvador",
	"Industry": "Construction Materials",
	"MeanEL": 0.002749476,
	"StandardDeviationEL": 0.006371922
}, {
	"Country": "El Salvador",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002586699,
	"StandardDeviationEL": 0.007229846
}, {
	"Country": "El Salvador",
	"Industry": "Electronics",
	"MeanEL": 0.002294043,
	"StandardDeviationEL": 0.007223366
}, {
	"Country": "El Salvador",
	"Industry": "Finance",
	"MeanEL": 0.004102176,
	"StandardDeviationEL": 0.015472557
}, {
	"Country": "El Salvador",
	"Industry": "Food",
	"MeanEL": 0.001188852,
	"StandardDeviationEL": 0.01567463
}, {
	"Country": "El Salvador",
	"Industry": "Machines",
	"MeanEL": 0.002553601,
	"StandardDeviationEL": 0.004999167
}, {
	"Country": "El Salvador",
	"Industry": "Metals",
	"MeanEL": 0.000905039,
	"StandardDeviationEL": 0.015383838
}, {
	"Country": "El Salvador",
	"Industry": "Paper",
	"MeanEL": 0.001706252,
	"StandardDeviationEL": 0.007126487
}, {
	"Country": "El Salvador",
	"Industry": "Services",
	"MeanEL": 0.00437633,
	"StandardDeviationEL": 0.022661459
}, {
	"Country": "El Salvador",
	"Industry": "Textiles",
	"MeanEL": 0.002665164,
	"StandardDeviationEL": 0.009547209
}, {
	"Country": "El Salvador",
	"Industry": "Transport",
	"MeanEL": 0.002231792,
	"StandardDeviationEL": 0.014125855
}, {
	"Country": "Equatorial Guinea",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000791173,
	"StandardDeviationEL": 0.009431345
}, {
	"Country": "Equatorial Guinea",
	"Industry": "Electronics",
	"MeanEL": 0.023230305,
	"StandardDeviationEL": 0.009424865
}, {
	"Country": "Equatorial Guinea",
	"Industry": "Food",
	"MeanEL": 0.000788283,
	"StandardDeviationEL": 0.017876129
}, {
	"Country": "Estonia",
	"Industry": "Agriculture",
	"MeanEL": 0.001693997,
	"StandardDeviationEL": 0.006342475
}, {
	"Country": "Estonia",
	"Industry": "Chemicals",
	"MeanEL": 0.001316186,
	"StandardDeviationEL": 0.008821323
}, {
	"Country": "Estonia",
	"Industry": "Construction",
	"MeanEL": 0.003009766,
	"StandardDeviationEL": 0.00607101
}, {
	"Country": "Estonia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001903856,
	"StandardDeviationEL": 0.005337629
}, {
	"Country": "Estonia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002606008,
	"StandardDeviationEL": 0.006195552
}, {
	"Country": "Estonia",
	"Industry": "Electronics",
	"MeanEL": 0.001776561,
	"StandardDeviationEL": 0.006189072
}, {
	"Country": "Estonia",
	"Industry": "Finance",
	"MeanEL": 0.002735277,
	"StandardDeviationEL": 0.014438264
}, {
	"Country": "Estonia",
	"Industry": "Food",
	"MeanEL": 0.001307696,
	"StandardDeviationEL": 0.014640337
}, {
	"Country": "Estonia",
	"Industry": "Machines",
	"MeanEL": 0.001608157,
	"StandardDeviationEL": 0.003964873
}, {
	"Country": "Estonia",
	"Industry": "Metals",
	"MeanEL": 0.001904143,
	"StandardDeviationEL": 0.014349545
}, {
	"Country": "Estonia",
	"Industry": "Paper",
	"MeanEL": 0.002157142,
	"StandardDeviationEL": 0.006092194
}, {
	"Country": "Estonia",
	"Industry": "Services",
	"MeanEL": 0.001490539,
	"StandardDeviationEL": 0.021627166
}, {
	"Country": "Estonia",
	"Industry": "Textiles",
	"MeanEL": 0.003170445,
	"StandardDeviationEL": 0.008512916
}, {
	"Country": "Estonia",
	"Industry": "Transport",
	"MeanEL": 0.00315497,
	"StandardDeviationEL": 0.013091561
}, {
	"Country": "Ethiopia",
	"Industry": "Agriculture",
	"MeanEL": 0.001515629,
	"StandardDeviationEL": 0.006275314
}, {
	"Country": "Ethiopia",
	"Industry": "Chemicals",
	"MeanEL": 0.001386318,
	"StandardDeviationEL": 0.008754162
}, {
	"Country": "Ethiopia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001444472,
	"StandardDeviationEL": 0.006128391
}, {
	"Country": "Ethiopia",
	"Industry": "Finance",
	"MeanEL": 0.004065882,
	"StandardDeviationEL": 0.014371103
}, {
	"Country": "Ethiopia",
	"Industry": "Food",
	"MeanEL": 0.001475222,
	"StandardDeviationEL": 0.014573176
}, {
	"Country": "Ethiopia",
	"Industry": "Machines",
	"MeanEL": 0.001441725,
	"StandardDeviationEL": 0.003897712
}, {
	"Country": "Ethiopia",
	"Industry": "Metals",
	"MeanEL": 0.001367173,
	"StandardDeviationEL": 0.014282384
}, {
	"Country": "Ethiopia",
	"Industry": "Textiles",
	"MeanEL": 0.001090638,
	"StandardDeviationEL": 0.008445755
}, {
	"Country": "Ethiopia",
	"Industry": "Transport",
	"MeanEL": 0.001967948,
	"StandardDeviationEL": 0.0130244
}, {
	"Country": "Falkland Islands",
	"Industry": "Agriculture",
	"MeanEL": 0.002942245,
	"StandardDeviationEL": 0.006284688
}, {
	"Country": "Falkland Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.005811454,
	"StandardDeviationEL": 0.008763536
}, {
	"Country": "Falkland Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.0031338,
	"StandardDeviationEL": 0.006137765
}, {
	"Country": "Falkland Islands",
	"Industry": "Food",
	"MeanEL": 0.004041144,
	"StandardDeviationEL": 0.01458255
}, {
	"Country": "Falkland Islands",
	"Industry": "Transport",
	"MeanEL": 0.001097363,
	"StandardDeviationEL": 0.013033774
}, {
	"Country": "Faroe Islands",
	"Industry": "Agriculture",
	"MeanEL": 0.000603035,
	"StandardDeviationEL": 0.006230149
}, {
	"Country": "Faroe Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.000712113,
	"StandardDeviationEL": 0.008708997
}, {
	"Country": "Faroe Islands",
	"Industry": "Construction",
	"MeanEL": 0.000928025,
	"StandardDeviationEL": 0.005958683
}, {
	"Country": "Faroe Islands",
	"Industry": "Construction Materials",
	"MeanEL": 0.000599356,
	"StandardDeviationEL": 0.005225302
}, {
	"Country": "Faroe Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001163507,
	"StandardDeviationEL": 0.006083226
}, {
	"Country": "Faroe Islands",
	"Industry": "Electronics",
	"MeanEL": 0.000358632,
	"StandardDeviationEL": 0.006076745
}, {
	"Country": "Faroe Islands",
	"Industry": "Finance",
	"MeanEL": 0.000942353,
	"StandardDeviationEL": 0.014325937
}, {
	"Country": "Faroe Islands",
	"Industry": "Food",
	"MeanEL": 0.00127926,
	"StandardDeviationEL": 0.01452801
}, {
	"Country": "Faroe Islands",
	"Industry": "Machines",
	"MeanEL": 0.002546692,
	"StandardDeviationEL": 0.003852547
}, {
	"Country": "Faroe Islands",
	"Industry": "Metals",
	"MeanEL": 0.001081973,
	"StandardDeviationEL": 0.014237218
}, {
	"Country": "Faroe Islands",
	"Industry": "Services",
	"MeanEL": 0.003362578,
	"StandardDeviationEL": 0.021514839
}, {
	"Country": "Faroe Islands",
	"Industry": "Textiles",
	"MeanEL": 0.00276711,
	"StandardDeviationEL": 0.008400589
}, {
	"Country": "Faroe Islands",
	"Industry": "Transport",
	"MeanEL": 0.00038495,
	"StandardDeviationEL": 0.012979234
}, {
	"Country": "Fiji",
	"Industry": "Chemicals",
	"MeanEL": 0.00164617,
	"StandardDeviationEL": 0.008764834
}, {
	"Country": "Fiji",
	"Industry": "Construction",
	"MeanEL": 0.001850116,
	"StandardDeviationEL": 0.006014521
}, {
	"Country": "Fiji",
	"Industry": "Construction Materials",
	"MeanEL": 0.001708355,
	"StandardDeviationEL": 0.005281139
}, {
	"Country": "Fiji",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001483038,
	"StandardDeviationEL": 0.006139063
}, {
	"Country": "Fiji",
	"Industry": "Electronics",
	"MeanEL": 0.002193928,
	"StandardDeviationEL": 0.006132583
}, {
	"Country": "Fiji",
	"Industry": "Food",
	"MeanEL": 0.001604913,
	"StandardDeviationEL": 0.014583847
}, {
	"Country": "Fiji",
	"Industry": "Machines",
	"MeanEL": 0.002319234,
	"StandardDeviationEL": 0.003908384
}, {
	"Country": "Fiji",
	"Industry": "Metals",
	"MeanEL": 0.001999028,
	"StandardDeviationEL": 0.014293055
}, {
	"Country": "Fiji",
	"Industry": "Paper",
	"MeanEL": 0.001781976,
	"StandardDeviationEL": 0.006035704
}, {
	"Country": "Fiji",
	"Industry": "Services",
	"MeanEL": 0.001458907,
	"StandardDeviationEL": 0.021570677
}, {
	"Country": "Fiji",
	"Industry": "Textiles",
	"MeanEL": 0.002215327,
	"StandardDeviationEL": 0.008456427
}, {
	"Country": "Fiji",
	"Industry": "Transport",
	"MeanEL": 0.004501487,
	"StandardDeviationEL": 0.013035072
}, {
	"Country": "Finland",
	"Industry": "Agriculture",
	"MeanEL": 0.002395469,
	"StandardDeviationEL": 0.006417376
}, {
	"Country": "Finland",
	"Industry": "Chemicals",
	"MeanEL": 0.00072414,
	"StandardDeviationEL": 0.008896224
}, {
	"Country": "Finland",
	"Industry": "Construction",
	"MeanEL": 0.002177876,
	"StandardDeviationEL": 0.00614591
}, {
	"Country": "Finland",
	"Industry": "Construction Materials",
	"MeanEL": 0.001624019,
	"StandardDeviationEL": 0.005412529
}, {
	"Country": "Finland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001879828,
	"StandardDeviationEL": 0.006270453
}, {
	"Country": "Finland",
	"Industry": "Electronics",
	"MeanEL": 0.00094087,
	"StandardDeviationEL": 0.006263973
}, {
	"Country": "Finland",
	"Industry": "Finance",
	"MeanEL": 0.002284434,
	"StandardDeviationEL": 0.014513164
}, {
	"Country": "Finland",
	"Industry": "Food",
	"MeanEL": 0.000687371,
	"StandardDeviationEL": 0.014715237
}, {
	"Country": "Finland",
	"Industry": "Machines",
	"MeanEL": 0.000811585,
	"StandardDeviationEL": 0.004039774
}, {
	"Country": "Finland",
	"Industry": "Metals",
	"MeanEL": 0.000707076,
	"StandardDeviationEL": 0.014424445
}, {
	"Country": "Finland",
	"Industry": "Paper",
	"MeanEL": 0.000847864,
	"StandardDeviationEL": 0.006167094
}, {
	"Country": "Finland",
	"Industry": "Services",
	"MeanEL": 0.002621041,
	"StandardDeviationEL": 0.021702066
}, {
	"Country": "Finland",
	"Industry": "Textiles",
	"MeanEL": 0.003109011,
	"StandardDeviationEL": 0.008587816
}, {
	"Country": "Finland",
	"Industry": "Transport",
	"MeanEL": 0.001955941,
	"StandardDeviationEL": 0.013166461
}, {
	"Country": "France",
	"Industry": "Agriculture",
	"MeanEL": 0.000695678,
	"StandardDeviationEL": 0.006064113
}, {
	"Country": "France",
	"Industry": "Chemicals",
	"MeanEL": 0.000344134,
	"StandardDeviationEL": 0.008542961
}, {
	"Country": "France",
	"Industry": "Construction",
	"MeanEL": 0.001044516,
	"StandardDeviationEL": 0.005792648
}, {
	"Country": "France",
	"Industry": "Construction Materials",
	"MeanEL": 0.000631202,
	"StandardDeviationEL": 0.005059267
}, {
	"Country": "France",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00046822,
	"StandardDeviationEL": 0.00591719
}, {
	"Country": "France",
	"Industry": "Electronics",
	"MeanEL": 0.000807259,
	"StandardDeviationEL": 0.00591071
}, {
	"Country": "France",
	"Industry": "Finance",
	"MeanEL": 0.000791055,
	"StandardDeviationEL": 0.014159902
}, {
	"Country": "France",
	"Industry": "Food",
	"MeanEL": 0.000879836,
	"StandardDeviationEL": 0.014361975
}, {
	"Country": "France",
	"Industry": "Machines",
	"MeanEL": 0.001254041,
	"StandardDeviationEL": 0.003686511
}, {
	"Country": "France",
	"Industry": "Metals",
	"MeanEL": 0.001026556,
	"StandardDeviationEL": 0.014071183
}, {
	"Country": "France",
	"Industry": "Paper",
	"MeanEL": 0.001145043,
	"StandardDeviationEL": 0.005813832
}, {
	"Country": "France",
	"Industry": "Services",
	"MeanEL": 0.000904163,
	"StandardDeviationEL": 0.021348804
}, {
	"Country": "France",
	"Industry": "Textiles",
	"MeanEL": 0.001266654,
	"StandardDeviationEL": 0.008234554
}, {
	"Country": "France",
	"Industry": "Transport",
	"MeanEL": 0.000673904,
	"StandardDeviationEL": 0.012813199
}, {
	"Country": "French Guiana",
	"Industry": "Agriculture",
	"MeanEL": 0.003276465,
	"StandardDeviationEL": 0.006206762
}, {
	"Country": "French Guiana",
	"Industry": "Chemicals",
	"MeanEL": 0.003629122,
	"StandardDeviationEL": 0.00868561
}, {
	"Country": "French Guiana",
	"Industry": "Construction",
	"MeanEL": 0.0050584,
	"StandardDeviationEL": 0.005935297
}, {
	"Country": "French Guiana",
	"Industry": "Construction Materials",
	"MeanEL": 0.000796725,
	"StandardDeviationEL": 0.005201916
}, {
	"Country": "French Guiana",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003671979,
	"StandardDeviationEL": 0.006059839
}, {
	"Country": "French Guiana",
	"Industry": "Electronics",
	"MeanEL": 0.0030069,
	"StandardDeviationEL": 0.006053359
}, {
	"Country": "French Guiana",
	"Industry": "Food",
	"MeanEL": 0.004052349,
	"StandardDeviationEL": 0.014504624
}, {
	"Country": "French Guiana",
	"Industry": "Machines",
	"MeanEL": 0.002337137,
	"StandardDeviationEL": 0.00382916
}, {
	"Country": "French Guiana",
	"Industry": "Metals",
	"MeanEL": 0.002166805,
	"StandardDeviationEL": 0.014213832
}, {
	"Country": "French Guiana",
	"Industry": "Paper",
	"MeanEL": 0.004316998,
	"StandardDeviationEL": 0.005956481
}, {
	"Country": "French Guiana",
	"Industry": "Services",
	"MeanEL": 0.003063362,
	"StandardDeviationEL": 0.021491453
}, {
	"Country": "French Guiana",
	"Industry": "Textiles",
	"MeanEL": 0.005537641,
	"StandardDeviationEL": 0.008377203
}, {
	"Country": "French Guiana",
	"Industry": "Transport",
	"MeanEL": 0.003327544,
	"StandardDeviationEL": 0.012955848
}, {
	"Country": "French Polynesia",
	"Industry": "Agriculture",
	"MeanEL": 0.003654652,
	"StandardDeviationEL": 0.006276095
}, {
	"Country": "French Polynesia",
	"Industry": "Chemicals",
	"MeanEL": 0.001356477,
	"StandardDeviationEL": 0.008754943
}, {
	"Country": "French Polynesia",
	"Industry": "Construction",
	"MeanEL": 0.003792308,
	"StandardDeviationEL": 0.00600463
}, {
	"Country": "French Polynesia",
	"Industry": "Construction Materials",
	"MeanEL": 0.002755957,
	"StandardDeviationEL": 0.005271249
}, {
	"Country": "French Polynesia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001083466,
	"StandardDeviationEL": 0.006129172
}, {
	"Country": "French Polynesia",
	"Industry": "Electronics",
	"MeanEL": 0.002669574,
	"StandardDeviationEL": 0.006122692
}, {
	"Country": "French Polynesia",
	"Industry": "Food",
	"MeanEL": 0.001080175,
	"StandardDeviationEL": 0.014573957
}, {
	"Country": "French Polynesia",
	"Industry": "Machines",
	"MeanEL": 0.003783126,
	"StandardDeviationEL": 0.003898493
}, {
	"Country": "French Polynesia",
	"Industry": "Metals",
	"MeanEL": 0.005484465,
	"StandardDeviationEL": 0.014283165
}, {
	"Country": "French Polynesia",
	"Industry": "Paper",
	"MeanEL": 0.005913057,
	"StandardDeviationEL": 0.006025814
}, {
	"Country": "French Polynesia",
	"Industry": "Services",
	"MeanEL": 0.006413813,
	"StandardDeviationEL": 0.021560786
}, {
	"Country": "French Polynesia",
	"Industry": "Textiles",
	"MeanEL": 0.004697636,
	"StandardDeviationEL": 0.008446536
}, {
	"Country": "French Polynesia",
	"Industry": "Transport",
	"MeanEL": 0.003799835,
	"StandardDeviationEL": 0.013025181
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.000731427,
	"StandardDeviationEL": 0.005933013
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.000341576,
	"StandardDeviationEL": 0.008411861
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Construction",
	"MeanEL": 0.000698856,
	"StandardDeviationEL": 0.005661547
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.001402753,
	"StandardDeviationEL": 0.004928166
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001397902,
	"StandardDeviationEL": 0.00578609
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Electronics",
	"MeanEL": 0.000599528,
	"StandardDeviationEL": 0.00577961
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.001534663,
	"StandardDeviationEL": 0.014028802
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Food",
	"MeanEL": 0.001387795,
	"StandardDeviationEL": 0.014230874
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.001488257,
	"StandardDeviationEL": 0.003555411
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.000996362,
	"StandardDeviationEL": 0.013940082
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Services",
	"MeanEL": 0.00175968,
	"StandardDeviationEL": 0.021217704
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Textiles",
	"MeanEL": 0.000428669,
	"StandardDeviationEL": 0.008103453
}, {
	"Country": "Fujairah (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.000571758,
	"StandardDeviationEL": 0.012682099
}, {
	"Country": "Gabon",
	"Industry": "Chemicals",
	"MeanEL": 0.001357104,
	"StandardDeviationEL": 0.008579575
}, {
	"Country": "Gabon",
	"Industry": "Construction",
	"MeanEL": 0.001010082,
	"StandardDeviationEL": 0.005829261
}, {
	"Country": "Gabon",
	"Industry": "Construction Materials",
	"MeanEL": 0.00094506,
	"StandardDeviationEL": 0.00509588
}, {
	"Country": "Gabon",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001194721,
	"StandardDeviationEL": 0.005953804
}, {
	"Country": "Gabon",
	"Industry": "Electronics",
	"MeanEL": 0.000578523,
	"StandardDeviationEL": 0.005947324
}, {
	"Country": "Gabon",
	"Industry": "Finance",
	"MeanEL": 0.00173601,
	"StandardDeviationEL": 0.014196516
}, {
	"Country": "Gabon",
	"Industry": "Food",
	"MeanEL": 0.00084605,
	"StandardDeviationEL": 0.014398588
}, {
	"Country": "Gabon",
	"Industry": "Machines",
	"MeanEL": 0.002748947,
	"StandardDeviationEL": 0.003723125
}, {
	"Country": "Gabon",
	"Industry": "Metals",
	"MeanEL": 0.000727887,
	"StandardDeviationEL": 0.014107796
}, {
	"Country": "Gabon",
	"Industry": "Paper",
	"MeanEL": 0.001191124,
	"StandardDeviationEL": 0.005850445
}, {
	"Country": "Gabon",
	"Industry": "Services",
	"MeanEL": 0.000741777,
	"StandardDeviationEL": 0.021385417
}, {
	"Country": "Gabon",
	"Industry": "Textiles",
	"MeanEL": 0.001401344,
	"StandardDeviationEL": 0.008271167
}, {
	"Country": "Gabon",
	"Industry": "Transport",
	"MeanEL": 0.001158998,
	"StandardDeviationEL": 0.012849813
}, {
	"Country": "Gambia",
	"Industry": "Electronics",
	"MeanEL": 0.00693159,
	"StandardDeviationEL": 0.005782967
}, {
	"Country": "Gambia",
	"Industry": "Food",
	"MeanEL": 0.005756102,
	"StandardDeviationEL": 0.014234231
}, {
	"Country": "Georgia",
	"Industry": "Chemicals",
	"MeanEL": 0.006820612,
	"StandardDeviationEL": 0.011682687
}, {
	"Country": "Georgia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001060311,
	"StandardDeviationEL": 0.008198993
}, {
	"Country": "Georgia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001221427,
	"StandardDeviationEL": 0.009056917
}, {
	"Country": "Georgia",
	"Industry": "Electronics",
	"MeanEL": 0.001123178,
	"StandardDeviationEL": 0.009050436
}, {
	"Country": "Georgia",
	"Industry": "Finance",
	"MeanEL": 0.021467886,
	"StandardDeviationEL": 0.017299628
}, {
	"Country": "Georgia",
	"Industry": "Food",
	"MeanEL": 0.001401686,
	"StandardDeviationEL": 0.017501701
}, {
	"Country": "Georgia",
	"Industry": "Metals",
	"MeanEL": 0.001089765,
	"StandardDeviationEL": 0.017210909
}, {
	"Country": "Georgia",
	"Industry": "Transport",
	"MeanEL": 0.001275326,
	"StandardDeviationEL": 0.015952925
}, {
	"Country": "Germany",
	"Industry": "Agriculture",
	"MeanEL": 0.001076754,
	"StandardDeviationEL": 0.006769951
}, {
	"Country": "Germany",
	"Industry": "Chemicals",
	"MeanEL": 0.00061358,
	"StandardDeviationEL": 0.009248799
}, {
	"Country": "Germany",
	"Industry": "Construction",
	"MeanEL": 0.001092728,
	"StandardDeviationEL": 0.006498485
}, {
	"Country": "Germany",
	"Industry": "Construction Materials",
	"MeanEL": 0.000770069,
	"StandardDeviationEL": 0.005765104
}, {
	"Country": "Germany",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000949932,
	"StandardDeviationEL": 0.006623028
}, {
	"Country": "Germany",
	"Industry": "Electronics",
	"MeanEL": 0.00041238,
	"StandardDeviationEL": 0.006616547
}, {
	"Country": "Germany",
	"Industry": "Finance",
	"MeanEL": 0.000666418,
	"StandardDeviationEL": 0.014865739
}, {
	"Country": "Germany",
	"Industry": "Food",
	"MeanEL": 0.000440511,
	"StandardDeviationEL": 0.015067812
}, {
	"Country": "Germany",
	"Industry": "Machines",
	"MeanEL": 0.000850532,
	"StandardDeviationEL": 0.004392349
}, {
	"Country": "Germany",
	"Industry": "Metals",
	"MeanEL": 0.000833469,
	"StandardDeviationEL": 0.01477702
}, {
	"Country": "Germany",
	"Industry": "Paper",
	"MeanEL": 0.000799858,
	"StandardDeviationEL": 0.006519669
}, {
	"Country": "Germany",
	"Industry": "Services",
	"MeanEL": 0.000922776,
	"StandardDeviationEL": 0.022054641
}, {
	"Country": "Germany",
	"Industry": "Textiles",
	"MeanEL": 0.001150784,
	"StandardDeviationEL": 0.008940391
}, {
	"Country": "Germany",
	"Industry": "Transport",
	"MeanEL": 0.000613665,
	"StandardDeviationEL": 0.013519036
}, {
	"Country": "Ghana",
	"Industry": "Agriculture",
	"MeanEL": 0.001436779,
	"StandardDeviationEL": 0.006598931
}, {
	"Country": "Ghana",
	"Industry": "Chemicals",
	"MeanEL": 0.0015297,
	"StandardDeviationEL": 0.009077778
}, {
	"Country": "Ghana",
	"Industry": "Construction",
	"MeanEL": 0.001328911,
	"StandardDeviationEL": 0.006327465
}, {
	"Country": "Ghana",
	"Industry": "Construction Materials",
	"MeanEL": 0.001706059,
	"StandardDeviationEL": 0.005594084
}, {
	"Country": "Ghana",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001587474,
	"StandardDeviationEL": 0.006452008
}, {
	"Country": "Ghana",
	"Industry": "Electronics",
	"MeanEL": 0.006166103,
	"StandardDeviationEL": 0.006445527
}, {
	"Country": "Ghana",
	"Industry": "Food",
	"MeanEL": 0.001001422,
	"StandardDeviationEL": 0.014896792
}, {
	"Country": "Ghana",
	"Industry": "Machines",
	"MeanEL": 0.001123298,
	"StandardDeviationEL": 0.004221328
}, {
	"Country": "Ghana",
	"Industry": "Metals",
	"MeanEL": 0.004767957,
	"StandardDeviationEL": 0.014606
}, {
	"Country": "Ghana",
	"Industry": "Services",
	"MeanEL": 0.003603633,
	"StandardDeviationEL": 0.021883621
}, {
	"Country": "Ghana",
	"Industry": "Transport",
	"MeanEL": 0.001618519,
	"StandardDeviationEL": 0.013348016
}, {
	"Country": "Gibraltar",
	"Industry": "Agriculture",
	"MeanEL": 0.003437111,
	"StandardDeviationEL": 0.006096453
}, {
	"Country": "Gibraltar",
	"Industry": "Chemicals",
	"MeanEL": 0.003079503,
	"StandardDeviationEL": 0.0085753
}, {
	"Country": "Gibraltar",
	"Industry": "Construction",
	"MeanEL": 0.003130419,
	"StandardDeviationEL": 0.005824987
}, {
	"Country": "Gibraltar",
	"Industry": "Construction Materials",
	"MeanEL": 0.002495844,
	"StandardDeviationEL": 0.005091606
}, {
	"Country": "Gibraltar",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003385317,
	"StandardDeviationEL": 0.00594953
}, {
	"Country": "Gibraltar",
	"Industry": "Electronics",
	"MeanEL": 0.002562002,
	"StandardDeviationEL": 0.005943049
}, {
	"Country": "Gibraltar",
	"Industry": "Finance",
	"MeanEL": 0.000816615,
	"StandardDeviationEL": 0.014192241
}, {
	"Country": "Gibraltar",
	"Industry": "Food",
	"MeanEL": 0.002335663,
	"StandardDeviationEL": 0.014394314
}, {
	"Country": "Gibraltar",
	"Industry": "Machines",
	"MeanEL": 0.00246068,
	"StandardDeviationEL": 0.00371885
}, {
	"Country": "Gibraltar",
	"Industry": "Paper",
	"MeanEL": 0.002902451,
	"StandardDeviationEL": 0.005846171
}, {
	"Country": "Gibraltar",
	"Industry": "Services",
	"MeanEL": 0.001092387,
	"StandardDeviationEL": 0.021381143
}, {
	"Country": "Gibraltar",
	"Industry": "Textiles",
	"MeanEL": 0.003312944,
	"StandardDeviationEL": 0.008266893
}, {
	"Country": "Gibraltar",
	"Industry": "Transport",
	"MeanEL": 0.002831885,
	"StandardDeviationEL": 0.012845538
}, {
	"Country": "Greece",
	"Industry": "Agriculture",
	"MeanEL": 0.004125581,
	"StandardDeviationEL": 0.019101948
}, {
	"Country": "Greece",
	"Industry": "Chemicals",
	"MeanEL": 0.005454847,
	"StandardDeviationEL": 0.021580796
}, {
	"Country": "Greece",
	"Industry": "Construction",
	"MeanEL": 0.007967137,
	"StandardDeviationEL": 0.018830482
}, {
	"Country": "Greece",
	"Industry": "Construction Materials",
	"MeanEL": 0.004243533,
	"StandardDeviationEL": 0.018097101
}, {
	"Country": "Greece",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002477213,
	"StandardDeviationEL": 0.018955025
}, {
	"Country": "Greece",
	"Industry": "Electronics",
	"MeanEL": 0.00860071,
	"StandardDeviationEL": 0.018948545
}, {
	"Country": "Greece",
	"Industry": "Finance",
	"MeanEL": 0.085156973,
	"StandardDeviationEL": 0.027197736
}, {
	"Country": "Greece",
	"Industry": "Food",
	"MeanEL": 0.003021443,
	"StandardDeviationEL": 0.027399809
}, {
	"Country": "Greece",
	"Industry": "Machines",
	"MeanEL": 0.005813259,
	"StandardDeviationEL": 0.016724346
}, {
	"Country": "Greece",
	"Industry": "Metals",
	"MeanEL": 0.004606057,
	"StandardDeviationEL": 0.027109017
}, {
	"Country": "Greece",
	"Industry": "Paper",
	"MeanEL": 0.004466936,
	"StandardDeviationEL": 0.018851666
}, {
	"Country": "Greece",
	"Industry": "Services",
	"MeanEL": 0.005897386,
	"StandardDeviationEL": 0.034386638
}, {
	"Country": "Greece",
	"Industry": "Textiles",
	"MeanEL": 0.012046088,
	"StandardDeviationEL": 0.021272388
}, {
	"Country": "Greece",
	"Industry": "Transport",
	"MeanEL": 0.005575763,
	"StandardDeviationEL": 0.025851033
}, {
	"Country": "Greenland",
	"Industry": "Agriculture",
	"MeanEL": 0.000639479,
	"StandardDeviationEL": 0.006871189
}, {
	"Country": "Greenland",
	"Industry": "Construction",
	"MeanEL": 0.002289339,
	"StandardDeviationEL": 0.006599723
}, {
	"Country": "Greenland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002659906,
	"StandardDeviationEL": 0.006724266
}, {
	"Country": "Greenland",
	"Industry": "Electronics",
	"MeanEL": 0.002071134,
	"StandardDeviationEL": 0.006717785
}, {
	"Country": "Greenland",
	"Industry": "Finance",
	"MeanEL": 0.000400071,
	"StandardDeviationEL": 0.014966977
}, {
	"Country": "Greenland",
	"Industry": "Food",
	"MeanEL": 0.000309006,
	"StandardDeviationEL": 0.01516905
}, {
	"Country": "Greenland",
	"Industry": "Machines",
	"MeanEL": 0.001489781,
	"StandardDeviationEL": 0.004493587
}, {
	"Country": "Greenland",
	"Industry": "Paper",
	"MeanEL": 0.008052166,
	"StandardDeviationEL": 0.006620907
}, {
	"Country": "Greenland",
	"Industry": "Services",
	"MeanEL": 0.000111978,
	"StandardDeviationEL": 0.022155879
}, {
	"Country": "Greenland",
	"Industry": "Textiles",
	"MeanEL": 0.005495809,
	"StandardDeviationEL": 0.009041629
}, {
	"Country": "Greenland",
	"Industry": "Transport",
	"MeanEL": 0.001639888,
	"StandardDeviationEL": 0.013620274
}, {
	"Country": "Grenada",
	"Industry": "Chemicals",
	"MeanEL": 0.008631708,
	"StandardDeviationEL": 0.008539
}, {
	"Country": "Grenada",
	"Industry": "Construction",
	"MeanEL": 0.008980555,
	"StandardDeviationEL": 0.005788687
}, {
	"Country": "Grenada",
	"Industry": "Electronics",
	"MeanEL": 0.009740191,
	"StandardDeviationEL": 0.005906749
}, {
	"Country": "Grenada",
	"Industry": "Food",
	"MeanEL": 0.007715556,
	"StandardDeviationEL": 0.014358013
}, {
	"Country": "Grenada",
	"Industry": "Paper",
	"MeanEL": 0.0081878,
	"StandardDeviationEL": 0.00580987
}, {
	"Country": "Grenada",
	"Industry": "Transport",
	"MeanEL": 0.007908116,
	"StandardDeviationEL": 0.012809238
}, {
	"Country": "Guadeloupe",
	"Industry": "Agriculture",
	"MeanEL": 0.001208153,
	"StandardDeviationEL": 0.006471187
}, {
	"Country": "Guadeloupe",
	"Industry": "Chemicals",
	"MeanEL": 0.003236628,
	"StandardDeviationEL": 0.008950035
}, {
	"Country": "Guadeloupe",
	"Industry": "Construction",
	"MeanEL": 0.002002388,
	"StandardDeviationEL": 0.006199721
}, {
	"Country": "Guadeloupe",
	"Industry": "Construction Materials",
	"MeanEL": 0.003057647,
	"StandardDeviationEL": 0.00546634
}, {
	"Country": "Guadeloupe",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001432874,
	"StandardDeviationEL": 0.006324264
}, {
	"Country": "Guadeloupe",
	"Industry": "Electronics",
	"MeanEL": 0.000753893,
	"StandardDeviationEL": 0.006317784
}, {
	"Country": "Guadeloupe",
	"Industry": "Finance",
	"MeanEL": 0.004249189,
	"StandardDeviationEL": 0.014566975
}, {
	"Country": "Guadeloupe",
	"Industry": "Food",
	"MeanEL": 0.001770291,
	"StandardDeviationEL": 0.014769048
}, {
	"Country": "Guadeloupe",
	"Industry": "Machines",
	"MeanEL": 0.00185831,
	"StandardDeviationEL": 0.004093585
}, {
	"Country": "Guadeloupe",
	"Industry": "Metals",
	"MeanEL": 0.00247216,
	"StandardDeviationEL": 0.014478256
}, {
	"Country": "Guadeloupe",
	"Industry": "Paper",
	"MeanEL": 0.005251759,
	"StandardDeviationEL": 0.006220905
}, {
	"Country": "Guadeloupe",
	"Industry": "Services",
	"MeanEL": 0.006561547,
	"StandardDeviationEL": 0.021755877
}, {
	"Country": "Guadeloupe",
	"Industry": "Textiles",
	"MeanEL": 0.004407591,
	"StandardDeviationEL": 0.008641627
}, {
	"Country": "Guadeloupe",
	"Industry": "Transport",
	"MeanEL": 0.003254015,
	"StandardDeviationEL": 0.013220272
}, {
	"Country": "Guam",
	"Industry": "Agriculture",
	"MeanEL": 0.008317601,
	"StandardDeviationEL": 0.006790698
}, {
	"Country": "Guam",
	"Industry": "Construction Materials",
	"MeanEL": 0.007870766,
	"StandardDeviationEL": 0.005785852
}, {
	"Country": "Guam",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003062465,
	"StandardDeviationEL": 0.006643775
}, {
	"Country": "Guam",
	"Industry": "Electronics",
	"MeanEL": 0.001773771,
	"StandardDeviationEL": 0.006637295
}, {
	"Country": "Guam",
	"Industry": "Finance",
	"MeanEL": 0.001968745,
	"StandardDeviationEL": 0.014886487
}, {
	"Country": "Guam",
	"Industry": "Food",
	"MeanEL": 0.001429782,
	"StandardDeviationEL": 0.01508856
}, {
	"Country": "Guam",
	"Industry": "Services",
	"MeanEL": 0.001646394,
	"StandardDeviationEL": 0.022075389
}, {
	"Country": "Guam",
	"Industry": "Transport",
	"MeanEL": 0.002644378,
	"StandardDeviationEL": 0.013539784
}, {
	"Country": "Guatemala",
	"Industry": "Agriculture",
	"MeanEL": 0.002466384,
	"StandardDeviationEL": 0.007235305
}, {
	"Country": "Guatemala",
	"Industry": "Chemicals",
	"MeanEL": 0.001967006,
	"StandardDeviationEL": 0.009714153
}, {
	"Country": "Guatemala",
	"Industry": "Construction",
	"MeanEL": 0.005977158,
	"StandardDeviationEL": 0.006963839
}, {
	"Country": "Guatemala",
	"Industry": "Construction Materials",
	"MeanEL": 0.002306207,
	"StandardDeviationEL": 0.006230458
}, {
	"Country": "Guatemala",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00185354,
	"StandardDeviationEL": 0.007088382
}, {
	"Country": "Guatemala",
	"Industry": "Electronics",
	"MeanEL": 0.002030661,
	"StandardDeviationEL": 0.007081902
}, {
	"Country": "Guatemala",
	"Industry": "Finance",
	"MeanEL": 0.003521503,
	"StandardDeviationEL": 0.015331094
}, {
	"Country": "Guatemala",
	"Industry": "Food",
	"MeanEL": 0.002431136,
	"StandardDeviationEL": 0.015533166
}, {
	"Country": "Guatemala",
	"Industry": "Machines",
	"MeanEL": 0.010847738,
	"StandardDeviationEL": 0.004857703
}, {
	"Country": "Guatemala",
	"Industry": "Metals",
	"MeanEL": 0.005705103,
	"StandardDeviationEL": 0.015242374
}, {
	"Country": "Guatemala",
	"Industry": "Paper",
	"MeanEL": 0.001358265,
	"StandardDeviationEL": 0.006985023
}, {
	"Country": "Guatemala",
	"Industry": "Services",
	"MeanEL": 0.002905448,
	"StandardDeviationEL": 0.022519996
}, {
	"Country": "Guatemala",
	"Industry": "Textiles",
	"MeanEL": 0.003470167,
	"StandardDeviationEL": 0.009405745
}, {
	"Country": "Guatemala",
	"Industry": "Transport",
	"MeanEL": 0.001577157,
	"StandardDeviationEL": 0.013984391
}, {
	"Country": "Guernsey",
	"Industry": "Agriculture",
	"MeanEL": 0.001029786,
	"StandardDeviationEL": 0.006630621
}, {
	"Country": "Guernsey",
	"Industry": "Chemicals",
	"MeanEL": 0.000760273,
	"StandardDeviationEL": 0.009109469
}, {
	"Country": "Guernsey",
	"Industry": "Construction",
	"MeanEL": 0.002269049,
	"StandardDeviationEL": 0.006359156
}, {
	"Country": "Guernsey",
	"Industry": "Construction Materials",
	"MeanEL": 0.003176918,
	"StandardDeviationEL": 0.005625774
}, {
	"Country": "Guernsey",
	"Industry": "Consumer Durables",
	"MeanEL": 0.007268128,
	"StandardDeviationEL": 0.006483698
}, {
	"Country": "Guernsey",
	"Industry": "Electronics",
	"MeanEL": 0.0000980234,
	"StandardDeviationEL": 0.006477218
}, {
	"Country": "Guernsey",
	"Industry": "Finance",
	"MeanEL": 0.003734141,
	"StandardDeviationEL": 0.01472641
}, {
	"Country": "Guernsey",
	"Industry": "Food",
	"MeanEL": 0.002640249,
	"StandardDeviationEL": 0.014928482
}, {
	"Country": "Guernsey",
	"Industry": "Machines",
	"MeanEL": 0.004373055,
	"StandardDeviationEL": 0.004253019
}, {
	"Country": "Guernsey",
	"Industry": "Metals",
	"MeanEL": 0.003610785,
	"StandardDeviationEL": 0.01463769
}, {
	"Country": "Guernsey",
	"Industry": "Paper",
	"MeanEL": 0.002266551,
	"StandardDeviationEL": 0.006380339
}, {
	"Country": "Guernsey",
	"Industry": "Services",
	"MeanEL": 0.002583619,
	"StandardDeviationEL": 0.021915312
}, {
	"Country": "Guernsey",
	"Industry": "Textiles",
	"MeanEL": 0.002514878,
	"StandardDeviationEL": 0.008801061
}, {
	"Country": "Guernsey",
	"Industry": "Transport",
	"MeanEL": 0.000851122,
	"StandardDeviationEL": 0.013379707
}, {
	"Country": "Guyana",
	"Industry": "Chemicals",
	"MeanEL": 0.003532867,
	"StandardDeviationEL": 0.013725045
}, {
	"Country": "Guyana",
	"Industry": "Construction Materials",
	"MeanEL": 0.001787284,
	"StandardDeviationEL": 0.01024135
}, {
	"Country": "Guyana",
	"Industry": "Consumer Durables",
	"MeanEL": 0.035979571,
	"StandardDeviationEL": 0.011099274
}, {
	"Country": "Guyana",
	"Industry": "Food",
	"MeanEL": 0.002269729,
	"StandardDeviationEL": 0.019544058
}, {
	"Country": "Guyana",
	"Industry": "Services",
	"MeanEL": 0.00447121,
	"StandardDeviationEL": 0.026530887
}, {
	"Country": "Guyana",
	"Industry": "Textiles",
	"MeanEL": 0.005845393,
	"StandardDeviationEL": 0.013416637
}, {
	"Country": "Guyana",
	"Industry": "Transport",
	"MeanEL": 0.002595495,
	"StandardDeviationEL": 0.017995282
}, {
	"Country": "Honduras",
	"Industry": "Chemicals",
	"MeanEL": 0.001954282,
	"StandardDeviationEL": 0.008876024
}, {
	"Country": "Honduras",
	"Industry": "Construction Materials",
	"MeanEL": 0.003070863,
	"StandardDeviationEL": 0.005392329
}, {
	"Country": "Honduras",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002255706,
	"StandardDeviationEL": 0.006250253
}, {
	"Country": "Honduras",
	"Industry": "Electronics",
	"MeanEL": 0.002299268,
	"StandardDeviationEL": 0.006243772
}, {
	"Country": "Honduras",
	"Industry": "Finance",
	"MeanEL": 0.006157573,
	"StandardDeviationEL": 0.014492964
}, {
	"Country": "Honduras",
	"Industry": "Food",
	"MeanEL": 0.002539129,
	"StandardDeviationEL": 0.014695037
}, {
	"Country": "Honduras",
	"Industry": "Machines",
	"MeanEL": 0.003956879,
	"StandardDeviationEL": 0.004019574
}, {
	"Country": "Honduras",
	"Industry": "Metals",
	"MeanEL": 0.001886567,
	"StandardDeviationEL": 0.014404245
}, {
	"Country": "Honduras",
	"Industry": "Paper",
	"MeanEL": 0.002173552,
	"StandardDeviationEL": 0.006146894
}, {
	"Country": "Honduras",
	"Industry": "Textiles",
	"MeanEL": 0.004952365,
	"StandardDeviationEL": 0.008567616
}, {
	"Country": "Honduras",
	"Industry": "Transport",
	"MeanEL": 0.003278316,
	"StandardDeviationEL": 0.013146261
}, {
	"Country": "Hong Kong",
	"Industry": "Agriculture",
	"MeanEL": 0.000523842,
	"StandardDeviationEL": 0.006095234
}, {
	"Country": "Hong Kong",
	"Industry": "Chemicals",
	"MeanEL": 0.000537867,
	"StandardDeviationEL": 0.008574082
}, {
	"Country": "Hong Kong",
	"Industry": "Construction",
	"MeanEL": 0.002517072,
	"StandardDeviationEL": 0.005823769
}, {
	"Country": "Hong Kong",
	"Industry": "Construction Materials",
	"MeanEL": 0.000718233,
	"StandardDeviationEL": 0.005090388
}, {
	"Country": "Hong Kong",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000306739,
	"StandardDeviationEL": 0.005948311
}, {
	"Country": "Hong Kong",
	"Industry": "Electronics",
	"MeanEL": 0.000744451,
	"StandardDeviationEL": 0.005941831
}, {
	"Country": "Hong Kong",
	"Industry": "Finance",
	"MeanEL": 0.00109252,
	"StandardDeviationEL": 0.014191023
}, {
	"Country": "Hong Kong",
	"Industry": "Food",
	"MeanEL": 0.001062556,
	"StandardDeviationEL": 0.014393096
}, {
	"Country": "Hong Kong",
	"Industry": "Machines",
	"MeanEL": 0.000863353,
	"StandardDeviationEL": 0.003717632
}, {
	"Country": "Hong Kong",
	"Industry": "Metals",
	"MeanEL": 0.001132666,
	"StandardDeviationEL": 0.014102304
}, {
	"Country": "Hong Kong",
	"Industry": "Paper",
	"MeanEL": 0.000976142,
	"StandardDeviationEL": 0.005844953
}, {
	"Country": "Hong Kong",
	"Industry": "Services",
	"MeanEL": 0.00061504,
	"StandardDeviationEL": 0.021379925
}, {
	"Country": "Hong Kong",
	"Industry": "Textiles",
	"MeanEL": 0.001113318,
	"StandardDeviationEL": 0.008265675
}, {
	"Country": "Hong Kong",
	"Industry": "Transport",
	"MeanEL": 0.00102325,
	"StandardDeviationEL": 0.01284432
}, {
	"Country": "Hungary",
	"Industry": "Agriculture",
	"MeanEL": 0.002527554,
	"StandardDeviationEL": 0.006228604
}, {
	"Country": "Hungary",
	"Industry": "Chemicals",
	"MeanEL": 0.001441989,
	"StandardDeviationEL": 0.008707452
}, {
	"Country": "Hungary",
	"Industry": "Construction",
	"MeanEL": 0.002160686,
	"StandardDeviationEL": 0.005957138
}, {
	"Country": "Hungary",
	"Industry": "Construction Materials",
	"MeanEL": 0.001930287,
	"StandardDeviationEL": 0.005223757
}, {
	"Country": "Hungary",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00187172,
	"StandardDeviationEL": 0.006081681
}, {
	"Country": "Hungary",
	"Industry": "Electronics",
	"MeanEL": 0.001508372,
	"StandardDeviationEL": 0.006075201
}, {
	"Country": "Hungary",
	"Industry": "Finance",
	"MeanEL": 0.001599685,
	"StandardDeviationEL": 0.014324392
}, {
	"Country": "Hungary",
	"Industry": "Food",
	"MeanEL": 0.001947217,
	"StandardDeviationEL": 0.014526465
}, {
	"Country": "Hungary",
	"Industry": "Machines",
	"MeanEL": 0.002250159,
	"StandardDeviationEL": 0.003851002
}, {
	"Country": "Hungary",
	"Industry": "Metals",
	"MeanEL": 0.001549608,
	"StandardDeviationEL": 0.014235673
}, {
	"Country": "Hungary",
	"Industry": "Paper",
	"MeanEL": 0.001601723,
	"StandardDeviationEL": 0.005978322
}, {
	"Country": "Hungary",
	"Industry": "Services",
	"MeanEL": 0.001396184,
	"StandardDeviationEL": 0.021513294
}, {
	"Country": "Hungary",
	"Industry": "Textiles",
	"MeanEL": 0.00236596,
	"StandardDeviationEL": 0.008399044
}, {
	"Country": "Hungary",
	"Industry": "Transport",
	"MeanEL": 0.002011732,
	"StandardDeviationEL": 0.01297769
}, {
	"Country": "Iceland",
	"Industry": "Agriculture",
	"MeanEL": 0.001713326,
	"StandardDeviationEL": 0.006016419
}, {
	"Country": "Iceland",
	"Industry": "Chemicals",
	"MeanEL": 0.000883664,
	"StandardDeviationEL": 0.008495267
}, {
	"Country": "Iceland",
	"Industry": "Construction",
	"MeanEL": 0.001012004,
	"StandardDeviationEL": 0.005744954
}, {
	"Country": "Iceland",
	"Industry": "Construction Materials",
	"MeanEL": 0.002080044,
	"StandardDeviationEL": 0.005011573
}, {
	"Country": "Iceland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000932397,
	"StandardDeviationEL": 0.005869496
}, {
	"Country": "Iceland",
	"Industry": "Electronics",
	"MeanEL": 0.001855886,
	"StandardDeviationEL": 0.005863016
}, {
	"Country": "Iceland",
	"Industry": "Finance",
	"MeanEL": 0.001080241,
	"StandardDeviationEL": 0.014112208
}, {
	"Country": "Iceland",
	"Industry": "Food",
	"MeanEL": 0.001688564,
	"StandardDeviationEL": 0.014314281
}, {
	"Country": "Iceland",
	"Industry": "Machines",
	"MeanEL": 0.000787283,
	"StandardDeviationEL": 0.003638817
}, {
	"Country": "Iceland",
	"Industry": "Metals",
	"MeanEL": 0.000762475,
	"StandardDeviationEL": 0.014023488
}, {
	"Country": "Iceland",
	"Industry": "Paper",
	"MeanEL": 0.000459317,
	"StandardDeviationEL": 0.005766138
}, {
	"Country": "Iceland",
	"Industry": "Services",
	"MeanEL": 0.001320051,
	"StandardDeviationEL": 0.02130111
}, {
	"Country": "Iceland",
	"Industry": "Textiles",
	"MeanEL": 0.001145375,
	"StandardDeviationEL": 0.00818686
}, {
	"Country": "Iceland",
	"Industry": "Transport",
	"MeanEL": 0.000779747,
	"StandardDeviationEL": 0.012765505
}, {
	"Country": "India",
	"Industry": "Agriculture",
	"MeanEL": 0.002446626,
	"StandardDeviationEL": 0.006127677
}, {
	"Country": "India",
	"Industry": "Chemicals",
	"MeanEL": 0.001485178,
	"StandardDeviationEL": 0.008606524
}, {
	"Country": "India",
	"Industry": "Construction",
	"MeanEL": 0.002922021,
	"StandardDeviationEL": 0.005856211
}, {
	"Country": "India",
	"Industry": "Construction Materials",
	"MeanEL": 0.003472591,
	"StandardDeviationEL": 0.00512283
}, {
	"Country": "India",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002008215,
	"StandardDeviationEL": 0.005980753
}, {
	"Country": "India",
	"Industry": "Electronics",
	"MeanEL": 0.001269773,
	"StandardDeviationEL": 0.005974273
}, {
	"Country": "India",
	"Industry": "Finance",
	"MeanEL": 0.003216951,
	"StandardDeviationEL": 0.014223465
}, {
	"Country": "India",
	"Industry": "Food",
	"MeanEL": 0.001710438,
	"StandardDeviationEL": 0.014425538
}, {
	"Country": "India",
	"Industry": "Machines",
	"MeanEL": 0.002783347,
	"StandardDeviationEL": 0.003750074
}, {
	"Country": "India",
	"Industry": "Metals",
	"MeanEL": 0.00126626,
	"StandardDeviationEL": 0.014134746
}, {
	"Country": "India",
	"Industry": "Paper",
	"MeanEL": 0.001710575,
	"StandardDeviationEL": 0.005877395
}, {
	"Country": "India",
	"Industry": "Services",
	"MeanEL": 0.000512626,
	"StandardDeviationEL": 0.021412367
}, {
	"Country": "India",
	"Industry": "Textiles",
	"MeanEL": 0.001737009,
	"StandardDeviationEL": 0.008298117
}, {
	"Country": "India",
	"Industry": "Transport",
	"MeanEL": 0.000995426,
	"StandardDeviationEL": 0.012876762
}, {
	"Country": "Indonesia",
	"Industry": "Agriculture",
	"MeanEL": 0.001184218,
	"StandardDeviationEL": 0.006145771
}, {
	"Country": "Indonesia",
	"Industry": "Chemicals",
	"MeanEL": 0.001735515,
	"StandardDeviationEL": 0.008624619
}, {
	"Country": "Indonesia",
	"Industry": "Construction",
	"MeanEL": 0.001661612,
	"StandardDeviationEL": 0.005874306
}, {
	"Country": "Indonesia",
	"Industry": "Construction Materials",
	"MeanEL": 0.00344902,
	"StandardDeviationEL": 0.005140924
}, {
	"Country": "Indonesia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00160487,
	"StandardDeviationEL": 0.005998848
}, {
	"Country": "Indonesia",
	"Industry": "Electronics",
	"MeanEL": 0.001347244,
	"StandardDeviationEL": 0.005992368
}, {
	"Country": "Indonesia",
	"Industry": "Finance",
	"MeanEL": 0.001877651,
	"StandardDeviationEL": 0.01424156
}, {
	"Country": "Indonesia",
	"Industry": "Food",
	"MeanEL": 0.003072479,
	"StandardDeviationEL": 0.014443632
}, {
	"Country": "Indonesia",
	"Industry": "Machines",
	"MeanEL": 0.001763654,
	"StandardDeviationEL": 0.003768169
}, {
	"Country": "Indonesia",
	"Industry": "Metals",
	"MeanEL": 0.001215862,
	"StandardDeviationEL": 0.01415284
}, {
	"Country": "Indonesia",
	"Industry": "Paper",
	"MeanEL": 0.000850128,
	"StandardDeviationEL": 0.005895489
}, {
	"Country": "Indonesia",
	"Industry": "Services",
	"MeanEL": 0.000466791,
	"StandardDeviationEL": 0.021430462
}, {
	"Country": "Indonesia",
	"Industry": "Textiles",
	"MeanEL": 0.001773909,
	"StandardDeviationEL": 0.008316211
}, {
	"Country": "Indonesia",
	"Industry": "Transport",
	"MeanEL": 0.000508378,
	"StandardDeviationEL": 0.012894857
}, {
	"Country": "Iran",
	"Industry": "Metals",
	"MeanEL": 0.084564211,
	"StandardDeviationEL": 0.020487256
}, {
	"Country": "Iran",
	"Industry": "Transport",
	"MeanEL": 0.004862918,
	"StandardDeviationEL": 0.019229273
}, {
	"Country": "Iraq",
	"Industry": "Metals",
	"MeanEL": 0.00201777,
	"StandardDeviationEL": 0.013845482
}, {
	"Country": "Ireland",
	"Industry": "Agriculture",
	"MeanEL": 0.001528619,
	"StandardDeviationEL": 0.006189799
}, {
	"Country": "Ireland",
	"Industry": "Chemicals",
	"MeanEL": 0.00138558,
	"StandardDeviationEL": 0.008668647
}, {
	"Country": "Ireland",
	"Industry": "Construction",
	"MeanEL": 0.001715861,
	"StandardDeviationEL": 0.005918333
}, {
	"Country": "Ireland",
	"Industry": "Construction Materials",
	"MeanEL": 0.000499845,
	"StandardDeviationEL": 0.005184952
}, {
	"Country": "Ireland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001058015,
	"StandardDeviationEL": 0.006042876
}, {
	"Country": "Ireland",
	"Industry": "Electronics",
	"MeanEL": 0.000861289,
	"StandardDeviationEL": 0.006036396
}, {
	"Country": "Ireland",
	"Industry": "Finance",
	"MeanEL": 0.001429728,
	"StandardDeviationEL": 0.014285587
}, {
	"Country": "Ireland",
	"Industry": "Food",
	"MeanEL": 0.000979752,
	"StandardDeviationEL": 0.01448766
}, {
	"Country": "Ireland",
	"Industry": "Machines",
	"MeanEL": 0.00213374,
	"StandardDeviationEL": 0.003812197
}, {
	"Country": "Ireland",
	"Industry": "Metals",
	"MeanEL": 0.001402562,
	"StandardDeviationEL": 0.014196868
}, {
	"Country": "Ireland",
	"Industry": "Paper",
	"MeanEL": 0.000538685,
	"StandardDeviationEL": 0.005939517
}, {
	"Country": "Ireland",
	"Industry": "Services",
	"MeanEL": 0.001614646,
	"StandardDeviationEL": 0.021474489
}, {
	"Country": "Ireland",
	"Industry": "Textiles",
	"MeanEL": 0.00200301,
	"StandardDeviationEL": 0.008360239
}, {
	"Country": "Ireland",
	"Industry": "Transport",
	"MeanEL": 0.000833874,
	"StandardDeviationEL": 0.012938884
}, {
	"Country": "Isle of Man",
	"Industry": "Agriculture",
	"MeanEL": 0.003095354,
	"StandardDeviationEL": 0.006090817
}, {
	"Country": "Isle of Man",
	"Industry": "Chemicals",
	"MeanEL": 0.001516402,
	"StandardDeviationEL": 0.008569665
}, {
	"Country": "Isle of Man",
	"Industry": "Construction",
	"MeanEL": 0.003094167,
	"StandardDeviationEL": 0.005819351
}, {
	"Country": "Isle of Man",
	"Industry": "Construction Materials",
	"MeanEL": 0.001443471,
	"StandardDeviationEL": 0.00508597
}, {
	"Country": "Isle of Man",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003816464,
	"StandardDeviationEL": 0.005943894
}, {
	"Country": "Isle of Man",
	"Industry": "Electronics",
	"MeanEL": 0.004609185,
	"StandardDeviationEL": 0.005937414
}, {
	"Country": "Isle of Man",
	"Industry": "Finance",
	"MeanEL": 0.003694454,
	"StandardDeviationEL": 0.014186605
}, {
	"Country": "Isle of Man",
	"Industry": "Food",
	"MeanEL": 0.00454702,
	"StandardDeviationEL": 0.014388678
}, {
	"Country": "Isle of Man",
	"Industry": "Machines",
	"MeanEL": 0.003041858,
	"StandardDeviationEL": 0.003713215
}, {
	"Country": "Isle of Man",
	"Industry": "Metals",
	"MeanEL": 0.002820272,
	"StandardDeviationEL": 0.014097886
}, {
	"Country": "Isle of Man",
	"Industry": "Paper",
	"MeanEL": 0.002565093,
	"StandardDeviationEL": 0.005840535
}, {
	"Country": "Isle of Man",
	"Industry": "Services",
	"MeanEL": 0.004455924,
	"StandardDeviationEL": 0.021375507
}, {
	"Country": "Isle of Man",
	"Industry": "Transport",
	"MeanEL": 0.000182903,
	"StandardDeviationEL": 0.012839902
}, {
	"Country": "Israel",
	"Industry": "Agriculture",
	"MeanEL": 0.001379714,
	"StandardDeviationEL": 0.00707872
}, {
	"Country": "Israel",
	"Industry": "Chemicals",
	"MeanEL": 0.000885025,
	"StandardDeviationEL": 0.009557568
}, {
	"Country": "Israel",
	"Industry": "Construction",
	"MeanEL": 0.001790448,
	"StandardDeviationEL": 0.006807254
}, {
	"Country": "Israel",
	"Industry": "Construction Materials",
	"MeanEL": 0.002901225,
	"StandardDeviationEL": 0.006073873
}, {
	"Country": "Israel",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000990007,
	"StandardDeviationEL": 0.006931797
}, {
	"Country": "Israel",
	"Industry": "Electronics",
	"MeanEL": 0.001611077,
	"StandardDeviationEL": 0.006925317
}, {
	"Country": "Israel",
	"Industry": "Finance",
	"MeanEL": 0.00103808,
	"StandardDeviationEL": 0.015174509
}, {
	"Country": "Israel",
	"Industry": "Food",
	"MeanEL": 0.001496717,
	"StandardDeviationEL": 0.015376581
}, {
	"Country": "Israel",
	"Industry": "Machines",
	"MeanEL": 0.001472302,
	"StandardDeviationEL": 0.004701118
}, {
	"Country": "Israel",
	"Industry": "Metals",
	"MeanEL": 0.004110521,
	"StandardDeviationEL": 0.015085789
}, {
	"Country": "Israel",
	"Industry": "Paper",
	"MeanEL": 0.00893856,
	"StandardDeviationEL": 0.006828438
}, {
	"Country": "Israel",
	"Industry": "Services",
	"MeanEL": 0.000706155,
	"StandardDeviationEL": 0.02236341
}, {
	"Country": "Israel",
	"Industry": "Textiles",
	"MeanEL": 0.00157235,
	"StandardDeviationEL": 0.00924916
}, {
	"Country": "Israel",
	"Industry": "Transport",
	"MeanEL": 0.001209018,
	"StandardDeviationEL": 0.013827806
}, {
	"Country": "Italy",
	"Industry": "Agriculture",
	"MeanEL": 0.001619782,
	"StandardDeviationEL": 0.006312321
}, {
	"Country": "Italy",
	"Industry": "Chemicals",
	"MeanEL": 0.000915625,
	"StandardDeviationEL": 0.008791169
}, {
	"Country": "Italy",
	"Industry": "Construction",
	"MeanEL": 0.001802773,
	"StandardDeviationEL": 0.006040855
}, {
	"Country": "Italy",
	"Industry": "Construction Materials",
	"MeanEL": 0.001769945,
	"StandardDeviationEL": 0.005307474
}, {
	"Country": "Italy",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001552033,
	"StandardDeviationEL": 0.006165398
}, {
	"Country": "Italy",
	"Industry": "Electronics",
	"MeanEL": 0.001255914,
	"StandardDeviationEL": 0.006158918
}, {
	"Country": "Italy",
	"Industry": "Finance",
	"MeanEL": 0.001207347,
	"StandardDeviationEL": 0.014408109
}, {
	"Country": "Italy",
	"Industry": "Food",
	"MeanEL": 0.001188949,
	"StandardDeviationEL": 0.014610182
}, {
	"Country": "Italy",
	"Industry": "Machines",
	"MeanEL": 0.001370728,
	"StandardDeviationEL": 0.003934719
}, {
	"Country": "Italy",
	"Industry": "Metals",
	"MeanEL": 0.001224511,
	"StandardDeviationEL": 0.01431939
}, {
	"Country": "Italy",
	"Industry": "Paper",
	"MeanEL": 0.00092388,
	"StandardDeviationEL": 0.006062039
}, {
	"Country": "Italy",
	"Industry": "Services",
	"MeanEL": 0.001688936,
	"StandardDeviationEL": 0.021597011
}, {
	"Country": "Italy",
	"Industry": "Textiles",
	"MeanEL": 0.001881655,
	"StandardDeviationEL": 0.008482761
}, {
	"Country": "Italy",
	"Industry": "Transport",
	"MeanEL": 0.00121244,
	"StandardDeviationEL": 0.013061407
}, {
	"Country": "Jamaica",
	"Industry": "Agriculture",
	"MeanEL": 0.004713615,
	"StandardDeviationEL": 0.006191028
}, {
	"Country": "Jamaica",
	"Industry": "Chemicals",
	"MeanEL": 0.006660374,
	"StandardDeviationEL": 0.008669876
}, {
	"Country": "Jamaica",
	"Industry": "Construction",
	"MeanEL": 0.006955605,
	"StandardDeviationEL": 0.005919562
}, {
	"Country": "Jamaica",
	"Industry": "Construction Materials",
	"MeanEL": 0.006621953,
	"StandardDeviationEL": 0.005186181
}, {
	"Country": "Jamaica",
	"Industry": "Consumer Durables",
	"MeanEL": 0.006001273,
	"StandardDeviationEL": 0.006044105
}, {
	"Country": "Jamaica",
	"Industry": "Electronics",
	"MeanEL": 0.007319443,
	"StandardDeviationEL": 0.006037625
}, {
	"Country": "Jamaica",
	"Industry": "Food",
	"MeanEL": 0.00774517,
	"StandardDeviationEL": 0.014488889
}, {
	"Country": "Jamaica",
	"Industry": "Machines",
	"MeanEL": 0.009229416,
	"StandardDeviationEL": 0.003813426
}, {
	"Country": "Jamaica",
	"Industry": "Paper",
	"MeanEL": 0.007368248,
	"StandardDeviationEL": 0.005940746
}, {
	"Country": "Jamaica",
	"Industry": "Services",
	"MeanEL": 0.007939665,
	"StandardDeviationEL": 0.021475718
}, {
	"Country": "Jamaica",
	"Industry": "Textiles",
	"MeanEL": 0.007113724,
	"StandardDeviationEL": 0.008361468
}, {
	"Country": "Japan",
	"Industry": "Agriculture",
	"MeanEL": 0.001268098,
	"StandardDeviationEL": 0.006013267
}, {
	"Country": "Japan",
	"Industry": "Chemicals",
	"MeanEL": 0.000653234,
	"StandardDeviationEL": 0.008492115
}, {
	"Country": "Japan",
	"Industry": "Construction",
	"MeanEL": 0.000782031,
	"StandardDeviationEL": 0.005741801
}, {
	"Country": "Japan",
	"Industry": "Construction Materials",
	"MeanEL": 0.00067101,
	"StandardDeviationEL": 0.00500842
}, {
	"Country": "Japan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000271581,
	"StandardDeviationEL": 0.005866344
}, {
	"Country": "Japan",
	"Industry": "Electronics",
	"MeanEL": 0.000382554,
	"StandardDeviationEL": 0.005859864
}, {
	"Country": "Japan",
	"Industry": "Finance",
	"MeanEL": 0.00064985,
	"StandardDeviationEL": 0.014109055
}, {
	"Country": "Japan",
	"Industry": "Food",
	"MeanEL": 0.00116091,
	"StandardDeviationEL": 0.014311128
}, {
	"Country": "Japan",
	"Industry": "Machines",
	"MeanEL": 0.000692438,
	"StandardDeviationEL": 0.003635665
}, {
	"Country": "Japan",
	"Industry": "Metals",
	"MeanEL": 0.000579753,
	"StandardDeviationEL": 0.014020336
}, {
	"Country": "Japan",
	"Industry": "Paper",
	"MeanEL": 0.001234923,
	"StandardDeviationEL": 0.005762985
}, {
	"Country": "Japan",
	"Industry": "Services",
	"MeanEL": 0.000764399,
	"StandardDeviationEL": 0.021297957
}, {
	"Country": "Japan",
	"Industry": "Textiles",
	"MeanEL": 0.001692666,
	"StandardDeviationEL": 0.008183707
}, {
	"Country": "Japan",
	"Industry": "Transport",
	"MeanEL": 0.000318771,
	"StandardDeviationEL": 0.012762352
}, {
	"Country": "Jersey",
	"Industry": "Agriculture",
	"MeanEL": 0.000629213,
	"StandardDeviationEL": 0.006347057
}, {
	"Country": "Jersey",
	"Industry": "Chemicals",
	"MeanEL": 0.002711197,
	"StandardDeviationEL": 0.008825905
}, {
	"Country": "Jersey",
	"Industry": "Construction",
	"MeanEL": 0.001631948,
	"StandardDeviationEL": 0.006075592
}, {
	"Country": "Jersey",
	"Industry": "Construction Materials",
	"MeanEL": 0.000138844,
	"StandardDeviationEL": 0.005342211
}, {
	"Country": "Jersey",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002392154,
	"StandardDeviationEL": 0.006200134
}, {
	"Country": "Jersey",
	"Industry": "Electronics",
	"MeanEL": 0.004197996,
	"StandardDeviationEL": 0.006193654
}, {
	"Country": "Jersey",
	"Industry": "Finance",
	"MeanEL": 0.002467832,
	"StandardDeviationEL": 0.014442846
}, {
	"Country": "Jersey",
	"Industry": "Food",
	"MeanEL": 0.001713298,
	"StandardDeviationEL": 0.014644919
}, {
	"Country": "Jersey",
	"Industry": "Machines",
	"MeanEL": 0.000461318,
	"StandardDeviationEL": 0.003969455
}, {
	"Country": "Jersey",
	"Industry": "Metals",
	"MeanEL": 0.000940622,
	"StandardDeviationEL": 0.014354127
}, {
	"Country": "Jersey",
	"Industry": "Paper",
	"MeanEL": 0.000353271,
	"StandardDeviationEL": 0.006096776
}, {
	"Country": "Jersey",
	"Industry": "Services",
	"MeanEL": 0.000303114,
	"StandardDeviationEL": 0.021631748
}, {
	"Country": "Jersey",
	"Industry": "Textiles",
	"MeanEL": 0.004683815,
	"StandardDeviationEL": 0.008517498
}, {
	"Country": "Jersey",
	"Industry": "Transport",
	"MeanEL": 0.000863213,
	"StandardDeviationEL": 0.013096143
}, {
	"Country": "Jordan",
	"Industry": "Agriculture",
	"MeanEL": 0.000922044,
	"StandardDeviationEL": 0.006168711
}, {
	"Country": "Jordan",
	"Industry": "Chemicals",
	"MeanEL": 0.000901252,
	"StandardDeviationEL": 0.008647559
}, {
	"Country": "Jordan",
	"Industry": "Construction",
	"MeanEL": 0.000908969,
	"StandardDeviationEL": 0.005897245
}, {
	"Country": "Jordan",
	"Industry": "Construction Materials",
	"MeanEL": 0.0016715,
	"StandardDeviationEL": 0.005163864
}, {
	"Country": "Jordan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000774769,
	"StandardDeviationEL": 0.006021788
}, {
	"Country": "Jordan",
	"Industry": "Electronics",
	"MeanEL": 0.001053977,
	"StandardDeviationEL": 0.006015308
}, {
	"Country": "Jordan",
	"Industry": "Finance",
	"MeanEL": 0.002903832,
	"StandardDeviationEL": 0.014264499
}, {
	"Country": "Jordan",
	"Industry": "Food",
	"MeanEL": 0.000939644,
	"StandardDeviationEL": 0.014466572
}, {
	"Country": "Jordan",
	"Industry": "Machines",
	"MeanEL": 0.000909065,
	"StandardDeviationEL": 0.003791109
}, {
	"Country": "Jordan",
	"Industry": "Metals",
	"MeanEL": 0.000977673,
	"StandardDeviationEL": 0.01417578
}, {
	"Country": "Jordan",
	"Industry": "Paper",
	"MeanEL": 0.000789509,
	"StandardDeviationEL": 0.005918429
}, {
	"Country": "Jordan",
	"Industry": "Services",
	"MeanEL": 0.000705903,
	"StandardDeviationEL": 0.021453401
}, {
	"Country": "Jordan",
	"Industry": "Textiles",
	"MeanEL": 0.000918071,
	"StandardDeviationEL": 0.008339151
}, {
	"Country": "Jordan",
	"Industry": "Transport",
	"MeanEL": 0.002022781,
	"StandardDeviationEL": 0.012917796
}, {
	"Country": "Kazakhstan",
	"Industry": "Agriculture",
	"MeanEL": 0.001380293,
	"StandardDeviationEL": 0.006710364
}, {
	"Country": "Kazakhstan",
	"Industry": "Chemicals",
	"MeanEL": 0.001956221,
	"StandardDeviationEL": 0.009189211
}, {
	"Country": "Kazakhstan",
	"Industry": "Construction",
	"MeanEL": 0.00288431,
	"StandardDeviationEL": 0.006438898
}, {
	"Country": "Kazakhstan",
	"Industry": "Construction Materials",
	"MeanEL": 0.001827649,
	"StandardDeviationEL": 0.005705517
}, {
	"Country": "Kazakhstan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002731372,
	"StandardDeviationEL": 0.006563441
}, {
	"Country": "Kazakhstan",
	"Industry": "Electronics",
	"MeanEL": 0.004390311,
	"StandardDeviationEL": 0.00655696
}, {
	"Country": "Kazakhstan",
	"Industry": "Finance",
	"MeanEL": 0.001136579,
	"StandardDeviationEL": 0.014806152
}, {
	"Country": "Kazakhstan",
	"Industry": "Food",
	"MeanEL": 0.007471459,
	"StandardDeviationEL": 0.015008225
}, {
	"Country": "Kazakhstan",
	"Industry": "Machines",
	"MeanEL": 0.002361313,
	"StandardDeviationEL": 0.004332762
}, {
	"Country": "Kazakhstan",
	"Industry": "Metals",
	"MeanEL": 0.002239754,
	"StandardDeviationEL": 0.014717433
}, {
	"Country": "Kazakhstan",
	"Industry": "Paper",
	"MeanEL": 0.001528132,
	"StandardDeviationEL": 0.006460082
}, {
	"Country": "Kazakhstan",
	"Industry": "Services",
	"MeanEL": 0.001179845,
	"StandardDeviationEL": 0.021995054
}, {
	"Country": "Kazakhstan",
	"Industry": "Textiles",
	"MeanEL": 0.002439534,
	"StandardDeviationEL": 0.008880804
}, {
	"Country": "Kazakhstan",
	"Industry": "Transport",
	"MeanEL": 0.001464439,
	"StandardDeviationEL": 0.013459449
}, {
	"Country": "Kenya",
	"Industry": "Agriculture",
	"MeanEL": 0.001354556,
	"StandardDeviationEL": 0.006670942
}, {
	"Country": "Kenya",
	"Industry": "Chemicals",
	"MeanEL": 0.0012088,
	"StandardDeviationEL": 0.00914979
}, {
	"Country": "Kenya",
	"Industry": "Construction",
	"MeanEL": 0.000901927,
	"StandardDeviationEL": 0.006399476
}, {
	"Country": "Kenya",
	"Industry": "Construction Materials",
	"MeanEL": 0.000899352,
	"StandardDeviationEL": 0.005666095
}, {
	"Country": "Kenya",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00451541,
	"StandardDeviationEL": 0.006524019
}, {
	"Country": "Kenya",
	"Industry": "Electronics",
	"MeanEL": 0.00634973,
	"StandardDeviationEL": 0.006517539
}, {
	"Country": "Kenya",
	"Industry": "Finance",
	"MeanEL": 0.001409989,
	"StandardDeviationEL": 0.01476673
}, {
	"Country": "Kenya",
	"Industry": "Food",
	"MeanEL": 0.001166824,
	"StandardDeviationEL": 0.014968803
}, {
	"Country": "Kenya",
	"Industry": "Machines",
	"MeanEL": 0.001067259,
	"StandardDeviationEL": 0.00429334
}, {
	"Country": "Kenya",
	"Industry": "Metals",
	"MeanEL": 0.001133273,
	"StandardDeviationEL": 0.014678011
}, {
	"Country": "Kenya",
	"Industry": "Paper",
	"MeanEL": 0.00195984,
	"StandardDeviationEL": 0.00642066
}, {
	"Country": "Kenya",
	"Industry": "Services",
	"MeanEL": 0.00187901,
	"StandardDeviationEL": 0.021955632
}, {
	"Country": "Kenya",
	"Industry": "Textiles",
	"MeanEL": 0.001073731,
	"StandardDeviationEL": 0.008841382
}, {
	"Country": "Kenya",
	"Industry": "Transport",
	"MeanEL": 0.001707798,
	"StandardDeviationEL": 0.013420027
}, {
	"Country": "Korea (South)",
	"Industry": "Agriculture",
	"MeanEL": 0.001071926,
	"StandardDeviationEL": 0.006050068
}, {
	"Country": "Korea (South)",
	"Industry": "Chemicals",
	"MeanEL": 0.000851856,
	"StandardDeviationEL": 0.008528916
}, {
	"Country": "Korea (South)",
	"Industry": "Construction",
	"MeanEL": 0.000705117,
	"StandardDeviationEL": 0.005778602
}, {
	"Country": "Korea (South)",
	"Industry": "Construction Materials",
	"MeanEL": 0.000880535,
	"StandardDeviationEL": 0.005045221
}, {
	"Country": "Korea (South)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001097006,
	"StandardDeviationEL": 0.005903145
}, {
	"Country": "Korea (South)",
	"Industry": "Electronics",
	"MeanEL": 0.000776739,
	"StandardDeviationEL": 0.005896665
}, {
	"Country": "Korea (South)",
	"Industry": "Finance",
	"MeanEL": 0.000780133,
	"StandardDeviationEL": 0.014145856
}, {
	"Country": "Korea (South)",
	"Industry": "Food",
	"MeanEL": 0.002142372,
	"StandardDeviationEL": 0.014347929
}, {
	"Country": "Korea (South)",
	"Industry": "Machines",
	"MeanEL": 0.00087244,
	"StandardDeviationEL": 0.003672466
}, {
	"Country": "Korea (South)",
	"Industry": "Metals",
	"MeanEL": 0.000647991,
	"StandardDeviationEL": 0.014057137
}, {
	"Country": "Korea (South)",
	"Industry": "Paper",
	"MeanEL": 0.001066305,
	"StandardDeviationEL": 0.005799786
}, {
	"Country": "Korea (South)",
	"Industry": "Services",
	"MeanEL": 0.000330995,
	"StandardDeviationEL": 0.021334758
}, {
	"Country": "Korea (South)",
	"Industry": "Textiles",
	"MeanEL": 0.001241017,
	"StandardDeviationEL": 0.008220508
}, {
	"Country": "Korea (South)",
	"Industry": "Transport",
	"MeanEL": 0.000801144,
	"StandardDeviationEL": 0.012799154
}, {
	"Country": "Kuwait",
	"Industry": "Agriculture",
	"MeanEL": 0.001053639,
	"StandardDeviationEL": 0.005993556
}, {
	"Country": "Kuwait",
	"Industry": "Chemicals",
	"MeanEL": 0.000873454,
	"StandardDeviationEL": 0.008472403
}, {
	"Country": "Kuwait",
	"Industry": "Construction",
	"MeanEL": 0.001750934,
	"StandardDeviationEL": 0.00572209
}, {
	"Country": "Kuwait",
	"Industry": "Construction Materials",
	"MeanEL": 0.001053923,
	"StandardDeviationEL": 0.004988709
}, {
	"Country": "Kuwait",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000820078,
	"StandardDeviationEL": 0.005846633
}, {
	"Country": "Kuwait",
	"Industry": "Electronics",
	"MeanEL": 0.000618204,
	"StandardDeviationEL": 0.005840152
}, {
	"Country": "Kuwait",
	"Industry": "Finance",
	"MeanEL": 0.00022963,
	"StandardDeviationEL": 0.014089344
}, {
	"Country": "Kuwait",
	"Industry": "Food",
	"MeanEL": 0.000412283,
	"StandardDeviationEL": 0.014291417
}, {
	"Country": "Kuwait",
	"Industry": "Machines",
	"MeanEL": 0.000359605,
	"StandardDeviationEL": 0.003615954
}, {
	"Country": "Kuwait",
	"Industry": "Metals",
	"MeanEL": 0.000270501,
	"StandardDeviationEL": 0.014000625
}, {
	"Country": "Kuwait",
	"Industry": "Paper",
	"MeanEL": 0.000389007,
	"StandardDeviationEL": 0.005743274
}, {
	"Country": "Kuwait",
	"Industry": "Services",
	"MeanEL": 0.000172466,
	"StandardDeviationEL": 0.021278246
}, {
	"Country": "Kuwait",
	"Industry": "Textiles",
	"MeanEL": 0.000868675,
	"StandardDeviationEL": 0.008163996
}, {
	"Country": "Kuwait",
	"Industry": "Transport",
	"MeanEL": 0.000887881,
	"StandardDeviationEL": 0.012742641
}, {
	"Country": "Kyrgyzstan",
	"Industry": "Chemicals",
	"MeanEL": 0.006448454,
	"StandardDeviationEL": 0.008755838
}, {
	"Country": "Kyrgyzstan",
	"Industry": "Construction Materials",
	"MeanEL": 0.003816988,
	"StandardDeviationEL": 0.005272144
}, {
	"Country": "Kyrgyzstan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002179006,
	"StandardDeviationEL": 0.006130067
}, {
	"Country": "Laos",
	"Industry": "Chemicals",
	"MeanEL": 0.001100074,
	"StandardDeviationEL": 0.020894925
}, {
	"Country": "Laos",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000728105,
	"StandardDeviationEL": 0.018269154
}, {
	"Country": "Laos",
	"Industry": "Electronics",
	"MeanEL": 0.000568371,
	"StandardDeviationEL": 0.018262674
}, {
	"Country": "Laos",
	"Industry": "Food",
	"MeanEL": 0.016862106,
	"StandardDeviationEL": 0.026713939
}, {
	"Country": "Laos",
	"Industry": "Metals",
	"MeanEL": 0.076566062,
	"StandardDeviationEL": 0.026423146
}, {
	"Country": "Latvia",
	"Industry": "Agriculture",
	"MeanEL": 0.001727996,
	"StandardDeviationEL": 0.006639459
}, {
	"Country": "Latvia",
	"Industry": "Chemicals",
	"MeanEL": 0.001392593,
	"StandardDeviationEL": 0.009118307
}, {
	"Country": "Latvia",
	"Industry": "Construction",
	"MeanEL": 0.001667114,
	"StandardDeviationEL": 0.006367993
}, {
	"Country": "Latvia",
	"Industry": "Construction Materials",
	"MeanEL": 0.002563951,
	"StandardDeviationEL": 0.005634612
}, {
	"Country": "Latvia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001830632,
	"StandardDeviationEL": 0.006492536
}, {
	"Country": "Latvia",
	"Industry": "Electronics",
	"MeanEL": 0.00142502,
	"StandardDeviationEL": 0.006486056
}, {
	"Country": "Latvia",
	"Industry": "Finance",
	"MeanEL": 0.0009666,
	"StandardDeviationEL": 0.014735247
}, {
	"Country": "Latvia",
	"Industry": "Food",
	"MeanEL": 0.002450563,
	"StandardDeviationEL": 0.01493732
}, {
	"Country": "Latvia",
	"Industry": "Machines",
	"MeanEL": 0.001749463,
	"StandardDeviationEL": 0.004261857
}, {
	"Country": "Latvia",
	"Industry": "Metals",
	"MeanEL": 0.003230623,
	"StandardDeviationEL": 0.014646528
}, {
	"Country": "Latvia",
	"Industry": "Paper",
	"MeanEL": 0.001225173,
	"StandardDeviationEL": 0.006389177
}, {
	"Country": "Latvia",
	"Industry": "Services",
	"MeanEL": 0.005310986,
	"StandardDeviationEL": 0.021924149
}, {
	"Country": "Latvia",
	"Industry": "Textiles",
	"MeanEL": 0.003534668,
	"StandardDeviationEL": 0.008809899
}, {
	"Country": "Latvia",
	"Industry": "Transport",
	"MeanEL": 0.001808101,
	"StandardDeviationEL": 0.013388544
}, {
	"Country": "Lebanon",
	"Industry": "Agriculture",
	"MeanEL": 0.001382038,
	"StandardDeviationEL": 0.009003921
}, {
	"Country": "Lebanon",
	"Industry": "Chemicals",
	"MeanEL": 0.001509806,
	"StandardDeviationEL": 0.011482769
}, {
	"Country": "Lebanon",
	"Industry": "Construction",
	"MeanEL": 0.000770486,
	"StandardDeviationEL": 0.008732455
}, {
	"Country": "Lebanon",
	"Industry": "Construction Materials",
	"MeanEL": 0.001502364,
	"StandardDeviationEL": 0.007999074
}, {
	"Country": "Lebanon",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001344281,
	"StandardDeviationEL": 0.008856998
}, {
	"Country": "Lebanon",
	"Industry": "Electronics",
	"MeanEL": 0.002556888,
	"StandardDeviationEL": 0.008850518
}, {
	"Country": "Lebanon",
	"Industry": "Finance",
	"MeanEL": 0.020529576,
	"StandardDeviationEL": 0.017099709
}, {
	"Country": "Lebanon",
	"Industry": "Food",
	"MeanEL": 0.002248368,
	"StandardDeviationEL": 0.017301782
}, {
	"Country": "Lebanon",
	"Industry": "Machines",
	"MeanEL": 0.001536528,
	"StandardDeviationEL": 0.006626319
}, {
	"Country": "Lebanon",
	"Industry": "Metals",
	"MeanEL": 0.00154597,
	"StandardDeviationEL": 0.01701099
}, {
	"Country": "Lebanon",
	"Industry": "Paper",
	"MeanEL": 0.001644298,
	"StandardDeviationEL": 0.008753639
}, {
	"Country": "Lebanon",
	"Industry": "Services",
	"MeanEL": 0.001426198,
	"StandardDeviationEL": 0.024288611
}, {
	"Country": "Lebanon",
	"Industry": "Textiles",
	"MeanEL": 0.001667258,
	"StandardDeviationEL": 0.011174361
}, {
	"Country": "Lebanon",
	"Industry": "Transport",
	"MeanEL": 0.00121182,
	"StandardDeviationEL": 0.015753006
}, {
	"Country": "Lesotho",
	"Industry": "Chemicals",
	"MeanEL": 0.002008104,
	"StandardDeviationEL": 0.008768266
}, {
	"Country": "Lesotho",
	"Industry": "Construction",
	"MeanEL": 0.001142765,
	"StandardDeviationEL": 0.006017952
}, {
	"Country": "Lesotho",
	"Industry": "Services",
	"MeanEL": 0.004546637,
	"StandardDeviationEL": 0.021574108
}, {
	"Country": "Liberia",
	"Industry": "Food",
	"MeanEL": 0.004203857,
	"StandardDeviationEL": 0.01448111
}, {
	"Country": "Liberia",
	"Industry": "Machines",
	"MeanEL": 0.006663766,
	"StandardDeviationEL": 0.003805647
}, {
	"Country": "Liberia",
	"Industry": "Transport",
	"MeanEL": 0.00459475,
	"StandardDeviationEL": 0.012932334
}, {
	"Country": "Libya",
	"Industry": "Agriculture",
	"MeanEL": 0.001277474,
	"StandardDeviationEL": 0.005838413
}, {
	"Country": "Liechtenstein",
	"Industry": "Agriculture",
	"MeanEL": 0.003329041,
	"StandardDeviationEL": 0.006426421
}, {
	"Country": "Liechtenstein",
	"Industry": "Chemicals",
	"MeanEL": 0.001373875,
	"StandardDeviationEL": 0.008905269
}, {
	"Country": "Liechtenstein",
	"Industry": "Construction",
	"MeanEL": 0.001535536,
	"StandardDeviationEL": 0.006154955
}, {
	"Country": "Liechtenstein",
	"Industry": "Construction Materials",
	"MeanEL": 0.00051353,
	"StandardDeviationEL": 0.005421574
}, {
	"Country": "Liechtenstein",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001776287,
	"StandardDeviationEL": 0.006279498
}, {
	"Country": "Liechtenstein",
	"Industry": "Electronics",
	"MeanEL": 0.001335311,
	"StandardDeviationEL": 0.006273018
}, {
	"Country": "Liechtenstein",
	"Industry": "Finance",
	"MeanEL": 0.002601813,
	"StandardDeviationEL": 0.014522209
}, {
	"Country": "Liechtenstein",
	"Industry": "Food",
	"MeanEL": 0.000472878,
	"StandardDeviationEL": 0.014724282
}, {
	"Country": "Liechtenstein",
	"Industry": "Machines",
	"MeanEL": 0.000258303,
	"StandardDeviationEL": 0.004048819
}, {
	"Country": "Liechtenstein",
	"Industry": "Metals",
	"MeanEL": 0.000860065,
	"StandardDeviationEL": 0.01443349
}, {
	"Country": "Liechtenstein",
	"Industry": "Paper",
	"MeanEL": 0.001790028,
	"StandardDeviationEL": 0.006176139
}, {
	"Country": "Liechtenstein",
	"Industry": "Services",
	"MeanEL": 0.001249556,
	"StandardDeviationEL": 0.021711111
}, {
	"Country": "Liechtenstein",
	"Industry": "Textiles",
	"MeanEL": 0.001896922,
	"StandardDeviationEL": 0.008596861
}, {
	"Country": "Liechtenstein",
	"Industry": "Transport",
	"MeanEL": 0.00418838,
	"StandardDeviationEL": 0.013175507
}, {
	"Country": "Lithuania",
	"Industry": "Agriculture",
	"MeanEL": 0.002129522,
	"StandardDeviationEL": 0.006361032
}, {
	"Country": "Lithuania",
	"Industry": "Chemicals",
	"MeanEL": 0.001340854,
	"StandardDeviationEL": 0.00883988
}, {
	"Country": "Lithuania",
	"Industry": "Construction",
	"MeanEL": 0.003386077,
	"StandardDeviationEL": 0.006089566
}, {
	"Country": "Lithuania",
	"Industry": "Construction Materials",
	"MeanEL": 0.001980367,
	"StandardDeviationEL": 0.005356185
}, {
	"Country": "Lithuania",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001125224,
	"StandardDeviationEL": 0.006214109
}, {
	"Country": "Lithuania",
	"Industry": "Electronics",
	"MeanEL": 0.001921756,
	"StandardDeviationEL": 0.006207629
}, {
	"Country": "Lithuania",
	"Industry": "Finance",
	"MeanEL": 0.001966821,
	"StandardDeviationEL": 0.01445682
}, {
	"Country": "Lithuania",
	"Industry": "Food",
	"MeanEL": 0.001546173,
	"StandardDeviationEL": 0.014658893
}, {
	"Country": "Lithuania",
	"Industry": "Machines",
	"MeanEL": 0.001721363,
	"StandardDeviationEL": 0.00398343
}, {
	"Country": "Lithuania",
	"Industry": "Metals",
	"MeanEL": 0.00146364,
	"StandardDeviationEL": 0.014368101
}, {
	"Country": "Lithuania",
	"Industry": "Paper",
	"MeanEL": 0.000668656,
	"StandardDeviationEL": 0.00611075
}, {
	"Country": "Lithuania",
	"Industry": "Services",
	"MeanEL": 0.002841891,
	"StandardDeviationEL": 0.021645722
}, {
	"Country": "Lithuania",
	"Industry": "Textiles",
	"MeanEL": 0.002548641,
	"StandardDeviationEL": 0.008531472
}, {
	"Country": "Lithuania",
	"Industry": "Transport",
	"MeanEL": 0.002141518,
	"StandardDeviationEL": 0.013110118
}, {
	"Country": "Luxembourg",
	"Industry": "Agriculture",
	"MeanEL": 0.001452149,
	"StandardDeviationEL": 0.006393873
}, {
	"Country": "Luxembourg",
	"Industry": "Chemicals",
	"MeanEL": 0.003140787,
	"StandardDeviationEL": 0.008872721
}, {
	"Country": "Luxembourg",
	"Industry": "Construction",
	"MeanEL": 0.002549744,
	"StandardDeviationEL": 0.006122407
}, {
	"Country": "Luxembourg",
	"Industry": "Construction Materials",
	"MeanEL": 0.002997027,
	"StandardDeviationEL": 0.005389026
}, {
	"Country": "Luxembourg",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002711136,
	"StandardDeviationEL": 0.00624695
}, {
	"Country": "Luxembourg",
	"Industry": "Electronics",
	"MeanEL": 0.001094864,
	"StandardDeviationEL": 0.00624047
}, {
	"Country": "Luxembourg",
	"Industry": "Finance",
	"MeanEL": 0.002605079,
	"StandardDeviationEL": 0.014489661
}, {
	"Country": "Luxembourg",
	"Industry": "Food",
	"MeanEL": 0.002246228,
	"StandardDeviationEL": 0.014691734
}, {
	"Country": "Luxembourg",
	"Industry": "Machines",
	"MeanEL": 0.003336173,
	"StandardDeviationEL": 0.004016271
}, {
	"Country": "Luxembourg",
	"Industry": "Metals",
	"MeanEL": 0.000552638,
	"StandardDeviationEL": 0.014400942
}, {
	"Country": "Luxembourg",
	"Industry": "Paper",
	"MeanEL": 0.003756911,
	"StandardDeviationEL": 0.006143591
}, {
	"Country": "Luxembourg",
	"Industry": "Services",
	"MeanEL": 0.001995704,
	"StandardDeviationEL": 0.021678563
}, {
	"Country": "Luxembourg",
	"Industry": "Textiles",
	"MeanEL": 0.004177185,
	"StandardDeviationEL": 0.008564313
}, {
	"Country": "Luxembourg",
	"Industry": "Transport",
	"MeanEL": 0.00593784,
	"StandardDeviationEL": 0.013142959
}, {
	"Country": "Macau",
	"Industry": "Agriculture",
	"MeanEL": 0.001867294,
	"StandardDeviationEL": 0.005974796
}, {
	"Country": "Macau",
	"Industry": "Chemicals",
	"MeanEL": 0.000912578,
	"StandardDeviationEL": 0.008453644
}, {
	"Country": "Macau",
	"Industry": "Construction",
	"MeanEL": 0.001085323,
	"StandardDeviationEL": 0.00570333
}, {
	"Country": "Macau",
	"Industry": "Construction Materials",
	"MeanEL": 0.001424676,
	"StandardDeviationEL": 0.004969949
}, {
	"Country": "Macau",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000712069,
	"StandardDeviationEL": 0.005827873
}, {
	"Country": "Macau",
	"Industry": "Electronics",
	"MeanEL": 0.000601696,
	"StandardDeviationEL": 0.005821393
}, {
	"Country": "Macau",
	"Industry": "Finance",
	"MeanEL": 0.001148213,
	"StandardDeviationEL": 0.014070585
}, {
	"Country": "Macau",
	"Industry": "Food",
	"MeanEL": 0.00068396,
	"StandardDeviationEL": 0.014272657
}, {
	"Country": "Macau",
	"Industry": "Machines",
	"MeanEL": 0.00081903,
	"StandardDeviationEL": 0.003597194
}, {
	"Country": "Macau",
	"Industry": "Metals",
	"MeanEL": 0.001141112,
	"StandardDeviationEL": 0.013981865
}, {
	"Country": "Macau",
	"Industry": "Paper",
	"MeanEL": 0.001216242,
	"StandardDeviationEL": 0.005724514
}, {
	"Country": "Macau",
	"Industry": "Services",
	"MeanEL": 0.000313826,
	"StandardDeviationEL": 0.021259487
}, {
	"Country": "Macau",
	"Industry": "Textiles",
	"MeanEL": 0.000514099,
	"StandardDeviationEL": 0.008145236
}, {
	"Country": "Macau",
	"Industry": "Transport",
	"MeanEL": 0.001903623,
	"StandardDeviationEL": 0.012723882
}, {
	"Country": "Macedonia",
	"Industry": "Agriculture",
	"MeanEL": 0.003916021,
	"StandardDeviationEL": 0.006117287
}, {
	"Country": "Macedonia",
	"Industry": "Chemicals",
	"MeanEL": 0.002801239,
	"StandardDeviationEL": 0.008596134
}, {
	"Country": "Macedonia",
	"Industry": "Construction",
	"MeanEL": 0.00249119,
	"StandardDeviationEL": 0.005845821
}, {
	"Country": "Macedonia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001711563,
	"StandardDeviationEL": 0.00511244
}, {
	"Country": "Macedonia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002030361,
	"StandardDeviationEL": 0.005970363
}, {
	"Country": "Macedonia",
	"Industry": "Electronics",
	"MeanEL": 0.002131817,
	"StandardDeviationEL": 0.005963883
}, {
	"Country": "Macedonia",
	"Industry": "Food",
	"MeanEL": 0.002203599,
	"StandardDeviationEL": 0.014415148
}, {
	"Country": "Macedonia",
	"Industry": "Machines",
	"MeanEL": 0.00175174,
	"StandardDeviationEL": 0.003739684
}, {
	"Country": "Macedonia",
	"Industry": "Metals",
	"MeanEL": 0.002242779,
	"StandardDeviationEL": 0.014124356
}, {
	"Country": "Macedonia",
	"Industry": "Paper",
	"MeanEL": 0.002490429,
	"StandardDeviationEL": 0.005867005
}, {
	"Country": "Macedonia",
	"Industry": "Textiles",
	"MeanEL": 0.00189002,
	"StandardDeviationEL": 0.008287727
}, {
	"Country": "Macedonia",
	"Industry": "Transport",
	"MeanEL": 0.003511983,
	"StandardDeviationEL": 0.012866372
}, {
	"Country": "Madagascar",
	"Industry": "Construction Materials",
	"MeanEL": 0.009259528,
	"StandardDeviationEL": 0.005898772
}, {
	"Country": "Madagascar",
	"Industry": "Consumer Durables",
	"MeanEL": 0.008862781,
	"StandardDeviationEL": 0.006756696
}, {
	"Country": "Madagascar",
	"Industry": "Electronics",
	"MeanEL": 0.009202678,
	"StandardDeviationEL": 0.006750215
}, {
	"Country": "Madagascar",
	"Industry": "Metals",
	"MeanEL": 0.015650762,
	"StandardDeviationEL": 0.014910688
}, {
	"Country": "Malawi",
	"Industry": "Chemicals",
	"MeanEL": 0.009751865,
	"StandardDeviationEL": 0.008367291
}, {
	"Country": "Malawi",
	"Industry": "Machines",
	"MeanEL": 0.008852699,
	"StandardDeviationEL": 0.003510841
}, {
	"Country": "Malaysia",
	"Industry": "Agriculture",
	"MeanEL": 0.003551301,
	"StandardDeviationEL": 0.006260735
}, {
	"Country": "Malaysia",
	"Industry": "Chemicals",
	"MeanEL": 0.000796847,
	"StandardDeviationEL": 0.008739583
}, {
	"Country": "Malaysia",
	"Industry": "Construction",
	"MeanEL": 0.002391219,
	"StandardDeviationEL": 0.00598927
}, {
	"Country": "Malaysia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001044601,
	"StandardDeviationEL": 0.005255889
}, {
	"Country": "Malaysia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001388558,
	"StandardDeviationEL": 0.006113812
}, {
	"Country": "Malaysia",
	"Industry": "Electronics",
	"MeanEL": 0.001041738,
	"StandardDeviationEL": 0.006107332
}, {
	"Country": "Malaysia",
	"Industry": "Finance",
	"MeanEL": 0.000713235,
	"StandardDeviationEL": 0.014356524
}, {
	"Country": "Malaysia",
	"Industry": "Food",
	"MeanEL": 0.000832496,
	"StandardDeviationEL": 0.014558597
}, {
	"Country": "Malaysia",
	"Industry": "Machines",
	"MeanEL": 0.000600664,
	"StandardDeviationEL": 0.003883133
}, {
	"Country": "Malaysia",
	"Industry": "Metals",
	"MeanEL": 0.002008868,
	"StandardDeviationEL": 0.014267805
}, {
	"Country": "Malaysia",
	"Industry": "Paper",
	"MeanEL": 0.00098556,
	"StandardDeviationEL": 0.006010454
}, {
	"Country": "Malaysia",
	"Industry": "Services",
	"MeanEL": 0.000882267,
	"StandardDeviationEL": 0.021545426
}, {
	"Country": "Malaysia",
	"Industry": "Textiles",
	"MeanEL": 0.001017365,
	"StandardDeviationEL": 0.008431176
}, {
	"Country": "Malaysia",
	"Industry": "Transport",
	"MeanEL": 0.000519511,
	"StandardDeviationEL": 0.013009821
}, {
	"Country": "Maldives",
	"Industry": "Agriculture",
	"MeanEL": 0.0010814,
	"StandardDeviationEL": 0.007037145
}, {
	"Country": "Maldives",
	"Industry": "Chemicals",
	"MeanEL": 0.009381424,
	"StandardDeviationEL": 0.009515993
}, {
	"Country": "Maldives",
	"Industry": "Consumer Durables",
	"MeanEL": 0.015957645,
	"StandardDeviationEL": 0.006890222
}, {
	"Country": "Maldives",
	"Industry": "Electronics",
	"MeanEL": 0.009088187,
	"StandardDeviationEL": 0.006883742
}, {
	"Country": "Maldives",
	"Industry": "Finance",
	"MeanEL": 0.009129923,
	"StandardDeviationEL": 0.015132934
}, {
	"Country": "Maldives",
	"Industry": "Food",
	"MeanEL": 0.007948278,
	"StandardDeviationEL": 0.015335007
}, {
	"Country": "Maldives",
	"Industry": "Services",
	"MeanEL": 0.008765249,
	"StandardDeviationEL": 0.022321836
}, {
	"Country": "Maldives",
	"Industry": "Transport",
	"MeanEL": 0.007290783,
	"StandardDeviationEL": 0.013786231
}, {
	"Country": "Mali",
	"Industry": "Food",
	"MeanEL": 0.034000077,
	"StandardDeviationEL": 0.014136274
}, {
	"Country": "Malta",
	"Industry": "Agriculture",
	"MeanEL": 0.000664053,
	"StandardDeviationEL": 0.006068384
}, {
	"Country": "Malta",
	"Industry": "Chemicals",
	"MeanEL": 0.001162918,
	"StandardDeviationEL": 0.008547232
}, {
	"Country": "Malta",
	"Industry": "Construction",
	"MeanEL": 0.001861678,
	"StandardDeviationEL": 0.005796918
}, {
	"Country": "Malta",
	"Industry": "Construction Materials",
	"MeanEL": 0.002019738,
	"StandardDeviationEL": 0.005063537
}, {
	"Country": "Malta",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001761032,
	"StandardDeviationEL": 0.005921461
}, {
	"Country": "Malta",
	"Industry": "Electronics",
	"MeanEL": 0.000817012,
	"StandardDeviationEL": 0.005914981
}, {
	"Country": "Malta",
	"Industry": "Finance",
	"MeanEL": 0.001332538,
	"StandardDeviationEL": 0.014164172
}, {
	"Country": "Malta",
	"Industry": "Food",
	"MeanEL": 0.001360676,
	"StandardDeviationEL": 0.014366245
}, {
	"Country": "Malta",
	"Industry": "Machines",
	"MeanEL": 0.000902734,
	"StandardDeviationEL": 0.003690782
}, {
	"Country": "Malta",
	"Industry": "Metals",
	"MeanEL": 0.002310272,
	"StandardDeviationEL": 0.014075453
}, {
	"Country": "Malta",
	"Industry": "Paper",
	"MeanEL": 0.000642816,
	"StandardDeviationEL": 0.005818102
}, {
	"Country": "Malta",
	"Industry": "Services",
	"MeanEL": 0.001167761,
	"StandardDeviationEL": 0.021353074
}, {
	"Country": "Malta",
	"Industry": "Textiles",
	"MeanEL": 0.002649134,
	"StandardDeviationEL": 0.008238824
}, {
	"Country": "Malta",
	"Industry": "Transport",
	"MeanEL": 0.001269307,
	"StandardDeviationEL": 0.012817469
}, {
	"Country": "Marshall Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.002998009,
	"StandardDeviationEL": 0.008467172
}, {
	"Country": "Marshall Islands",
	"Industry": "Services",
	"MeanEL": 0.001860799,
	"StandardDeviationEL": 0.021273014
}, {
	"Country": "Marshall Islands",
	"Industry": "Transport",
	"MeanEL": 0.003328871,
	"StandardDeviationEL": 0.012737409
}, {
	"Country": "Martinique",
	"Industry": "Agriculture",
	"MeanEL": 0.000998788,
	"StandardDeviationEL": 0.006488931
}, {
	"Country": "Martinique",
	"Industry": "Chemicals",
	"MeanEL": 0.002795861,
	"StandardDeviationEL": 0.008967778
}, {
	"Country": "Martinique",
	"Industry": "Construction",
	"MeanEL": 0.001373848,
	"StandardDeviationEL": 0.006217465
}, {
	"Country": "Martinique",
	"Industry": "Construction Materials",
	"MeanEL": 0.001755025,
	"StandardDeviationEL": 0.005484084
}, {
	"Country": "Martinique",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00072759,
	"StandardDeviationEL": 0.006342007
}, {
	"Country": "Martinique",
	"Industry": "Electronics",
	"MeanEL": 0.002913333,
	"StandardDeviationEL": 0.006335527
}, {
	"Country": "Martinique",
	"Industry": "Finance",
	"MeanEL": 0.001252554,
	"StandardDeviationEL": 0.014584719
}, {
	"Country": "Martinique",
	"Industry": "Food",
	"MeanEL": 0.002063564,
	"StandardDeviationEL": 0.014786792
}, {
	"Country": "Martinique",
	"Industry": "Machines",
	"MeanEL": 0.002404441,
	"StandardDeviationEL": 0.004111328
}, {
	"Country": "Martinique",
	"Industry": "Metals",
	"MeanEL": 0.003071639,
	"StandardDeviationEL": 0.014496
}, {
	"Country": "Martinique",
	"Industry": "Paper",
	"MeanEL": 0.003381093,
	"StandardDeviationEL": 0.006238649
}, {
	"Country": "Martinique",
	"Industry": "Services",
	"MeanEL": 0.006443866,
	"StandardDeviationEL": 0.021773621
}, {
	"Country": "Martinique",
	"Industry": "Textiles",
	"MeanEL": 0.003369892,
	"StandardDeviationEL": 0.008659371
}, {
	"Country": "Martinique",
	"Industry": "Transport",
	"MeanEL": 0.00254076,
	"StandardDeviationEL": 0.013238016
}, {
	"Country": "Mauritania",
	"Industry": "Food",
	"MeanEL": 0.008802992,
	"StandardDeviationEL": 0.014231879
}, {
	"Country": "Mauritania",
	"Industry": "Metals",
	"MeanEL": 0.00995025,
	"StandardDeviationEL": 0.013941087
}, {
	"Country": "Mauritius",
	"Industry": "Agriculture",
	"MeanEL": 0.001181145,
	"StandardDeviationEL": 0.006811168
}, {
	"Country": "Mauritius",
	"Industry": "Chemicals",
	"MeanEL": 0.007017675,
	"StandardDeviationEL": 0.009290016
}, {
	"Country": "Mauritius",
	"Industry": "Construction",
	"MeanEL": 0.00066847,
	"StandardDeviationEL": 0.006539702
}, {
	"Country": "Mauritius",
	"Industry": "Construction Materials",
	"MeanEL": 0.001624414,
	"StandardDeviationEL": 0.005806321
}, {
	"Country": "Mauritius",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000388171,
	"StandardDeviationEL": 0.006664245
}, {
	"Country": "Mauritius",
	"Industry": "Electronics",
	"MeanEL": 0.001387889,
	"StandardDeviationEL": 0.006657765
}, {
	"Country": "Mauritius",
	"Industry": "Finance",
	"MeanEL": 0.00087611,
	"StandardDeviationEL": 0.014906956
}, {
	"Country": "Mauritius",
	"Industry": "Food",
	"MeanEL": 0.001560252,
	"StandardDeviationEL": 0.015109029
}, {
	"Country": "Mauritius",
	"Industry": "Machines",
	"MeanEL": 0.002034734,
	"StandardDeviationEL": 0.004433566
}, {
	"Country": "Mauritius",
	"Industry": "Metals",
	"MeanEL": 0.000557614,
	"StandardDeviationEL": 0.014818237
}, {
	"Country": "Mauritius",
	"Industry": "Paper",
	"MeanEL": 0.00083264,
	"StandardDeviationEL": 0.006560886
}, {
	"Country": "Mauritius",
	"Industry": "Services",
	"MeanEL": 0.001928719,
	"StandardDeviationEL": 0.022095858
}, {
	"Country": "Mauritius",
	"Industry": "Textiles",
	"MeanEL": 0.000994653,
	"StandardDeviationEL": 0.008981608
}, {
	"Country": "Mauritius",
	"Industry": "Transport",
	"MeanEL": 0.000901848,
	"StandardDeviationEL": 0.013560253
}, {
	"Country": "Mayotte",
	"Industry": "Agriculture",
	"MeanEL": 0.002134119,
	"StandardDeviationEL": 0.00627849
}, {
	"Country": "Mayotte",
	"Industry": "Chemicals",
	"MeanEL": 0.004142377,
	"StandardDeviationEL": 0.008757338
}, {
	"Country": "Mayotte",
	"Industry": "Construction",
	"MeanEL": 0.00536756,
	"StandardDeviationEL": 0.006007024
}, {
	"Country": "Mayotte",
	"Industry": "Construction Materials",
	"MeanEL": 0.001880312,
	"StandardDeviationEL": 0.005273643
}, {
	"Country": "Mayotte",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001641777,
	"StandardDeviationEL": 0.006131567
}, {
	"Country": "Mayotte",
	"Industry": "Electronics",
	"MeanEL": 0.004399968,
	"StandardDeviationEL": 0.006125087
}, {
	"Country": "Mayotte",
	"Industry": "Food",
	"MeanEL": 0.005654692,
	"StandardDeviationEL": 0.014576351
}, {
	"Country": "Mayotte",
	"Industry": "Machines",
	"MeanEL": 0.004372211,
	"StandardDeviationEL": 0.003900888
}, {
	"Country": "Mayotte",
	"Industry": "Paper",
	"MeanEL": 0.00681332,
	"StandardDeviationEL": 0.006028208
}, {
	"Country": "Mayotte",
	"Industry": "Services",
	"MeanEL": 0.0069371,
	"StandardDeviationEL": 0.02156318
}, {
	"Country": "Mayotte",
	"Industry": "Textiles",
	"MeanEL": 0.00704043,
	"StandardDeviationEL": 0.00844893
}, {
	"Country": "Mayotte",
	"Industry": "Transport",
	"MeanEL": 0.003120597,
	"StandardDeviationEL": 0.013027575
}, {
	"Country": "Mexico",
	"Industry": "Agriculture",
	"MeanEL": 0.002211921,
	"StandardDeviationEL": 0.006606365
}, {
	"Country": "Mexico",
	"Industry": "Chemicals",
	"MeanEL": 0.002307497,
	"StandardDeviationEL": 0.009085213
}, {
	"Country": "Mexico",
	"Industry": "Construction",
	"MeanEL": 0.005457276,
	"StandardDeviationEL": 0.006334899
}, {
	"Country": "Mexico",
	"Industry": "Construction Materials",
	"MeanEL": 0.003811503,
	"StandardDeviationEL": 0.005601518
}, {
	"Country": "Mexico",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001222979,
	"StandardDeviationEL": 0.006459442
}, {
	"Country": "Mexico",
	"Industry": "Electronics",
	"MeanEL": 0.000493932,
	"StandardDeviationEL": 0.006452962
}, {
	"Country": "Mexico",
	"Industry": "Finance",
	"MeanEL": 0.003000176,
	"StandardDeviationEL": 0.014702153
}, {
	"Country": "Mexico",
	"Industry": "Food",
	"MeanEL": 0.001798357,
	"StandardDeviationEL": 0.014904226
}, {
	"Country": "Mexico",
	"Industry": "Machines",
	"MeanEL": 0.004362586,
	"StandardDeviationEL": 0.004228763
}, {
	"Country": "Mexico",
	"Industry": "Metals",
	"MeanEL": 0.002688505,
	"StandardDeviationEL": 0.014613434
}, {
	"Country": "Mexico",
	"Industry": "Paper",
	"MeanEL": 0.003850819,
	"StandardDeviationEL": 0.006356083
}, {
	"Country": "Mexico",
	"Industry": "Services",
	"MeanEL": 0.001306471,
	"StandardDeviationEL": 0.021891055
}, {
	"Country": "Mexico",
	"Industry": "Textiles",
	"MeanEL": 0.00433961,
	"StandardDeviationEL": 0.008776805
}, {
	"Country": "Mexico",
	"Industry": "Transport",
	"MeanEL": 0.003166431,
	"StandardDeviationEL": 0.01335545
}, {
	"Country": "Micronesia",
	"Industry": "Electronics",
	"MeanEL": 0.035675154,
	"StandardDeviationEL": 0.00568501
}, {
	"Country": "Moldova",
	"Industry": "Agriculture",
	"MeanEL": 0.006282591,
	"StandardDeviationEL": 0.006124475
}, {
	"Country": "Moldova",
	"Industry": "Chemicals",
	"MeanEL": 0.006768664,
	"StandardDeviationEL": 0.008603323
}, {
	"Country": "Moldova",
	"Industry": "Construction",
	"MeanEL": 0.006373676,
	"StandardDeviationEL": 0.005853009
}, {
	"Country": "Moldova",
	"Industry": "Construction Materials",
	"MeanEL": 0.006069233,
	"StandardDeviationEL": 0.005119628
}, {
	"Country": "Moldova",
	"Industry": "Consumer Durables",
	"MeanEL": 0.005727467,
	"StandardDeviationEL": 0.005977552
}, {
	"Country": "Moldova",
	"Industry": "Electronics",
	"MeanEL": 0.007785606,
	"StandardDeviationEL": 0.005971072
}, {
	"Country": "Moldova",
	"Industry": "Food",
	"MeanEL": 0.005948898,
	"StandardDeviationEL": 0.014422336
}, {
	"Country": "Moldova",
	"Industry": "Machines",
	"MeanEL": 0.006034052,
	"StandardDeviationEL": 0.003746873
}, {
	"Country": "Moldova",
	"Industry": "Metals",
	"MeanEL": 0.005851352,
	"StandardDeviationEL": 0.014131544
}, {
	"Country": "Moldova",
	"Industry": "Paper",
	"MeanEL": 0.005668545,
	"StandardDeviationEL": 0.005874193
}, {
	"Country": "Moldova",
	"Industry": "Textiles",
	"MeanEL": 0.002275451,
	"StandardDeviationEL": 0.008294915
}, {
	"Country": "Moldova",
	"Industry": "Transport",
	"MeanEL": 0.006126417,
	"StandardDeviationEL": 0.01287356
}, {
	"Country": "Monaco",
	"Industry": "Agriculture",
	"MeanEL": 0.001101483,
	"StandardDeviationEL": 0.006487545
}, {
	"Country": "Monaco",
	"Industry": "Chemicals",
	"MeanEL": 0.000719851,
	"StandardDeviationEL": 0.008966393
}, {
	"Country": "Monaco",
	"Industry": "Construction",
	"MeanEL": 0.003149619,
	"StandardDeviationEL": 0.00621608
}, {
	"Country": "Monaco",
	"Industry": "Construction Materials",
	"MeanEL": 0.005643573,
	"StandardDeviationEL": 0.005482699
}, {
	"Country": "Monaco",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000866195,
	"StandardDeviationEL": 0.006340622
}, {
	"Country": "Monaco",
	"Industry": "Electronics",
	"MeanEL": 0.002858098,
	"StandardDeviationEL": 0.006334142
}, {
	"Country": "Monaco",
	"Industry": "Finance",
	"MeanEL": 0.001312424,
	"StandardDeviationEL": 0.014583334
}, {
	"Country": "Monaco",
	"Industry": "Food",
	"MeanEL": 0.000984738,
	"StandardDeviationEL": 0.014785407
}, {
	"Country": "Monaco",
	"Industry": "Machines",
	"MeanEL": 0.002592009,
	"StandardDeviationEL": 0.004109943
}, {
	"Country": "Monaco",
	"Industry": "Metals",
	"MeanEL": 0.004143493,
	"StandardDeviationEL": 0.014494615
}, {
	"Country": "Monaco",
	"Industry": "Paper",
	"MeanEL": 0.00391068,
	"StandardDeviationEL": 0.006237264
}, {
	"Country": "Monaco",
	"Industry": "Services",
	"MeanEL": 0.003584027,
	"StandardDeviationEL": 0.021772236
}, {
	"Country": "Monaco",
	"Industry": "Textiles",
	"MeanEL": 0.002900119,
	"StandardDeviationEL": 0.008657986
}, {
	"Country": "Monaco",
	"Industry": "Transport",
	"MeanEL": 0.000932449,
	"StandardDeviationEL": 0.013236631
}, {
	"Country": "Mongolia",
	"Industry": "Chemicals",
	"MeanEL": 0.001439916,
	"StandardDeviationEL": 0.008521427
}, {
	"Country": "Mongolia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001264504,
	"StandardDeviationEL": 0.005037732
}, {
	"Country": "Mongolia",
	"Industry": "Electronics",
	"MeanEL": 0.001469681,
	"StandardDeviationEL": 0.005889176
}, {
	"Country": "Mongolia",
	"Industry": "Finance",
	"MeanEL": 0.002694679,
	"StandardDeviationEL": 0.014138368
}, {
	"Country": "Mongolia",
	"Industry": "Food",
	"MeanEL": 0.00119494,
	"StandardDeviationEL": 0.01434044
}, {
	"Country": "Mongolia",
	"Industry": "Transport",
	"MeanEL": 0.002030729,
	"StandardDeviationEL": 0.012791665
}, {
	"Country": "Montenegro",
	"Industry": "Agriculture",
	"MeanEL": 0.001100746,
	"StandardDeviationEL": 0.0063487
}, {
	"Country": "Montenegro",
	"Industry": "Chemicals",
	"MeanEL": 0.003122235,
	"StandardDeviationEL": 0.008827548
}, {
	"Country": "Montenegro",
	"Industry": "Construction",
	"MeanEL": 0.002377583,
	"StandardDeviationEL": 0.006077234
}, {
	"Country": "Montenegro",
	"Industry": "Construction Materials",
	"MeanEL": 0.00142251,
	"StandardDeviationEL": 0.005343853
}, {
	"Country": "Montenegro",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001983436,
	"StandardDeviationEL": 0.006201777
}, {
	"Country": "Montenegro",
	"Industry": "Food",
	"MeanEL": 0.002240663,
	"StandardDeviationEL": 0.014646561
}, {
	"Country": "Montenegro",
	"Industry": "Machines",
	"MeanEL": 0.002320826,
	"StandardDeviationEL": 0.003971098
}, {
	"Country": "Montenegro",
	"Industry": "Metals",
	"MeanEL": 0.003437483,
	"StandardDeviationEL": 0.014355769
}, {
	"Country": "Montenegro",
	"Industry": "Paper",
	"MeanEL": 0.005439306,
	"StandardDeviationEL": 0.006098418
}, {
	"Country": "Montenegro",
	"Industry": "Services",
	"MeanEL": 0.005080351,
	"StandardDeviationEL": 0.02163339
}, {
	"Country": "Montenegro",
	"Industry": "Textiles",
	"MeanEL": 0.001927845,
	"StandardDeviationEL": 0.00851914
}, {
	"Country": "Montenegro",
	"Industry": "Transport",
	"MeanEL": 0.003436883,
	"StandardDeviationEL": 0.013097785
}, {
	"Country": "Montserrat",
	"Industry": "Chemicals",
	"MeanEL": 0.004066006,
	"StandardDeviationEL": 0.008317261
}, {
	"Country": "Morocco",
	"Industry": "Agriculture",
	"MeanEL": 0.00110475,
	"StandardDeviationEL": 0.006196018
}, {
	"Country": "Morocco",
	"Industry": "Chemicals",
	"MeanEL": 0.001123018,
	"StandardDeviationEL": 0.008674866
}, {
	"Country": "Morocco",
	"Industry": "Construction",
	"MeanEL": 0.001833355,
	"StandardDeviationEL": 0.005924553
}, {
	"Country": "Morocco",
	"Industry": "Construction Materials",
	"MeanEL": 0.001753881,
	"StandardDeviationEL": 0.005191171
}, {
	"Country": "Morocco",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001240136,
	"StandardDeviationEL": 0.006049095
}, {
	"Country": "Morocco",
	"Industry": "Electronics",
	"MeanEL": 0.001565097,
	"StandardDeviationEL": 0.006042615
}, {
	"Country": "Morocco",
	"Industry": "Finance",
	"MeanEL": 0.000872104,
	"StandardDeviationEL": 0.014291807
}, {
	"Country": "Morocco",
	"Industry": "Food",
	"MeanEL": 0.000947364,
	"StandardDeviationEL": 0.014493879
}, {
	"Country": "Morocco",
	"Industry": "Machines",
	"MeanEL": 0.003385769,
	"StandardDeviationEL": 0.003818416
}, {
	"Country": "Morocco",
	"Industry": "Metals",
	"MeanEL": 0.001199914,
	"StandardDeviationEL": 0.014203087
}, {
	"Country": "Morocco",
	"Industry": "Paper",
	"MeanEL": 0.000668953,
	"StandardDeviationEL": 0.005945736
}, {
	"Country": "Morocco",
	"Industry": "Services",
	"MeanEL": 0.000213663,
	"StandardDeviationEL": 0.021480709
}, {
	"Country": "Morocco",
	"Industry": "Textiles",
	"MeanEL": 0.001492325,
	"StandardDeviationEL": 0.008366458
}, {
	"Country": "Morocco",
	"Industry": "Transport",
	"MeanEL": 0.001664639,
	"StandardDeviationEL": 0.012945104
}, {
	"Country": "Mozambique",
	"Industry": "Chemicals",
	"MeanEL": 0.000981551,
	"StandardDeviationEL": 0.008367321
}, {
	"Country": "Mozambique",
	"Industry": "Construction Materials",
	"MeanEL": 0.001198844,
	"StandardDeviationEL": 0.004883626
}, {
	"Country": "Mozambique",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001518828,
	"StandardDeviationEL": 0.00574155
}, {
	"Country": "Mozambique",
	"Industry": "Electronics",
	"MeanEL": 0.001624525,
	"StandardDeviationEL": 0.00573507
}, {
	"Country": "Mozambique",
	"Industry": "Food",
	"MeanEL": 0.001520972,
	"StandardDeviationEL": 0.014186334
}, {
	"Country": "Mozambique",
	"Industry": "Machines",
	"MeanEL": 0.001659195,
	"StandardDeviationEL": 0.003510871
}, {
	"Country": "Mozambique",
	"Industry": "Metals",
	"MeanEL": 0.00062458,
	"StandardDeviationEL": 0.013895542
}, {
	"Country": "Myanmar",
	"Industry": "Construction",
	"MeanEL": 0.005880316,
	"StandardDeviationEL": 0.00595474
}, {
	"Country": "Myanmar",
	"Industry": "Construction Materials",
	"MeanEL": 0.006599129,
	"StandardDeviationEL": 0.005221359
}, {
	"Country": "Myanmar",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002975195,
	"StandardDeviationEL": 0.006079283
}, {
	"Country": "Myanmar",
	"Industry": "Electronics",
	"MeanEL": 0.001126389,
	"StandardDeviationEL": 0.006072802
}, {
	"Country": "Myanmar",
	"Industry": "Food",
	"MeanEL": 0.00556955,
	"StandardDeviationEL": 0.014524067
}, {
	"Country": "Myanmar",
	"Industry": "Services",
	"MeanEL": 0.001571255,
	"StandardDeviationEL": 0.021510896
}, {
	"Country": "Namibia",
	"Industry": "Agriculture",
	"MeanEL": 0.000421294,
	"StandardDeviationEL": 0.006146371
}, {
	"Country": "Namibia",
	"Industry": "Chemicals",
	"MeanEL": 0.001015448,
	"StandardDeviationEL": 0.008625219
}, {
	"Country": "Namibia",
	"Industry": "Construction",
	"MeanEL": 0.001040776,
	"StandardDeviationEL": 0.005874906
}, {
	"Country": "Namibia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001086868,
	"StandardDeviationEL": 0.005141524
}, {
	"Country": "Namibia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000988022,
	"StandardDeviationEL": 0.005999448
}, {
	"Country": "Namibia",
	"Industry": "Electronics",
	"MeanEL": 0.002110427,
	"StandardDeviationEL": 0.005992968
}, {
	"Country": "Namibia",
	"Industry": "Food",
	"MeanEL": 0.000783037,
	"StandardDeviationEL": 0.014444232
}, {
	"Country": "Namibia",
	"Industry": "Machines",
	"MeanEL": 0.00046026,
	"StandardDeviationEL": 0.003768769
}, {
	"Country": "Namibia",
	"Industry": "Metals",
	"MeanEL": 0.000687186,
	"StandardDeviationEL": 0.01415344
}, {
	"Country": "Namibia",
	"Industry": "Paper",
	"MeanEL": 0.000765473,
	"StandardDeviationEL": 0.005896089
}, {
	"Country": "Namibia",
	"Industry": "Services",
	"MeanEL": 0.002717364,
	"StandardDeviationEL": 0.021431062
}, {
	"Country": "Namibia",
	"Industry": "Textiles",
	"MeanEL": 0.000402748,
	"StandardDeviationEL": 0.008316812
}, {
	"Country": "Namibia",
	"Industry": "Transport",
	"MeanEL": 0.000476809,
	"StandardDeviationEL": 0.012895457
}, {
	"Country": "Nauru",
	"Industry": "Food",
	"MeanEL": 0.008886011,
	"StandardDeviationEL": 0.014136274
}, {
	"Country": "Nepal",
	"Industry": "Agriculture",
	"MeanEL": 0.001544582,
	"StandardDeviationEL": 0.005994787
}, {
	"Country": "Nepal",
	"Industry": "Construction Materials",
	"MeanEL": 0.001905629,
	"StandardDeviationEL": 0.00498994
}, {
	"Country": "Nepal",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001854126,
	"StandardDeviationEL": 0.005847864
}, {
	"Country": "Nepal",
	"Industry": "Electronics",
	"MeanEL": 0.001793007,
	"StandardDeviationEL": 0.005841384
}, {
	"Country": "Nepal",
	"Industry": "Food",
	"MeanEL": 0.0010814,
	"StandardDeviationEL": 0.014292648
}, {
	"Country": "Nepal",
	"Industry": "Metals",
	"MeanEL": 0.001426948,
	"StandardDeviationEL": 0.014001856
}, {
	"Country": "Nepal",
	"Industry": "Transport",
	"MeanEL": 0.002062297,
	"StandardDeviationEL": 0.012743873
}, {
	"Country": "Netherlands",
	"Industry": "Agriculture",
	"MeanEL": 0.000567519,
	"StandardDeviationEL": 0.006180351
}, {
	"Country": "Netherlands",
	"Industry": "Chemicals",
	"MeanEL": 0.00045691,
	"StandardDeviationEL": 0.008659199
}, {
	"Country": "Netherlands",
	"Industry": "Construction",
	"MeanEL": 0.000659864,
	"StandardDeviationEL": 0.005908885
}, {
	"Country": "Netherlands",
	"Industry": "Construction Materials",
	"MeanEL": 0.000790401,
	"StandardDeviationEL": 0.005175504
}, {
	"Country": "Netherlands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000981025,
	"StandardDeviationEL": 0.006033428
}, {
	"Country": "Netherlands",
	"Industry": "Electronics",
	"MeanEL": 0.000711977,
	"StandardDeviationEL": 0.006026948
}, {
	"Country": "Netherlands",
	"Industry": "Finance",
	"MeanEL": 0.000541262,
	"StandardDeviationEL": 0.014276139
}, {
	"Country": "Netherlands",
	"Industry": "Food",
	"MeanEL": 0.000546434,
	"StandardDeviationEL": 0.014478212
}, {
	"Country": "Netherlands",
	"Industry": "Machines",
	"MeanEL": 0.000659898,
	"StandardDeviationEL": 0.003802749
}, {
	"Country": "Netherlands",
	"Industry": "Metals",
	"MeanEL": 0.000857487,
	"StandardDeviationEL": 0.01418742
}, {
	"Country": "Netherlands",
	"Industry": "Paper",
	"MeanEL": 0.00071249,
	"StandardDeviationEL": 0.005930069
}, {
	"Country": "Netherlands",
	"Industry": "Services",
	"MeanEL": 0.00084079,
	"StandardDeviationEL": 0.021465041
}, {
	"Country": "Netherlands",
	"Industry": "Textiles",
	"MeanEL": 0.000974338,
	"StandardDeviationEL": 0.008350791
}, {
	"Country": "Netherlands",
	"Industry": "Transport",
	"MeanEL": 0.000409827,
	"StandardDeviationEL": 0.012929436
}, {
	"Country": "New Caledonia",
	"Industry": "Agriculture",
	"MeanEL": 0.001368294,
	"StandardDeviationEL": 0.006053669
}, {
	"Country": "New Caledonia",
	"Industry": "Chemicals",
	"MeanEL": 0.00322757,
	"StandardDeviationEL": 0.008532517
}, {
	"Country": "New Caledonia",
	"Industry": "Construction",
	"MeanEL": 0.001531063,
	"StandardDeviationEL": 0.005782203
}, {
	"Country": "New Caledonia",
	"Industry": "Construction Materials",
	"MeanEL": 0.003376748,
	"StandardDeviationEL": 0.005048822
}, {
	"Country": "New Caledonia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00208521,
	"StandardDeviationEL": 0.005906746
}, {
	"Country": "New Caledonia",
	"Industry": "Electronics",
	"MeanEL": 0.001701915,
	"StandardDeviationEL": 0.005900266
}, {
	"Country": "New Caledonia",
	"Industry": "Finance",
	"MeanEL": 0.002085341,
	"StandardDeviationEL": 0.014149458
}, {
	"Country": "New Caledonia",
	"Industry": "Food",
	"MeanEL": 0.001100079,
	"StandardDeviationEL": 0.01435153
}, {
	"Country": "New Caledonia",
	"Industry": "Machines",
	"MeanEL": 0.001109439,
	"StandardDeviationEL": 0.003676067
}, {
	"Country": "New Caledonia",
	"Industry": "Metals",
	"MeanEL": 0.002144271,
	"StandardDeviationEL": 0.014060738
}, {
	"Country": "New Caledonia",
	"Industry": "Paper",
	"MeanEL": 0.002159659,
	"StandardDeviationEL": 0.005803387
}, {
	"Country": "New Caledonia",
	"Industry": "Services",
	"MeanEL": 0.001558932,
	"StandardDeviationEL": 0.02133836
}, {
	"Country": "New Caledonia",
	"Industry": "Textiles",
	"MeanEL": 0.002697884,
	"StandardDeviationEL": 0.008224109
}, {
	"Country": "New Caledonia",
	"Industry": "Transport",
	"MeanEL": 0.002599326,
	"StandardDeviationEL": 0.012802755
}, {
	"Country": "New Zealand",
	"Industry": "Agriculture",
	"MeanEL": 0.001473159,
	"StandardDeviationEL": 0.006427386
}, {
	"Country": "New Zealand",
	"Industry": "Chemicals",
	"MeanEL": 0.001452639,
	"StandardDeviationEL": 0.008906234
}, {
	"Country": "New Zealand",
	"Industry": "Construction",
	"MeanEL": 0.00128343,
	"StandardDeviationEL": 0.006155921
}, {
	"Country": "New Zealand",
	"Industry": "Construction Materials",
	"MeanEL": 0.001076669,
	"StandardDeviationEL": 0.005422539
}, {
	"Country": "New Zealand",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001227472,
	"StandardDeviationEL": 0.006280463
}, {
	"Country": "New Zealand",
	"Industry": "Electronics",
	"MeanEL": 0.000482895,
	"StandardDeviationEL": 0.006273983
}, {
	"Country": "New Zealand",
	"Industry": "Finance",
	"MeanEL": 0.001488111,
	"StandardDeviationEL": 0.014523175
}, {
	"Country": "New Zealand",
	"Industry": "Food",
	"MeanEL": 0.001399732,
	"StandardDeviationEL": 0.014725247
}, {
	"Country": "New Zealand",
	"Industry": "Machines",
	"MeanEL": 0.000846752,
	"StandardDeviationEL": 0.004049784
}, {
	"Country": "New Zealand",
	"Industry": "Metals",
	"MeanEL": 0.00113253,
	"StandardDeviationEL": 0.014434455
}, {
	"Country": "New Zealand",
	"Industry": "Paper",
	"MeanEL": 0.001369748,
	"StandardDeviationEL": 0.006177104
}, {
	"Country": "New Zealand",
	"Industry": "Services",
	"MeanEL": 0.001070134,
	"StandardDeviationEL": 0.021712077
}, {
	"Country": "New Zealand",
	"Industry": "Textiles",
	"MeanEL": 0.001372605,
	"StandardDeviationEL": 0.008597826
}, {
	"Country": "New Zealand",
	"Industry": "Transport",
	"MeanEL": 0.004903588,
	"StandardDeviationEL": 0.013176472
}, {
	"Country": "Nicaragua",
	"Industry": "Agriculture",
	"MeanEL": 0.003288089,
	"StandardDeviationEL": 0.006024971
}, {
	"Country": "Nicaragua",
	"Industry": "Chemicals",
	"MeanEL": 0.002449193,
	"StandardDeviationEL": 0.008503819
}, {
	"Country": "Nicaragua",
	"Industry": "Construction",
	"MeanEL": 0.002541232,
	"StandardDeviationEL": 0.005753505
}, {
	"Country": "Nicaragua",
	"Industry": "Construction Materials",
	"MeanEL": 0.003348044,
	"StandardDeviationEL": 0.005020124
}, {
	"Country": "Nicaragua",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003553331,
	"StandardDeviationEL": 0.005878048
}, {
	"Country": "Nicaragua",
	"Industry": "Electronics",
	"MeanEL": 0.003329912,
	"StandardDeviationEL": 0.005871568
}, {
	"Country": "Nicaragua",
	"Industry": "Food",
	"MeanEL": 0.004443815,
	"StandardDeviationEL": 0.014322832
}, {
	"Country": "Nicaragua",
	"Industry": "Machines",
	"MeanEL": 0.004484829,
	"StandardDeviationEL": 0.003647369
}, {
	"Country": "Nicaragua",
	"Industry": "Paper",
	"MeanEL": 0.004245676,
	"StandardDeviationEL": 0.005774689
}, {
	"Country": "Nicaragua",
	"Industry": "Textiles",
	"MeanEL": 0.003867777,
	"StandardDeviationEL": 0.008195411
}, {
	"Country": "Nicaragua",
	"Industry": "Transport",
	"MeanEL": 0.003382916,
	"StandardDeviationEL": 0.012774056
}, {
	"Country": "Niger",
	"Industry": "Food",
	"MeanEL": 0.001870425,
	"StandardDeviationEL": 0.014136274
}, {
	"Country": "Nigeria",
	"Industry": "Agriculture",
	"MeanEL": 0.001202763,
	"StandardDeviationEL": 0.006317058
}, {
	"Country": "Nigeria",
	"Industry": "Chemicals",
	"MeanEL": 0.000925621,
	"StandardDeviationEL": 0.008795906
}, {
	"Country": "Nigeria",
	"Industry": "Construction",
	"MeanEL": 0.003234316,
	"StandardDeviationEL": 0.006045592
}, {
	"Country": "Nigeria",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001314116,
	"StandardDeviationEL": 0.006170135
}, {
	"Country": "Nigeria",
	"Industry": "Electronics",
	"MeanEL": 0.000765236,
	"StandardDeviationEL": 0.006163655
}, {
	"Country": "Nigeria",
	"Industry": "Finance",
	"MeanEL": 0.001568869,
	"StandardDeviationEL": 0.014412847
}, {
	"Country": "Nigeria",
	"Industry": "Food",
	"MeanEL": 0.004064189,
	"StandardDeviationEL": 0.014614919
}, {
	"Country": "Nigeria",
	"Industry": "Machines",
	"MeanEL": 0.000977155,
	"StandardDeviationEL": 0.003939456
}, {
	"Country": "Nigeria",
	"Industry": "Metals",
	"MeanEL": 0.002086444,
	"StandardDeviationEL": 0.014324127
}, {
	"Country": "Nigeria",
	"Industry": "Paper",
	"MeanEL": 0.000979621,
	"StandardDeviationEL": 0.006066776
}, {
	"Country": "Nigeria",
	"Industry": "Services",
	"MeanEL": 0.001192317,
	"StandardDeviationEL": 0.021601748
}, {
	"Country": "Nigeria",
	"Industry": "Transport",
	"MeanEL": 0.000942562,
	"StandardDeviationEL": 0.013066144
}, {
	"Country": "Niue",
	"Industry": "Construction Materials",
	"MeanEL": 0.000957893,
	"StandardDeviationEL": 0.00492103
}, {
	"Country": "Niue",
	"Industry": "Food",
	"MeanEL": 0.000433108,
	"StandardDeviationEL": 0.014223738
}, {
	"Country": "Niue",
	"Industry": "Services",
	"MeanEL": 0.000027689,
	"StandardDeviationEL": 0.021210567
}, {
	"Country": "Norfolk Island",
	"Industry": "Food",
	"MeanEL": 0.000957169,
	"StandardDeviationEL": 0.014278841
}, {
	"Country": "Norfolk Island",
	"Industry": "Services",
	"MeanEL": 0.000957169,
	"StandardDeviationEL": 0.02126567
}, {
	"Country": "Norfolk Island",
	"Industry": "Textiles",
	"MeanEL": 0.001812569,
	"StandardDeviationEL": 0.00815142
}, {
	"Country": "Northern Mariana Is.",
	"Industry": "Electronics",
	"MeanEL": 0.002792682,
	"StandardDeviationEL": 0.005705303
}, {
	"Country": "Northern Mariana Is.",
	"Industry": "Food",
	"MeanEL": 0.002914443,
	"StandardDeviationEL": 0.014156567
}, {
	"Country": "Norway",
	"Industry": "Agriculture",
	"MeanEL": 0.000477365,
	"StandardDeviationEL": 0.006224141
}, {
	"Country": "Norway",
	"Industry": "Chemicals",
	"MeanEL": 0.000381437,
	"StandardDeviationEL": 0.008702989
}, {
	"Country": "Norway",
	"Industry": "Construction",
	"MeanEL": 0.000582146,
	"StandardDeviationEL": 0.005952675
}, {
	"Country": "Norway",
	"Industry": "Construction Materials",
	"MeanEL": 0.000600898,
	"StandardDeviationEL": 0.005219294
}, {
	"Country": "Norway",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000615205,
	"StandardDeviationEL": 0.006077218
}, {
	"Country": "Norway",
	"Industry": "Electronics",
	"MeanEL": 0.000525359,
	"StandardDeviationEL": 0.006070738
}, {
	"Country": "Norway",
	"Industry": "Finance",
	"MeanEL": 0.000516416,
	"StandardDeviationEL": 0.01431993
}, {
	"Country": "Norway",
	"Industry": "Food",
	"MeanEL": 0.000353314,
	"StandardDeviationEL": 0.014522002
}, {
	"Country": "Norway",
	"Industry": "Machines",
	"MeanEL": 0.000791314,
	"StandardDeviationEL": 0.003846539
}, {
	"Country": "Norway",
	"Industry": "Metals",
	"MeanEL": 0.00059429,
	"StandardDeviationEL": 0.01423121
}, {
	"Country": "Norway",
	"Industry": "Paper",
	"MeanEL": 0.000479254,
	"StandardDeviationEL": 0.005973859
}, {
	"Country": "Norway",
	"Industry": "Services",
	"MeanEL": 0.000777227,
	"StandardDeviationEL": 0.021508831
}, {
	"Country": "Norway",
	"Industry": "Textiles",
	"MeanEL": 0.001152743,
	"StandardDeviationEL": 0.008394581
}, {
	"Country": "Norway",
	"Industry": "Transport",
	"MeanEL": 0.000669096,
	"StandardDeviationEL": 0.012973227
}, {
	"Country": "Oman",
	"Industry": "Agriculture",
	"MeanEL": 0.001355323,
	"StandardDeviationEL": 0.00597111
}, {
	"Country": "Oman",
	"Industry": "Chemicals",
	"MeanEL": 0.000473365,
	"StandardDeviationEL": 0.008449958
}, {
	"Country": "Oman",
	"Industry": "Construction",
	"MeanEL": 0.001704932,
	"StandardDeviationEL": 0.005699645
}, {
	"Country": "Oman",
	"Industry": "Construction Materials",
	"MeanEL": 0.000982678,
	"StandardDeviationEL": 0.004966263
}, {
	"Country": "Oman",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000908747,
	"StandardDeviationEL": 0.005824187
}, {
	"Country": "Oman",
	"Industry": "Electronics",
	"MeanEL": 0.000611344,
	"StandardDeviationEL": 0.005817707
}, {
	"Country": "Oman",
	"Industry": "Finance",
	"MeanEL": 0.001000609,
	"StandardDeviationEL": 0.014066899
}, {
	"Country": "Oman",
	"Industry": "Food",
	"MeanEL": 0.000673683,
	"StandardDeviationEL": 0.014268971
}, {
	"Country": "Oman",
	"Industry": "Machines",
	"MeanEL": 0.001369332,
	"StandardDeviationEL": 0.003593508
}, {
	"Country": "Oman",
	"Industry": "Metals",
	"MeanEL": 0.000748838,
	"StandardDeviationEL": 0.013978179
}, {
	"Country": "Oman",
	"Industry": "Paper",
	"MeanEL": 0.000712703,
	"StandardDeviationEL": 0.005720828
}, {
	"Country": "Oman",
	"Industry": "Services",
	"MeanEL": 0.0000658146,
	"StandardDeviationEL": 0.021255801
}, {
	"Country": "Oman",
	"Industry": "Textiles",
	"MeanEL": 0.001505049,
	"StandardDeviationEL": 0.00814155
}, {
	"Country": "Oman",
	"Industry": "Transport",
	"MeanEL": 0.000584354,
	"StandardDeviationEL": 0.012720196
}, {
	"Country": "Pakistan",
	"Industry": "Chemicals",
	"MeanEL": 0.003154097,
	"StandardDeviationEL": 0.010053478
}, {
	"Country": "Pakistan",
	"Industry": "Construction",
	"MeanEL": 0.000723346,
	"StandardDeviationEL": 0.007303164
}, {
	"Country": "Pakistan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000938427,
	"StandardDeviationEL": 0.007427707
}, {
	"Country": "Pakistan",
	"Industry": "Electronics",
	"MeanEL": 0.000858411,
	"StandardDeviationEL": 0.007421227
}, {
	"Country": "Pakistan",
	"Industry": "Finance",
	"MeanEL": 0.002827546,
	"StandardDeviationEL": 0.015670418
}, {
	"Country": "Pakistan",
	"Industry": "Metals",
	"MeanEL": 0.012881064,
	"StandardDeviationEL": 0.015581699
}, {
	"Country": "Pakistan",
	"Industry": "Paper",
	"MeanEL": 0.00475528,
	"StandardDeviationEL": 0.007324348
}, {
	"Country": "Pakistan",
	"Industry": "Services",
	"MeanEL": 0.003143301,
	"StandardDeviationEL": 0.02285932
}, {
	"Country": "Pakistan",
	"Industry": "Textiles",
	"MeanEL": 0.001661808,
	"StandardDeviationEL": 0.00974507
}, {
	"Country": "Palau",
	"Industry": "Consumer Durables",
	"MeanEL": 0.009777858,
	"StandardDeviationEL": 0.00569149
}, {
	"Country": "Panama",
	"Industry": "Agriculture",
	"MeanEL": 0.001701289,
	"StandardDeviationEL": 0.006099921
}, {
	"Country": "Panama",
	"Industry": "Chemicals",
	"MeanEL": 0.001589164,
	"StandardDeviationEL": 0.008578769
}, {
	"Country": "Panama",
	"Industry": "Construction",
	"MeanEL": 0.002650258,
	"StandardDeviationEL": 0.005828456
}, {
	"Country": "Panama",
	"Industry": "Construction Materials",
	"MeanEL": 0.002325711,
	"StandardDeviationEL": 0.005095074
}, {
	"Country": "Panama",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001795829,
	"StandardDeviationEL": 0.005952998
}, {
	"Country": "Panama",
	"Industry": "Electronics",
	"MeanEL": 0.001894065,
	"StandardDeviationEL": 0.005946518
}, {
	"Country": "Panama",
	"Industry": "Finance",
	"MeanEL": 0.001777891,
	"StandardDeviationEL": 0.01419571
}, {
	"Country": "Panama",
	"Industry": "Food",
	"MeanEL": 0.002237976,
	"StandardDeviationEL": 0.014397782
}, {
	"Country": "Panama",
	"Industry": "Machines",
	"MeanEL": 0.002092654,
	"StandardDeviationEL": 0.003722319
}, {
	"Country": "Panama",
	"Industry": "Metals",
	"MeanEL": 0.00225019,
	"StandardDeviationEL": 0.01410699
}, {
	"Country": "Panama",
	"Industry": "Paper",
	"MeanEL": 0.002007883,
	"StandardDeviationEL": 0.005849639
}, {
	"Country": "Panama",
	"Industry": "Services",
	"MeanEL": 0.000735119,
	"StandardDeviationEL": 0.021384612
}, {
	"Country": "Panama",
	"Industry": "Textiles",
	"MeanEL": 0.003576933,
	"StandardDeviationEL": 0.008270361
}, {
	"Country": "Panama",
	"Industry": "Transport",
	"MeanEL": 0.001846,
	"StandardDeviationEL": 0.012849007
}, {
	"Country": "Papua New Guinea",
	"Industry": "Agriculture",
	"MeanEL": 0.001250584,
	"StandardDeviationEL": 0.006054723
}, {
	"Country": "Papua New Guinea",
	"Industry": "Chemicals",
	"MeanEL": 0.001005557,
	"StandardDeviationEL": 0.008533571
}, {
	"Country": "Papua New Guinea",
	"Industry": "Construction",
	"MeanEL": 0.001641964,
	"StandardDeviationEL": 0.005783257
}, {
	"Country": "Papua New Guinea",
	"Industry": "Construction Materials",
	"MeanEL": 0.000693143,
	"StandardDeviationEL": 0.005049876
}, {
	"Country": "Papua New Guinea",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002669744,
	"StandardDeviationEL": 0.0059078
}, {
	"Country": "Papua New Guinea",
	"Industry": "Electronics",
	"MeanEL": 0.001173901,
	"StandardDeviationEL": 0.00590132
}, {
	"Country": "Papua New Guinea",
	"Industry": "Food",
	"MeanEL": 0.001578374,
	"StandardDeviationEL": 0.014352584
}, {
	"Country": "Papua New Guinea",
	"Industry": "Machines",
	"MeanEL": 0.001301496,
	"StandardDeviationEL": 0.003677121
}, {
	"Country": "Papua New Guinea",
	"Industry": "Metals",
	"MeanEL": 0.002199508,
	"StandardDeviationEL": 0.014061792
}, {
	"Country": "Papua New Guinea",
	"Industry": "Paper",
	"MeanEL": 0.00121654,
	"StandardDeviationEL": 0.005804441
}, {
	"Country": "Papua New Guinea",
	"Industry": "Services",
	"MeanEL": 0.001864517,
	"StandardDeviationEL": 0.021339413
}, {
	"Country": "Papua New Guinea",
	"Industry": "Textiles",
	"MeanEL": 0.000887254,
	"StandardDeviationEL": 0.008225163
}, {
	"Country": "Papua New Guinea",
	"Industry": "Transport",
	"MeanEL": 0.001707348,
	"StandardDeviationEL": 0.012803809
}, {
	"Country": "Paraguay",
	"Industry": "Agriculture",
	"MeanEL": 0.000795094,
	"StandardDeviationEL": 0.006137215
}, {
	"Country": "Paraguay",
	"Industry": "Chemicals",
	"MeanEL": 0.001398415,
	"StandardDeviationEL": 0.008616063
}, {
	"Country": "Paraguay",
	"Industry": "Construction",
	"MeanEL": 0.001410656,
	"StandardDeviationEL": 0.005865749
}, {
	"Country": "Paraguay",
	"Industry": "Construction Materials",
	"MeanEL": 0.00121327,
	"StandardDeviationEL": 0.005132368
}, {
	"Country": "Paraguay",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002029862,
	"StandardDeviationEL": 0.005990292
}, {
	"Country": "Paraguay",
	"Industry": "Electronics",
	"MeanEL": 0.001946848,
	"StandardDeviationEL": 0.005983811
}, {
	"Country": "Paraguay",
	"Industry": "Finance",
	"MeanEL": 0.00136775,
	"StandardDeviationEL": 0.014233003
}, {
	"Country": "Paraguay",
	"Industry": "Food",
	"MeanEL": 0.001850301,
	"StandardDeviationEL": 0.014435076
}, {
	"Country": "Paraguay",
	"Industry": "Machines",
	"MeanEL": 0.001526899,
	"StandardDeviationEL": 0.003759613
}, {
	"Country": "Paraguay",
	"Industry": "Metals",
	"MeanEL": 0.001255182,
	"StandardDeviationEL": 0.014144284
}, {
	"Country": "Paraguay",
	"Industry": "Paper",
	"MeanEL": 0.00117209,
	"StandardDeviationEL": 0.005886933
}, {
	"Country": "Paraguay",
	"Industry": "Services",
	"MeanEL": 0.001846644,
	"StandardDeviationEL": 0.021421905
}, {
	"Country": "Paraguay",
	"Industry": "Textiles",
	"MeanEL": 0.001119572,
	"StandardDeviationEL": 0.008307655
}, {
	"Country": "Paraguay",
	"Industry": "Transport",
	"MeanEL": 0.003203467,
	"StandardDeviationEL": 0.0128863
}, {
	"Country": "Peru",
	"Industry": "Agriculture",
	"MeanEL": 0.003945808,
	"StandardDeviationEL": 0.006227564
}, {
	"Country": "Peru",
	"Industry": "Chemicals",
	"MeanEL": 0.00171837,
	"StandardDeviationEL": 0.008706412
}, {
	"Country": "Peru",
	"Industry": "Construction",
	"MeanEL": 0.002749937,
	"StandardDeviationEL": 0.005956098
}, {
	"Country": "Peru",
	"Industry": "Construction Materials",
	"MeanEL": 0.004434284,
	"StandardDeviationEL": 0.005222717
}, {
	"Country": "Peru",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000933477,
	"StandardDeviationEL": 0.006080641
}, {
	"Country": "Peru",
	"Industry": "Electronics",
	"MeanEL": 0.003627949,
	"StandardDeviationEL": 0.006074161
}, {
	"Country": "Peru",
	"Industry": "Finance",
	"MeanEL": 0.002196739,
	"StandardDeviationEL": 0.014323352
}, {
	"Country": "Peru",
	"Industry": "Food",
	"MeanEL": 0.001855583,
	"StandardDeviationEL": 0.014525425
}, {
	"Country": "Peru",
	"Industry": "Machines",
	"MeanEL": 0.001568225,
	"StandardDeviationEL": 0.003849962
}, {
	"Country": "Peru",
	"Industry": "Metals",
	"MeanEL": 0.002162743,
	"StandardDeviationEL": 0.014234633
}, {
	"Country": "Peru",
	"Industry": "Paper",
	"MeanEL": 0.001571776,
	"StandardDeviationEL": 0.005977282
}, {
	"Country": "Peru",
	"Industry": "Services",
	"MeanEL": 0.000774734,
	"StandardDeviationEL": 0.021512254
}, {
	"Country": "Peru",
	"Industry": "Textiles",
	"MeanEL": 0.002516516,
	"StandardDeviationEL": 0.008398004
}, {
	"Country": "Peru",
	"Industry": "Transport",
	"MeanEL": 0.001672011,
	"StandardDeviationEL": 0.01297665
}, {
	"Country": "Philippines",
	"Industry": "Agriculture",
	"MeanEL": 0.000707232,
	"StandardDeviationEL": 0.005934404
}, {
	"Country": "Philippines",
	"Industry": "Chemicals",
	"MeanEL": 0.001706596,
	"StandardDeviationEL": 0.008413252
}, {
	"Country": "Philippines",
	"Industry": "Construction",
	"MeanEL": 0.001010198,
	"StandardDeviationEL": 0.005662938
}, {
	"Country": "Philippines",
	"Industry": "Construction Materials",
	"MeanEL": 0.001533925,
	"StandardDeviationEL": 0.004929557
}, {
	"Country": "Philippines",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001486928,
	"StandardDeviationEL": 0.005787481
}, {
	"Country": "Philippines",
	"Industry": "Electronics",
	"MeanEL": 0.000515318,
	"StandardDeviationEL": 0.005781
}, {
	"Country": "Philippines",
	"Industry": "Finance",
	"MeanEL": 0.001834058,
	"StandardDeviationEL": 0.014030192
}, {
	"Country": "Philippines",
	"Industry": "Food",
	"MeanEL": 0.001837271,
	"StandardDeviationEL": 0.014232265
}, {
	"Country": "Philippines",
	"Industry": "Machines",
	"MeanEL": 0.001603454,
	"StandardDeviationEL": 0.003556802
}, {
	"Country": "Philippines",
	"Industry": "Metals",
	"MeanEL": 0.001382409,
	"StandardDeviationEL": 0.013941473
}, {
	"Country": "Philippines",
	"Industry": "Paper",
	"MeanEL": 0.000703827,
	"StandardDeviationEL": 0.005684122
}, {
	"Country": "Philippines",
	"Industry": "Services",
	"MeanEL": 0.000399135,
	"StandardDeviationEL": 0.021219094
}, {
	"Country": "Philippines",
	"Industry": "Textiles",
	"MeanEL": 0.000941864,
	"StandardDeviationEL": 0.008104844
}, {
	"Country": "Philippines",
	"Industry": "Transport",
	"MeanEL": 0.001958354,
	"StandardDeviationEL": 0.012683489
}, {
	"Country": "Poland",
	"Industry": "Agriculture",
	"MeanEL": 0.001068778,
	"StandardDeviationEL": 0.006447243
}, {
	"Country": "Poland",
	"Industry": "Chemicals",
	"MeanEL": 0.000967159,
	"StandardDeviationEL": 0.008926091
}, {
	"Country": "Poland",
	"Industry": "Construction",
	"MeanEL": 0.00178314,
	"StandardDeviationEL": 0.006175777
}, {
	"Country": "Poland",
	"Industry": "Construction Materials",
	"MeanEL": 0.001723712,
	"StandardDeviationEL": 0.005442396
}, {
	"Country": "Poland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000946368,
	"StandardDeviationEL": 0.00630032
}, {
	"Country": "Poland",
	"Industry": "Electronics",
	"MeanEL": 0.000822878,
	"StandardDeviationEL": 0.00629384
}, {
	"Country": "Poland",
	"Industry": "Finance",
	"MeanEL": 0.001459496,
	"StandardDeviationEL": 0.014543031
}, {
	"Country": "Poland",
	"Industry": "Food",
	"MeanEL": 0.001277632,
	"StandardDeviationEL": 0.014745104
}, {
	"Country": "Poland",
	"Industry": "Machines",
	"MeanEL": 0.001309032,
	"StandardDeviationEL": 0.004069641
}, {
	"Country": "Poland",
	"Industry": "Metals",
	"MeanEL": 0.000949888,
	"StandardDeviationEL": 0.014454312
}, {
	"Country": "Poland",
	"Industry": "Paper",
	"MeanEL": 0.00144224,
	"StandardDeviationEL": 0.006196961
}, {
	"Country": "Poland",
	"Industry": "Services",
	"MeanEL": 0.000762921,
	"StandardDeviationEL": 0.021731933
}, {
	"Country": "Poland",
	"Industry": "Textiles",
	"MeanEL": 0.00154752,
	"StandardDeviationEL": 0.008617683
}, {
	"Country": "Poland",
	"Industry": "Transport",
	"MeanEL": 0.001143712,
	"StandardDeviationEL": 0.013196328
}, {
	"Country": "Portugal",
	"Industry": "Agriculture",
	"MeanEL": 0.00321653,
	"StandardDeviationEL": 0.006283467
}, {
	"Country": "Portugal",
	"Industry": "Chemicals",
	"MeanEL": 0.00260337,
	"StandardDeviationEL": 0.008762315
}, {
	"Country": "Portugal",
	"Industry": "Construction",
	"MeanEL": 0.002638075,
	"StandardDeviationEL": 0.006012002
}, {
	"Country": "Portugal",
	"Industry": "Construction Materials",
	"MeanEL": 0.003673467,
	"StandardDeviationEL": 0.00527862
}, {
	"Country": "Portugal",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003323851,
	"StandardDeviationEL": 0.006136544
}, {
	"Country": "Portugal",
	"Industry": "Electronics",
	"MeanEL": 0.001548371,
	"StandardDeviationEL": 0.006130064
}, {
	"Country": "Portugal",
	"Industry": "Finance",
	"MeanEL": 0.001156513,
	"StandardDeviationEL": 0.014379256
}, {
	"Country": "Portugal",
	"Industry": "Food",
	"MeanEL": 0.002904603,
	"StandardDeviationEL": 0.014581329
}, {
	"Country": "Portugal",
	"Industry": "Machines",
	"MeanEL": 0.00280587,
	"StandardDeviationEL": 0.003905865
}, {
	"Country": "Portugal",
	"Industry": "Metals",
	"MeanEL": 0.003258637,
	"StandardDeviationEL": 0.014290536
}, {
	"Country": "Portugal",
	"Industry": "Paper",
	"MeanEL": 0.004647855,
	"StandardDeviationEL": 0.006033186
}, {
	"Country": "Portugal",
	"Industry": "Services",
	"MeanEL": 0.003607995,
	"StandardDeviationEL": 0.021568158
}, {
	"Country": "Portugal",
	"Industry": "Textiles",
	"MeanEL": 0.002313922,
	"StandardDeviationEL": 0.008453908
}, {
	"Country": "Portugal",
	"Industry": "Transport",
	"MeanEL": 0.003202313,
	"StandardDeviationEL": 0.013032553
}, {
	"Country": "Puerto Rico",
	"Industry": "Agriculture",
	"MeanEL": 0.007902364,
	"StandardDeviationEL": 0.006551495
}, {
	"Country": "Puerto Rico",
	"Industry": "Chemicals",
	"MeanEL": 0.006897234,
	"StandardDeviationEL": 0.009030343
}, {
	"Country": "Puerto Rico",
	"Industry": "Construction",
	"MeanEL": 0.006954883,
	"StandardDeviationEL": 0.006280029
}, {
	"Country": "Puerto Rico",
	"Industry": "Construction Materials",
	"MeanEL": 0.006851696,
	"StandardDeviationEL": 0.005546648
}, {
	"Country": "Puerto Rico",
	"Industry": "Consumer Durables",
	"MeanEL": 0.006917016,
	"StandardDeviationEL": 0.006404572
}, {
	"Country": "Puerto Rico",
	"Industry": "Electronics",
	"MeanEL": 0.011195508,
	"StandardDeviationEL": 0.006398092
}, {
	"Country": "Puerto Rico",
	"Industry": "Finance",
	"MeanEL": 0.007732148,
	"StandardDeviationEL": 0.014647283
}, {
	"Country": "Puerto Rico",
	"Industry": "Food",
	"MeanEL": 0.005096057,
	"StandardDeviationEL": 0.014849356
}, {
	"Country": "Puerto Rico",
	"Industry": "Machines",
	"MeanEL": 0.006580923,
	"StandardDeviationEL": 0.004173893
}, {
	"Country": "Puerto Rico",
	"Industry": "Metals",
	"MeanEL": 0.008160837,
	"StandardDeviationEL": 0.014558564
}, {
	"Country": "Puerto Rico",
	"Industry": "Paper",
	"MeanEL": 0.006171623,
	"StandardDeviationEL": 0.006301213
}, {
	"Country": "Puerto Rico",
	"Industry": "Services",
	"MeanEL": 0.007390332,
	"StandardDeviationEL": 0.021836185
}, {
	"Country": "Puerto Rico",
	"Industry": "Textiles",
	"MeanEL": 0.006743786,
	"StandardDeviationEL": 0.008721935
}, {
	"Country": "Puerto Rico",
	"Industry": "Transport",
	"MeanEL": 0.006013363,
	"StandardDeviationEL": 0.01330058
}, {
	"Country": "Qatar",
	"Industry": "Agriculture",
	"MeanEL": 0.001289968,
	"StandardDeviationEL": 0.005958842
}, {
	"Country": "Qatar",
	"Industry": "Chemicals",
	"MeanEL": 0.000208758,
	"StandardDeviationEL": 0.00843769
}, {
	"Country": "Qatar",
	"Industry": "Construction",
	"MeanEL": 0.000532796,
	"StandardDeviationEL": 0.005687377
}, {
	"Country": "Qatar",
	"Industry": "Construction Materials",
	"MeanEL": 0.000546912,
	"StandardDeviationEL": 0.004953996
}, {
	"Country": "Qatar",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000771295,
	"StandardDeviationEL": 0.005811919
}, {
	"Country": "Qatar",
	"Industry": "Electronics",
	"MeanEL": 0.000638596,
	"StandardDeviationEL": 0.005805439
}, {
	"Country": "Qatar",
	"Industry": "Finance",
	"MeanEL": 0.00056739,
	"StandardDeviationEL": 0.014054631
}, {
	"Country": "Qatar",
	"Industry": "Food",
	"MeanEL": 0.0009797,
	"StandardDeviationEL": 0.014256704
}, {
	"Country": "Qatar",
	"Industry": "Machines",
	"MeanEL": 0.00049919,
	"StandardDeviationEL": 0.00358124
}, {
	"Country": "Qatar",
	"Industry": "Metals",
	"MeanEL": 0.000170568,
	"StandardDeviationEL": 0.013965912
}, {
	"Country": "Qatar",
	"Industry": "Paper",
	"MeanEL": 0.000603106,
	"StandardDeviationEL": 0.005708561
}, {
	"Country": "Qatar",
	"Industry": "Services",
	"MeanEL": 0.0000594777,
	"StandardDeviationEL": 0.021243533
}, {
	"Country": "Qatar",
	"Industry": "Textiles",
	"MeanEL": 0.000752291,
	"StandardDeviationEL": 0.008129283
}, {
	"Country": "Qatar",
	"Industry": "Transport",
	"MeanEL": 0.000245183,
	"StandardDeviationEL": 0.012707928
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.001299792,
	"StandardDeviationEL": 0.005891182
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.000895983,
	"StandardDeviationEL": 0.00837003
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Construction",
	"MeanEL": 0.0012765,
	"StandardDeviationEL": 0.005619717
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.001352312,
	"StandardDeviationEL": 0.004886336
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000868721,
	"StandardDeviationEL": 0.005744259
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Electronics",
	"MeanEL": 0.00070251,
	"StandardDeviationEL": 0.005737779
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.001228602,
	"StandardDeviationEL": 0.013986971
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Food",
	"MeanEL": 0.001012978,
	"StandardDeviationEL": 0.014189044
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.000791125,
	"StandardDeviationEL": 0.00351358
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.000803721,
	"StandardDeviationEL": 0.013898252
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Paper",
	"MeanEL": 0.000759658,
	"StandardDeviationEL": 0.005640901
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Services",
	"MeanEL": 0.001092788,
	"StandardDeviationEL": 0.021175873
}, {
	"Country": "Ras Al-Khaimah (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.00105841,
	"StandardDeviationEL": 0.012640268
}, {
	"Country": "Reunion",
	"Industry": "Agriculture",
	"MeanEL": 0.001380806,
	"StandardDeviationEL": 0.006507851
}, {
	"Country": "Reunion",
	"Industry": "Chemicals",
	"MeanEL": 0.002031412,
	"StandardDeviationEL": 0.008986699
}, {
	"Country": "Reunion",
	"Industry": "Construction",
	"MeanEL": 0.001143091,
	"StandardDeviationEL": 0.006236386
}, {
	"Country": "Reunion",
	"Industry": "Construction Materials",
	"MeanEL": 0.003800013,
	"StandardDeviationEL": 0.005503004
}, {
	"Country": "Reunion",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002631483,
	"StandardDeviationEL": 0.006360928
}, {
	"Country": "Reunion",
	"Industry": "Electronics",
	"MeanEL": 0.001975141,
	"StandardDeviationEL": 0.006354448
}, {
	"Country": "Reunion",
	"Industry": "Finance",
	"MeanEL": 0.00224336,
	"StandardDeviationEL": 0.01460364
}, {
	"Country": "Reunion",
	"Industry": "Food",
	"MeanEL": 0.001641163,
	"StandardDeviationEL": 0.014805712
}, {
	"Country": "Reunion",
	"Industry": "Machines",
	"MeanEL": 0.001870311,
	"StandardDeviationEL": 0.004130249
}, {
	"Country": "Reunion",
	"Industry": "Metals",
	"MeanEL": 0.003288927,
	"StandardDeviationEL": 0.01451492
}, {
	"Country": "Reunion",
	"Industry": "Paper",
	"MeanEL": 0.006454052,
	"StandardDeviationEL": 0.006257569
}, {
	"Country": "Reunion",
	"Industry": "Services",
	"MeanEL": 0.004380055,
	"StandardDeviationEL": 0.021792542
}, {
	"Country": "Reunion",
	"Industry": "Textiles",
	"MeanEL": 0.00371434,
	"StandardDeviationEL": 0.008678292
}, {
	"Country": "Reunion",
	"Industry": "Transport",
	"MeanEL": 0.003597461,
	"StandardDeviationEL": 0.013256937
}, {
	"Country": "Romania",
	"Industry": "Agriculture",
	"MeanEL": 0.001672789,
	"StandardDeviationEL": 0.006218086
}, {
	"Country": "Romania",
	"Industry": "Chemicals",
	"MeanEL": 0.001019308,
	"StandardDeviationEL": 0.008696934
}, {
	"Country": "Romania",
	"Industry": "Construction",
	"MeanEL": 0.001483709,
	"StandardDeviationEL": 0.00594662
}, {
	"Country": "Romania",
	"Industry": "Construction Materials",
	"MeanEL": 0.002007727,
	"StandardDeviationEL": 0.005213239
}, {
	"Country": "Romania",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001474027,
	"StandardDeviationEL": 0.006071163
}, {
	"Country": "Romania",
	"Industry": "Electronics",
	"MeanEL": 0.003369637,
	"StandardDeviationEL": 0.006064682
}, {
	"Country": "Romania",
	"Industry": "Finance",
	"MeanEL": 0.001708757,
	"StandardDeviationEL": 0.014313874
}, {
	"Country": "Romania",
	"Industry": "Food",
	"MeanEL": 0.001792636,
	"StandardDeviationEL": 0.014515947
}, {
	"Country": "Romania",
	"Industry": "Machines",
	"MeanEL": 0.001027426,
	"StandardDeviationEL": 0.003840484
}, {
	"Country": "Romania",
	"Industry": "Metals",
	"MeanEL": 0.001241195,
	"StandardDeviationEL": 0.014225155
}, {
	"Country": "Romania",
	"Industry": "Paper",
	"MeanEL": 0.001634829,
	"StandardDeviationEL": 0.005967804
}, {
	"Country": "Romania",
	"Industry": "Services",
	"MeanEL": 0.000973074,
	"StandardDeviationEL": 0.021502776
}, {
	"Country": "Romania",
	"Industry": "Textiles",
	"MeanEL": 0.001480184,
	"StandardDeviationEL": 0.008388526
}, {
	"Country": "Romania",
	"Industry": "Transport",
	"MeanEL": 0.001873542,
	"StandardDeviationEL": 0.012967171
}, {
	"Country": "Russian Federation",
	"Industry": "Agriculture",
	"MeanEL": 0.006554037,
	"StandardDeviationEL": 0.006537136
}, {
	"Country": "Russian Federation",
	"Industry": "Chemicals",
	"MeanEL": 0.001714196,
	"StandardDeviationEL": 0.009015983
}, {
	"Country": "Russian Federation",
	"Industry": "Construction",
	"MeanEL": 0.001150253,
	"StandardDeviationEL": 0.00626567
}, {
	"Country": "Russian Federation",
	"Industry": "Construction Materials",
	"MeanEL": 0.002928877,
	"StandardDeviationEL": 0.005532289
}, {
	"Country": "Russian Federation",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003782563,
	"StandardDeviationEL": 0.006390212
}, {
	"Country": "Russian Federation",
	"Industry": "Electronics",
	"MeanEL": 0.001292504,
	"StandardDeviationEL": 0.006383732
}, {
	"Country": "Russian Federation",
	"Industry": "Finance",
	"MeanEL": 0.002516229,
	"StandardDeviationEL": 0.014632924
}, {
	"Country": "Russian Federation",
	"Industry": "Food",
	"MeanEL": 0.004744931,
	"StandardDeviationEL": 0.014834997
}, {
	"Country": "Russian Federation",
	"Industry": "Machines",
	"MeanEL": 0.001422985,
	"StandardDeviationEL": 0.004159533
}, {
	"Country": "Russian Federation",
	"Industry": "Metals",
	"MeanEL": 0.002084079,
	"StandardDeviationEL": 0.014544205
}, {
	"Country": "Russian Federation",
	"Industry": "Paper",
	"MeanEL": 0.004759516,
	"StandardDeviationEL": 0.006286854
}, {
	"Country": "Russian Federation",
	"Industry": "Services",
	"MeanEL": 0.000724222,
	"StandardDeviationEL": 0.021821826
}, {
	"Country": "Russian Federation",
	"Industry": "Textiles",
	"MeanEL": 0.002855819,
	"StandardDeviationEL": 0.008707576
}, {
	"Country": "Russian Federation",
	"Industry": "Transport",
	"MeanEL": 0.002361701,
	"StandardDeviationEL": 0.013286221
}, {
	"Country": "Rwanda",
	"Industry": "Construction Materials",
	"MeanEL": 0.001278376,
	"StandardDeviationEL": 0.005287421
}, {
	"Country": "Rwanda",
	"Industry": "Metals",
	"MeanEL": 0.001336351,
	"StandardDeviationEL": 0.014299337
}, {
	"Country": "Rwanda",
	"Industry": "Transport",
	"MeanEL": 0.00405948,
	"StandardDeviationEL": 0.013041353
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Construction",
	"MeanEL": 0.005785405,
	"StandardDeviationEL": 0.005962339
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Construction Materials",
	"MeanEL": 0.002658829,
	"StandardDeviationEL": 0.005228957
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Consumer Durables",
	"MeanEL": 0.004289336,
	"StandardDeviationEL": 0.006086881
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Electronics",
	"MeanEL": 0.007104745,
	"StandardDeviationEL": 0.006080401
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Finance",
	"MeanEL": 0.003026169,
	"StandardDeviationEL": 0.014329593
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Food",
	"MeanEL": 0.003877181,
	"StandardDeviationEL": 0.014531665
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Machines",
	"MeanEL": 0.004732397,
	"StandardDeviationEL": 0.003856202
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Metals",
	"MeanEL": 0.004778054,
	"StandardDeviationEL": 0.014240873
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Paper",
	"MeanEL": 0.005445534,
	"StandardDeviationEL": 0.005983522
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Services",
	"MeanEL": 0.003959819,
	"StandardDeviationEL": 0.021518495
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Textiles",
	"MeanEL": 0.002490493,
	"StandardDeviationEL": 0.008404244
}, {
	"Country": "Saint Barthélemy",
	"Industry": "Transport",
	"MeanEL": 0.006590218,
	"StandardDeviationEL": 0.01298289
}, {
	"Country": "Saint Helena",
	"Industry": "Food",
	"MeanEL": 0.000927016,
	"StandardDeviationEL": 0.014202966
}, {
	"Country": "Saint Helena",
	"Industry": "Services",
	"MeanEL": 0.000927016,
	"StandardDeviationEL": 0.021189795
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Chemicals",
	"MeanEL": 0.011395068,
	"StandardDeviationEL": 0.008475397
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Construction Materials",
	"MeanEL": 0.010823698,
	"StandardDeviationEL": 0.004991702
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Consumer Durables",
	"MeanEL": 0.011407468,
	"StandardDeviationEL": 0.005849626
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Food",
	"MeanEL": 0.005310645,
	"StandardDeviationEL": 0.01429441
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Services",
	"MeanEL": 0.012215106,
	"StandardDeviationEL": 0.02128124
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Textiles",
	"MeanEL": 0.011711598,
	"StandardDeviationEL": 0.008166989
}, {
	"Country": "Saint Kitts & Nevis",
	"Industry": "Transport",
	"MeanEL": 0.012356287,
	"StandardDeviationEL": 0.012745635
}, {
	"Country": "Saint Lucia",
	"Industry": "Agriculture",
	"MeanEL": 0.010115732,
	"StandardDeviationEL": 0.012418581
}, {
	"Country": "Saint Lucia",
	"Industry": "Chemicals",
	"MeanEL": 0.012031598,
	"StandardDeviationEL": 0.014897429
}, {
	"Country": "Saint Lucia",
	"Industry": "Construction",
	"MeanEL": 0.0121472,
	"StandardDeviationEL": 0.012147115
}, {
	"Country": "Saint Lucia",
	"Industry": "Construction Materials",
	"MeanEL": 0.010505649,
	"StandardDeviationEL": 0.011413734
}, {
	"Country": "Saint Lucia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.009920238,
	"StandardDeviationEL": 0.012271658
}, {
	"Country": "Saint Lucia",
	"Industry": "Electronics",
	"MeanEL": 0.010504984,
	"StandardDeviationEL": 0.012265178
}, {
	"Country": "Saint Lucia",
	"Industry": "Finance",
	"MeanEL": 0.004896275,
	"StandardDeviationEL": 0.020514369
}, {
	"Country": "Saint Lucia",
	"Industry": "Food",
	"MeanEL": 0.006353321,
	"StandardDeviationEL": 0.020716442
}, {
	"Country": "Saint Lucia",
	"Industry": "Services",
	"MeanEL": 0.009953508,
	"StandardDeviationEL": 0.027703271
}, {
	"Country": "Saint Lucia",
	"Industry": "Textiles",
	"MeanEL": 0.049985994,
	"StandardDeviationEL": 0.014589021
}, {
	"Country": "Saint Lucia",
	"Industry": "Transport",
	"MeanEL": 0.011483825,
	"StandardDeviationEL": 0.019167666
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Agriculture",
	"MeanEL": 0.001379768,
	"StandardDeviationEL": 0.007257425
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Construction",
	"MeanEL": 0.00229916,
	"StandardDeviationEL": 0.006985959
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Construction Materials",
	"MeanEL": 0.001388507,
	"StandardDeviationEL": 0.006252578
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002165401,
	"StandardDeviationEL": 0.007110502
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Electronics",
	"MeanEL": 0.00316939,
	"StandardDeviationEL": 0.007104021
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Food",
	"MeanEL": 0.005454732,
	"StandardDeviationEL": 0.015555286
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Machines",
	"MeanEL": 0.005792218,
	"StandardDeviationEL": 0.004879823
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Metals",
	"MeanEL": 0.012349266,
	"StandardDeviationEL": 0.015264494
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Paper",
	"MeanEL": 0.002821823,
	"StandardDeviationEL": 0.007007143
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Services",
	"MeanEL": 0.003835195,
	"StandardDeviationEL": 0.022542115
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Textiles",
	"MeanEL": 0.003883545,
	"StandardDeviationEL": 0.009427865
}, {
	"Country": "Saint Martin (French part)",
	"Industry": "Transport",
	"MeanEL": 0.005205432,
	"StandardDeviationEL": 0.01400651
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Agriculture",
	"MeanEL": 0.006659072,
	"StandardDeviationEL": 0.007746135
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Chemicals",
	"MeanEL": 0.005891331,
	"StandardDeviationEL": 0.010224983
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Construction",
	"MeanEL": 0.006342906,
	"StandardDeviationEL": 0.007474669
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Construction Materials",
	"MeanEL": 0.004111125,
	"StandardDeviationEL": 0.006741288
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003951207,
	"StandardDeviationEL": 0.007599212
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Electronics",
	"MeanEL": 0.000830444,
	"StandardDeviationEL": 0.007592732
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Finance",
	"MeanEL": 0.017789239,
	"StandardDeviationEL": 0.015841923
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Food",
	"MeanEL": 0.004920912,
	"StandardDeviationEL": 0.016043996
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Machines",
	"MeanEL": 0.006922897,
	"StandardDeviationEL": 0.005368533
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Paper",
	"MeanEL": 0.006659072,
	"StandardDeviationEL": 0.007495853
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Services",
	"MeanEL": 0.006659072,
	"StandardDeviationEL": 0.023030825
}, {
	"Country": "Saint Pierre and Miquelon",
	"Industry": "Textiles",
	"MeanEL": 0.007050782,
	"StandardDeviationEL": 0.009916575
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Chemicals",
	"MeanEL": 0.001897298,
	"StandardDeviationEL": 0.008996861
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Consumer Durables",
	"MeanEL": 0.008007251,
	"StandardDeviationEL": 0.006371091
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Finance",
	"MeanEL": 0.00296796,
	"StandardDeviationEL": 0.014613802
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Food",
	"MeanEL": 0.005652666,
	"StandardDeviationEL": 0.014815875
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Metals",
	"MeanEL": 0.001773423,
	"StandardDeviationEL": 0.014525083
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Services",
	"MeanEL": 0.004978778,
	"StandardDeviationEL": 0.021802704
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Textiles",
	"MeanEL": 0.004639591,
	"StandardDeviationEL": 0.008688454
}, {
	"Country": "Saint Vincent & Grenadines",
	"Industry": "Transport",
	"MeanEL": 0.003219702,
	"StandardDeviationEL": 0.013267099
}, {
	"Country": "Samoa",
	"Industry": "Chemicals",
	"MeanEL": 0.014027362,
	"StandardDeviationEL": 0.010113373
}, {
	"Country": "Samoa",
	"Industry": "Construction Materials",
	"MeanEL": 0.015108331,
	"StandardDeviationEL": 0.006629678
}, {
	"Country": "Samoa",
	"Industry": "Consumer Durables",
	"MeanEL": 0.014440529,
	"StandardDeviationEL": 0.007487602
}, {
	"Country": "Samoa",
	"Industry": "Electronics",
	"MeanEL": 0.025351122,
	"StandardDeviationEL": 0.007481122
}, {
	"Country": "Samoa",
	"Industry": "Food",
	"MeanEL": 0.01457445,
	"StandardDeviationEL": 0.015932386
}, {
	"Country": "Samoa",
	"Industry": "Metals",
	"MeanEL": 0.014364367,
	"StandardDeviationEL": 0.015641594
}, {
	"Country": "Samoa",
	"Industry": "Paper",
	"MeanEL": 0.015226926,
	"StandardDeviationEL": 0.007384243
}, {
	"Country": "Samoa",
	"Industry": "Textiles",
	"MeanEL": 0.014821341,
	"StandardDeviationEL": 0.009804965
}, {
	"Country": "San Marino",
	"Industry": "Agriculture",
	"MeanEL": 0.001497068,
	"StandardDeviationEL": 0.006482619
}, {
	"Country": "San Marino",
	"Industry": "Chemicals",
	"MeanEL": 0.001154748,
	"StandardDeviationEL": 0.008961467
}, {
	"Country": "San Marino",
	"Industry": "Construction",
	"MeanEL": 0.000718289,
	"StandardDeviationEL": 0.006211154
}, {
	"Country": "San Marino",
	"Industry": "Construction Materials",
	"MeanEL": 0.001561597,
	"StandardDeviationEL": 0.005477773
}, {
	"Country": "San Marino",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002145348,
	"StandardDeviationEL": 0.006335696
}, {
	"Country": "San Marino",
	"Industry": "Electronics",
	"MeanEL": 0.00150858,
	"StandardDeviationEL": 0.006329216
}, {
	"Country": "San Marino",
	"Industry": "Finance",
	"MeanEL": 0.002530287,
	"StandardDeviationEL": 0.014578408
}, {
	"Country": "San Marino",
	"Industry": "Food",
	"MeanEL": 0.002560863,
	"StandardDeviationEL": 0.014780481
}, {
	"Country": "San Marino",
	"Industry": "Machines",
	"MeanEL": 0.001925531,
	"StandardDeviationEL": 0.004105017
}, {
	"Country": "San Marino",
	"Industry": "Metals",
	"MeanEL": 0.000965838,
	"StandardDeviationEL": 0.014489688
}, {
	"Country": "San Marino",
	"Industry": "Paper",
	"MeanEL": 0.001587099,
	"StandardDeviationEL": 0.006232338
}, {
	"Country": "San Marino",
	"Industry": "Services",
	"MeanEL": 0.001942578,
	"StandardDeviationEL": 0.02176731
}, {
	"Country": "San Marino",
	"Industry": "Textiles",
	"MeanEL": 0.004500049,
	"StandardDeviationEL": 0.00865306
}, {
	"Country": "San Marino",
	"Industry": "Transport",
	"MeanEL": 0.000802896,
	"StandardDeviationEL": 0.013231705
}, {
	"Country": "Sao Tome & Principe",
	"Industry": "Electronics",
	"MeanEL": 0.022906964,
	"StandardDeviationEL": 0.005685473
}, {
	"Country": "Sao Tome & Principe",
	"Industry": "Food",
	"MeanEL": 0.022901401,
	"StandardDeviationEL": 0.014136738
}, {
	"Country": "Saudi Arabia",
	"Industry": "Agriculture",
	"MeanEL": 0.001405124,
	"StandardDeviationEL": 0.005989266
}, {
	"Country": "Saudi Arabia",
	"Industry": "Chemicals",
	"MeanEL": 0.000337954,
	"StandardDeviationEL": 0.008468114
}, {
	"Country": "Saudi Arabia",
	"Industry": "Construction",
	"MeanEL": 0.000315088,
	"StandardDeviationEL": 0.005717801
}, {
	"Country": "Saudi Arabia",
	"Industry": "Construction Materials",
	"MeanEL": 0.000780928,
	"StandardDeviationEL": 0.004984419
}, {
	"Country": "Saudi Arabia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001210951,
	"StandardDeviationEL": 0.005842343
}, {
	"Country": "Saudi Arabia",
	"Industry": "Electronics",
	"MeanEL": 0.000950495,
	"StandardDeviationEL": 0.005835863
}, {
	"Country": "Saudi Arabia",
	"Industry": "Finance",
	"MeanEL": 0.000430165,
	"StandardDeviationEL": 0.014085055
}, {
	"Country": "Saudi Arabia",
	"Industry": "Food",
	"MeanEL": 0.000492098,
	"StandardDeviationEL": 0.014287127
}, {
	"Country": "Saudi Arabia",
	"Industry": "Machines",
	"MeanEL": 0.000794551,
	"StandardDeviationEL": 0.003611664
}, {
	"Country": "Saudi Arabia",
	"Industry": "Metals",
	"MeanEL": 0.000949595,
	"StandardDeviationEL": 0.013996335
}, {
	"Country": "Saudi Arabia",
	"Industry": "Paper",
	"MeanEL": 0.00166873,
	"StandardDeviationEL": 0.005738984
}, {
	"Country": "Saudi Arabia",
	"Industry": "Services",
	"MeanEL": 0.000447957,
	"StandardDeviationEL": 0.021273957
}, {
	"Country": "Saudi Arabia",
	"Industry": "Textiles",
	"MeanEL": 0.001699672,
	"StandardDeviationEL": 0.008159707
}, {
	"Country": "Saudi Arabia",
	"Industry": "Transport",
	"MeanEL": 0.000341492,
	"StandardDeviationEL": 0.012738352
}, {
	"Country": "Senegal",
	"Industry": "Agriculture",
	"MeanEL": 0.001282697,
	"StandardDeviationEL": 0.005935283
}, {
	"Country": "Senegal",
	"Industry": "Chemicals",
	"MeanEL": 0.001620945,
	"StandardDeviationEL": 0.008414131
}, {
	"Country": "Senegal",
	"Industry": "Construction",
	"MeanEL": 0.001281922,
	"StandardDeviationEL": 0.005663818
}, {
	"Country": "Senegal",
	"Industry": "Construction Materials",
	"MeanEL": 0.001633857,
	"StandardDeviationEL": 0.004930436
}, {
	"Country": "Senegal",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001937825,
	"StandardDeviationEL": 0.00578836
}, {
	"Country": "Senegal",
	"Industry": "Electronics",
	"MeanEL": 0.001566965,
	"StandardDeviationEL": 0.00578188
}, {
	"Country": "Senegal",
	"Industry": "Finance",
	"MeanEL": 0.001401789,
	"StandardDeviationEL": 0.014031072
}, {
	"Country": "Senegal",
	"Industry": "Food",
	"MeanEL": 0.001932313,
	"StandardDeviationEL": 0.014233144
}, {
	"Country": "Senegal",
	"Industry": "Machines",
	"MeanEL": 0.002202167,
	"StandardDeviationEL": 0.003557681
}, {
	"Country": "Senegal",
	"Industry": "Metals",
	"MeanEL": 0.001685476,
	"StandardDeviationEL": 0.013942352
}, {
	"Country": "Senegal",
	"Industry": "Paper",
	"MeanEL": 0.00093258,
	"StandardDeviationEL": 0.005685001
}, {
	"Country": "Senegal",
	"Industry": "Services",
	"MeanEL": 0.001675828,
	"StandardDeviationEL": 0.021219974
}, {
	"Country": "Senegal",
	"Industry": "Textiles",
	"MeanEL": 0.001548841,
	"StandardDeviationEL": 0.008105723
}, {
	"Country": "Senegal",
	"Industry": "Transport",
	"MeanEL": 0.001539416,
	"StandardDeviationEL": 0.012684369
}, {
	"Country": "Serbia",
	"Industry": "Agriculture",
	"MeanEL": 0.001788427,
	"StandardDeviationEL": 0.006023655
}, {
	"Country": "Serbia",
	"Industry": "Chemicals",
	"MeanEL": 0.00166871,
	"StandardDeviationEL": 0.008502503
}, {
	"Country": "Serbia",
	"Industry": "Construction",
	"MeanEL": 0.002301939,
	"StandardDeviationEL": 0.00575219
}, {
	"Country": "Serbia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001727045,
	"StandardDeviationEL": 0.005018808
}, {
	"Country": "Serbia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002204774,
	"StandardDeviationEL": 0.005876732
}, {
	"Country": "Serbia",
	"Industry": "Electronics",
	"MeanEL": 0.001680608,
	"StandardDeviationEL": 0.005870252
}, {
	"Country": "Serbia",
	"Industry": "Finance",
	"MeanEL": 0.002273142,
	"StandardDeviationEL": 0.014119444
}, {
	"Country": "Serbia",
	"Industry": "Food",
	"MeanEL": 0.002994757,
	"StandardDeviationEL": 0.014321516
}, {
	"Country": "Serbia",
	"Industry": "Machines",
	"MeanEL": 0.001883302,
	"StandardDeviationEL": 0.003646053
}, {
	"Country": "Serbia",
	"Industry": "Metals",
	"MeanEL": 0.001819858,
	"StandardDeviationEL": 0.014030724
}, {
	"Country": "Serbia",
	"Industry": "Paper",
	"MeanEL": 0.001867782,
	"StandardDeviationEL": 0.005773373
}, {
	"Country": "Serbia",
	"Industry": "Services",
	"MeanEL": 0.002257832,
	"StandardDeviationEL": 0.021308346
}, {
	"Country": "Serbia",
	"Industry": "Textiles",
	"MeanEL": 0.001937906,
	"StandardDeviationEL": 0.008194095
}, {
	"Country": "Serbia",
	"Industry": "Transport",
	"MeanEL": 0.001794989,
	"StandardDeviationEL": 0.012772741
}, {
	"Country": "Seychelles",
	"Industry": "Chemicals",
	"MeanEL": 0.003183617,
	"StandardDeviationEL": 0.008585045
}, {
	"Country": "Seychelles",
	"Industry": "Construction",
	"MeanEL": 0.00046712,
	"StandardDeviationEL": 0.005834732
}, {
	"Country": "Seychelles",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001807035,
	"StandardDeviationEL": 0.005959274
}, {
	"Country": "Seychelles",
	"Industry": "Finance",
	"MeanEL": 0.001515213,
	"StandardDeviationEL": 0.014201986
}, {
	"Country": "Seychelles",
	"Industry": "Food",
	"MeanEL": 0.001638605,
	"StandardDeviationEL": 0.014404059
}, {
	"Country": "Seychelles",
	"Industry": "Metals",
	"MeanEL": 0.000842745,
	"StandardDeviationEL": 0.014113267
}, {
	"Country": "Seychelles",
	"Industry": "Services",
	"MeanEL": 0.001839177,
	"StandardDeviationEL": 0.021390888
}, {
	"Country": "Seychelles",
	"Industry": "Transport",
	"MeanEL": 0.001038889,
	"StandardDeviationEL": 0.012855283
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.000602016,
	"StandardDeviationEL": 0.00601608
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.001809937,
	"StandardDeviationEL": 0.008494928
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Construction",
	"MeanEL": 0.00077504,
	"StandardDeviationEL": 0.005744615
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.001112181,
	"StandardDeviationEL": 0.005011233
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000833561,
	"StandardDeviationEL": 0.005869157
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Electronics",
	"MeanEL": 0.000271354,
	"StandardDeviationEL": 0.005862677
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.001334432,
	"StandardDeviationEL": 0.014111869
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Food",
	"MeanEL": 0.000432574,
	"StandardDeviationEL": 0.014313941
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.00074133,
	"StandardDeviationEL": 0.003638478
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.000743932,
	"StandardDeviationEL": 0.014023149
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Paper",
	"MeanEL": 0.000629572,
	"StandardDeviationEL": 0.005765798
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Services",
	"MeanEL": 0.000757601,
	"StandardDeviationEL": 0.021300771
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Textiles",
	"MeanEL": 0.000677756,
	"StandardDeviationEL": 0.00818652
}, {
	"Country": "Sharjah (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.000440828,
	"StandardDeviationEL": 0.012765166
}, {
	"Country": "Sierra Leone",
	"Industry": "Metals",
	"MeanEL": 0.008940623,
	"StandardDeviationEL": 0.013845482
}, {
	"Country": "Singapore",
	"Industry": "Agriculture",
	"MeanEL": 0.00036717,
	"StandardDeviationEL": 0.006027119
}, {
	"Country": "Singapore",
	"Industry": "Chemicals",
	"MeanEL": 0.001483125,
	"StandardDeviationEL": 0.008505967
}, {
	"Country": "Singapore",
	"Industry": "Construction",
	"MeanEL": 0.001350231,
	"StandardDeviationEL": 0.005755653
}, {
	"Country": "Singapore",
	"Industry": "Construction Materials",
	"MeanEL": 0.001045471,
	"StandardDeviationEL": 0.005022272
}, {
	"Country": "Singapore",
	"Industry": "Consumer Durables",
	"MeanEL": 0.0020136,
	"StandardDeviationEL": 0.005880196
}, {
	"Country": "Singapore",
	"Industry": "Electronics",
	"MeanEL": 0.000407641,
	"StandardDeviationEL": 0.005873715
}, {
	"Country": "Singapore",
	"Industry": "Finance",
	"MeanEL": 0.0000672675,
	"StandardDeviationEL": 0.014122907
}, {
	"Country": "Singapore",
	"Industry": "Food",
	"MeanEL": 0.0006433,
	"StandardDeviationEL": 0.01432498
}, {
	"Country": "Singapore",
	"Industry": "Machines",
	"MeanEL": 0.00113207,
	"StandardDeviationEL": 0.003649517
}, {
	"Country": "Singapore",
	"Industry": "Metals",
	"MeanEL": 0.001583208,
	"StandardDeviationEL": 0.014034188
}, {
	"Country": "Singapore",
	"Industry": "Paper",
	"MeanEL": 0.000969024,
	"StandardDeviationEL": 0.005776837
}, {
	"Country": "Singapore",
	"Industry": "Services",
	"MeanEL": 0.000350629,
	"StandardDeviationEL": 0.021311809
}, {
	"Country": "Singapore",
	"Industry": "Textiles",
	"MeanEL": 0.002177706,
	"StandardDeviationEL": 0.008197559
}, {
	"Country": "Singapore",
	"Industry": "Transport",
	"MeanEL": 0.000616955,
	"StandardDeviationEL": 0.012776204
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Agriculture",
	"MeanEL": 0.000332913,
	"StandardDeviationEL": 0.008204399
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Chemicals",
	"MeanEL": 0.005725333,
	"StandardDeviationEL": 0.010683247
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Construction",
	"MeanEL": 0.003429758,
	"StandardDeviationEL": 0.007932933
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Construction Materials",
	"MeanEL": 0.003012514,
	"StandardDeviationEL": 0.007199552
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002125574,
	"StandardDeviationEL": 0.008057476
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Electronics",
	"MeanEL": 0.018506632,
	"StandardDeviationEL": 0.008050996
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Food",
	"MeanEL": 0.007228333,
	"StandardDeviationEL": 0.01650226
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Machines",
	"MeanEL": 0.003438094,
	"StandardDeviationEL": 0.005826797
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Services",
	"MeanEL": 0.006218349,
	"StandardDeviationEL": 0.023489089
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Textiles",
	"MeanEL": 0.003864516,
	"StandardDeviationEL": 0.010374839
}, {
	"Country": "Sint Maarten (Dutch part)",
	"Industry": "Transport",
	"MeanEL": 0.004756914,
	"StandardDeviationEL": 0.014953485
}, {
	"Country": "Slovakia",
	"Industry": "Agriculture",
	"MeanEL": 0.002312693,
	"StandardDeviationEL": 0.006244766
}, {
	"Country": "Slovakia",
	"Industry": "Chemicals",
	"MeanEL": 0.001313285,
	"StandardDeviationEL": 0.008723614
}, {
	"Country": "Slovakia",
	"Industry": "Construction",
	"MeanEL": 0.002407806,
	"StandardDeviationEL": 0.0059733
}, {
	"Country": "Slovakia",
	"Industry": "Construction Materials",
	"MeanEL": 0.002763096,
	"StandardDeviationEL": 0.005239919
}, {
	"Country": "Slovakia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002342541,
	"StandardDeviationEL": 0.006097843
}, {
	"Country": "Slovakia",
	"Industry": "Electronics",
	"MeanEL": 0.001625135,
	"StandardDeviationEL": 0.006091363
}, {
	"Country": "Slovakia",
	"Industry": "Finance",
	"MeanEL": 0.003271547,
	"StandardDeviationEL": 0.014340555
}, {
	"Country": "Slovakia",
	"Industry": "Food",
	"MeanEL": 0.002033978,
	"StandardDeviationEL": 0.014542627
}, {
	"Country": "Slovakia",
	"Industry": "Machines",
	"MeanEL": 0.002490374,
	"StandardDeviationEL": 0.003867164
}, {
	"Country": "Slovakia",
	"Industry": "Metals",
	"MeanEL": 0.001453987,
	"StandardDeviationEL": 0.014251835
}, {
	"Country": "Slovakia",
	"Industry": "Paper",
	"MeanEL": 0.00125894,
	"StandardDeviationEL": 0.005994484
}, {
	"Country": "Slovakia",
	"Industry": "Services",
	"MeanEL": 0.002400724,
	"StandardDeviationEL": 0.021529457
}, {
	"Country": "Slovakia",
	"Industry": "Textiles",
	"MeanEL": 0.002315144,
	"StandardDeviationEL": 0.008415206
}, {
	"Country": "Slovakia",
	"Industry": "Transport",
	"MeanEL": 0.002001335,
	"StandardDeviationEL": 0.012993852
}, {
	"Country": "Slovenia",
	"Industry": "Agriculture",
	"MeanEL": 0.001640841,
	"StandardDeviationEL": 0.006367295
}, {
	"Country": "Slovenia",
	"Industry": "Chemicals",
	"MeanEL": 0.001122515,
	"StandardDeviationEL": 0.008846142
}, {
	"Country": "Slovenia",
	"Industry": "Construction",
	"MeanEL": 0.001579738,
	"StandardDeviationEL": 0.006095829
}, {
	"Country": "Slovenia",
	"Industry": "Construction Materials",
	"MeanEL": 0.001991591,
	"StandardDeviationEL": 0.005362448
}, {
	"Country": "Slovenia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001729577,
	"StandardDeviationEL": 0.006220372
}, {
	"Country": "Slovenia",
	"Industry": "Electronics",
	"MeanEL": 0.001299948,
	"StandardDeviationEL": 0.006213891
}, {
	"Country": "Slovenia",
	"Industry": "Finance",
	"MeanEL": 0.002416397,
	"StandardDeviationEL": 0.014463083
}, {
	"Country": "Slovenia",
	"Industry": "Food",
	"MeanEL": 0.002099761,
	"StandardDeviationEL": 0.014665156
}, {
	"Country": "Slovenia",
	"Industry": "Machines",
	"MeanEL": 0.001773272,
	"StandardDeviationEL": 0.003989692
}, {
	"Country": "Slovenia",
	"Industry": "Metals",
	"MeanEL": 0.000964314,
	"StandardDeviationEL": 0.014374364
}, {
	"Country": "Slovenia",
	"Industry": "Paper",
	"MeanEL": 0.001697346,
	"StandardDeviationEL": 0.006117013
}, {
	"Country": "Slovenia",
	"Industry": "Services",
	"MeanEL": 0.001161832,
	"StandardDeviationEL": 0.021651985
}, {
	"Country": "Slovenia",
	"Industry": "Textiles",
	"MeanEL": 0.001365603,
	"StandardDeviationEL": 0.008537735
}, {
	"Country": "Slovenia",
	"Industry": "Transport",
	"MeanEL": 0.002697698,
	"StandardDeviationEL": 0.01311638
}, {
	"Country": "Solomon Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.022075584,
	"StandardDeviationEL": 0.008534095
}, {
	"Country": "Solomon Islands",
	"Industry": "Construction",
	"MeanEL": 0.001718162,
	"StandardDeviationEL": 0.005783781
}, {
	"Country": "Solomon Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.021027509,
	"StandardDeviationEL": 0.005908324
}, {
	"Country": "Solomon Islands",
	"Industry": "Electronics",
	"MeanEL": 0.021568471,
	"StandardDeviationEL": 0.005901844
}, {
	"Country": "Solomon Islands",
	"Industry": "Food",
	"MeanEL": 0.022688795,
	"StandardDeviationEL": 0.014353108
}, {
	"Country": "Solomon Islands",
	"Industry": "Machines",
	"MeanEL": 0.02245317,
	"StandardDeviationEL": 0.003677645
}, {
	"Country": "Solomon Islands",
	"Industry": "Metals",
	"MeanEL": 0.020569823,
	"StandardDeviationEL": 0.014062316
}, {
	"Country": "Solomon Islands",
	"Industry": "Paper",
	"MeanEL": 0.023266428,
	"StandardDeviationEL": 0.005804965
}, {
	"Country": "Solomon Islands",
	"Industry": "Transport",
	"MeanEL": 0.021965422,
	"StandardDeviationEL": 0.012804333
}, {
	"Country": "South Africa",
	"Industry": "Agriculture",
	"MeanEL": 0.001199777,
	"StandardDeviationEL": 0.006031508
}, {
	"Country": "South Africa",
	"Industry": "Chemicals",
	"MeanEL": 0.000891034,
	"StandardDeviationEL": 0.008510356
}, {
	"Country": "South Africa",
	"Industry": "Construction",
	"MeanEL": 0.00174279,
	"StandardDeviationEL": 0.005760043
}, {
	"Country": "South Africa",
	"Industry": "Construction Materials",
	"MeanEL": 0.001432491,
	"StandardDeviationEL": 0.005026661
}, {
	"Country": "South Africa",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002120527,
	"StandardDeviationEL": 0.005884585
}, {
	"Country": "South Africa",
	"Industry": "Electronics",
	"MeanEL": 0.000846837,
	"StandardDeviationEL": 0.005878105
}, {
	"Country": "South Africa",
	"Industry": "Finance",
	"MeanEL": 0.0025358,
	"StandardDeviationEL": 0.014127297
}, {
	"Country": "South Africa",
	"Industry": "Food",
	"MeanEL": 0.001521693,
	"StandardDeviationEL": 0.014329369
}, {
	"Country": "South Africa",
	"Industry": "Machines",
	"MeanEL": 0.001953062,
	"StandardDeviationEL": 0.003653906
}, {
	"Country": "South Africa",
	"Industry": "Metals",
	"MeanEL": 0.001187922,
	"StandardDeviationEL": 0.014038577
}, {
	"Country": "South Africa",
	"Industry": "Paper",
	"MeanEL": 0.000513827,
	"StandardDeviationEL": 0.005781226
}, {
	"Country": "South Africa",
	"Industry": "Services",
	"MeanEL": 0.001341735,
	"StandardDeviationEL": 0.021316199
}, {
	"Country": "South Africa",
	"Industry": "Textiles",
	"MeanEL": 0.000604544,
	"StandardDeviationEL": 0.008201949
}, {
	"Country": "South Africa",
	"Industry": "Transport",
	"MeanEL": 0.001377227,
	"StandardDeviationEL": 0.012780594
}, {
	"Country": "Spain",
	"Industry": "Agriculture",
	"MeanEL": 0.00191052,
	"StandardDeviationEL": 0.005934616
}, {
	"Country": "Spain",
	"Industry": "Chemicals",
	"MeanEL": 0.001409183,
	"StandardDeviationEL": 0.008413464
}, {
	"Country": "Spain",
	"Industry": "Construction",
	"MeanEL": 0.001844549,
	"StandardDeviationEL": 0.00566315
}, {
	"Country": "Spain",
	"Industry": "Construction Materials",
	"MeanEL": 0.001878347,
	"StandardDeviationEL": 0.004929769
}, {
	"Country": "Spain",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002197543,
	"StandardDeviationEL": 0.005787693
}, {
	"Country": "Spain",
	"Industry": "Electronics",
	"MeanEL": 0.001579917,
	"StandardDeviationEL": 0.005781213
}, {
	"Country": "Spain",
	"Industry": "Finance",
	"MeanEL": 0.001190524,
	"StandardDeviationEL": 0.014030404
}, {
	"Country": "Spain",
	"Industry": "Food",
	"MeanEL": 0.001620325,
	"StandardDeviationEL": 0.014232477
}, {
	"Country": "Spain",
	"Industry": "Machines",
	"MeanEL": 0.001096595,
	"StandardDeviationEL": 0.003557014
}, {
	"Country": "Spain",
	"Industry": "Metals",
	"MeanEL": 0.001339353,
	"StandardDeviationEL": 0.013941685
}, {
	"Country": "Spain",
	"Industry": "Paper",
	"MeanEL": 0.000758127,
	"StandardDeviationEL": 0.005684334
}, {
	"Country": "Spain",
	"Industry": "Services",
	"MeanEL": 0.00209309,
	"StandardDeviationEL": 0.021219306
}, {
	"Country": "Spain",
	"Industry": "Textiles",
	"MeanEL": 0.001634232,
	"StandardDeviationEL": 0.008105056
}, {
	"Country": "Spain",
	"Industry": "Transport",
	"MeanEL": 0.001685651,
	"StandardDeviationEL": 0.012683701
}, {
	"Country": "Sri Lanka",
	"Industry": "Agriculture",
	"MeanEL": 0.000873447,
	"StandardDeviationEL": 0.006356438
}, {
	"Country": "Sri Lanka",
	"Industry": "Chemicals",
	"MeanEL": 0.00084926,
	"StandardDeviationEL": 0.008835286
}, {
	"Country": "Sri Lanka",
	"Industry": "Construction",
	"MeanEL": 0.000675559,
	"StandardDeviationEL": 0.006084973
}, {
	"Country": "Sri Lanka",
	"Industry": "Construction Materials",
	"MeanEL": 0.001026023,
	"StandardDeviationEL": 0.005351591
}, {
	"Country": "Sri Lanka",
	"Industry": "Consumer Durables",
	"MeanEL": 0.004016022,
	"StandardDeviationEL": 0.006209515
}, {
	"Country": "Sri Lanka",
	"Industry": "Electronics",
	"MeanEL": 0.002085471,
	"StandardDeviationEL": 0.006203035
}, {
	"Country": "Sri Lanka",
	"Industry": "Finance",
	"MeanEL": 0.000745138,
	"StandardDeviationEL": 0.014452227
}, {
	"Country": "Sri Lanka",
	"Industry": "Food",
	"MeanEL": 0.000899473,
	"StandardDeviationEL": 0.014654299
}, {
	"Country": "Sri Lanka",
	"Industry": "Machines",
	"MeanEL": 0.001051088,
	"StandardDeviationEL": 0.003978836
}, {
	"Country": "Sri Lanka",
	"Industry": "Paper",
	"MeanEL": 0.000842007,
	"StandardDeviationEL": 0.006106156
}, {
	"Country": "Sri Lanka",
	"Industry": "Services",
	"MeanEL": 0.00230883,
	"StandardDeviationEL": 0.021641129
}, {
	"Country": "Sri Lanka",
	"Industry": "Textiles",
	"MeanEL": 0.000864981,
	"StandardDeviationEL": 0.008526878
}, {
	"Country": "Sri Lanka",
	"Industry": "Transport",
	"MeanEL": 0.002359228,
	"StandardDeviationEL": 0.013105524
}, {
	"Country": "Sudan",
	"Industry": "Food",
	"MeanEL": 0.018959489,
	"StandardDeviationEL": 0.014136274
}, {
	"Country": "Suriname",
	"Industry": "Agriculture",
	"MeanEL": 0.004439939,
	"StandardDeviationEL": 0.006417073
}, {
	"Country": "Suriname",
	"Industry": "Chemicals",
	"MeanEL": 0.007393028,
	"StandardDeviationEL": 0.008895921
}, {
	"Country": "Suriname",
	"Industry": "Construction",
	"MeanEL": 0.004811278,
	"StandardDeviationEL": 0.006145608
}, {
	"Country": "Suriname",
	"Industry": "Construction Materials",
	"MeanEL": 0.004444775,
	"StandardDeviationEL": 0.005412226
}, {
	"Country": "Suriname",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002479089,
	"StandardDeviationEL": 0.00627015
}, {
	"Country": "Suriname",
	"Industry": "Electronics",
	"MeanEL": 0.001877923,
	"StandardDeviationEL": 0.00626367
}, {
	"Country": "Suriname",
	"Industry": "Finance",
	"MeanEL": 0.005394983,
	"StandardDeviationEL": 0.014512862
}, {
	"Country": "Suriname",
	"Industry": "Food",
	"MeanEL": 0.003274829,
	"StandardDeviationEL": 0.014714934
}, {
	"Country": "Suriname",
	"Industry": "Machines",
	"MeanEL": 0.002241378,
	"StandardDeviationEL": 0.004039471
}, {
	"Country": "Suriname",
	"Industry": "Metals",
	"MeanEL": 0.005287416,
	"StandardDeviationEL": 0.014424142
}, {
	"Country": "Suriname",
	"Industry": "Services",
	"MeanEL": 0.003921066,
	"StandardDeviationEL": 0.021701764
}, {
	"Country": "Suriname",
	"Industry": "Textiles",
	"MeanEL": 0.003639898,
	"StandardDeviationEL": 0.008587514
}, {
	"Country": "Suriname",
	"Industry": "Transport",
	"MeanEL": 0.003356293,
	"StandardDeviationEL": 0.013166159
}, {
	"Country": "Swaziland",
	"Industry": "Chemicals",
	"MeanEL": 0.001151715,
	"StandardDeviationEL": 0.00867937
}, {
	"Country": "Swaziland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.009451238,
	"StandardDeviationEL": 0.006053599
}, {
	"Country": "Swaziland",
	"Industry": "Electronics",
	"MeanEL": 0.009717274,
	"StandardDeviationEL": 0.006047118
}, {
	"Country": "Swaziland",
	"Industry": "Food",
	"MeanEL": 0.011686552,
	"StandardDeviationEL": 0.014498383
}, {
	"Country": "Swaziland",
	"Industry": "Textiles",
	"MeanEL": 0.001553624,
	"StandardDeviationEL": 0.008370962
}, {
	"Country": "Sweden",
	"Industry": "Agriculture",
	"MeanEL": 0.000476624,
	"StandardDeviationEL": 0.00599114
}, {
	"Country": "Sweden",
	"Industry": "Chemicals",
	"MeanEL": 0.0014519,
	"StandardDeviationEL": 0.008469988
}, {
	"Country": "Sweden",
	"Industry": "Construction",
	"MeanEL": 0.000775923,
	"StandardDeviationEL": 0.005719674
}, {
	"Country": "Sweden",
	"Industry": "Construction Materials",
	"MeanEL": 0.001528468,
	"StandardDeviationEL": 0.004986293
}, {
	"Country": "Sweden",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001398368,
	"StandardDeviationEL": 0.005844217
}, {
	"Country": "Sweden",
	"Industry": "Electronics",
	"MeanEL": 0.00046649,
	"StandardDeviationEL": 0.005837737
}, {
	"Country": "Sweden",
	"Industry": "Finance",
	"MeanEL": 0.000518956,
	"StandardDeviationEL": 0.014086928
}, {
	"Country": "Sweden",
	"Industry": "Food",
	"MeanEL": 0.000809406,
	"StandardDeviationEL": 0.014289001
}, {
	"Country": "Sweden",
	"Industry": "Machines",
	"MeanEL": 0.000854091,
	"StandardDeviationEL": 0.003613538
}, {
	"Country": "Sweden",
	"Industry": "Metals",
	"MeanEL": 0.001032296,
	"StandardDeviationEL": 0.013998209
}, {
	"Country": "Sweden",
	"Industry": "Paper",
	"MeanEL": 0.000573394,
	"StandardDeviationEL": 0.005740858
}, {
	"Country": "Sweden",
	"Industry": "Services",
	"MeanEL": 0.000818828,
	"StandardDeviationEL": 0.02127583
}, {
	"Country": "Sweden",
	"Industry": "Textiles",
	"MeanEL": 0.00173519,
	"StandardDeviationEL": 0.00816158
}, {
	"Country": "Sweden",
	"Industry": "Transport",
	"MeanEL": 0.000641035,
	"StandardDeviationEL": 0.012740225
}, {
	"Country": "Switzerland",
	"Industry": "Agriculture",
	"MeanEL": 0.000449729,
	"StandardDeviationEL": 0.006003078
}, {
	"Country": "Switzerland",
	"Industry": "Chemicals",
	"MeanEL": 0.000299917,
	"StandardDeviationEL": 0.008481926
}, {
	"Country": "Switzerland",
	"Industry": "Construction",
	"MeanEL": 0.000894317,
	"StandardDeviationEL": 0.005731612
}, {
	"Country": "Switzerland",
	"Industry": "Construction Materials",
	"MeanEL": 0.000604901,
	"StandardDeviationEL": 0.004998231
}, {
	"Country": "Switzerland",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000313178,
	"StandardDeviationEL": 0.005856155
}, {
	"Country": "Switzerland",
	"Industry": "Electronics",
	"MeanEL": 0.000420346,
	"StandardDeviationEL": 0.005849675
}, {
	"Country": "Switzerland",
	"Industry": "Finance",
	"MeanEL": 0.000603501,
	"StandardDeviationEL": 0.014098866
}, {
	"Country": "Switzerland",
	"Industry": "Food",
	"MeanEL": 0.000266308,
	"StandardDeviationEL": 0.014300939
}, {
	"Country": "Switzerland",
	"Industry": "Machines",
	"MeanEL": 0.00066445,
	"StandardDeviationEL": 0.003625476
}, {
	"Country": "Switzerland",
	"Industry": "Metals",
	"MeanEL": 0.000528518,
	"StandardDeviationEL": 0.014010147
}, {
	"Country": "Switzerland",
	"Industry": "Paper",
	"MeanEL": 0.000722162,
	"StandardDeviationEL": 0.005752796
}, {
	"Country": "Switzerland",
	"Industry": "Services",
	"MeanEL": 0.000588352,
	"StandardDeviationEL": 0.021287768
}, {
	"Country": "Switzerland",
	"Industry": "Textiles",
	"MeanEL": 0.000860862,
	"StandardDeviationEL": 0.008173518
}, {
	"Country": "Switzerland",
	"Industry": "Transport",
	"MeanEL": 0.00060244,
	"StandardDeviationEL": 0.012752163
}, {
	"Country": "Syria",
	"Industry": "Construction Materials",
	"MeanEL": 0.001354592,
	"StandardDeviationEL": 0.004833566
}, {
	"Country": "Taiwan",
	"Industry": "Agriculture",
	"MeanEL": 0.00085256,
	"StandardDeviationEL": 0.00619488
}, {
	"Country": "Taiwan",
	"Industry": "Chemicals",
	"MeanEL": 0.000812752,
	"StandardDeviationEL": 0.008673728
}, {
	"Country": "Taiwan",
	"Industry": "Construction",
	"MeanEL": 0.000609607,
	"StandardDeviationEL": 0.005923414
}, {
	"Country": "Taiwan",
	"Industry": "Construction Materials",
	"MeanEL": 0.001004509,
	"StandardDeviationEL": 0.005190033
}, {
	"Country": "Taiwan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000961607,
	"StandardDeviationEL": 0.006047957
}, {
	"Country": "Taiwan",
	"Industry": "Electronics",
	"MeanEL": 0.001010271,
	"StandardDeviationEL": 0.006041477
}, {
	"Country": "Taiwan",
	"Industry": "Finance",
	"MeanEL": 0.003143311,
	"StandardDeviationEL": 0.014290668
}, {
	"Country": "Taiwan",
	"Industry": "Food",
	"MeanEL": 0.000934847,
	"StandardDeviationEL": 0.014492741
}, {
	"Country": "Taiwan",
	"Industry": "Machines",
	"MeanEL": 0.001568127,
	"StandardDeviationEL": 0.003817278
}, {
	"Country": "Taiwan",
	"Industry": "Metals",
	"MeanEL": 0.001150025,
	"StandardDeviationEL": 0.014201949
}, {
	"Country": "Taiwan",
	"Industry": "Paper",
	"MeanEL": 0.001513228,
	"StandardDeviationEL": 0.005944598
}, {
	"Country": "Taiwan",
	"Industry": "Services",
	"MeanEL": 0.000755466,
	"StandardDeviationEL": 0.02147957
}, {
	"Country": "Taiwan",
	"Industry": "Textiles",
	"MeanEL": 0.000235851,
	"StandardDeviationEL": 0.00836532
}, {
	"Country": "Taiwan",
	"Industry": "Transport",
	"MeanEL": 0.001339977,
	"StandardDeviationEL": 0.012943965
}, {
	"Country": "Tanzania",
	"Industry": "Agriculture",
	"MeanEL": 0.00407057,
	"StandardDeviationEL": 0.006543323
}, {
	"Country": "Tanzania",
	"Industry": "Chemicals",
	"MeanEL": 0.001093018,
	"StandardDeviationEL": 0.009022171
}, {
	"Country": "Tanzania",
	"Industry": "Construction",
	"MeanEL": 0.001227029,
	"StandardDeviationEL": 0.006271857
}, {
	"Country": "Tanzania",
	"Industry": "Construction Materials",
	"MeanEL": 0.000889385,
	"StandardDeviationEL": 0.005538476
}, {
	"Country": "Tanzania",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002054265,
	"StandardDeviationEL": 0.0063964
}, {
	"Country": "Tanzania",
	"Industry": "Electronics",
	"MeanEL": 0.001192936,
	"StandardDeviationEL": 0.006389919
}, {
	"Country": "Tanzania",
	"Industry": "Finance",
	"MeanEL": 0.001939878,
	"StandardDeviationEL": 0.014639111
}, {
	"Country": "Tanzania",
	"Industry": "Food",
	"MeanEL": 0.001050623,
	"StandardDeviationEL": 0.014841184
}, {
	"Country": "Tanzania",
	"Industry": "Machines",
	"MeanEL": 0.001203184,
	"StandardDeviationEL": 0.004165721
}, {
	"Country": "Tanzania",
	"Industry": "Metals",
	"MeanEL": 0.005456488,
	"StandardDeviationEL": 0.014550392
}, {
	"Country": "Tanzania",
	"Industry": "Paper",
	"MeanEL": 0.001232041,
	"StandardDeviationEL": 0.006293041
}, {
	"Country": "Tanzania",
	"Industry": "Services",
	"MeanEL": 0.002053921,
	"StandardDeviationEL": 0.021828013
}, {
	"Country": "Tanzania",
	"Industry": "Textiles",
	"MeanEL": 0.001123132,
	"StandardDeviationEL": 0.008713763
}, {
	"Country": "Tanzania",
	"Industry": "Transport",
	"MeanEL": 0.000926012,
	"StandardDeviationEL": 0.013292408
}, {
	"Country": "Thailand",
	"Industry": "Agriculture",
	"MeanEL": 0.00117856,
	"StandardDeviationEL": 0.006027138
}, {
	"Country": "Thailand",
	"Industry": "Chemicals",
	"MeanEL": 0.001230989,
	"StandardDeviationEL": 0.008505986
}, {
	"Country": "Thailand",
	"Industry": "Construction",
	"MeanEL": 0.001937046,
	"StandardDeviationEL": 0.005755672
}, {
	"Country": "Thailand",
	"Industry": "Construction Materials",
	"MeanEL": 0.001874369,
	"StandardDeviationEL": 0.005022291
}, {
	"Country": "Thailand",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001293842,
	"StandardDeviationEL": 0.005880215
}, {
	"Country": "Thailand",
	"Industry": "Electronics",
	"MeanEL": 0.001125432,
	"StandardDeviationEL": 0.005873734
}, {
	"Country": "Thailand",
	"Industry": "Finance",
	"MeanEL": 0.000607697,
	"StandardDeviationEL": 0.014122926
}, {
	"Country": "Thailand",
	"Industry": "Food",
	"MeanEL": 0.001235522,
	"StandardDeviationEL": 0.014324999
}, {
	"Country": "Thailand",
	"Industry": "Machines",
	"MeanEL": 0.000954834,
	"StandardDeviationEL": 0.003649536
}, {
	"Country": "Thailand",
	"Industry": "Metals",
	"MeanEL": 0.001448649,
	"StandardDeviationEL": 0.014034207
}, {
	"Country": "Thailand",
	"Industry": "Paper",
	"MeanEL": 0.002426191,
	"StandardDeviationEL": 0.005776856
}, {
	"Country": "Thailand",
	"Industry": "Services",
	"MeanEL": 0.001122321,
	"StandardDeviationEL": 0.021311828
}, {
	"Country": "Thailand",
	"Industry": "Textiles",
	"MeanEL": 0.001893173,
	"StandardDeviationEL": 0.008197578
}, {
	"Country": "Thailand",
	"Industry": "Transport",
	"MeanEL": 0.00216851,
	"StandardDeviationEL": 0.012776223
}, {
	"Country": "Togo",
	"Industry": "Chemicals",
	"MeanEL": 0.001840693,
	"StandardDeviationEL": 0.008414146
}, {
	"Country": "Togo",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001770553,
	"StandardDeviationEL": 0.005788375
}, {
	"Country": "Togo",
	"Industry": "Food",
	"MeanEL": 0.00141013,
	"StandardDeviationEL": 0.014233159
}, {
	"Country": "Togo",
	"Industry": "Machines",
	"MeanEL": 0.00158794,
	"StandardDeviationEL": 0.003557696
}, {
	"Country": "Tonga",
	"Industry": "Construction",
	"MeanEL": 0.035235038,
	"StandardDeviationEL": 0.005781752
}, {
	"Country": "Tonga",
	"Industry": "Consumer Durables",
	"MeanEL": 0.035924113,
	"StandardDeviationEL": 0.005906295
}, {
	"Country": "Tonga",
	"Industry": "Food",
	"MeanEL": 0.036868407,
	"StandardDeviationEL": 0.014351079
}, {
	"Country": "Tonga",
	"Industry": "Paper",
	"MeanEL": 0.035235038,
	"StandardDeviationEL": 0.005802936
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Agriculture",
	"MeanEL": 0.002459125,
	"StandardDeviationEL": 0.006114501
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Chemicals",
	"MeanEL": 0.002188908,
	"StandardDeviationEL": 0.008593349
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Construction",
	"MeanEL": 0.00274467,
	"StandardDeviationEL": 0.005843036
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Construction Materials",
	"MeanEL": 0.001563923,
	"StandardDeviationEL": 0.005109655
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002536334,
	"StandardDeviationEL": 0.005967578
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Electronics",
	"MeanEL": 0.001405088,
	"StandardDeviationEL": 0.005961098
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Finance",
	"MeanEL": 0.004085811,
	"StandardDeviationEL": 0.01421029
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Food",
	"MeanEL": 0.002212678,
	"StandardDeviationEL": 0.014412363
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Machines",
	"MeanEL": 0.00300944,
	"StandardDeviationEL": 0.003736899
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Metals",
	"MeanEL": 0.000964258,
	"StandardDeviationEL": 0.014121571
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Paper",
	"MeanEL": 0.002429279,
	"StandardDeviationEL": 0.00586422
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Services",
	"MeanEL": 0.001734567,
	"StandardDeviationEL": 0.021399192
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Textiles",
	"MeanEL": 0.003291017,
	"StandardDeviationEL": 0.008284942
}, {
	"Country": "Trinidad & Tobago",
	"Industry": "Transport",
	"MeanEL": 0.002397652,
	"StandardDeviationEL": 0.012863587
}, {
	"Country": "Tunisia",
	"Industry": "Agriculture",
	"MeanEL": 0.002429587,
	"StandardDeviationEL": 0.006123556
}, {
	"Country": "Tunisia",
	"Industry": "Chemicals",
	"MeanEL": 0.000719207,
	"StandardDeviationEL": 0.008602404
}, {
	"Country": "Tunisia",
	"Industry": "Construction",
	"MeanEL": 0.000642813,
	"StandardDeviationEL": 0.00585209
}, {
	"Country": "Tunisia",
	"Industry": "Construction Materials",
	"MeanEL": 0.000997032,
	"StandardDeviationEL": 0.005118709
}, {
	"Country": "Tunisia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001634998,
	"StandardDeviationEL": 0.005976633
}, {
	"Country": "Tunisia",
	"Industry": "Electronics",
	"MeanEL": 0.001053714,
	"StandardDeviationEL": 0.005970153
}, {
	"Country": "Tunisia",
	"Industry": "Finance",
	"MeanEL": 0.001110653,
	"StandardDeviationEL": 0.014219344
}, {
	"Country": "Tunisia",
	"Industry": "Food",
	"MeanEL": 0.00111504,
	"StandardDeviationEL": 0.014421417
}, {
	"Country": "Tunisia",
	"Industry": "Machines",
	"MeanEL": 0.001082517,
	"StandardDeviationEL": 0.003745954
}, {
	"Country": "Tunisia",
	"Industry": "Metals",
	"MeanEL": 0.002821512,
	"StandardDeviationEL": 0.014130625
}, {
	"Country": "Tunisia",
	"Industry": "Paper",
	"MeanEL": 0.001337459,
	"StandardDeviationEL": 0.005873274
}, {
	"Country": "Tunisia",
	"Industry": "Services",
	"MeanEL": 0.000698063,
	"StandardDeviationEL": 0.021408246
}, {
	"Country": "Tunisia",
	"Industry": "Textiles",
	"MeanEL": 0.00099234,
	"StandardDeviationEL": 0.008293996
}, {
	"Country": "Tunisia",
	"Industry": "Transport",
	"MeanEL": 0.001342506,
	"StandardDeviationEL": 0.012872641
}, {
	"Country": "Turkey",
	"Industry": "Agriculture",
	"MeanEL": 0.002114535,
	"StandardDeviationEL": 0.00612655
}, {
	"Country": "Turkey",
	"Industry": "Chemicals",
	"MeanEL": 0.002087766,
	"StandardDeviationEL": 0.008605398
}, {
	"Country": "Turkey",
	"Industry": "Construction",
	"MeanEL": 0.001928772,
	"StandardDeviationEL": 0.005855084
}, {
	"Country": "Turkey",
	"Industry": "Construction Materials",
	"MeanEL": 0.002663568,
	"StandardDeviationEL": 0.005121703
}, {
	"Country": "Turkey",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003111606,
	"StandardDeviationEL": 0.005979627
}, {
	"Country": "Turkey",
	"Industry": "Electronics",
	"MeanEL": 0.001303679,
	"StandardDeviationEL": 0.005973147
}, {
	"Country": "Turkey",
	"Industry": "Finance",
	"MeanEL": 0.001768745,
	"StandardDeviationEL": 0.014222338
}, {
	"Country": "Turkey",
	"Industry": "Food",
	"MeanEL": 0.004027151,
	"StandardDeviationEL": 0.014424411
}, {
	"Country": "Turkey",
	"Industry": "Machines",
	"MeanEL": 0.002298328,
	"StandardDeviationEL": 0.003748948
}, {
	"Country": "Turkey",
	"Industry": "Metals",
	"MeanEL": 0.002717848,
	"StandardDeviationEL": 0.014133619
}, {
	"Country": "Turkey",
	"Industry": "Paper",
	"MeanEL": 0.003350112,
	"StandardDeviationEL": 0.005876268
}, {
	"Country": "Turkey",
	"Industry": "Services",
	"MeanEL": 0.001802967,
	"StandardDeviationEL": 0.02141124
}, {
	"Country": "Turkey",
	"Industry": "Textiles",
	"MeanEL": 0.003150517,
	"StandardDeviationEL": 0.00829699
}, {
	"Country": "Turkey",
	"Industry": "Transport",
	"MeanEL": 0.00205641,
	"StandardDeviationEL": 0.012875636
}, {
	"Country": "Turks & Caicos Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.002281602,
	"StandardDeviationEL": 0.011900427
}, {
	"Country": "Turks & Caicos Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.011842187,
	"StandardDeviationEL": 0.009274656
}, {
	"Country": "Turks & Caicos Islands",
	"Industry": "Food",
	"MeanEL": 0.002765186,
	"StandardDeviationEL": 0.01771944
}, {
	"Country": "Turks & Caicos Islands",
	"Industry": "Services",
	"MeanEL": 0.014811969,
	"StandardDeviationEL": 0.024706269
}, {
	"Country": "Turks & Caicos Islands",
	"Industry": "Transport",
	"MeanEL": 0.033341182,
	"StandardDeviationEL": 0.016170664
}, {
	"Country": "Uganda",
	"Industry": "Agriculture",
	"MeanEL": 0.001011772,
	"StandardDeviationEL": 0.006361304
}, {
	"Country": "Uganda",
	"Industry": "Chemicals",
	"MeanEL": 0.00144219,
	"StandardDeviationEL": 0.008840151
}, {
	"Country": "Uganda",
	"Industry": "Construction",
	"MeanEL": 0.0046526,
	"StandardDeviationEL": 0.006089838
}, {
	"Country": "Uganda",
	"Industry": "Construction Materials",
	"MeanEL": 0.00078847,
	"StandardDeviationEL": 0.005356457
}, {
	"Country": "Uganda",
	"Industry": "Electronics",
	"MeanEL": 0.001588322,
	"StandardDeviationEL": 0.0062079
}, {
	"Country": "Uganda",
	"Industry": "Food",
	"MeanEL": 0.002567896,
	"StandardDeviationEL": 0.014659165
}, {
	"Country": "Uganda",
	"Industry": "Machines",
	"MeanEL": 0.001597259,
	"StandardDeviationEL": 0.003983701
}, {
	"Country": "Uganda",
	"Industry": "Metals",
	"MeanEL": 0.001297406,
	"StandardDeviationEL": 0.014368373
}, {
	"Country": "Uganda",
	"Industry": "Transport",
	"MeanEL": 0.001415569,
	"StandardDeviationEL": 0.013110389
}, {
	"Country": "Ukraine",
	"Industry": "Agriculture",
	"MeanEL": 0.028199098,
	"StandardDeviationEL": 0.007119717
}, {
	"Country": "Ukraine",
	"Industry": "Chemicals",
	"MeanEL": 0.025909391,
	"StandardDeviationEL": 0.009598565
}, {
	"Country": "Ukraine",
	"Industry": "Consumer Durables",
	"MeanEL": 0.025249883,
	"StandardDeviationEL": 0.006972794
}, {
	"Country": "Ukraine",
	"Industry": "Food",
	"MeanEL": 0.013670554,
	"StandardDeviationEL": 0.015417578
}, {
	"Country": "Ukraine",
	"Industry": "Metals",
	"MeanEL": 0.001156773,
	"StandardDeviationEL": 0.015126786
}, {
	"Country": "Ukraine",
	"Industry": "Paper",
	"MeanEL": 0.02386925,
	"StandardDeviationEL": 0.006869435
}, {
	"Country": "Ukraine",
	"Industry": "Transport",
	"MeanEL": 0.00103337,
	"StandardDeviationEL": 0.013868803
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Agriculture",
	"MeanEL": 0.001582321,
	"StandardDeviationEL": 0.005990871
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Chemicals",
	"MeanEL": 0.00106386,
	"StandardDeviationEL": 0.008469719
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Construction Materials",
	"MeanEL": 0.001105375,
	"StandardDeviationEL": 0.004986024
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.00108892,
	"StandardDeviationEL": 0.005843948
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Finance",
	"MeanEL": 0.001208762,
	"StandardDeviationEL": 0.014086659
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Machines",
	"MeanEL": 0.000268786,
	"StandardDeviationEL": 0.003613269
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Metals",
	"MeanEL": 0.001095082,
	"StandardDeviationEL": 0.01399794
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Paper",
	"MeanEL": 0.000387348,
	"StandardDeviationEL": 0.005740589
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Services",
	"MeanEL": 0.002020122,
	"StandardDeviationEL": 0.021275561
}, {
	"Country": "Umm Al-Qaiwan (UAE)",
	"Industry": "Transport",
	"MeanEL": 0.001198605,
	"StandardDeviationEL": 0.012739956
}, {
	"Country": "United Arab Emirates",
	"Industry": "Chemicals",
	"MeanEL": 0.000464407,
	"StandardDeviationEL": 0.010605393
}, {
	"Country": "United Arab Emirates",
	"Industry": "Construction Materials",
	"MeanEL": 0.002004388,
	"StandardDeviationEL": 0.007121698
}, {
	"Country": "United Arab Emirates",
	"Industry": "Electronics",
	"MeanEL": 0.000389614,
	"StandardDeviationEL": 0.007973142
}, {
	"Country": "United Arab Emirates",
	"Industry": "Metals",
	"MeanEL": 0.000536815,
	"StandardDeviationEL": 0.016133614
}, {
	"Country": "United Arab Emirates",
	"Industry": "Services",
	"MeanEL": 0.00000654172,
	"StandardDeviationEL": 0.023411235
}, {
	"Country": "United Arab Emirates",
	"Industry": "Transport",
	"MeanEL": 0.000342722,
	"StandardDeviationEL": 0.01487563
}, {
	"Country": "United Kingdom",
	"Industry": "Agriculture",
	"MeanEL": 0.001263545,
	"StandardDeviationEL": 0.006181221
}, {
	"Country": "United Kingdom",
	"Industry": "Chemicals",
	"MeanEL": 0.000677039,
	"StandardDeviationEL": 0.008660069
}, {
	"Country": "United Kingdom",
	"Industry": "Construction",
	"MeanEL": 0.001410506,
	"StandardDeviationEL": 0.005909756
}, {
	"Country": "United Kingdom",
	"Industry": "Construction Materials",
	"MeanEL": 0.000942596,
	"StandardDeviationEL": 0.005176374
}, {
	"Country": "United Kingdom",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000706928,
	"StandardDeviationEL": 0.006034298
}, {
	"Country": "United Kingdom",
	"Industry": "Electronics",
	"MeanEL": 0.000606212,
	"StandardDeviationEL": 0.006027818
}, {
	"Country": "United Kingdom",
	"Industry": "Finance",
	"MeanEL": 0.000775723,
	"StandardDeviationEL": 0.01427701
}, {
	"Country": "United Kingdom",
	"Industry": "Food",
	"MeanEL": 0.001626272,
	"StandardDeviationEL": 0.014479082
}, {
	"Country": "United Kingdom",
	"Industry": "Machines",
	"MeanEL": 0.001086343,
	"StandardDeviationEL": 0.003803619
}, {
	"Country": "United Kingdom",
	"Industry": "Metals",
	"MeanEL": 0.001084948,
	"StandardDeviationEL": 0.01418829
}, {
	"Country": "United Kingdom",
	"Industry": "Paper",
	"MeanEL": 0.000867502,
	"StandardDeviationEL": 0.005930939
}, {
	"Country": "United Kingdom",
	"Industry": "Services",
	"MeanEL": 0.001503354,
	"StandardDeviationEL": 0.021465912
}, {
	"Country": "United Kingdom",
	"Industry": "Textiles",
	"MeanEL": 0.001804167,
	"StandardDeviationEL": 0.008351662
}, {
	"Country": "United Kingdom",
	"Industry": "Transport",
	"MeanEL": 0.001061096,
	"StandardDeviationEL": 0.012930307
}, {
	"Country": "United States of America",
	"Industry": "Agriculture",
	"MeanEL": 0.001120507,
	"StandardDeviationEL": 0.00613108
}, {
	"Country": "United States of America",
	"Industry": "Chemicals",
	"MeanEL": 0.000807392,
	"StandardDeviationEL": 0.008609928
}, {
	"Country": "United States of America",
	"Industry": "Construction",
	"MeanEL": 0.002233156,
	"StandardDeviationEL": 0.005859614
}, {
	"Country": "United States of America",
	"Industry": "Construction Materials",
	"MeanEL": 0.002220942,
	"StandardDeviationEL": 0.005126233
}, {
	"Country": "United States of America",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000818092,
	"StandardDeviationEL": 0.005984157
}, {
	"Country": "United States of America",
	"Industry": "Electronics",
	"MeanEL": 0.000612354,
	"StandardDeviationEL": 0.005977677
}, {
	"Country": "United States of America",
	"Industry": "Finance",
	"MeanEL": 0.000509261,
	"StandardDeviationEL": 0.014226868
}, {
	"Country": "United States of America",
	"Industry": "Food",
	"MeanEL": 0.001142853,
	"StandardDeviationEL": 0.014428941
}, {
	"Country": "United States of America",
	"Industry": "Machines",
	"MeanEL": 0.001038801,
	"StandardDeviationEL": 0.003753478
}, {
	"Country": "United States of America",
	"Industry": "Metals",
	"MeanEL": 0.001290512,
	"StandardDeviationEL": 0.014138149
}, {
	"Country": "United States of America",
	"Industry": "Paper",
	"MeanEL": 0.000945963,
	"StandardDeviationEL": 0.005880798
}, {
	"Country": "United States of America",
	"Industry": "Services",
	"MeanEL": 0.000678495,
	"StandardDeviationEL": 0.02141577
}, {
	"Country": "United States of America",
	"Industry": "Textiles",
	"MeanEL": 0.001638634,
	"StandardDeviationEL": 0.00830152
}, {
	"Country": "United States of America",
	"Industry": "Transport",
	"MeanEL": 0.000740941,
	"StandardDeviationEL": 0.012880165
}, {
	"Country": "Uruguay",
	"Industry": "Agriculture",
	"MeanEL": 0.001241991,
	"StandardDeviationEL": 0.00617005
}, {
	"Country": "Uruguay",
	"Industry": "Chemicals",
	"MeanEL": 0.00100215,
	"StandardDeviationEL": 0.008648898
}, {
	"Country": "Uruguay",
	"Industry": "Construction",
	"MeanEL": 0.000999436,
	"StandardDeviationEL": 0.005898585
}, {
	"Country": "Uruguay",
	"Industry": "Construction Materials",
	"MeanEL": 0.001008231,
	"StandardDeviationEL": 0.005165204
}, {
	"Country": "Uruguay",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001454168,
	"StandardDeviationEL": 0.006023127
}, {
	"Country": "Uruguay",
	"Industry": "Electronics",
	"MeanEL": 0.001156329,
	"StandardDeviationEL": 0.006016647
}, {
	"Country": "Uruguay",
	"Industry": "Finance",
	"MeanEL": 0.00135953,
	"StandardDeviationEL": 0.014265839
}, {
	"Country": "Uruguay",
	"Industry": "Food",
	"MeanEL": 0.001574833,
	"StandardDeviationEL": 0.014467912
}, {
	"Country": "Uruguay",
	"Industry": "Machines",
	"MeanEL": 0.001521312,
	"StandardDeviationEL": 0.003792448
}, {
	"Country": "Uruguay",
	"Industry": "Metals",
	"MeanEL": 0.001337608,
	"StandardDeviationEL": 0.01417712
}, {
	"Country": "Uruguay",
	"Industry": "Paper",
	"MeanEL": 0.000641988,
	"StandardDeviationEL": 0.005919769
}, {
	"Country": "Uruguay",
	"Industry": "Services",
	"MeanEL": 0.000835059,
	"StandardDeviationEL": 0.021454741
}, {
	"Country": "Uruguay",
	"Industry": "Textiles",
	"MeanEL": 0.001190047,
	"StandardDeviationEL": 0.008340491
}, {
	"Country": "Uruguay",
	"Industry": "Transport",
	"MeanEL": 0.003231817,
	"StandardDeviationEL": 0.012919136
}, {
	"Country": "Uzbekistan",
	"Industry": "Consumer Durables",
	"MeanEL": 0.006582202,
	"StandardDeviationEL": 0.005740687
}, {
	"Country": "Uzbekistan",
	"Industry": "Metals",
	"MeanEL": 0.00599286,
	"StandardDeviationEL": 0.013894679
}, {
	"Country": "Uzbekistan",
	"Industry": "Transport",
	"MeanEL": 0.006287019,
	"StandardDeviationEL": 0.012636695
}, {
	"Country": "Vanuatu",
	"Industry": "Agriculture",
	"MeanEL": 0.006108678,
	"StandardDeviationEL": 0.006593131
}, {
	"Country": "Vanuatu",
	"Industry": "Construction",
	"MeanEL": 0.006164714,
	"StandardDeviationEL": 0.006321665
}, {
	"Country": "Vanuatu",
	"Industry": "Construction Materials",
	"MeanEL": 0.006108678,
	"StandardDeviationEL": 0.005588284
}, {
	"Country": "Vanuatu",
	"Industry": "Consumer Durables",
	"MeanEL": 0.006049798,
	"StandardDeviationEL": 0.006446208
}, {
	"Country": "Vanuatu",
	"Industry": "Electronics",
	"MeanEL": 0.003387477,
	"StandardDeviationEL": 0.006439727
}, {
	"Country": "Vanuatu",
	"Industry": "Food",
	"MeanEL": 0.006183336,
	"StandardDeviationEL": 0.014890992
}, {
	"Country": "Vanuatu",
	"Industry": "Metals",
	"MeanEL": 0.006108678,
	"StandardDeviationEL": 0.0146002
}, {
	"Country": "Vanuatu",
	"Industry": "Paper",
	"MeanEL": 0.006513093,
	"StandardDeviationEL": 0.006342849
}, {
	"Country": "Vanuatu",
	"Industry": "Services",
	"MeanEL": 0.006581233,
	"StandardDeviationEL": 0.021877821
}, {
	"Country": "Vanuatu",
	"Industry": "Transport",
	"MeanEL": 0.010665003,
	"StandardDeviationEL": 0.013342216
}, {
	"Country": "Vatican City State",
	"Industry": "Paper",
	"MeanEL": 0.008454222,
	"StandardDeviationEL": 0.005911727
}, {
	"Country": "Vatican City State",
	"Industry": "Services",
	"MeanEL": 0.0000340459,
	"StandardDeviationEL": 0.021446699
}, {
	"Country": "Vatican City State",
	"Industry": "Textiles",
	"MeanEL": 0.010395795,
	"StandardDeviationEL": 0.008332449
}, {
	"Country": "Venezuela",
	"Industry": "Agriculture",
	"MeanEL": 0.036176828,
	"StandardDeviationEL": 0.008531017
}, {
	"Country": "Venezuela",
	"Industry": "Chemicals",
	"MeanEL": 0.051388743,
	"StandardDeviationEL": 0.011009865
}, {
	"Country": "Venezuela",
	"Industry": "Construction Materials",
	"MeanEL": 0.005951239,
	"StandardDeviationEL": 0.00752617
}, {
	"Country": "Venezuela",
	"Industry": "Finance",
	"MeanEL": 0.007829221,
	"StandardDeviationEL": 0.016626805
}, {
	"Country": "Venezuela",
	"Industry": "Food",
	"MeanEL": 0.036761903,
	"StandardDeviationEL": 0.016828878
}, {
	"Country": "Venezuela",
	"Industry": "Metals",
	"MeanEL": 0.052332454,
	"StandardDeviationEL": 0.016538086
}, {
	"Country": "Venezuela",
	"Industry": "Services",
	"MeanEL": 0.035829789,
	"StandardDeviationEL": 0.023815707
}, {
	"Country": "Venezuela",
	"Industry": "Transport",
	"MeanEL": 0.001641011,
	"StandardDeviationEL": 0.015280103
}, {
	"Country": "Vietnam",
	"Industry": "Agriculture",
	"MeanEL": 0.00141656,
	"StandardDeviationEL": 0.006400958
}, {
	"Country": "Vietnam",
	"Industry": "Chemicals",
	"MeanEL": 0.000752283,
	"StandardDeviationEL": 0.008879806
}, {
	"Country": "Vietnam",
	"Industry": "Construction",
	"MeanEL": 0.001753774,
	"StandardDeviationEL": 0.006129493
}, {
	"Country": "Vietnam",
	"Industry": "Construction Materials",
	"MeanEL": 0.004779894,
	"StandardDeviationEL": 0.005396111
}, {
	"Country": "Vietnam",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000917848,
	"StandardDeviationEL": 0.006254035
}, {
	"Country": "Vietnam",
	"Industry": "Electronics",
	"MeanEL": 0.00128588,
	"StandardDeviationEL": 0.006247555
}, {
	"Country": "Vietnam",
	"Industry": "Finance",
	"MeanEL": 0.001101131,
	"StandardDeviationEL": 0.014496747
}, {
	"Country": "Vietnam",
	"Industry": "Food",
	"MeanEL": 0.001136338,
	"StandardDeviationEL": 0.014698819
}, {
	"Country": "Vietnam",
	"Industry": "Machines",
	"MeanEL": 0.001404621,
	"StandardDeviationEL": 0.004023356
}, {
	"Country": "Vietnam",
	"Industry": "Metals",
	"MeanEL": 0.00296048,
	"StandardDeviationEL": 0.014408027
}, {
	"Country": "Vietnam",
	"Industry": "Paper",
	"MeanEL": 0.00080642,
	"StandardDeviationEL": 0.006150676
}, {
	"Country": "Vietnam",
	"Industry": "Services",
	"MeanEL": 0.004083872,
	"StandardDeviationEL": 0.021685649
}, {
	"Country": "Vietnam",
	"Industry": "Textiles",
	"MeanEL": 0.001236415,
	"StandardDeviationEL": 0.008571398
}, {
	"Country": "Vietnam",
	"Industry": "Transport",
	"MeanEL": 0.001688999,
	"StandardDeviationEL": 0.013150044
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Agriculture",
	"MeanEL": 0.003943063,
	"StandardDeviationEL": 0.006161321
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Chemicals",
	"MeanEL": 0.000245937,
	"StandardDeviationEL": 0.008640169
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Construction",
	"MeanEL": 0.001687694,
	"StandardDeviationEL": 0.005889855
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Construction Materials",
	"MeanEL": 0.002264837,
	"StandardDeviationEL": 0.005156474
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002086209,
	"StandardDeviationEL": 0.006014398
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Electronics",
	"MeanEL": 0.001345466,
	"StandardDeviationEL": 0.006007918
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Finance",
	"MeanEL": 0.002334073,
	"StandardDeviationEL": 0.014257109
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Food",
	"MeanEL": 0.001443489,
	"StandardDeviationEL": 0.014459182
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Machines",
	"MeanEL": 0.003178018,
	"StandardDeviationEL": 0.003783719
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Metals",
	"MeanEL": 0.003042306,
	"StandardDeviationEL": 0.01416839
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Paper",
	"MeanEL": 0.001844906,
	"StandardDeviationEL": 0.005911039
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Services",
	"MeanEL": 0.00074873,
	"StandardDeviationEL": 0.021446011
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Textiles",
	"MeanEL": 0.000613269,
	"StandardDeviationEL": 0.008331761
}, {
	"Country": "Virgin Islands (British)",
	"Industry": "Transport",
	"MeanEL": 0.004023656,
	"StandardDeviationEL": 0.012910406
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Construction",
	"MeanEL": 0.003891178,
	"StandardDeviationEL": 0.006190042
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Construction Materials",
	"MeanEL": 0.003507976,
	"StandardDeviationEL": 0.005456661
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Consumer Durables",
	"MeanEL": 0.003796265,
	"StandardDeviationEL": 0.006314585
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Finance",
	"MeanEL": 0.004198218,
	"StandardDeviationEL": 0.014557296
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Food",
	"MeanEL": 0.004791436,
	"StandardDeviationEL": 0.014759369
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Machines",
	"MeanEL": 0.004066173,
	"StandardDeviationEL": 0.004083906
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Metals",
	"MeanEL": 0.003937501,
	"StandardDeviationEL": 0.014468577
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Services",
	"MeanEL": 0.00479786,
	"StandardDeviationEL": 0.021746198
}, {
	"Country": "Virgin Islands (US)",
	"Industry": "Transport",
	"MeanEL": 0.007870766,
	"StandardDeviationEL": 0.013210593
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Chemicals",
	"MeanEL": 0.003320065,
	"StandardDeviationEL": 0.008907349
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Construction",
	"MeanEL": 0.007038299,
	"StandardDeviationEL": 0.006157036
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Construction Materials",
	"MeanEL": 0.003512652,
	"StandardDeviationEL": 0.005423655
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Consumer Durables",
	"MeanEL": 0.002759056,
	"StandardDeviationEL": 0.006281579
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Food",
	"MeanEL": 0.00022812,
	"StandardDeviationEL": 0.014726363
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Textiles",
	"MeanEL": 0.007001689,
	"StandardDeviationEL": 0.008598942
}, {
	"Country": "Wallis & Futuna Islands",
	"Industry": "Transport",
	"MeanEL": 0.007053185,
	"StandardDeviationEL": 0.013177587
}, {
	"Country": "Yemen",
	"Industry": "Consumer Durables",
	"MeanEL": 0.000412108,
	"StandardDeviationEL": 0.006180838
}, {
	"Country": "Yemen",
	"Industry": "Transport",
	"MeanEL": 0.006284283,
	"StandardDeviationEL": 0.013076846
}, {
	"Country": "Zambia",
	"Industry": "Agriculture",
	"MeanEL": 0.001352964,
	"StandardDeviationEL": 0.006090179
}, {
	"Country": "Zambia",
	"Industry": "Chemicals",
	"MeanEL": 0.001161295,
	"StandardDeviationEL": 0.008569027
}, {
	"Country": "Zambia",
	"Industry": "Consumer Durables",
	"MeanEL": 0.001014598,
	"StandardDeviationEL": 0.005943256
}, {
	"Country": "Zambia",
	"Industry": "Electronics",
	"MeanEL": 0.001084908,
	"StandardDeviationEL": 0.005936776
}, {
	"Country": "Zambia",
	"Industry": "Finance",
	"MeanEL": 0.000832585,
	"StandardDeviationEL": 0.014185967
}, {
	"Country": "Zambia",
	"Industry": "Machines",
	"MeanEL": 0.001806991,
	"StandardDeviationEL": 0.003712577
}, {
	"Country": "Zambia",
	"Industry": "Metals",
	"MeanEL": 0.001055273,
	"StandardDeviationEL": 0.014097248
}, {
	"Country": "Zambia",
	"Industry": "Services",
	"MeanEL": 0.002671892,
	"StandardDeviationEL": 0.021374869
}, {
	"Country": "Zimbabwe",
	"Industry": "Consumer Durables",
	"MeanEL": 0.035964932,
	"StandardDeviationEL": 0.014147483
}, {
	"Country": "Zimbabwe",
	"Industry": "Electronics",
	"MeanEL": 0.035665578,
	"StandardDeviationEL": 0.014141003
}, {
	"Country": "Zimbabwe",
	"Industry": "Food",
	"MeanEL": 0.086551215,
	"StandardDeviationEL": 0.022592267
} ,function() {
          console.log('** Finished populating loss ratio');
        }
         );
  }
  catch(e){
    console.log(e);
  }

});

Country.find({}).remove(function() {
  try {
    Country.create(
        {    sno: '1',  region: 'Americas', country:'Canada' },
        {    sno: '2',  region: 'Americas', country:'Mexico' },
        {    sno: '3',  region: 'Americas', country:'United States' },
        {    sno: '4',  region: 'Americas', country:'Brazil' },
        {    sno: '5',  region: 'Americas', country:'Colombia' },
        {    sno: '6',  region: 'Americas', country:'Peru' },
        {    sno: '7',  region: 'Americas', country:'Chile' },
        {    sno: '8',  region: 'Asia', country:'China' },
        {    sno: '9',  region: 'Asia', country:'Hong Kong' },
        {    sno: '10',  region: 'Asia', country:'India' },
        {    sno: '11',  region: 'Asia', country:'Japan' },
        {    sno: '12',  region: 'Asia', country:'Singapore' },
        {    sno: '13',  region: 'Asia', country:'Thailand' },
        {    sno: '14',  region: 'Eastern-Europe', country:'Czech Republic' },
        {    sno: '15',  region: 'Eastern-Europe', country:'Hungary' },
        {    sno: '16',  region: 'Eastern-Europe', country:'Poland' },
        {    sno: '17',  region: 'Eastern-Europe', country:'Russia' },
        {    sno: '18',  region: 'Eastern-Europe', country:'Slovak Republic' },
        {    sno: '19',  region: 'Northern-Europe', country:'Denmark' },
        {    sno: '20',  region: 'Northern-Europe', country:'Finland' },
        {    sno: '21',  region: 'Northern-Europe', country:'Norway' },
        {    sno: '22',  region: 'Northern-Europe', country:'Sweden' },
        {    sno: '23',  region: 'Northern-Europe', country:'United Kingdom' },
        {    sno: '24',  region: 'Northern-Europe', country:'Ireland' },
        {    sno: '25',  region: 'Oceania', country:'Australia' },
        {    sno: '26',  region: 'Oceania', country:'New Zealand' },
        {    sno: '27',  region: 'Southern-Europe', country:'Greece' },
        {    sno: '28',  region: 'Southern-Europe', country:'Portugal' },
        {    sno: '29',  region: 'Southern-Europe', country:'Spain' },
        {    sno: '30',  region: 'Southern-Europe', country:'Italy' },
        {    sno: '31',  region: 'Southern-Europe', country:'Belgium' },
        {    sno: '32',  region: 'Western-Europe', country:'France' },
        {    sno: '33',  region: 'Western-Europe', country:'Luxembourg' },
        {    sno: '34',  region: 'Western-Europe', country:'Austria' },
        {    sno: '35',  region: 'Western-Europe', country:'Germany' },
        {    sno: '36',  region: 'Western-Europe', country:'Switzerland' },
        {    sno: '37',  region: 'Western-Europe', country:'The Netherlands' },
        {    sno: '38',  region: 'Western-Europe', country:'Argentina' }
        ,function() {
          console.log('** Finished populating Country');
        }
    );
  }
  catch(e){
    console.log(e);
  }

});



France.find({}).remove(function() {
  try {
    France.create(
        {
          HEADLINE: 'String',
          INTRO_TEXT:'String',
          ENG: 'String',
          SPAN:'String',
          DEU:'String',
          ITA: 'String',
          FRE:'String'
        }


        ,function() {
          console.log('** Finished populating France');
        }
    );
  }
  catch(e){
    console.log(e);
  }

});
