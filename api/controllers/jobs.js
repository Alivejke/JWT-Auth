var jobs = [
  'BatMan',
  'DeadPool',
  'SuperMan',
  'Fog',
  'Jade'
];

exports.getJobs = function(jwt, req, res) {
  if(!req.headers.authorization) {
    return res
      .status(401)
      .send({message: 'You are not authorized'});
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, 'MEGASECRET');
  if(!payload.sub) {
    return res
      .status(401)
      .send({message: 'Authentication failed'});
  }
  res.json(jobs);
};
