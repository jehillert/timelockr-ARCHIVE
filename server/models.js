const db = require('../db');

module.exports = {

  general: {
    delete: params => db.queryAsync('DELETE FROM $1 WHERE $2 = $3', params),
    put: params => db.queryAsync('UPDATE IGNORE $1 SET $2 = $3 WHERE $4 = $5', params),
  },

  users: {
    get: params => db.queryAsync('SELECT * FROM $1 WHERE $2 = $3', params),
    post: params => db.queryAsync('INSERT INTO $1($2, $3, $4) VALUES ($5, $6, $7)', params),
  },

  entries: {
    get: params => db.queryAsync('SELECT * FROM $1 LEFT JOIN $2 USING ($3) WHERE $4 = $5 ORDER BY $6 ASC', params),
    post: params => db.queryAsync('INSERT INTO $1($2, $3, $4, $5, $6) VALUES ($7,$8,$9,$10,$11)', params),
  },

};
