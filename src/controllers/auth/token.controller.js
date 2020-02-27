const jwt = require('jsonwebtoken');

const responseHelper = require('../../helpers/response.error.helper');

const createToken = async (event) => {
  const postBody = JSON.parse(event.body);
  if (postBody.userId) {
    try {
      const payload = {
        userId: postBody.userId
      };

      const token = jwt.sign({ payload }, process.env.TOKEN_SECRET_KEY);
      return responseHelper.returnSucess(token, 201);
    } catch (err) {
      return responseHelper.returnError(event, err);
    }
  }
  
  
};

module.exports = {
  createToken
};