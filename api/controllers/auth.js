exports.createSendToken = function(jwt, user, res) {
  var payload = {
    sub: user.id
  };
  var token = jwt.encode(payload, 'MEGASECRET');
  res
    .status(200)
    .send({
      user: user.toJSON(),
      token: token
    });
};
