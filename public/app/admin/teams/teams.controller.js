'use strict';

angular.module('atpexpApp')
.controller('TeamsCtrl', function ($scope, $http, Auth, Team,toastr,ResetPassword) {

    // Use the Team $resource to fetch all teams
    $scope.totalTeams = Team.query();

    Team.query().$promise.then(function (teams) {
      var teamArray=[];
      for (var i = 0; i < teams.length ; i++) {
        var obj = teams[i]; 

        for (var j = 0; j < obj.members.length; j++) {
          var member = obj.members[j];       
          var teamObj= {
            teamName:obj.name,
            teamId:obj._id,
            memberName:member.name,
            memberId:member._id,
            memberEmail:member.email}           
            teamArray.push (teamObj);
          }                                  

        }
        $scope.teams = teamArray;
      });

    function reloadTeams(memberId,pwd){
      Team.query().$promise.then(function (teams) {
        var teamArray=[];
        var teamObj={};
        for (var i = 0; i < teams.length ; i++) {
          var obj = teams[i];
          for (var j = 0; j < obj.members.length; j++) {
            var member = obj.members[j]; 

            if (member._id===memberId){
              teamObj= {  
                teamName:obj.name,
                teamId:obj._id,
                memberName:member.name,
                memberId:member._id,
                memberEmail:member.email,
                reset:true,
                password:pwd};
                console.log('match '+JSON.stringify(teamObj));
                teamArray.push (teamObj);            
              }else{
                teamObj= {
                  teamName:obj.name,
                  teamId:obj._id,
                  memberName:member.name,
                  memberId:member._id,
                  memberEmail:member.email};           
                  teamArray.push (teamObj);
                }                                  

              }      

            }
            $scope.teams = teamArray;
          });
}

function improved(memberId,pwd){

  var teamArray=$scope.teams;
  var teamObj={};
  for (var i = 0; i < teamArray.length ; i++) {
    var obj = teamArray[i];       


    if (obj.memberId===memberId){

      obj.reset=true,
      obj.password=pwd;                        
      break;           
    }                           

  }      


  $scope.teams = teamArray;
}      

$scope.getRandomPassword=function(){
 var pwd = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for( var i=0; i < 5; i++ ){
  pwd += possible.charAt(Math.floor(Math.random() * possible.length));
}

      //pwd = (Math.random().toString(36)+'00000000000000000').slice(2, 7);

      return pwd;
    }

    $scope.resetPassword= function(member){
      console.log(''+JSON.stringify(member));
      var password = $scope.getRandomPassword();

      var resetPasswordObj = {
        teamId:member.teamId,
        memberId:member.memberId,
        password:password
      }

      ResetPassword.resetPassword(resetPasswordObj).$promise.then(function(team){
        improved(member.memberId,password);
        toastr.success('Password has been reset successfully to : '+member.memberEmail );
      })



    }




    $scope.delete = function (team) {
      console.log(team._id);
      Team.remove({id: team._id});
      angular.forEach($scope.teams, function (u, i) {
        if (u === team) {
          $scope.teams.splice(i, 1);
        }
      });
    };
    
  });
