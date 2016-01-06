var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;


//User schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password:{
    type: String,
    required: true,
    bcrypt: true
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileimage: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(candidatePassowrd, hash, callback){
    bcrypt.compare(candidatePassowrd, hash, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
}
module.exports.getUserByUserName = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.createUser = function(newUser, callback){
  bcrypt.hash(newUser.password, 10, function(err, hash){
    if(err) throw err;
    //Set encrypted password
    newUser.password = hash;
    console.log(newUser);

    // Create User
    newUser.save(callback);
  });
};
