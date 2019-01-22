const db = require('../db');

Object.prototype.parseSqlResult = function () {
  return JSON.parse(JSON.stringify(this[0]));
};

module.exports = {

  secret: {
    post: (params) => db.queryAsync(`INSERT IGNORE INTO credentials(username, password) VALUES (?, ?);`,
      [params.username, params.password])
      .then((results) => {
        // user was found, no last auto_id
        if (results.insertId === 0) {
          return db.queryAsync(`SELECT user_id FROM credentials WHERE username='${params.username}';`);
        }
        return results.insertId;
      })
      .then((results) => {
        if (typeof results === 'object') {
          results = results.parseSqlResult().user_id;
        }
        db.queryAsync(`INSERT INTO secrets (secret_id, user_id, creation_date, release_date, secret_label, secret_body) VALUES (0,?,?,?,?,?);`,
          [results, params.creation_date, params.release_date, params.secret_label, params.secret_body]);
      })
      .catch((error) => console.error('Error', error)),
    put: (params) => db
      .queryAsync(`UPDATE secrets SET release_date = ? WHERE secret_id = ?;`, params)
      .catch((error) => console.error('Error', error)),
    delete: (param) => db
      .queryAsync(`DELETE FROM secrets WHERE secret_id = ${param[0]};`)
      .catch((error) => console.error('Error', error))
  },

  secrets: {
    get: (param) => db
      .queryAsync( `
        SELECT secret_id, creation_date, release_date, secret_label, secret_body FROM secrets
        LEFT JOIN credentials USING (user_id)
        WHERE username='${param[0]}';`)
      .catch((error) => console.error('Error', error)),
    delete: (param) => db
      .queryAsync(`DELETE FROM secrets WHERE user_id = ${param[0]};`)
      .catch((error) => console.error('Error', error))
  }

};