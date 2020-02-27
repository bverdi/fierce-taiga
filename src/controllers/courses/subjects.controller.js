const sofiaDB = require('../../services/sofia.db/queries');

const responseHelper = require('../../helpers/response.error.helper');

const createSubject = async (event) => {
  const postBody    = JSON.parse(event.body);
  const subjectName = postBody.subjectName;
    
  try{
    const subject = await sofiaDB.createSubject(subjectName);
    return responseHelper.returnSucess(subject, 200);
  }  
  catch (error) {
    return responseHelper.returnError(event, error);
  }
  
};

const getSubject = async (event) => {
  const subjectId = event.pathParameters.id;

  try{
    const subject = await sofiaDB.findSubjectById(subjectId);
    if (subject) {
      return responseHelper.returnSucess(subject, 200);
    }
    else{
      throw new Error('Subject not Found', 404, 'sofia-404-subject-not-found');
    }
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }

};

const listSubjects = async () => {  
  const subjects = await sofiaDB.listSubjects();
  
  const returnBody = {
    subjects: subjects
  };
  
  return responseHelper.returnSucess(returnBody, 201)

};

const editSubject = async (event) => {
  const subjectId   = event.pathParameters.id;
  const postBody    = JSON.parse(event.body);
  const subjectName = postBody.subjectName;

  let subject = await sofiaDB.findSubjectById(subjectId);
  if (!subject) {
    throw new Error('Subject not Found', 404, 'sofia-404-subject-not-found');
  }
  else {
    try {
      subject = await sofiaDB.editSubject(subjectId, subjectName);
      return responseHelper.returnSucess(subject, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

const deleteSubject = async (event) => {
  const subjectId   = event.pathParameters.id;

  let subject = await sofiaDB.findSubjectById(subjectId);
  if (!subject) {
    throw new Error('Subject not Found', 404, 'sofia-404-subject-not-found');
  }
  else {
    try {
      subject = await sofiaDB.deleteSubject(subjectId);
      return responseHelper.returnSucess(subject, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

module.exports = {
  createSubject,
  listSubjects,
  getSubject,
  editSubject,
  deleteSubject
};