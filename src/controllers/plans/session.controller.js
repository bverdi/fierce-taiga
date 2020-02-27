const sofiaDB = require('../../services/sofia.db/queries');
const responseHelper = require('../../helpers/response.error.helper');
const moment = require('moment');

const _createStructureToReport = (sessions_filtered) => {
  let sessions = [];
  if (sessions_filtered.length) {
    const now = moment();

    for (let i = 0; i < sessions_filtered.length; i++) {
      if (sessions[sessions_filtered[i].student_id] === undefined) {
        sessions[sessions_filtered[i].student_id] = {
          studentName: sessions_filtered[i].student_name,
          studyPlanName: sessions_filtered[i].study_plan_name,
          totalSessions: 0,
          lateSessions: [],
          nextSessions: [],
          sessionsToReview: [],
          sessionsCompleted: []
        }
      }

      sessions[sessions_filtered[i].student_id].totalSessions++;

      if (sessions_filtered[i].session_status === undefined || sessions_filtered[i].session_status === null) { 
        if (moment(now).isAfter(sessions_filtered[i].session_date_student)) {
          sessions[sessions_filtered[i].student_id].lateSessions.push(sessions_filtered[i]);
        } else {
          sessions[sessions_filtered[i].student_id].nextSessions.push(sessions_filtered[i]);
        }
      } else {
        if (sessions_filtered[i].session_status === 1) {
          sessions[sessions_filtered[i].student_id].sessionsToReview.push(sessions_filtered[i]);
        } else {
          sessions[sessions_filtered[i].student_id].sessionsCompleted.push(sessions_filtered[i]);
        }
      }
    }
  }
  return sessions.filter(Boolean);
}

const createSession = async (event) => {
  const postBody = JSON.parse(event.body);
  const name = postBody.name;
  const objective = postBody.objective;
  const details = postBody.details;
  const settings = postBody.settings;
  const study_plan_id = event.pathParameters.studyPlanId;
  const session_date = postBody.session_date;
  const session_effort = postBody.session_effort;
  const subjectName = postBody.subjectId;
  const type        = postBody.type;

  let session = await sofiaDB.findSessionByName(study_plan_id, name, objective);
  if (!session) {
    session = await sofiaDB.createSession(name, objective, details, settings, study_plan_id, session_date, session_effort, subjectName, type);
    return responseHelper.returnSucess(session, 201);
  }

  return responseHelper.returnSucess(session, 201);
}

const getSessionById = async (event) => {
  const sessionId = event.pathParameters.sessionId;
  const session = await sofiaDB.findSessionById(sessionId);
  const returnBody = {
    session: session
  };
  return responseHelper.returnSucess(returnBody, 201)
}

const getSessionsByStudyPlan = async (event) => {
  const studyPlanId = event.pathParameters.studyPlanId;
  const session = await sofiaDB.findSessionsByStudyPlan(studyPlanId);
  const returnBody = {
    session: session
  };
  return responseHelper.returnSucess(returnBody, 201)
}

const editSession = async (event) => {
  const postBody = JSON.parse(event.body);
  const sessionId = event.pathParameters.sessionId;
  const name = postBody.name;
  const objective = postBody.objective;
  const details = postBody.details;
  const settings = postBody.settings;
  const session_date = postBody.session_date;
  const session_effort = postBody.session_effort;
  const session_time_init = postBody.session_time_init;
  const session_time_end = postBody.session_time_end;
  let session = await sofiaDB.findSessionById(sessionId);
  if (!session) {
    throw new Error('Session does not exist', 404, 'sofia-404-session-does-not-exist');
  }
  else {
    session = await sofiaDB.editSession(name, sessionId, objective, details, settings, session_date, session_effort, session_time_init, session_time_end);
  }
  const returnBody = {
    session: session
  };

  return responseHelper.returnSucess(returnBody, 201)
}

const deleteSession = async (event) => {
  const sessionId = event.pathParameters.id;

  let session = await sofiaDB.findSessionById(sessionId);
  if (!session) {
    throw new Error('Session does not exist', 404, 'sofia-404-session-does-not-exist');
  }
  else {
    session = await sofiaDB.deleteSession(sessionId);
  }
  const returnBody = {
    session: session
  };

  return responseHelper.returnSucess(returnBody, 201)
}

const getSessionsByFilter = async (event) => {
  const course_id = event.pathParameters.id;
  const module_id = event.pathParameters.moduleId;

  let subject_id;
  let student_id;
  if (event.queryStringParameters) {
    subject_id = event.queryStringParameters.subjectId || null;
    student_id = event.queryStringParameters.studentId || null;
  }

  const sessions_filtered = await sofiaDB.findSessionsByFilter(course_id, module_id, subject_id, student_id);
  const sessions = _createStructureToReport(sessions_filtered);

  return responseHelper.returnSucess(sessions, 201);
}

module.exports = {
  createSession,
  editSession,
  getSessionById,
  getSessionsByStudyPlan,
  deleteSession,
  getSessionsByFilter
}