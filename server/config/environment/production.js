'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            getMongoURL()
  }
};

function getMongoURL() {
  var appName;
  var mongoURL;
  if(process.env.VCAP_APPLICATION){
    
    var cfe = JSON.parse(process.env.VCAP_APPLICATION);
    appName = cfe.name;
    console.log('Application Name'+appName);
    if(appName== 'atexp-test' || appName == 'atexp-game1' || appName == 'atexp-game3' || appName == 'atexp-game5' || appName == 'atexp-game7' || appName == 'atexp-game9'){
      mongoURL='mongodb://134.168.35.6/'+appName;
    }else if(appName=='atexp' || appName == 'atexp-game2' || appName == 'atexp-game4' || appName == 'atexp-game6' || appName == 'atexp-game8' || appName == 'atexp-game10'){
      mongoURL='mongodb://134.168.41.149/'+appName;
    }
    
  }
  
  console.log('Returning mongoURL'+mongoURL);
  return mongoURL;
}
