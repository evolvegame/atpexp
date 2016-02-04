'use strict';

var _this = this;
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var Projects = require('../projects/projects.model');
var Departments = require('../departments/departments.model');
var claimsCalc = require('./claimsCalculation');
var async = require('async');

function queryAllTeams() {
    var query = Teams.find({
        role: 'user',
    });
    return query;
}

function checkVariables(input) {
    if (input != null && input != 'undefined') return true;
    else return false;
}

function calculateInvestment(projectId, allProjects) {
    var investment = 0;
    allProjects.forEach(function (refProject) {
        var refProjectId = String(refProject._id);
        if (checkVariables(projectId) && checkVariables(refProjectId) && projectId == refProjectId) {
            if (checkVariables(refProject.amount)) investment = refProject.amount;
        }
    });
    return investment;
}

exports.populateValues = function (currentRound, callback) {
    try {
        var query = queryAllTeams();
        var allProjects;
        var allTeams;
        async.waterfall([

            function (callback) {
                async.parallel([
                    function (callback) {
                        try {
                            Projects.find().exec(function (err, projects) {
                                if (err) return callback(err);
                                callback(null, projects);
                            });
                        } catch (err) {
                            if (err) return callback(err);
                        }
                    },

                    function (callback) {
                        query.exec(function (err, teams) {
                            if (err) return callback(err)
                            callback(null, teams);
                        });
                    },
                ],
                    function (err, results) {
                        if (err) return callback(err);
                        allProjects = results[0];
                        allTeams = results[1];
                        callback(null, results[1]);
                    }
                    )
            },

            function (teams, callback) {
                var capitalArr = [];
                var expScore = [];
                async.forEachSeries(teams,
                    function (team, callback) {

                        var capital = team.capital;
                        var premium = 0;
                        var claims = 0;
                        var claimsRatio = 0;
                        var profit = 0;
                        var grossIncome = 0;
                        var investment = 0;
                        var experienceScore = 0;
                        var salesforceSize = 0;
                        var underwriterDepartmentSize = 0;
                        var iTMaintenance = 0;
                        var marketingBudget = 0;
                        var facilities = 0;
                        var totalExpense = 0;
                        var expScore;
                        var roundInfoId;
                        var countActiveCustomers = 0;

                        async.parallel([
                            function (callback) {
                                try {
                                    var customers = team.customer;
                                    console.log("Extracting premiums from agreements for team -->" + team.name);
                                    customers.forEach(function (customer) {
                                        if (checkVariables(customer) && checkVariables(customer.agreement) && checkVariables(customer.agreement.premium) &&
                                            checkVariables(customer.agreement.status) &&
                                            customer.agreement.status == 'Active') {
                                            var agreementPremium = customer.agreement.premium;
                                            premium = premium + agreementPremium;
                                            countActiveCustomers = countActiveCustomers + 1;
                                        }
                                    });
                                    console.log("Completed extraction of premiums for " + team.name + ". Premium value -->" + premium);
                                    callback(null);
                                } catch (err) {
                                    if (err) return callback(err);
                                }
                            }
                            ,
                            function (callback) {
                                console.log("Get the claims for all  active customers for team"+team.name);
                                claimsCalc.calculateClaims(team,function (err, claimsTot) {
                                    if (err) return callback(err);
                                    claims = (claimsTot.toFixed(2))/1;
                                    console.log("Completed claims calculation  for team"+team.name);
                                    callback(null);
                                });
                            }
                            ,
                            function (callback) {
                                var allRoundInfo = team.roundLevelInformation;
                                async.forEachSeries(allRoundInfo,
                                    function (roundInfo, callback) {
                                        if (checkVariables(roundInfo) && checkVariables(roundInfo.round) && roundInfo.round == currentRound) {
                                            roundInfoId = roundInfo._id;
                                            expScore = roundInfo.experienceScore;
                                            if (checkVariables(roundInfo.project)) {
                                                try {
                                                    var projects = roundInfo.project;
                                                    projects.forEach(function (project) {
                                                        investment = investment + calculateInvestment(project, allProjects);
                                                    });
                                                    console.log("Completed extraction of investments for " + team.name + ". Investment value -->" + investment);
                                                } catch (err) {
                                                    if (err) return callback(err);
                                                }
                                            }
                                            if (checkVariables(roundInfo.department)) {
                                                try {
                                                    var departments = roundInfo.department;
                                                    departments.forEach(function (department) {
                                                        if (checkVariables(department) && checkVariables(department.name && checkVariables(department.cost))) {
                                                            if (department.name == 'IT') iTMaintenance = iTMaintenance + department.cost;
                                                            if (department.name == 'Risk') underwriterDepartmentSize = underwriterDepartmentSize + department.cost;
                                                            if (department.name == 'Local Sales' || department.name == 'Global Sales') salesforceSize = salesforceSize + department.cost;
                                                            if (department.name == 'Marketing') marketingBudget = marketingBudget + department.cost;
                                                            if (department.name == 'Facilities') facilities = facilities + department.cost;
                                                        }
                                                    });
                                                    totalExpense = salesforceSize + underwriterDepartmentSize + iTMaintenance + marketingBudget + facilities;
                                                    console.log("Completed extraction of expenses for " + team.name + ". Expenses value -->" + totalExpense);
                                                } catch (err) {
                                                    if (err) return callback(err);
                                                }
                                            }

                                            console.log("Completed all round level information for team --> " + team.name)
                                            callback(null)

                                        } else {
                                            callback(null)
                                        };
                                    },
                                    function (err) {
                                        if (err) return callback(err);
                                        callback(null);
                                    });
                            }
                        ], function (err, results) {
                            if (err) return callback(err);
                            grossIncome = premium - (claims + totalExpense + investment);
                            grossIncome = (grossIncome.toFixed(2))/1;
                            console.log("Gross Income for team - " + team.name + " is -->" + grossIncome);
                            profit = grossIncome * 0.8; // to be checked
                            profit = (profit.toFixed(2))/1;
                            console.log("Profit for team - " + team.name + " is -->" + profit);
                            capital = capital + profit;
                            capital = (capital.toFixed(2))/1;
                            console.log("Capital for team - " + team.name + " is -->" + capital);
                            async.series([
                                function (callback) {
                                    console.log("Update the calculation results at current round level -->" + roundInfoId);
                                    try {
                                        Teams.update({
                                            "roundLevelInformation._id": roundInfoId
                                        }, {
                                                $set: {
                                                    "roundLevelInformation.$.capital": capital,
                                                    "roundLevelInformation.$.premium": premium,
                                                    "roundLevelInformation.$.claims": claims,
                                                    "roundLevelInformation.$.grossIncome": grossIncome,
                                                    "roundLevelInformation.$.claimsRatio": claimsRatio,
                                                    "roundLevelInformation.$.profit": profit,
                                                    "roundLevelInformation.$.investment": investment,
                                                    "roundLevelInformation.$.salesforceSize": salesforceSize,
                                                    "roundLevelInformation.$.underwriterDepartmentSize": underwriterDepartmentSize,
                                                    "roundLevelInformation.$.marketingBudget": marketingBudget,
                                                    "roundLevelInformation.$.facilities": facilities,
                                                    "roundLevelInformation.$.totalExpense": totalExpense,
                                                    "roundLevelInformation.$.customers": countActiveCustomers
                                                }
                                            }, function (err) {
                                                if (err) return callback(err)
                                                console.log("Update completed for round level information for team" + team.name);
                                                callback(null);
                                            });
                                    } catch (err) {
                                        if (err) return callback(err);
                                    }
                                },
                                function (callback) {
                                    console.log("Update the calculation results at top level for team -->" + team.name);
                                    try {
                                        var teamId = team._id;
                                        Teams.update({
                                            _id: teamId
                                        }, {
                                                $set: {
                                                    capital: capital,
                                                    premium: premium,
                                                    claims: claims,
                                                    claimsRatio: claimsRatio,
                                                    grossIncome: grossIncome,
                                                    profit: profit,
                                                    investment: investment,
                                                    experienceScore: expScore,
                                                    salesForceSize: salesforceSize,
                                                    underwriterDepartmentSize: underwriterDepartmentSize,
                                                    iTMaintenance: iTMaintenance,
                                                    marketingBudget: marketingBudget,
                                                    facilities: facilities,
                                                    totalExpense: totalExpense
                                                }
                                            }, function (err) {
                                                if (err != null) return callback(err)
                                                console.log("Update completed at top level for team " + team.name);
                                                callback(null, "Updates done successfully for calculation results.");
                                            });
                                    } catch (err) {
                                        if (err) return callback(err);
                                    }
                                }
                            ],
                                function (err) {
                                    if (err) return callback(err);
                                    callback(null, "Calculation of Results done and data updated.")
                                });
                        });
                    },
                    function (err) {
                        if (err) return callback(err);
                        callback(null, teams);
                    });
            }

        ],
            function (err) {
                if (err) return callback(err);
                callback(null);
            });
    } catch (err) {
        if (err) return callback(err);
    }
}

exports.capitalRanking = function (currRound, callback) {
    try {
        var query = queryAllTeams();
        var allProjects;
        var allTeams;
        var capitalArr = [];
        async.waterfall([
            function (callback) {
                query.exec(function (err, teams) {
                    if (err) return callback(err)
                    callback(null, teams);
                });
            },

            function (teams, callback) {
                teams.forEach(function (team) {
                    var capitalVal = 0;
                    if (checkVariables(team.capital)) {
                        capitalVal = team.capital;
                    }
                    capitalArr.push(capitalVal);
                });
                // sort based on capital
                var sorted = capitalArr.slice().sort(function (a, b) {
                    return b - a
                });
                var sortedJSON = {};
                // ranking order
                var ranks = sorted.slice().map(function (v) {
                    var rankIndex = sorted.indexOf(v) + 1;
                    if (sortedJSON != null && !(sortedJSON === undefined)) {
                        if (sortedJSON.rankIndex == null || sortedJSON.rankIndex === undefined) {
                            sortedJSON[rankIndex] = v;
                        }
                    }
                });
                // swap values
                var one, swappedJSON = {};
                for (one in sortedJSON) {
                    if (sortedJSON.hasOwnProperty(one)) {
                        swappedJSON[sortedJSON[one]] = one;
                    }
                }

                async.forEach(teams,
                    function (team, callback) {
                        var roundInfo = team.roundLevelInformation;
                        if (checkVariables(roundInfo)) {
                            async.forEach(roundInfo,
                                function (currRoundInfo, callback) {
                                    if (checkVariables(currRoundInfo) && checkVariables(currRoundInfo._id) && checkVariables(currRoundInfo.round) && currRoundInfo.round == currRound) {
                                        var roundId = currRoundInfo._id;
                                        var capitalForRank = currRoundInfo.capital;
                                        var rank = swappedJSON[capitalForRank];
                                        var teamId = team._id;
                                        Teams.update({
                                            _id: teamId,
                                            "roundLevelInformation._id": roundId
                                        }, {
                                                $set: {
                                                    rankingPosition: rank,
                                                    "roundLevelInformation.$.rankingPosition": rank
                                                }
                                            }, function (err) {
                                                if (err != null) return callback(err)
                                                console.log("Saving capital ranking for team -->" + team.name + " rank= " + rank);
                                                callback(null, "Saved capital ranking");
                                            });
                                    } else callback(null);
                                },
                                function (err) {
                                    if (err) return callback(err);
                                    callback(null);
                                });
                        } else callback(null);
                    },
                    function (err) {
                        if (err) return callback(err);
                        callback(null, "Successfully ranking applied for capital");
                    });

            }

        ], function (err) {
            if (err) return callback(err);
            callback(null, "Success");
        });
    } catch (err) {
        if (err) return callback(err);
    }

}


function groupByCountry() {
    var query = Teams.aggregate(
        [
            { $match: { role: 'user' } },
            { $group: { _id: "$teamCountry", capital: { $push: "$capital" }, expScore: { $push: "$experienceScore" }, teams: { $push: "$name" } } }
        ]
        );
    return query;
}


exports.countryCapitalRanking = function (currRound, callback) {

    async.waterfall([

        function (callback) {
            var query = groupByCountry();
            query.exec(function (err, results) {
                if (err) return callback(err);
                callback(null, results);
            });
        },

        function (results, callback) {
            async.forEachSeries(results,
                function (result, callback) {
                    if (checkVariables(result._id)) {
                        console.log("Applying ranking for country -->" + result._id);

                        async.parallel([

                            function (callback) {
                                //Apply for capital ranking at country level
                                if (checkVariables(result.capital)) {
                                    console.log("Starting country level capital ranking for --> " + result._id);
                                    // sort based on capital
                                    var sortedCapital = result.capital.slice().sort(function (a, b) {
                                        return b - a
                                    });
                                    var sortedCapitalJSON = {};
                                    // ranking order
                                    var ranks = sortedCapital.slice().map(function (v) {
                                        var rankIndex = sortedCapital.indexOf(v) + 1;
                                        if (sortedCapitalJSON != null && !(sortedCapitalJSON === undefined)) {
                                            if (sortedCapitalJSON.rankIndex == null || sortedCapitalJSON.rankIndex === undefined) {
                                                sortedCapitalJSON[rankIndex] = v;
                                            }
                                        }
                                    });
                    
                                    // swap values
                                    var one, swappedCapitalJSON = {};
                                    for (one in sortedCapitalJSON) {
                                        if (sortedCapitalJSON.hasOwnProperty(one)) {
                                            swappedCapitalJSON[sortedCapitalJSON[one]] = one;
                                        }
                                    }

                                    console.log('Swapped Capital JSON -->' + JSON.stringify(swappedCapitalJSON));
                                    var teamList = result.teams;
                                    if (checkVariables(teamList)) {
                                        async.forEachSeries(teamList,
                                            function (team, callback) {
                                                Teams.findOne({
                                                    name: team,
                                                    teamCountry: result._id,
                                                    roundLevelInformation: {
                                                        $elemMatch: {
                                                            round: currRound
                                                        }
                                                    }
                                                }).exec(function (err, teamResult) {
                                                    if (err) return callback(err);
                                                    var rank = swappedCapitalJSON[teamResult.capital];
                                                    var roundId;
                                                    if (checkVariables(rank) && checkVariables(teamResult) && rank > 0) {
                                                        var roundInfo = teamResult.roundLevelInformation;
                                                        if (checkVariables(roundInfo)) {
                                                            roundInfo.forEach(function (roundDetails) {
                                                                if (checkVariables(roundDetails) && checkVariables(roundDetails.round) && roundDetails.round == currRound) {
                                                                    roundId = roundDetails._id;
                                                                }
                                                            });
                                                            async.series([
                                                                function (callback) {
                                                                    Teams.update({
                                                                        "roundLevelInformation._id": roundId
                                                                    }, {
                                                                            $set: {
                                                                                "roundLevelInformation.$.countryLevelRankingPosition": rank
                                                                            }
                                                                        }, function (err) {
                                                                            if (err != null) return callback(err)
                                                                            console.log("Saving country level capital ranking for team -->" + teamResult.name + " rank = " + rank);
                                                                            callback(null);
                                                                        });
                                                                }
                                                            ], function (err) {
                                                                if (err) return callback(err);
                                                                callback(null);
                                                            });
                                                        } else callback(new Error("Round Info cannot be obtained"));
                                                    } else callback(null);
                                                });
                                            }, function (err) {
                                                if (err) return callback(err);
                                                callback(null);
                                            });
                                    } else callback(null); // No team list available so nothing to do
                                } else callback(null); // No capital available so nothing to do
                            }
                            ,
                            function (callback) {
                                //Apply for experience score at country level
                                if (checkVariables(result.expScore)) {
                                    console.log("Starting experience score ranking at country level for --> " + result._id);
                                    // sort based on expScore
                                    var sortedExpScore = result.expScore.slice().sort(function (a, b) {
                                        return b - a
                                    });
                                    var sortedExpScoreJSON = {};
                                    // ranking order
                                    var ranks = sortedExpScore.slice().map(function (v) {
                                        var rankIndex = sortedExpScore.indexOf(v) + 1;
                                        if (sortedExpScoreJSON != null && !(sortedExpScoreJSON === undefined)) {
                                            if (sortedExpScoreJSON.rankIndex == null || sortedExpScoreJSON.rankIndex === undefined) {
                                                sortedExpScoreJSON[rankIndex] = v;
                                            }
                                        }
                                    });
                    
                                    // swap values
                                    var one, swappedExpScoreJSON = {};
                                    for (one in sortedExpScoreJSON) {
                                        if (sortedExpScoreJSON.hasOwnProperty(one)) {
                                            swappedExpScoreJSON[sortedExpScoreJSON[one]] = one;
                                        }
                                    }

                                    console.log('Swapped Exp Score JSON -->' + JSON.stringify(swappedExpScoreJSON));
                                    var teamList = result.teams;
                                    if (checkVariables(teamList)) {
                                        async.forEachSeries(teamList,
                                            function (team, callback) {
                                                Teams.findOne({
                                                    name: team,
                                                    teamCountry: result._id,
                                                    roundLevelInformation: {
                                                        $elemMatch: {
                                                            round: currRound
                                                        }
                                                    }
                                                }).exec(function (err, teamResult) {
                                                    if (err) return callback(err);
                                                    var rank = swappedExpScoreJSON[teamResult.experienceScore];
                                                    var roundId;
                                                    if (checkVariables(rank) && checkVariables(teamResult) && rank > 0) {
                                                        var roundInfo = teamResult.roundLevelInformation;
                                                        if (checkVariables(roundInfo)) {
                                                            roundInfo.forEach(function (roundDetails) {
                                                                if (checkVariables(roundDetails) && checkVariables(roundDetails.round) && roundDetails.round == currRound) {
                                                                    roundId = roundDetails._id;
                                                                }
                                                            });
                                                            async.series([
                                                                function (callback) {
                                                                    Teams.update({
                                                                        "roundLevelInformation._id": roundId
                                                                    }, {
                                                                            $set: {
                                                                                "roundLevelInformation.$.CountryLevelExperienceScoreRankingPosition": rank
                                                                            }
                                                                        }, function (err) {
                                                                            if (err != null) return callback(err)
                                                                            console.log("Saving exp score ranking at country level for team -->" + teamResult.name + " rank = " + rank);
                                                                            callback(null);
                                                                        });
                                                                }
                                                            ], function (err) {
                                                                if (err) return callback(err);
                                                                callback(null);
                                                            });
                                                        } else callback(new Error("Round Info cannot be obtained"));
                                                    } else callback(null);
                                                });
                                            }, function (err) {
                                                if (err) return callback(err);
                                                callback(null);
                                            });
                                    } else callback(null); // No team list available so nothing to do
                                } else callback(null); // No capital available so nothing to do 
                            }

                        ]
                            , function (err) {
                                if (err) { console.log(err); return callback(err); }
                                callback(null, "Successfully applied both capital and exp Score ranking at country level for --> " + result._id);
                            })


                    } else callback(null);
                },

                function (err) {
                    if (err) return callback(err);
                    callback(null);
                })
        }


    ],

        function (err) {
            if (err) return callback(err);
            callback(null);
        });

}