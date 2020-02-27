const bodyParser = require('body-parser');
const cors = require('cors');

// Load ENVs on development enviromment
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
})

// parsing application/json
app.use(bodyParser.json());

// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// api/access-token
const accessTokenController = require('./controllers/access.token.controller');
router.post('/access-token', accessTokenController.requestCreateToken);
router.get('/access-token', accessTokenController.middlewareOpenToken, accessTokenController.requestGetTokenPayload);

// api/users
const usersControler = require('./controllers/users.controller');
router.get('/users', accessTokenController.middlewareOpenToken, usersControler.requestGetUser);

// api/courses
const coursesControler = require('./controllers/courses/courses.controller');
router.get('/courses', accessTokenController.middlewareOpenToken, coursesControler.requestGetCourse);
router.post('/courses/:courseId/users', accessTokenController.middlewareOpenToken, coursesControler.requestEnrollUserInCourse);
router.delete('/courses/:courseId/users', accessTokenController.middlewareOpenToken, coursesControler.requestDisenrollUserInCourse);

// api/courses
const trailsControler = require('./controllers/trails.controller');
router.get('/trails', accessTokenController.middlewareOpenToken, trailsControler.requestListTrails);
router.post('/trails', accessTokenController.middlewareOpenToken, trailsControler.requestCreateTrail);
router.get('/trails/:trailId', accessTokenController.middlewareOpenToken, trailsControler.requestGetTrail);
router.delete('/trails/:trailId', accessTokenController.middlewareOpenToken, trailsControler.requestRemoveTrail);
router.post('/trails/:trailId/courses', accessTokenController.middlewareOpenToken, trailsControler.requestRegisterCourseInTrail);
router.delete('/trails/:trailId/courses/:courseId', accessTokenController.middlewareOpenToken, trailsControler.requestRegisterCourseInTrail);
router.post('/trails/:trailId/users', accessTokenController.middlewareOpenToken, trailsControler.requestRegisterUserInTrail);
router.delete('/trails/:trailId/users/:userId', accessTokenController.middlewareOpenToken, trailsControler.requestRegisterUserInTrail);

app.use('/api', router);

// Listen the server
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host);
console.log(`Server listening on http://${host}:${port}`);