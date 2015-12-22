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
var Team = require('../api/team/team.model');
var Industry = require('../api/industry/industry.model');
var Country = require('../api/country/country.model');
var France = require('../api/france/france.model');


Team.find({}).remove(function() {
  try { 
    Team.create(
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
                    ]
        },{
          provider: 'local',
          password: 'Tester1' ,   
          name:'Team Team',
          slogan:'Make it happen',
          teamCountry: "NL",
          capital: 775,
          experienceScore: 60,
          members :[
                    {name :'User8',email: 'user8@atradius.com' },
                    {name :'User9',email: 'user9@atradius.com' },
                    {name :'User10',email: 'user10@atradius.com'},
                    {name :'User11',email: 'user11@atradius.com'}
                    ],
        },{
          provider: 'local',
          password: 'admin' ,   
          name:'Team Admin',
          slogan:'Do it youself',
          picture:'evolve-avatar.png',
          role:'admin',
          teamCountry: "NL",
          capital: 400,
          experienceScore: 75,
          members :[
                    {name :'Rajasekaran',email: 'raj@atradius.com' },
                    {name :'Jonathan',email: 'jonathan@atradius.com'},
                    {name :'Emanuel',email: 'emanuel@atradius.com'},
                    {name :'Praj',email: 'Praj@a.com'}
                    ],
                    riskStrategy :[
                                   { round: 1,
                                     strategyName: 'Strategy 1',
                                     buyerCountry: 'test1',
                                     buyerIndustry: 'IN',
                                     strategyRatingBand1: 10,
                                     strategyRatingBand2: 20,
                                     strategyRatingBand3: 30,
                                     strategyRatingBand4: 40,
                                     strategyRatingBand5: 50
                                     },
                                     { 
                                       round: 2,                                     
                                       strategyName: 'Strategy 2',
                                       buyerCountry: 'test2',
                                       buyerIndustry: 'IN',
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
                                     }, function() {
                                       console.log('** Finished populating Teams and Users.');
                                     }
    );
        }
        catch(e){
          console.log(e);
        }

  });

<<<<<<< HEAD
=======
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

>>>>>>> 86f2d1b2b549200e15103634ee331a10f04faad8
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
  try { 
    User.create(
        {
          provider: 'local',
          password: 'Tester1' ,   
          name:'Team1',
          slogan:'Team1 Slogan awesome',
          members :[
                    {email: 'user1@atradius.com' },
                    {email: 'user2@atradius.com' },
                    {email: 'user3@atradius.com'}
                    ]
        },{
          provider: 'local',
          password: 'admin' ,   
          name:'Team Admin',
          slogan:'Admin Slogan live',
          role:'admin',
          members :[
                    {email: 'raj@atradius.com' },
                    {email: 'jonathan@atradius.com'},
                    {email: 'dav@atradius.com'}
                    ]
        }, function() {
          console.log('** Finished populating Users.');
        }
    );
  }
  catch(e){
    console.log(e);
  }

});

Round.find({}).remove(function() {
  Round.create( {
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