'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TeamSchema = new Schema({
  teamName: String,
  representingUnit: String,
  slogan: String,
  picture: String,
  teamCountry: String,
  capital: Number,
  premium: Number,
  claims: Number,
  claimsRatio: Number,
  profit: Number,
  investment: Number,
  experienceScore: Number,
  salesForceSize: Number,
  underwriterDepartmentSize: Number,
  iTMaintenance: Number,
  marketingBudget: Number,
  facilities: Number,
  totalExpense: Number,
  rankingPosition: Number,
  roundLevelInformation: {
    round:Number,
    capital: Number,
    premium: Number,
    claims: Number,
    claimsRatio: Number,
    profit: Number,
    investment: Number,
    experienceScore: Number,
    salesforceSize: Number,
    underwriterDepartmentSize: Number,
    iTMaintenance: Number,
    marketingBudget: Number,
    facilities: Number,
    totalExpense: Number,
    rankingPosition: Number
  },
  member: [{
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String
  }],
  riskStrategy: {
    round: Number,
    buyerCountry: String,
    buyerIndustry: String,
    buyerRatingRange: Number,
    riskAcceptanceRate: Number
  },
  offer: {
    round: Number,
    marketBusinessName: String,
    premium: Number,
    premiumPercentage: Number
  },
  customer: {
    businessName: Number,
    businessRevenue: String,
    businessCountry: Number,
    businessrisk: Number,
    experiencescoreneeded: Number,
    totalPremium: Number,
    totalClaims: Number,
    buyerPortfolio: [{buyerCountry: String, buyerIndustry: String, buyerRating: Number, cla: Number}],
    agreement: {
      premium: Number,
      premiumPercentage: Number,
      riskStrategyId: Number,
      status: String,
      claims: {claimNumber: Number, buyerPortfolio: Number, claimAmount: Number, round: String}
    }
  },

  activityCompletion: {
    round: String,
    actvities: [activityId],
    percentageCompletion: Number
  },

  notification: {
    round: Number,
    notificationHeader: String,
    notificationText: String,
    status: String,
    displayType: String
  }

});

module.exports = mongoose.model('Team', TeamSchema);
