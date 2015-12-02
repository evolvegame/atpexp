'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
  teamName: String,
  slogan: String,
  picture: String

});

module.exports = mongoose.model('Team', TeamSchema);
