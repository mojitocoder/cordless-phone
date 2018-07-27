'use strict';

const accountSid = process.env.account_sid;
const authToken = process.env.auth_token;
const fromNumber = process.env.from_number;

const twimlDial = 'https://handler.twilio.com/twiml/EH3246f5c10b1c6bfb6388cf682d1e94f8'

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
const ClientCapability = require('twilio').jwt.ClientCapability;

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

module.exports.token = async (event, context) => {
  const username = event.queryStringParameters.username;

  // put your Twilio Application Sid here
  // const appSid = 'APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  const capability = new ClientCapability({
    accountSid: accountSid,
    authToken: authToken,
  });

  // capability.addScope(
  //   new ClientCapability.OutgoingClientScope({ applicationSid: appSid })
  // );

  capability.addScope(new ClientCapability.IncomingClientScope(username));
  const token = capability.toJwt();  

  const response = {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: token
  };

  return response;
};

module.exports.dial = async (event, context) => {
  const toAgent = "client:" + event.queryStringParameters.username;
  const url = twimlDial + '?phone_number=' + event.queryStringParameters.phone_number;

  const call = await client.calls.create({
    url: url,
    to: toAgent,
    from: fromNumber
  });

  const response = {
    statusCode: 200
  };

  return response;
};

module.exports.hangup = async (event, context) => {
  const callSid = event.queryStringParameters.call_sid;
  const call = await client.calls(callSid).update({status: 'completed'});

  return {
    statusCode: 200
  };
};
