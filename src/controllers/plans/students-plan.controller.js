const sofiaDB = require('../../services/sofia.db/queries')
const responseHelper = require('../../helpers/response.error.helper');


const createStudent = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.userId) {
    throw new ("É necessário enviar o userId por queryString!");
  }

  const userId = event.queryStringParameters.userId;
  const studyPlanId = event.pathParameters.studyPlanId;
  const postBody = JSON.parse(event.body);
  let student = await sofiaDB.findStudentByUserId(userId, studyPlanId);
  const name = postBody.name || student.name;
  const period = postBody.period || student.period;
  const studyPlanQuestionId = postBody.studyPlanQuestionId || student.studyPlanQuestionId;
  const ivyImg = postBody.ivyImg || student.ivyImg;
  console.log(student);
  if (!student) {
    student = await sofiaDB.createStudent(studyPlanId, name, period, studyPlanQuestionId, userId, ivyImg);
  }

  return responseHelper.returnSucess(student, 201)
}

const getPlansByStudent = async () => {
  const studentId = event.pathParameters.studentId
  const student = sofiaDB.findStudentById(studentId);
  if (student) {
    const plans = sofiaDB.getPlansByStudent(studentId);

    const returnBody = {
      plans: plans
    };

    return responseHelper.returnSucess(returnBody, 201)

  }
  else {
    throw new Error('Student does not exist', 404, 'sofia-404-student-does-not-exist');
  }
}

const getStudentDetailsBySession = async (event) => {
  const studentId = event.pathParameters.studentId;
  const sessionId = event.pathParameters.sessionId;
  const student = await sofiaDB.findStudentByUserIdOnly(studentId);
  console.log(student);
  if (student) {
    console.log('entrou');
    const session = await sofiaDB.findSessionById(sessionId);
    if(session){
      console.log('entrou');
      const plans = await sofiaDB.getStudentDetailsBySession(studentId, sessionId);
      const returnBody = {
        plans: plans
      };
  
      return responseHelper.returnSucess(returnBody, 201)
    }

    let plans = [];
    const returnBody = {
      plans: plans
    };

    return responseHelper.returnSucess(returnBody, 201)
  }
  else {
    let plans = [];
    const returnBody = {
      plans: plans
    };

    return responseHelper.returnSucess(returnBody, 201)
  }
}

const getStudentDetails = async (event) => {
  const studentId = event.pathParameters.studentId;
  const planId    = event.pathParameters.studyPlanId;
  
  const studentPlan = await sofiaDB.findStudentPlanByUserIdAndPlanId(studentId, planId);
  const planCounts  = await sofiaDB.getPlansCounts(studentId, planId);
  
  if (studentPlan) {
    const plans = await sofiaDB.getStudentDetails(studentId, planId);
    const returnBody = {
      plans: plans,
      planCounts
    };

    return responseHelper.returnSucess(returnBody, 201);
  }
  else{
    const returnBody = {
      plans: 0
    };

    return responseHelper.returnSucess(returnBody, 201);
  }
}

const listStudentsBySubject = async (event) => {
  const subjectId = event.pathParameters.Id;

  const students = await sofiaDB.getStudentsBySubject(subjectId);
  return responseHelper.returnSucess(students, 201);
}

const editStudent = async () => {
  const postBody = JSON.parse(event.body);
  const studentId = event.pathParameters.studentId
  const name = postBody.name;
  const period = postBody.period;
  const periodicity = postBody.periodicity;
  let student = sofiaDB.findStudentById(studentId);
  if (!student) {
    throw new Error('Student does not exist', 404, 'sofia-404-student-does-not-exist');
  }
  else {
    student = sofiaDB.editStudents(name, period, periodicity, studentId);
  }
  const returnBody = {
    student: student
  };

  return responseHelper.returnSucess(returnBody, 201)
}


module.exports = {
  createStudent,
  editStudent,
  getPlansByStudent,
  listStudentsBySubject,
  getStudentDetails,
  getStudentDetailsBySession
}