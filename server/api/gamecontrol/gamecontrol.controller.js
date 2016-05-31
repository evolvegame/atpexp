'use strict';

var _ = require('lodash');
var GameControl = require('./gamecontrol.model');
var mongoose = require('mongoose');

exports.index = function(req, res) {
  GameControl.find({}, function (err, gamecontrol) {
    if(err) return res.send(500, err);
    return res.json(200, gamecontrol);
  });
};



exports.toggleGameControl = function(req, res) {
var objectId=req.params.id;
var toggleValue=false;
toggleValue=req.params.switchStatus;
console.log('objectId'+objectId);
console.log('toggleValue'+toggleValue);
var updateflag = GameControl.update({"_id" :  mongoose.Types.ObjectId(objectId)},
                   {$set : {  'gameonoffcontrol':toggleValue} });
                   
updateflag.exec(function(err, result){
			console.log('err & result :::: ' + JSON.stringify(err) + ' && ' + JSON.stringify(result));
				if(err) {
				return res.json(500, "Error while updating gamecontrol flag");
			  }else {
				return res.json(200,"Success");	
			  }
      
});

}