const db = require('../db');

Object.prototype.parseSqlResult = function () {
    return JSON.parse(JSON.stringify(this[0]))
}

module.exports = {

  secrets: {

    get: (param) => db
      .queryAsync( `
        SELECT secretsId, created, available, secret FROM secrets
        LEFT JOIN credentials USING (userId)
        WHERE username='${param[0]}';`)
      .catch((error) => console.error('Error', error)),

    post: (params) => db.queryAsync(`INSERT IGNORE INTO credentials(username, password) VALUES (?, ?);`,
      [params.username, params.password])
      .then((results) => {
        // user was found, no last auto_id
        if (results.insertId === 0) {
          return db.queryAsync(`SELECT userId FROM credentials WHERE username='${params.username}';`);
        }
        return results.insertId;
      })
      .then((results) => {
        if (typeof results === 'object') {
          results = results.parseSqlResult().userId;
        }
        db.queryAsync(`INSERT INTO secrets (userId,created,available,secret) VALUES (?,?,?,?);`,
          [results, params.created, params.available, params.secret])
      })
      .catch((error) => console.error('Error', error)),

    put: (params) => db
      .queryAsync(`UPDATE secrets SET available = ? WHERE secretsId = ?;`, params)
      .catch((error) => console.error('Error', error)),

    delete: (param) => db
      .queryAsync(`DELETE FROM secrets WHERE secretsId = ${param[0]};`)
      .catch((error) => console.error('Error', error))

  }

}