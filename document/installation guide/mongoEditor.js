use atpexp-dev
//db.teams.find();
//db.teams.find({teamName : 'Team Z'}).pretty();
//db.teams.find({members.name:'User1'},{"members.name":1});
//db.teams.find({"members.name" : "User1"},{"members.name":1,"members._id":1});
db.teams.find({}, '-salt -hashedPassword');


