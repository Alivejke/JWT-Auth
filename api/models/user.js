var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserShema = new mongoose.Schema({
  email : String,
  password: String
});

UserShema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.password;
  return user;
};

UserShema.methods.comparePasswords = function (password, callBack) {
  bcrypt.compare(password, this.password, callBack)
};

UserShema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) {
    next();
  };
  bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); };
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err)};
      user.password = hash;
      next();
    })
  })
});

module.exports = mongoose.model('User', UserShema);
