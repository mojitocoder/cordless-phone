'use strict';

const accountSid = process.env.account_sid;
const authToken = process.env.auth_token;
const fromNumber = process.env.from_number;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

module.exports.hello = async (event, context) => {
  const toNumber = event.queryStringParameters.to;
  const text = event.queryStringParameters.message;

  const message = await client.messages.create({
    body: text,
    to: toNumber,
    from: fromNumber
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Message '" + text + "' has been sent to " + toNumber,
      input: event,
    }),
  };

  return response;
};
