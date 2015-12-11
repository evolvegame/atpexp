'use strict';

angular.module('atpexpApp')
  .factory('Auth', function Auth($location, $rootScope, $http, Team, $cookieStore, $q) {
    var currentTeam = {};
    if($cookieStore.get('token')) {
      currentTeam = Team.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentTeam = Team.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentTeam = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return Team.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentTeam = Team.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return Team.changePassword({ id: currentTeam._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      teamSettings: function(slogan, members, callback) {
        var cb = callback || angular.noop;

        return Team.teamSettings({ id: currentTeam._id }, {
          slogan: slogan,
          members: members
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },


      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentTeam: function() {
        return currentTeam;
      },


      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentTeam.hasOwnProperty('role');
      },

      /**
       * Waits for currentTeam to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentTeam.hasOwnProperty('$promise')) {
          currentTeam.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentTeam.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentTeam.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }

    };
  });
