'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var GameControlSchema = mongoose.Schema({
  gameonoffcontrol: Boolean,
  messages: String,
  singleplayermode: Boolean
});

module.exports = mongoose.model('GameControl', GameControlSchema);
