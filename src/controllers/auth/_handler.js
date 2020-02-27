'use strict';
const warmer = require('lambda-warmer');

const responseHelper = require('../../helpers/response.error.helper');

//
// controllers
const authorizerController  = require('./authorizer.controller');
const tokenController       = require('./token.controller');

const createTokenRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await tokenController.createToken(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const authorizerToken = (event, context) => {
  return authorizerController.token(event, context);
};

module.exports = {
  authorizerToken,
  createTokenRoute
};