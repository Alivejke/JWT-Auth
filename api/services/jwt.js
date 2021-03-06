var crypto = require('crypto');

exports.encode = function (payload, secret) {
  var algorithm = 'HS256'

  var header = {
    typ: 'JWT',
    alg: algorithm
  };

  var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));

  return jwt + '.' + sign(jwt, secret);

};

exports.decode = function (token, secret) {
  console.log('Token decoding was started...')
  var segments = token.split('.');
  if(segments.length !== 3) {
    throw new Error('Token structure invalid');
  };
  var header = JSON.parse(base64Decode(segments[0]));
  var payload = JSON.parse(base64Decode(segments[1]));
  console.log('...token header: %j', header);
  console.log('...token payload: %j', payload);
  var rawSignature = segments[0] + '.' + segments[1];
  console.log('...signature: ' + rawSignature);
  console.log('...verification started');
  if(!verify(rawSignature, secret, segments[2])) {
    throw new Error('Verification failed');
  };
  console.log('...verification OK!');
  return payload;
};

function verify(raw, secret, signature) {
  return signature == sign(raw, secret);
}

function sign(str, key) {
  return crypto
    .createHmac('sha256', key)
    .update(str)
    .digest('base64');
};

function base64Encode(str) {
  return new Buffer(str).toString('base64');
};

function base64Decode(str) {
  return Buffer(str, 'base64').toString();
};
