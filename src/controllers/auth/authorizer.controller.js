const jwt = require('jsonwebtoken');

const responseHelper = require('../../helpers/response.error.helper');

const generatePolicy = (principalId, effect, resource, payloadRequestContextAuthorizer = null) => {
  const authResponse = { };

  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  if (payloadRequestContextAuthorizer) {
    authResponse.context = payloadRequestContextAuthorizer;
  }

  return authResponse;
};

const token = (event, context) => {
  const token = event.authorizationToken;

  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    // Optional output with custom properties of the String, Number or Boolean type.
    const payloadContext = {
      userId: verifiedToken.payload.userId
    };

    const policy = generatePolicy(`user_${payloadContext.userId}`, 'Allow', event.methodArn, payloadContext);
    context.succeed(policy);
  }
  catch (error) {
    context.fail('Unauthorized');
    return responseHelper.returnError(event, error);
  }
};

module.exports = {
  token
};