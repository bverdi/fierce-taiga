'use strict';
const warmer = require('lambda-warmer');

const responseHelper = require('../../helpers/response.error.helper');

//
// controllers
const coursesController   = require('./courses.controller');
const subjectsController  = require('./subjects.controller');
const modulesController   = require('./modules.controller');

const listCoursesRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await coursesController.listCourses(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getCourseRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await coursesController.findCourseById(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const createCourseRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await coursesController.createCourse(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editCourseRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await coursesController.editCourse(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const deleteCourseRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await coursesController.deleteCourse(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};


const createSubjectRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await subjectsController.createSubject(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listSubjectRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await subjectsController.listSubjects(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getSubjectRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await subjectsController.getSubject(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editSubjectRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await subjectsController.editSubject(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const deleteSubjectRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await subjectsController.deleteSubject(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const createModuleRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.createModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listModulesRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.listModules(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listModulesByCourseRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.listModulesByCourse(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const getModuleRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.getModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const editModuleRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.editModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const deleteModuleRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.deleteModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const insertSubjectOnModuleRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.insertSubjectOnModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};

const listSubjectOnModuleRoute = async (event, context) => {
  if (await warmer(event)) 
    return 'warmed';
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    return await modulesController.listSubjectOnModule(event);
  } catch (error) {
    return responseHelper.returnError(event, error);
  }
};


module.exports = {
  listCoursesRoute,
  getCourseRoute,
  createCourseRoute,
  editCourseRoute,
  createSubjectRoute,
  listSubjectRoute,
  getSubjectRoute,
  editSubjectRoute,
  createModuleRoute,
  listModulesRoute,
  listModulesByCourseRoute,
  getModuleRoute,
  editModuleRoute,
  insertSubjectOnModuleRoute,
  listSubjectOnModuleRoute,
  deleteCourseRoute,
  deleteModuleRoute,
  deleteSubjectRoute
};