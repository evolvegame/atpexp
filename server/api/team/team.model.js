'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var TeamSchema = mongoose.Schema({
  name: String,
  provider: String,
  role: { type: String, default: 'user' },
  members: [{ name: String, email: { type: String, lowercase: true }, hashedPassword: String,  salt: String } ],
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
  roundLevelInformation: [{
    round: Number,
    capital: Number,
    premium: Number,
    claims: Number,
    grossIncome: Number,
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
    rankingPosition: Number,
    experienceScoreAmount: Number,
    customers:Number,
    project: [{
    	type: Schema.ObjectId,
    	ref: 'Projects'
    }],
  	department: [{
  		name:String,
  		sizeUnit: String,
  		cost: Number
  	}]
  }],
  riskStrategy:[ {
    round: Number,
    strategyId: Number,
    strategyName: String,
    buyerCountry: [String],
    buyerIndustry: [String],
    strategyRatingBand1: Number,
    strategyRatingBand2: Number,
    strategyRatingBand3: Number,
    strategyRatingBand4: Number,
    strategyRatingBand5: Number
  }],
  offer: [{
    round: Number,
    marketBusinessName: String,
    price:Number,
    premium: Number,
    premiumPercentage: Number,
    cld:Number,
    offerScore:Number
  }],
  customer: [{
    businessName: String,
    businessRevenue: String,
    businessCountry: String,
    businessrisk: Number,
    experiencescoreneeded: Number,
    totalPremium: Number,
    totalClaims: Number,
    buyerPortfolio: [{buyerCountry: String, buyerIndustry: String, buyerRating: Number, cla: Number}],
    wonRound:Number,
    wonFrom:String,
    lostTo:String,
    lostIn:Number,
    calculatedRound:Number,
    agreement: {
      premium: Number,
      premiumPercentage: Number,
      riskStrategyId: Number,
      status: String,
      claims: {claimNumber: Number, buyerPortfolio: Number, claimAmount: Number, round: String}
    }
  }],

  activityCompletion: {
    round: String,
    actvities: Array,
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


/**
 * Virtuals
 */
TeamSchema
  .virtual('password')
  .set(function(password) {
//	console.log("Password is : " + password);
   this._password = password;
	var i;
	//console.log("Members are :" + this);
	for ( i=0; i < this.members.length; i++) {
		this.members[i].salt = this.makeSalt();
		//console.log("Salt is " + this.members[i].salt);
		this.members[i].hashedPassword = this.encryptPassword(password , i);
	}
	this.members.push();
	this.save();
	//console.log(" This is " + this);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
TeamSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
TeamSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
/**TeamSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
TeamSchema
  .path('members.hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
TeamSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');
**/
var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
TeamSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
TeamSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText,0) === this.members[0].hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password, element) {
   /* if (typeof element === "undefined") {
    element =0;
   }*/
    if (!password || !this.members[element].salt) return '';
    var salt = new Buffer(this.members[element].salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('Team', TeamSchema);
