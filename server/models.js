const db = require('../db');

Object.prototype.parseSqlResult = function () {
  return JSON.parse(JSON.stringify(this[0]));
};

module.exports = {

  general: {
    delete: (params) => db
      .queryAsync(`DELETE FROM ?? WHERE ?? = ?;`, params)
      .catch((error) => console.error('Error', error)),
    put: (params) => db
      .queryAsync(`UPDATE IGNORE ?? SET ?? = ? WHERE ?? = ?;`, params)
      .catch((error) => console.error('Error', error))
  },

  credentials: {
    get: (params) => db
      .queryAsync(`SELECT * FROM ?? WHERE ?? = ?;`, params)
      .catch((error) => console.error('Error', error)),
    post: (params) => db.queryAsync(`INSERT IGNORE INTO ??(??, ??) VALUES (?, ?);`, params)
      .catch((error) => console.error('Error', error))
  },

  secrets: {
    post: (params) => db.queryAsync(`INSERT INTO ??(secret_id, ??, ??, ??, ??, ??) VALUES (0,?,?,?,?,?);`, params)
      .catch((error) => console.error('Error', error)),
    get: (params) => db
      .queryAsync(`SELECT * FROM ?? LEFT JOIN credentials USING (user_id) WHERE ?? = ?;`, params)
      .catch((error) => console.error('Error', error))
  }

};