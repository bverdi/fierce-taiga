'use strict';
const warmer = require('lambda-warmer');

const responseHelper = require('../../helpers/response.error.helper');

//
// controllers
const planController    = require('./plan.controller');
const sessionController = require('./session.controller');
const studentPlanController = require('./students-plan.controller');
const studentSessionController = require('./students-session.controller'); 
const planQuestionsController = require('./plan-questions.controller');


const createPlanRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await planController.createPlan(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listPlanRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await planController.listPlans(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getPlanByIdRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await planController.getPlanById(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editPlanRoute = async (event, context) => {
    if (await warmer(event)) 
      return 'warmed';
    try {
      context.callbackWaitsForEmptyEventLoop = false;
      return await planController.editPlan(event);
    } catch (error) {
      return responseHelper.returnError(event, error);
    }
};

const deletePlanRoute = async (event, context) => {
    if (await warmer(event)) 
      return 'warmed';
    try {
      context.callbackWaitsForEmptyEventLoop = false;
      return await planController.deletePlan(event);
    } catch (error) {
      return responseHelper.returnError(event, error);
    }
};

const getPlansByModuleRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await planController.getPlansByModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const createSessionRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await sessionController.createSession(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getSessionByIdRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await sessionController.getSessionById(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getSessionByStudyPlanRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await sessionController.getSessionsByStudyPlan(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editSessionRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await sessionController.editSession(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const deleteSessionRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await sessionController.deleteSession(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const createStudentRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentPlanController.createStudent(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getStudentDetailsRoute = async (event, context) => {
  if (await warmer(event)) 
  return 'warmed';
try {
  context.callbackWaitsForEmptyEventLoop = false;
  return await studentPlanController.getStudentDetails(event);
} catch (error) {
  return responseHelper.returnError(event, error);
}
};

const getStudentDetailsBySessionRoute = async (event, context) => {
  if (await warmer(event)) 
  return 'warmed';
try {
  context.callbackWaitsForEmptyEventLoop = false;
  return await studentPlanController.getStudentDetailsBySession(event);
} catch (error) {
  return responseHelper.returnError(event, error);
}
};

const getPlansByStudentRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentPlanController.getPlansByStudent(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editStudentRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentPlanController.editStudent(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const createStudentSessionRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentSessionController.createStudentSession(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getStudentSessionRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentSessionController.getStudentSession(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editStudentSessionRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentSessionController.editStudentSession(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listPlansQuestionsRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await planQuestionsController.listPlansQuestions(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listSessionsByFilterRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await sessionController.getSessionsByFilter(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listStudentsBySubjectRoute = async (event, context) => {
    if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentPlanController.listStudentsBySubject(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getStudentsSessionByStatusRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentSessionController.getStudentsSessionByStatus(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getSessionStudentRoute = async (event, context) => {
  if (await warmer(event)) {
    return 'warmed';
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await studentSessionController.getSessionStudent(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getStudentsByStudyPlanRoute = async (event, context) => {
  if (await warmer(event)) {
    return 'warmed';
  }

  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await planController.getStudentsByStudyPlan(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

module.exports = {
    createPlanRoute,
    editPlanRoute,
    getPlansByModuleRoute,
    createSessionRoute,
    getSessionByIdRoute,
    getSessionByStudyPlanRoute,
    editSessionRoute,
    createStudentRoute,
    getPlansByStudentRoute,
    editStudentRoute,
    createStudentSessionRoute,
    getStudentSessionRoute,
    editStudentSessionRoute,
    deleteSessionRoute,
    deletePlanRoute,
    listPlanRoute,
    getPlanByIdRoute,
    listPlansQuestionsRoute,
    listSessionsByFilterRoute,
    listStudentsBySubjectRoute,
    getStudentDetailsRoute,
    getStudentsSessionByStatusRoute,
    getStudentDetailsBySessionRoute,
    getSessionStudentRoute,
    getStudentsByStudyPlanRoute
}