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
        members :[
                  {name :'User1',email: 'user1@atradius.com' },
                  {name :'User2',email: 'user2@atradius.com' },
                  {name :'User3',email: 'user3@atradius.com'},
                  {name :'User7',email: 'user7@atradius.com'}
                ],
                offer:[
                  { "round" : 1,
                   "marketBusinessName" : "Ajo",
                   "price" : 1000000,
                   "cld":15000,
                   "premium": 50000,
                   "premiumPercentage": 100 ,
                   "offerScore":0
                 },
                 { "round" : 1,
                  "marketBusinessName" : "Bope",
                  "price" : 1000000,
                  "cld":15000,
                  "premium": 300,
                  "premiumPercentage": 100 ,
                  "offerScore":0
                }
                ],
                roundLevelInformation: [{
                    roundNumber: 1,
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
                    experienceScoreAmount:60000
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
        members :[
                  {name :'User1',email: 'user1@atradius.com' },
                  {name :'User2',email: 'user2@atradius.com' },
                  {name :'User3',email: 'user3@atradius.com'},
                  {name :'User7',email: 'user7@atradius.com'}
                ],
                offer:[
                  { "round" : 1,
                   "marketBusinessName" : "Ajo",
                   "price" : 1000000,
                   "cld":3000,
                   "premium": 400000,
                   "premiumPercentage": 100 ,
                   "offerScore":0
                 },
                 { "round" : 1,
                  "marketBusinessName" : "Bope",
                  "price" : 1000000,
                  "cld":3000,
                  "premium": 23,
                  "premiumPercentage": 100 ,
                  "offerScore":0
                }],
                roundLevelInformation: [{
                    roundNumber: 1,
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
                    experienceScoreAmount:90000
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
          members :[
                    {name :'User1',email: 'user1@atradius.com' },
                    {name :'User2',email: 'user2@atradius.com' },
                    {name :'User3',email: 'user3@atradius.com'},
                    {name :'User7',email: 'user7@atradius.com'}
                  ],
                  offer:[
                    { "round" : 1,
                     "marketBusinessName" : "Ajo",
                     "price" : 1000000,
                     "cld":65000,
                     "premium": 9000,
                     "premiumPercentage": 100 ,
                     "offerScore":0
                   },{ "round" : 1,
                    "marketBusinessName" : "Bope",
                    "price" : 1000000,
                    "cld":3000,
                    "premium": 242,
                    "premiumPercentage": 100 ,
                    "offerScore":0
                  }
                  ],
                  roundLevelInformation: [{
                	    roundNumber: 1,
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
                      experienceScoreAmount:70000
                	  }]
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team D',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
             "marketBusinessName" : "Ajo",
             "price" : 1000000,
             "cld":90000,
             "premium": 20000,
             "premiumPercentage": 100 ,
             "offerScore":0
           },{ "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":90000,
            "premium": 2000,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
          ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:10000
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
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":30003,
            "premium": 2342,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
          ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:34200
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
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
             "marketBusinessName" : "Ajo",
             "price" : 1000000,
             "cld":90000,
             "premium": 8000,
             "premiumPercentage": 100 ,
             "offerScore":0
           },{ "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":302300,
            "premium": 2423,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
          ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:45000
        	  }],
        },{
          provider: 'local',
          password: 'Tester1' ,
          name:'Team G',
          slogan:'Make it happen',
          picture:'evolve-avatar.png',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
             "marketBusinessName" : "Ajo",
             "price" : 1000000,
             "cld":90000,
             "premium": 1000000,
             "premiumPercentage": 100 ,
             "offerScore":0
           },
           { "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":90000,
            "premium": 1000000,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
          ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:23420
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
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
             "marketBusinessName" : "Ajo",
             "price" : 1000000,
             "cld":90000,
             "premium": 1000000,
             "premiumPercentage": 100 ,
             "offerScore":0
           },{ "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":90000,
            "premium": 1000000,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
          ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:98800
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
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
             "marketBusinessName" : "Ajo",
             "price" : 1000000,
             "cld":90000,
             "premium": 1000000,
             "premiumPercentage": 100 ,
             "offerScore":0
           },{ "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":23000,
            "premium": 1000,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
        ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:100200
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
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
          offer:[
            { "round" : 1,
             "marketBusinessName" : "Ajo",
             "price" : 1000000,
             "cld":90000,
             "premium": 1000000,
             "premiumPercentage": 100,
             "offerScore":0
           },{ "round" : 1,
            "marketBusinessName" : "Bope",
            "price" : 1000000,
            "cld":9340,
            "premium": 112000,
            "premiumPercentage": 100 ,
            "offerScore":0
          }
          ],
          roundLevelInformation: [{
        	    roundNumber: 1,
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
              experienceScoreAmount:120000
        	  }]
        },{
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
          offer:[
                    { "round" : 1,
                     "marketBusinessName" : "Ajo",
                     "price" : 1000000,
                     "cld":80000,
                     "premium": 900000,
                     "premiumPercentage": 90 ,
                     "offerScore":0
                   },{ "round" : 1,
                    "marketBusinessName" : "Bope",
                    "price" : 1000000,
                    "cld":1200000,
                    "premium": 34000,
                    "premiumPercentage": 100 ,
                    "offerScore":0
                  }
                ],
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
                                       ]
                                     },{
                                       provider: 'local',
                                       password: 'Tester1' ,   
                                       name:'Team B',
                                       slogan:'We are awesome',
                                       picture:'evolve-avatar.png',
                                       teamCountry: "DE",
                                       capital: 250,
                                       experienceScore: 98,
                                       members :[
                                                 {name :'User4',email: 'user4@atradius.com' },
                                                 {name :'User5',email: 'user5@atradius.com' },
                                                 {name :'User6',email: 'user6@atradius.com'}
                                                 ]
                                     },{
                                         provider: 'local',
                                         password: 'Tester1' ,   
                                         name:'Team Z',
                                         slogan:'Make it happen',
                                         picture:'evolve-avatar.png',
                                         teamCountry: "NL",
                                         capital: 775,
                                         experienceScore: 60,
                                         members :[
                                                   {name :'User8',email: 'user8@atradius.com' },
                                                   {name :'User9',email: 'user9@atradius.com' },
                                                   {name :'User10',email: 'user10@atradius.com'},
                                                   {name :'User11',email: 'user11@atradius.com'}
                                                   ],
                                         offer:[
                                                 ]          
                                       },{
                                           provider: 'local',
                                           password: 'Tester1' ,   
                                           name:'Team Y',
                                           slogan:'Make it happen',
                                           picture:'evolve-avatar.png',
                                           teamCountry: "NL",
                                           capital: 775,
                                           experienceScore: 60,
                                           members :[
                                                     {name :'User8',email: 'user8@atradius.com' },
                                                     {name :'User9',email: 'user9@atradius.com' },
                                                     {name :'User10',email: 'user10@atradius.com'},
                                                     {name :'User11',email: 'user11@atradius.com'}
                                                     ],
                                           offer:[
                                                   ]          
                                         },{
                                             provider: 'local',
                                             password: 'Tester1' ,   
                                             name:'Team X',
                                             slogan:'Make it happen',
                                             picture:'evolve-avatar.png',
                                             teamCountry: "NL",
                                             capital: 775,
                                             experienceScore: 60,
                                             members :[
                                                       {name :'User8',email: 'user8@atradius.com' },
                                                       {name :'User9',email: 'user9@atradius.com' },
                                                       {name :'User10',email: 'user10@atradius.com'},
                                                       {name :'User11',email: 'user11@atradius.com'}
                                                       ],
                                             offer:[
                                                     ]          
                                           },{
                                               provider: 'local',
                                               password: 'Tester1' ,   
                                               name:'Team W',
                                               slogan:'Make it happen',
                                               picture:'evolve-avatar.png',
                                               teamCountry: "NL",
                                               capital: 775,
                                               experienceScore: 60,
                                               members :[
                                                         {name :'User8',email: 'user8@atradius.com' },
                                                         {name :'User9',email: 'user9@atradius.com' },
                                                         {name :'User10',email: 'user10@atradius.com'},
                                                         {name :'User11',email: 'user11@atradius.com'}
                                                         ],
                                               offer:[
                                                       ]          
                                             },{
                                                 provider: 'local',
                                                 password: 'Tester1' ,   
                                                 name:'Team V',
                                                 slogan:'Make it happen',
                                                 picture:'evolve-avatar.png',
                                                 teamCountry: "NL",
                                                 capital: 775,
                                                 experienceScore: 60,
                                                 members :[
                                                           {name :'User8',email: 'user8@atradius.com' },
                                                           {name :'User9',email: 'user9@atradius.com' },
                                                           {name :'User10',email: 'user10@atradius.com'},
                                                           {name :'User11',email: 'user11@atradius.com'}
                                                           ],
                                                 offer:[
                                                         ]          
                                               },{
                                                   provider: 'local',
                                                   password: 'Tester1' ,   
                                                   name:'Team U',
                                                   slogan:'Make it happen',
                                                   picture:'evolve-avatar.png',
                                                   teamCountry: "NL",
                                                   capital: 775,
                                                   experienceScore: 60,
                                                   members :[
                                                             {name :'User8',email: 'user8@atradius.com' },
                                                             {name :'User9',email: 'user9@atradius.com' },
                                                             {name :'User10',email: 'user10@atradius.com'},
                                                             {name :'User11',email: 'user11@atradius.com'}
                                                             ],
                                                   offer:[
                                                           ]          
                                                 },{
                                                     provider: 'local',
                                                     password: 'Tester1' ,   
                                                     name:'Team T',
                                                     slogan:'Make it happen',
                                                     picture:'evolve-avatar.png',
                                                     teamCountry: "NL",
                                                     capital: 775,
                                                     experienceScore: 60,
                                                     members :[
                                                               {name :'User8',email: 'user8@atradius.com' },
                                                               {name :'User9',email: 'user9@atradius.com' },
                                                               {name :'User10',email: 'user10@atradius.com'},
                                                               {name :'User11',email: 'user11@atradius.com'}
                                                               ],
                                                     offer:[
                                                             ]          
                                                   },{
                                                       provider: 'local',
                                                       password: 'Tester1' ,   
                                                       name:'Team S',
                                                       slogan:'Make it happen',
                                                       picture:'evolve-avatar.png',
                                                       teamCountry: "NL",
                                                       capital: 775,
                                                       experienceScore: 60,
                                                       members :[
                                                                 {name :'User8',email: 'user8@atradius.com' },
                                                                 {name :'User9',email: 'user9@atradius.com' },
                                                                 {name :'User10',email: 'user10@atradius.com'},
                                                                 {name :'User11',email: 'user11@atradius.com'}
                                                                 ],
                                                       offer:[
                                                               ]          
                                                     },{
                                                         provider: 'local',
                                                         password: 'Tester1' ,   
                                                         name:'Team R',
                                                         slogan:'Make it happen',
                                                         picture:'evolve-avatar.png',
                                                         teamCountry: "NL",
                                                         capital: 775,
                                                         experienceScore: 60,
                                                         members :[
                                                                   {name :'User8',email: 'user8@atradius.com' },
                                                                   {name :'User9',email: 'user9@atradius.com' },
                                                                   {name :'User10',email: 'user10@atradius.com'},
                                                                   {name :'User11',email: 'user11@atradius.com'}
                                                                   ],
                                                         offer:[
                                                                 ]          
                                                       }, function() {

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
    minOfferScore:10,
    businessRisk: 40,
    countryCode:"nl",
    industry:"Services",
    industryCode:"ser",
    experienceScoreNeeded:50,
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
        {    sno: '7',    industry: 'Finances' },
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
        {    sno: '37',  region: 'Western-Europe', country:'Netherlands' }
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
