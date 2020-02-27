const pg = require('pg');

const DB_SOFIA_HOST     = process.env.DB_SOFIA_HOST;
const DB_SOFIA_DATABASE = process.env.DB_SOFIA_DATABASE;
const DB_SOFIA_USER     = process.env.DB_SOFIA_USER;
const DB_SOFIA_PASSWORD = process.env.DB_SOFIA_PASSWORD;
const DB_SOFIA_PORT     = process.env.DB_SOFIA_PORT;

const pool = new pg.Pool({
  database : DB_SOFIA_DATABASE,
  user     : DB_SOFIA_USER,
  password : DB_SOFIA_PASSWORD,
  host     : DB_SOFIA_HOST,
  port     : DB_SOFIA_PORT,
  max      : 1,
  min      : 0,
  idleTimeoutMillis       : 120000,
  connectionTimeoutMillis : 10000
});

const executeQuery = (consulta, params = []) => {
  return pool.connect()
    .then(client => {
      return client.query(consulta, params)
        .then(result => {
          client.release(true);
          return result.rows;
        })        
        .catch(error => {
          console.log(error);
          client.release(true);
          return Promise.reject(error);
        });
    });
};

module.exports = {
  executeQuery
};