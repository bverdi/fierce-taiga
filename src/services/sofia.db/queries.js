const sofiaDbAccess = require('./access');

const createCourse = async (name) => {
  const consulta = `INSERT INTO courses (name) 
                    VALUES($1) RETURNING *;`;
  const values = [name];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const getPlansCounts = async (user_id, plan_id) => {
  const consulta = `SELECT COUNT(students_plan.id) AS total, session_status 
  FROM students_plan
  inner join students_session on students_session.student_id = students_plan.id
  inner join session on students_session.session_id = session.id
  inner join study_plan on study_plan.id = session.study_plan_id
  WHERE students_plan.user_id = $1 and study_plan.id = $2
  GROUP BY session_status`;

  const values = [user_id, plan_id];
  return await sofiaDbAccess.executeQuery(consulta, values);
}


const getStudentDetails = async (user_id, plan_id) => {
  const consulta = `SELECT students_plan.name, students_plan.user_id, students_plan.study_plan_id, period_to_study, session.name as session_name, session.id as session_id, 
  study_plan.morning_time_init, study_plan.day_time_init, study_plan.night_time_init, students_session.session_status, students_plan.period_to_study, session.details, 
  students_session.notes, session.objective, session.session_effort, students_session.session_date, students_session.session_time_init, session.type, students_plan.study_plan_question_id, session.subject_id, students_plan.character_chosen_url
  FROM public.students_plan
  inner join students_session on students_session.student_id = students_plan.id
  inner join session on students_session.session_id = session.id
  inner join study_plan on study_plan.id = session.study_plan_id
  where students_plan.user_id = $1 and study_plan.id = $2
  order by students_session.session_date`;
  const values = [user_id, plan_id];
  return await sofiaDbAccess.executeQuery(consulta, values)
}

const getStudentDetailsBySession = async (user_id, session_id) => {
  const consulta = `SELECT students_plan.name, students_plan.user_id, students_plan.study_plan_id, period_to_study, session.name as session_name, session.id as session_id, 
  study_plan.morning_time_init, study_plan.day_time_init, study_plan.night_time_init, students_session.session_status, students_plan.period_to_study, session.details, 
  students_session.notes, session.objective, session.session_effort, students_session.session_date, students_session.session_time_init, session.type, session.subject_id
  FROM public.students_plan
  inner join students_session on students_session.student_id = students_plan.id
  inner join session on students_session.session_id = session.id
  inner join study_plan on study_plan.id = session.study_plan_id
  where students_plan.user_id = $1 and session.id = $2`
  const values = [user_id, session_id];
  return await sofiaDbAccess.executeQuery(consulta, values)
}

const findCourseById = async (id) => {
  const consulta = `SELECT * FROM courses
                    WHERE id = $1`;
  const values = [id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });

}

const findSessionById = async (id) => {
  const consulta = `SELECT * FROM session
                    WHERE id = $1`;
  const values = [id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }
      return null;
    });
}

const editCourse = async (id, name) => {
  const consulta = `UPDATE courses
                    SET name = $1
                    WHERE id = $2 RETURNING *;`;
  const values = [name, id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const listCourses = async () => {
  const consulta = `SELECT * FROM courses ORDER BY name`
  return await sofiaDbAccess.executeQuery(consulta);
}

const createSubject = async (name) => {
  const consulta = `INSERT INTO subjects (name) 
                    VALUES($1) RETURNING *;`;
  const values = [name];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const findSubjectById = async (id) => {
  const consulta = `SELECT * FROM subjects
                    WHERE id = $1`;
  const values = [id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const findSubjectByName = async (id) => {
  const consulta = `SELECT * FROM subjects
                    WHERE name = $1`;
  const values = [id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const editSubject = async (id, name) => {
  const consulta = `UPDATE subjects
                    SET name = $1
                    WHERE id = $2 RETURNING *`;
  const values = [name, id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const listSubjects = async () => {
  const consulta = `SELECT * FROM subjects ORDER BY name`
  return await sofiaDbAccess.executeQuery(consulta);
}

const createModule = async (name, courseId) => {
  const consulta = `INSERT INTO modules (name, course_id) 
                    VALUES($1, $2) RETURNING *;`;
  const values = [name, courseId];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const findModuleById = async (id) => {
  const consulta = `SELECT * FROM modules
                    WHERE id = $1`;
  const values = [id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const editModule = async (id, name) => {
  const consulta = `UPDATE modules
                    SET name = $1
                    WHERE id = $2 RETURNING *`;
  const values = [name, id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const listModules = async () => {
  const consulta = `SELECT * FROM modules ORDER BY name`
  return await sofiaDbAccess.executeQuery(consulta);
};

const listModulesByCourse = async (courseId) => {
  const consulta = `SELECT * FROM modules WHERE course_id = $1 ORDER BY name`;
  const values = [courseId];
  return await sofiaDbAccess.executeQuery(consulta, values)
};

const addSubjectOnModule = async (moduleId, subjectId) => {
  const consulta = `INSERT INTO subject_module (module_id, subject_id) 
                    VALUES($1, $2) RETURNING *;`;
  const values = [moduleId, subjectId];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const listSubjectOnModule = async (moduleId) => {
  const consulta = `SELECT subjects.name, subject_module.id as "subjectModuleId", subject_module.subject_id
                    FROM subject_module 
                    INNER JOIN subjects ON (subjects.id = subject_module.subject_id)
                    WHERE module_id = $1  ORDER BY name;`;
  const values = [moduleId];
  return await sofiaDbAccess.executeQuery(consulta, values);
};

const createClass = async (subjectId, className) => {
  const consulta = `INSERT INTO class (subject_id, name) 
                    VALUES($1, $2) RETURNING *;`;
  const values = [subjectId, className];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
};

const findClassById = async (id) => {
  const consulta = `SELECT * FROM class
                    WHERE id = $1`;
  const values = [id];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const listClasses = async () => {
  const consulta = `SELECT * from class`
  return await sofiaDbAccess.executeQuery(consulta);
}


const createStudent = async (studyPlanId, name, period, studyPlanQuestionId, userId, ivyImg) => {
  const consulta = `INSERT INTO students_plan (name, period_to_study, study_plan_question_id, study_plan_id, user_id, character_chosen_url) 
                    VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [name, period, studyPlanQuestionId, studyPlanId, userId, ivyImg]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const listStudents = async () => {
  const consulta = `SELECT * from students`
  return await sofiaDbAccess.executeQuery(consulta);
}

const findSessionByName = async (study_plan_id, name, objective) => {
  const consulta = `SELECT * FROM session
                    WHERE study_plan_id = $1 AND name = $2 AND objective = $3`;
  const values = [study_plan_id, name, objective];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const findSessionsByStudyPlan = async (study_plan_id) => {
  const consulta = `SELECT * FROM session
  WHERE study_plan_id = $1`;
  const values = [study_plan_id];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const createSession = async (name, objective, details, settings, study_plan_id, session_date, session_effort, subjectId, type) => {
  const consulta = `INSERT INTO session (name, objective, details, settings, study_plan_id, session_date, session_effort, subject_id, type) 
                    VALUES('${name}', '${objective}', '${details}', '${settings}', ${study_plan_id}, '${session_date}', '${session_effort}', '${subjectId}', '${type}') RETURNING *;`;
  return await sofiaDbAccess.executeQuery(consulta)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const listSession = async () => {
  const consulta = `SELECT * from session ORDER BY name`
  return await sofiaDbAccess.executeQuery(consulta);
}


const editStudents = async (newName, period_to_study, periodicity_to_study, studentId) => {
  const consulta = `UPDATE students
                    SET name = $1, period_to_study = $3, periodicity_to_study = $4
                    WHERE user_id = $2 RETURNING *`;
  const values = [newName, studentId, period_to_study, periodicity_to_study];
  return await sofiaDbAccess.executeQuery(consulta, values);
};

const editSession = async (newName, sessionId, objective, details, settings, session_date, session_effort, session_time_init, session_time_end) => {
  const consulta = `UPDATE session
  SET name = $1, objective = $3, details = $4, settings = $5, session_date = $6, session_effort = $7, session_time_init = $8, session_time_end = $9
  WHERE id = $2 RETURNING *`;
  const values = [newName, sessionId, objective, details, settings, session_date, session_effort, session_time_init, session_time_end];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const createPlan = async (name, moduleId, morningTimeInit, dayTimeInit, nightTimeInit, studyPlanQuestionId) => {
  const consulta = `INSERT INTO study_plan (name, module_id, morning_time_init, day_time_init, night_time_init, study_plan_question_id) 
                    VALUES('${name}','${moduleId}', '${morningTimeInit}', '${dayTimeInit}', '${nightTimeInit}', '${studyPlanQuestionId}') RETURNING *;`;
  return await sofiaDbAccess.executeQuery(consulta)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
} 

const listPlan = async () => {
  const consulta = `SELECT study_plan.*, courses.name as "course_name", modules.name as "module_name" FROM study_plan 
                    INNER JOIN modules on study_plan.module_id = modules.id
                    INNER JOIN courses on modules.course_id = courses.id
                    ORDER BY study_plan.name`;
  return await sofiaDbAccess.executeQuery(consulta)
    .then(result => {
      if (result.length > 0) {
        return result;
      }

      return null;
    });
  // const consulta = `SELECT study_plan.id, study_plan.name as "Nome do Plano", courses.name as "Nome do Curso", modules.name as "Nome do Módulo" FROM study_plan 
  //                   INNER JOIN modules on study_plan.module_id = modules.id
  //                   INNER JOIN courses on modules.course_id = courses.id
  //                   ORDER BY study_plan.name`;
  // return await sofiaDbAccess.executeQuery(consulta);
}  

const findPlanByName = async (name, subjectModuleId) => {
  const consulta = `SELECT * FROM study_plan
                    WHERE name = $1 and subject_module_id = $2 ORDER BY name`
  const values = [name, subjectModuleId]
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const findPlanByNameAndModule = async (name, moduleId) => {
  const consulta = `SELECT * FROM study_plan
                    WHERE name = $1 and module_id = $2 ORDER BY name`
  const values = [name, moduleId]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result;
      }

      return null;
    });
}

const findPlanById = async (planId) => {
  const consulta = `SELECT * FROM study_plan
                    WHERE id = $1`
  const values = [planId]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const findStudentByUserId = async (userId, studyPlanId) => {
  const consulta = `SELECT * FROM students_plan
                    WHERE user_id = $1 AND study_plan_id = $2`
  const values = [userId, studyPlanId]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}



const findStudentByUserIdOnly = async (userId) => {
  const consulta = `SELECT * FROM students_plan
                    WHERE user_id = $1`
  const values = [userId]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const getAllStudentsByPlan = async (planId) => {
  const consulta = `SELECT * FROM students_plan
                    WHERE study_plan_id = $1`
  const values = [planId]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}


const findStudentPlanByUserIdAndPlanId = async (userId, planId) => {
  const consulta = `SELECT * FROM students_plan
                    WHERE user_id = $1 AND study_plan_id = $2`
  const values = [userId, planId]
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const findStudentById = async (id) => {
  const consulta = `SELECT * FROM students_plan
                    WHERE id = $1`
  const values = [id]
  try {
    return await sofiaDbAccess.executeQuery(consulta, values)
      .then(result => {
        if (result.length > 0) {
          return result[0];
        }

        return null;
      });
  }
  catch (error) {
    console.log(error);
  }
}

const findPlanByModule = async (moduleId) => {
  const consulta = `SELECT * FROM study_plan
                    WHERE module_id = $1`
  const values = [moduleId]
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const getPlansByStudent = async (studentId) => {
  const consulta = `SELECT * FROM students_plan
                    INNER JOIN study_plan on study_plan.id = students_plan.study_plan_id
                    WHERE students_plan.user_id = $1`
  const values = [studentId]
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const editPlan = async (name, startDate, endDate, planId, morningTimeInit, dayTimeInit, nightTimeInit) => {
  const consulta = `UPDATE study_plan 
                    SET name = $1, session_date_init = $2, session_date_end = $3, tutorId = NULL, morning_time_init = $5, day_time_init = $6, night_time_init = $7
                    WHERE id = $4`
  const values = [name, startDate, endDate, planId, morningTimeInit, dayTimeInit, nightTimeInit]
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const createStudentSession = async (student_id, session_id, session_time_init, session_date, notes, session_status) => {
  const consulta = `INSERT INTO students_session (student_id, session_id, session_time_init, session_date, notes, session_status)
                    VALUES('${student_id}', '${session_id}', '${session_time_init}', '${session_date}', '${notes}', '${session_status}') RETURNING *;`;
  return await sofiaDbAccess.executeQuery(consulta)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
} 

const getStudentSession = async (student_id, session_id) => {
  const consulta = `SELECT * from students_session
                    WHERE student_id = $1 and session_id = $2`
  const values = [student_id, session_id];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const getStudentSessionById = async (studentId, sessionId) => {
  const consulta = `SELECT * from students_session
                    INNER JOIN students_plan on students_plan.id = student_id
                    WHERE students_plan.user_id = $1 AND session_id = $2`
  const values = [studentId, sessionId];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const editStudentsSession = async (student_id, session_id, notes, session_status) => {
  const consulta = `UPDATE students_session
                   SET notes = $1, session_status = $2
                   WHERE student_id = $3 AND session_id = $4`
  const values = [notes, session_status, student_id, session_id];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const deleteCourse = async (courseId) => {
  const consulta = `DELETE from courses
                    WHERE id = $1`
  const values   = [courseId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const deleteSubject = async (subjectId) => {
  const consulta = `DELETE from subject
                    WHERE id = $1`
  const values   = [subjectId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const deleteModule = async (moduleId) => {
  const consulta = `DELETE from modules
                    WHERE id = $1`
  const values   = [moduleId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const deleteSession = async (sessionId) => {
  const consulta = `DELETE from session
                    WHERE id = $1`
  const values   = [sessionId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const deletePlan = async (planId) => {
  const consulta = `DELETE from study_plan
                    WHERE id = $1`
  const values   = [planId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const getPlansQuestions = async () => {
  const consulta = `SELECT * FROM study_plan_question ORDER BY id ASC`
  return await sofiaDbAccess.executeQuery(consulta);
}

const findSessionsByFilter = async (courseId, moduleId, subjectId = null, studentId = null) => {
  let where = "";
  if (subjectId) {
    where = `AND session.subject_id = ${subjectId} `;
  }
  if (studentId) {
    where += `AND students_session.student_id = ${studentId} `;
  }
  const consulta = `SELECT 
                      session.*,
                      students_session.session_status, 
                      subjects.name as "subject_name",
                      students_session.session_date as "session_date_student",
                      students_plan."name" as "student_name",
                      students_plan.id as "student_id",
                      students_plan."name" as "student_name",
                      study_plan."name" as "study_plan_name"
                    FROM students_session
                    INNER JOIN session ON session.id = students_session.session_id
                    INNER JOIN students_plan ON students_plan.id = students_session.student_id
                    INNER JOIN study_plan ON study_plan.id = students_plan.study_plan_id
                    INNER JOIN modules ON modules.id = study_plan.module_id
                    INNER JOIN courses ON courses.id = modules.course_id
                    INNER JOIN subjects ON subjects.id = session.subject_id
                    WHERE courses.id = $1
                      AND modules.id = $2
                      ${where}
                    ORDER BY students_plan."name" ASC`;
  const values = [courseId, moduleId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const getStudentsBySubject = async (subjectId) => {
  const consulta = `SELECT students_plan.* FROM students_plan
                    INNER JOIN students_session ON students_session.student_id = students_plan.id
                    INNER JOIN session ON session.id = students_session.session_id
                    WHERE session.subject_id = $1
                    GROUP BY students_plan.id`;
  const values = [subjectId];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const editStudentSession = async (studentId, sessionId, notes, sessionStatus, sessionDate) => {
  const consulta = `UPDATE students_session
                    SET notes = $1, session_status = $2, session_date = $5
                    WHERE student_id = $3 AND session_id = $4 RETURNING *;`;
  const values = [notes, sessionStatus, studentId, sessionId, sessionDate];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

const getStudentsSessionBySessionAndStatus = async (sessionId, sessionStatus, isLate) => {
  let where = "";
  if (isLate) {
    where = " AND session_date < NOW() ";
  }
  const consulta = `SELECT * FROM students_session
                    INNER JOIN students_plan ON students_plan.id = students_session.student_id
                    WHERE session_id = $1 AND session_status = $2 ${where};`;
  const values = [sessionId, sessionStatus];
  return await sofiaDbAccess.executeQuery(consulta, values);
}

const getSessionStudent = async (sessionStudentId) => {
  const consulta = `SELECT students_session.*, session.session_effort, 
                      session.objective, session.details, session.name as "session_name",
                      subjects.name as "subject_name", session.session_date as "session_date",
                      students_session.session_date as "student_session_date", session.subject_id
                    FROM students_session
                    INNER JOIN students_plan ON students_plan.id = students_session.student_id
                    INNER JOIN session ON session.id = students_session.session_id
                    INNER JOIN subjects ON subjects.id = session.subject_id
                    WHERE students_plan.id = $1;`;
  const values = [sessionStudentId];
  return await sofiaDbAccess.executeQuery(consulta, values)
    .then(result => {
      if (result.length > 0) {
        return result[0];
      }

      return null;
    });
}

module.exports = {
  createCourse,
  findStudentByUserIdOnly,
  findCourseById,
  editCourse,
  listCourses,
  createSubject,
  findSubjectById,
  editSubject,
  listSubjects,
  createModule,
  findModuleById,
  editModule,
  listModules,
  listModulesByCourse,
  addSubjectOnModule,
  listSubjectOnModule,
  findClassById,
  createClass,
  listClasses,
  createStudent,
  listStudents,
  findSessionByName,
  createSession,
  listSession,
  editStudents,
  editSession,
  createPlan,
  listPlan,
  findPlanByNameAndModule,
  editPlan,
  findSessionById,
  findSessionsByStudyPlan,
  createStudentSession,
  getStudentSession,
  editStudentsSession,
  findPlanById,
  findSubjectByName,
  findPlanByModule,
  getPlansByStudent,
  findStudentByUserId,
  deletePlan,
  deleteSession,
  deleteModule,
  deleteSubject,
  deleteCourse,
  getPlansQuestions,
  findSessionsByFilter,
  findPlanByName,
  findStudentById,
  getStudentSessionById,
  editStudentSession,
  getStudentsBySubject,
  getStudentDetails,
  getStudentsSessionBySessionAndStatus,
  getStudentDetailsBySession,
  getSessionStudent,
  findStudentPlanByUserIdAndPlanId,
  getPlansCounts,
  getAllStudentsByPlan
};