const sofiaDB = require('../../services/sofia.db/queries');
const responseHelper = require('../../helpers/response.error.helper');

//
const createStudentSession = async (event) => {
  const postBody        = JSON.parse(event.body);
  const studentId       = event.pathParameters.studentId;
  const sessionId       = event.pathParameters.sessionId;
  const sessionTimeInit = postBody.sessionTimeInit || "";
  const sessionDate     = postBody.sessionDate || "";
  const notes           = postBody.notes || "";
  const sessionStatus   = postBody.sessionStatus || "";

  const student = await sofiaDB.findStudentById(studentId);
  if (student) {
    const session = await sofiaDB.findSessionById(sessionId);
    if (session) {
      try {
        const studentsSession = await sofiaDB.createStudentSession(studentId, sessionId, sessionTimeInit, sessionDate, notes, sessionStatus);
        return responseHelper.returnSucess(studentsSession, 201);
      }
      catch (error) {
        throw new Error('Error creating student session', 500, error);
      }
    }
    throw new Error('Session does not exist', 404, 'sofia-404-session-does-not-exist');

  }
  else {
    throw new Error('Student does not exist', 404, 'sofia-404-student-does-not-exist');
  }

}

const getStudentSession = async (event) => {
  const sessionId = event.pathParameters.sessionId;
  const studentId = event.pathParameters.studentId;

  const studentSession = await sofiaDB.getStudentSessionById(studentId, sessionId);
  if (studentSession) {
    return responseHelper.returnSucess(studentSession, 200);
  }

  throw new Error('Student Session does not exist', 404, 'sofia-404-student-session-does-not-exist');
}

const editStudentSession = async (event) => {
  const postBody = JSON.parse(event.body);
  const studentId = event.pathParameters.studentId;
  const sessionId = event.pathParameters.sessionId;


  let studentSession = await sofiaDB.getStudentSessionById(studentId, sessionId);
  console.log(studentSession);
  if(studentSession){
    const notes = postBody.notes || studentSession.notes;
    const sessionStatus = postBody.sessionStatus || studentSession.session_status;
    const sessionDate = postBody.sessionDate || studentSession.session_date;
    console.log(notes);
    studentSession = await sofiaDB.editStudentSession(studentSession.student_id, sessionId, notes, sessionStatus, sessionDate);
    return responseHelper.returnSucess(studentSession, 201)
  }
  else {
    throw new Error('Record does not exist', 404, 'sofia-404-record-does-not-exist');
  }
}

const getStudentsSessionByStatus = async (event) => {
  const sessionId = event.pathParameters.sessionId;
  const status    = event.pathParameters.status;

  let isLate = false;
  if (event.queryStringParameters && event.queryStringParameters.isLate) {
    isLate = event.queryStringParameters.isLate;
  }

  const studentsSession = await sofiaDB.getStudentsSessionBySessionAndStatus(sessionId, status, isLate);
  return responseHelper.returnSucess(studentsSession, 200);
}

const getSessionStudent = async (event) => {
  const sesseionStudentId = event.pathParameters.sessionsStudentId;
  
  const student_session = await sofiaDB.getSessionStudent(sesseionStudentId);
  if (student_session) {
    return responseHelper.returnSucess(student_session, 201);
  }

  throw new Error('Session student not found', 404, 'sofia-404-session-student-not-found');
}

const updateAllStudents = async () => {
  const plans = [36,37,38,39,40,41];
  
}
module.exports = {
  createStudentSession,
  getStudentSession,
  editStudentSession,
  getStudentsSessionByStatus,
  getSessionStudent
}