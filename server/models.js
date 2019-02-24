var debug = require('debug')('server:models');
const db = require('../db');

module.exports = {
  general: {
    delete: params =>
      db
        .queryAsync(`DELETE FROM ?? WHERE ?? = ?`, params)
        .catch(error => console.error('Error', error)),
    put: params =>
      db
        .queryAsync(`UPDATE IGNORE ?? SET ?? = ? WHERE ?? = ?`, params)
        .catch(error => console.error('Error', error))
  },

  credentials: {
    get: params => {
      debug(params);
      return db.queryAsync(`SELECT * FROM ?? WHERE ?? = ?`, params);
    },
    post: params => db.queryAsync(`INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)`, params)
  },

  secrets: {
    get: params => db.queryAsync(`SELECT * FROM ?? LEFT JOIN ?? USING (??) WHERE ?? = ?`, params )
        .tap(results => { debug(results) })
        .catch(error => console.error('Error', error)),
    post: params =>
      db.queryAsync(
          `INSERT INTO ??(secret_id, ??, ??, ??, ??, ??) VALUES (0,?,?,?,?,?)`,
          params
        )
        .catch(error => console.error('Error', error)),
  }
};
