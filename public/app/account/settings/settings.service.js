'use strict';

angular.module('atpexpApp')
  .service('settings', function (Auth) {
    var slogan = Auth.getCurrentTeam().slogan;
    console.log('Slogan: ', slogan)
    this.slogan = slogan;
  });
