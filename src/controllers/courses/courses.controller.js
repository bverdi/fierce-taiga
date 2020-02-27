const sofiaDB = require('../../services/sofia.db/queries');

const responseHelper = require('../../helpers/response.error.helper');

const createCourse = async (event) => {
  const postBody    = JSON.parse(event.body);
  const courseName  = postBody.courseName;
    
  try{
    const course = await sofiaDB.createCourse(courseName);
    return responseHelper.returnSucess(course, 200);
  }  
  catch (error) {
    return responseHelper.returnError(event, error);
  }
  
};

const findCourseById = async (event) => {
  const courseId = event.pathParameters.id;

  try{
    const course = await sofiaDB.findCourseById(courseId);
    if (course) {
      return responseHelper.returnSucess(course, 200);
    }
    else{
      throw new Error('Course not Found', 404, 'sofia-404-course-not-found');
    }
  }
  catch (error) {
    return responseHelper.returnError(event, error);
  }

};

const listCourses = async () => {  
  const courses = await sofiaDB.listCourses();
  
  const returnBody = {
    courses: courses
  };
  
  return responseHelper.returnSucess(returnBody, 201)

};

const editCourse = async (event) => {
  const courseId    = event.pathParameters.id;
  const postBody    = JSON.parse(event.body);
  const courseName  = postBody.courseName;

  let course = await sofiaDB.findCourseById(courseId);
  if (!course) {
    throw new Error('Course not Found', 404, 'sofia-404-course-not-found');
  }
  else {
    try {
      course = await sofiaDB.editCourse(courseId, courseName);
      return responseHelper.returnSucess(course, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

const deleteCourse = async (event) => {
  const courseId = event.pathParameters.id;

  let course = await sofiaDB.findCourseById(courseId);
  if (!course) {
    throw new Error('Course not Found', 404, 'sofia-404-course-not-found');
  }
  else {
    try {
      course = await sofiaDB.deleteCourse(courseId);
      return responseHelper.returnSucess(course, 200);
    }
    catch (error) {
      return responseHelper.returnError(event, error);
    }
  }
}

module.exports = {
  createCourse,
  listCourses,
  findCourseById,
  editCourse,
  deleteCourse
};