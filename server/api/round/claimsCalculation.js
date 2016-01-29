'use strict';
var Round = require('./round.model');
var Teams = require('../team/team.model');
var Customers = require('../customer/customer.model');
var LossRatio = require('../customer/lossratio.model');
var normInv = require('./norminv');
var async = require('async');

function checkVariables(input) {
    if (input != null && input != 'undefined') return true;
    else return false;
}

function lossRatioQuery(country, industry) {
    var query = LossRatio.findOne({
        Country: country,
        Industry: industry
    });
    return query;
}

// Claims calculation for each agreement which is active 
// is being done here
exports.calculateClaims = function (team, callback) {
    var claims = 0;
    try {
        var customers = team.customer;
        console.log("Extracting claims from agreements for team -->" + team.name);
        async.forEachSeries(customers,
            function (customer, callback) {
                var customerClaim = 0;
                var buyerPortfolio;
                if (checkVariables(customer) && checkVariables(customer.agreement) && checkVariables(customer.agreement.status) &&
                    customer.agreement.status == 'Active' && checkVariables(customer.buyerPortfolio)) {
                    console.log("Calculating claims for active customer --> " + customer.businessName);
                    buyerPortfolio = customer.buyerPortfolio;
                    if (checkVariables(buyerPortfolio)) {
                        async.forEachSeries(buyerPortfolio,
                            function (buyer, callback) {
                                var indivClaim = 0;
                                var probability = 0;
                                var cld = 0;
                                var lossratioVal = 0;
                                var meanEl = 0;
                                var stdDevEl = 0;
                                if (checkVariables(buyer.cld)) {
                                    cld = buyer.cld;
                                    console.log("CLD value for customer " + customer.businessName + " is -->" + cld);
                                }

                                if (checkVariables(buyer.buyerRating) && buyer.buyerRating > 0) {
                                    var buyerRating = buyer.buyerRating;
                                    var upperMean = 100;
                                    var lowerMean = 0;
                                    if (buyerRating < 95) upperMean = (buyerRating + 5) / 100;
                                    if (buyerRating > 5) lowerMean = (buyerRating - 5) / 100;
                                    probability = Math.random() * (upperMean - lowerMean) + lowerMean;
                                    console.log("Probability value for customer " + customer.businessName + " is -->" + probability);
                                }

                                async.series([
                                    function (callback) {
                                        if (checkVariables(buyer.country) && checkVariables(buyer.industry)) {
                                            var country = buyer.country;
                                            var industry = buyer.industry;
                                            console.log("Calculating claims for buyer country --> " + country + " and buyer industry -->" + industry);
                                            var query = lossRatioQuery(country, industry);
                                            query.exec(function (err, lossRatio) {
                                                if (err) return callback(err);
                                                if (checkVariables(lossRatio)) {
                                                    meanEl = lossRatio.MeanEL;
                                                    stdDevEl = lossRatio.StandardDeviationEL;
                                                    if (probability > 0 && probability < 1 && stdDevEl >= 0) {
                                                        lossratioVal = normInv.normsInv(probability, meanEl, stdDevEl);
                                                    }
                                                    console.log("Loss Ratio value --> " + lossratioVal);
                                                    if (checkVariables(cld) && checkVariables(lossratioVal)) {
                                                        indivClaim = cld * lossratioVal;
                                                        if (indivClaim < 0) indivClaim = 0;
                                                        console.log("Calculated claim for buyer country and industry is -->" + indivClaim);
                                                        callback(null);
                                                    } else callback(null);

                                                } else callback(null);
                                            });
                                        } else callback(null);
                                    }
                                ],
                                    function (err) {
                                        if (err) return callback(err);
                                        customerClaim = customerClaim + indivClaim;
                                        console.log("Calculated claim for customer - " + customer.businessName + " is --> " + customerClaim);
                                        callback(null);
                                    });
                            },
                            function (err) {
                                if (err) return callback(err);
                                claims = claims + customerClaim;
                                callback(null);
                            });

                    } else {
                        callback(null);
                    }
                } else {
                    callback(null);
                }
            }
            , function (err) {
                if (err) return callback(err);
                console.log("Total claim for team - " + team.name + " is --> " + claims);
                callback(null, claims);
            }
            );
    } catch (err) {
        if (err) return callback(err);
        console.log("Error in claims calculation for team -->" + team.name);
        claims = 0;
        callback(null, claims);
    }
}