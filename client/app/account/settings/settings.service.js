'use strict';

angular.module('atpexpApp')
  .service('settings', function (Auth) {
    var slogan = Auth.getCurrentUser().slogan;
    console.log('Slogan: ', slogan)
    this.slogan = slogan;
  });
