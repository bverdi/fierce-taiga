const sofiaDB = require('../../services/sofia.db/queries');

const responseHelper = require('../../helpers/response.error.helper');

const createModule = async (event) => {
  const postBody    = JSON.parse(event.body);
  const moduleName  = postBody.moduleName;
  const courseId    = postBody.courseId;
    
  try{
    const moduleObj = await sofiaDB.createModule(moduleName, courseId);
    return responseHelper.returnSucess(moduleObj, 200);
  }  
  catch (error) {
    return responseHelper.returnError(event, error);
  }
  
};

const getModule = async (event) => {
  const moduleId = event.pathParameters.id;

  try{
    const moduleObj = await sofiaDB.findModuleById(moduleId);
    if (moduleObj) {
      return responseHelper.returnSucess(moduleObj, 200);
    }
    else{
      throw new Error('Course not Found', 404, 'sofia-404-course-not-found');
    }
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }

};

const listModules = async () => {  
  const modules = await sofiaDB.listModules();
  
  const returnBody = {
    modules: modules
  };
  
  return responseHelper.returnSucess(returnBody, 201)

};

const listModulesByCourse = async (event) => {
  const courseId    = event.pathParameters.id;
  const modules = await sofiaDB.listModulesByCourse(courseId);
  
  const returnBody = {
    modules: modules
  };
  
  return responseHelper.returnSucess(returnBody, 201)

};

const editModule = async (event) => {
  const moduleId    = event.pathParameters.id;
  const postBody    = JSON.parse(event.body);
  const moduleName  = postBody.moduleName;

  let moduleObj = await sofiaDB.findModuleById(moduleId);
  if (!moduleObj) {
    throw new Error('Module not Found', 404, 'sofia-404-module-not-found');
  }
  else {
    try {
      moduleObj = await sofiaDB.editModule(moduleId, moduleName);
      return responseHelper.returnSucess(moduleObj, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

const insertSubjectOnModule = async (event) => {
  const moduleId    = event.pathParameters.id;
  const postBody    = JSON.parse(event.body);
  const subjectId   = postBody.subjectId;

  let moduleObj = await sofiaDB.findModuleById(moduleId);
  if (!moduleObj) {
    throw new Error('Module not Found', 404, 'sofia-404-module-not-found');
  }
  else {
    try {
      await sofiaDB.addSubjectOnModule(moduleId, subjectId);
      return responseHelper.returnSucess({ msg: 'Disciplina adicionada ao módulo' }, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

const listSubjectOnModule = async (event) => {  
  const moduleId  = event.pathParameters.id;
  const subjects   = await sofiaDB.listSubjectOnModule(moduleId);
  
  const returnBody = {
    subjects: subjects
  };
  
  return responseHelper.returnSucess(returnBody, 201)

};

const deleteModule = async (event) => {
  const moduleId    = event.pathParameters.id;

  let moduleObj = await sofiaDB.findModuleById(moduleId);
  if (!moduleObj) {
    throw new Error('Module not Found', 404, 'sofia-404-module-not-found');
  }
  else {
    try {
      moduleObj = await sofiaDB.deleteModule(moduleId);
      return responseHelper.returnSucess(moduleObj, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

module.exports = {
  createModule,
  listModules,
  listModulesByCourse,
  getModule,
  editModule,
  insertSubjectOnModule,
  listSubjectOnModule,
  deleteModule
};