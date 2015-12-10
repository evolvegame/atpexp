'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**var MemberSchema= new Schema({ 
	email: { type: String, lowercase: true },
	role: {
		type: String,
		default: 'user'
	},
	hashedPassword: String,
	salt: String  
});**/

var UserSchema = new Schema({
  name: String,
  provider: String,
  teamName: String  ,
  members : [
	{
		email: { 
			type: String, 
			lowercase: true 
		},
		role: {
			type: String,
			default: 'user'
		},
		hashedPassword: String,
		salt: String
	}
	],
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
//	console.log("Password is : " + password);
   this._password = password;
	var i;
	console.log("Members are :" + this);
	for ( i=0; i < this.members.length; i++) {
		this.members[i].salt = this.makeSalt();
		//console.log("Salt is " + this.members[i].salt);
		this.members[i].hashedPassword = this.encryptPassword(password , i);
	}
	this.members.push();
	this.save();
	console.log(" This is " + this);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
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
/**UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('members.hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
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
UserSchema
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
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
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
    if (!password || !this.members[element].salt) return '';
    var salt = new Buffer(this.members[element].salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
