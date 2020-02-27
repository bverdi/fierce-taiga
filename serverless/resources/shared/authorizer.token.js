module.exports = () => {
  if (process.env.NODE_ENV == 'production') {
    return {
      type: 'CUSTOM',
      authorizerId: {
        'Fn::ImportValue': `${process.env.API_NAME}-${process.env.VERSION}-authorizerId`
      }
    };
  }

  return {
    name: 'authorizerToken',
    identitySource: 'method.request.header.Authorization',
    resultTtlInSeconds: 0
  };
};