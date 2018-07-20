'use strict';

const accountSid = "xx"
const authToken = "xx"

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

module.exports.hello = async (event, context) => {
  
  const message = await client.messages.create({
    body: 'Hello from Corless-Phone',
    to: '+xx',
    from: '+xx'
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world from Cordless Phone: ' + message,
      input: event,
    }),
  };

  return response;
};
