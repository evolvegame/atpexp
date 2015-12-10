'use strict';

var should = require('should');
var app = require('../../app');
var Team = require('./team.model');

var team = new Team({
  provider: 'local',
  name: 'Fake Team',
  email: 'test@test.com',
  password: 'password'
});

describe('Team Model', function() {
  before(function(done) {
    // Clear teams before testing
    Team.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Team.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no teams', function(done) {
    Team.find({}, function(err, teams) {
      teams.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate team', function(done) {
    team.save(function() {
      var teamDup = new Team(team);
      teamDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    team.email = '';
    team.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it("should authenticate team if password is valid", function() {
    return team.authenticate('password').should.be.true;
  });

  it("should not authenticate team if password is invalid", function() {
    return team.authenticate('blah').should.not.be.true;
  });
});
