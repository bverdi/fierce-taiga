const sofiaDB = require('../../services/sofia.db/queries');
const responseHelper = require('../../helpers/response.error.helper');


const createPlan = async (event) => {
  try {
    const postBody            = JSON.parse(event.body);
    const moduleId            = postBody.moduleId;
    const name                = postBody.name;
    const morningTimeInit     = postBody.morningTimeInit
    const dayTimeInit         = postBody.dayTimeInit
    const nightTimeInit       = postBody.nightTimeInit
    const studyPlanQuestionId = postBody.studyPlanQuestionId;

    const plan_check = await sofiaDB.findPlanByNameAndModule(name, moduleId);
    
    if (!plan_check) {
      const plan = await sofiaDB.createPlan(name, moduleId, morningTimeInit, dayTimeInit, nightTimeInit, studyPlanQuestionId);
      return responseHelper.returnSucess(plan, 201);
    }
    
    return responseHelper.returnSucess(plan_check[0], 201);
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getPlansByModule = async (event) => {
  try {
    const moduleId  = event.pathParameters.moduleId;
    const modules   = await sofiaDB.findModuleById(moduleId);
    if (modules) {
      let plan = await sofiaDB.findPlanByModule(moduleId);
      const returnBody = {
        plan: plan
      };
      return responseHelper.returnSucess(returnBody, 201)
    }
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listPlans = async () => {
  try {
    const plan        = await sofiaDB.listPlan();
    const returnBody  = {
      plan: plan
    };
    return responseHelper.returnSucess(returnBody, 201);
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
}

const getPlanById = async (event) => {
  try {
    const studyPlanId = event.pathParameters.studyPlanId;
    const plan        = await sofiaDB.findPlanById(studyPlanId);
    const returnBody  = {
      plan: plan
    };
    return responseHelper.returnSucess(returnBody, 201);
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
}

const getStudentsByStudyPlan = async (event) => {
  try {
    const studyPlanId = event.pathParameters.studyPlanId;
    const students    = await sofiaDB.getAllStudentsByPlan(studyPlanId);
    const returnBody  = {
      students: students
    };
    return responseHelper.returnSucess(returnBody, 201);
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
}

const editPlan = async (event) => {
  try {
    const postBody        = JSON.parse(event.body);
    const studyPlanId     = event.pathParameters.studyPlanId;
    const name            = postBody.name;
    const startDate       = postBody.startDate;
    const endDate         = postBody.endDate;
    const morningTimeInit = postBody.morningTimeInit;
    const dayTimeInit     = postBody.dayTimeInit;
    const nightTimeInit   = postBody.nightTimeInit;
    
    let plan = await sofiaDB.findPlanById(studyPlanId);
    if (!plan) {
      throw new Error('Plan does not exist', 404, 'sofia-404-plan-does-not-exist');
    }
    else {
      plan = await sofiaDB.editPlan(name, startDate, endDate, studyPlanId, morningTimeInit, dayTimeInit, nightTimeInit);
    }

    const returnBody = {
      plan: plan
    };
    return responseHelper.returnSucess(returnBody, 201);
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
}

const deletePlan = async (event) => {
  try {
    const planId  = event.pathParameters.planId;
    let plan      = await sofiaDB.findPlanById(planId);
    if (plan) {
      plan = await sofiaDB.deletePlan(planId);

      const returnBody = {
        plan: plan
      };
      return responseHelper.returnSucess(returnBody, 201);
    }

    throw new Error('Plan does not exist', 404, 'sofia-404-plan-does-not-exist');
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }
}


module.exports = {
  createPlan,
  editPlan,
  getPlansByModule,
  deletePlan,
  listPlans,
  getPlanById,
  getStudentsByStudyPlan
}