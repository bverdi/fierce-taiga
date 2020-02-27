const sofiaDB = require('../../services/sofia.db/queries');
const responseHelper = require('../../helpers/response.error.helper');

const listPlansQuestions = async () => {
  
  const plansQuestions = await sofiaDB.getPlansQuestions();
  return responseHelper.returnSucess(plansQuestions, 201)
  
}

module.exports = {
  listPlansQuestions,
}