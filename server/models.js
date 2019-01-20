var db = require('../db');
// var Promise = require("bluebird");
// Promise.promisifyAll(require("mysql/lib/Connection").prototype);

// const connection = mysql.createConnection({.....});
// global.db  = Promise.promisifyAll(connection);
// db.queryAsync("SELECT * FROM users").then(function(rows){
// console.log(rows);});

module.exports = {

  secrets: {
    get: function (param, callback) {
      var queryStr = `SELECT secretsID, created, available, secret FROM secrets
                      LEFT JOIN credentials USING (userID)
                      WHERE username='${param[0]}';`;
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },

    post: function (params, callback) {
      let param = [params.username, params.password];
      db.queryAsync(`
        INSERT IGNORE INTO credentials
            (username, password)
        VALUES
            (?, ?);`,
        param
      ).then(function(results) {
        let param = [params.created, params.available, params.secret];
        db.query(`
          INSERT INTO secrets
              (userID,created,available,secret)
          VALUES
              ('103',?,?,?);`,
          param)
        }).then(function(err, results) {
          return callback(err, results);
        });
    }

    // put: function (params, callback) {
    //   var queryStr = ``;
    //   db.query(queryStr, params, function(err, results) {
    //     callback(err, results);
    //   });
    // },
    // delete: function (params, callback) {
    //   var queryStr = ``;
    //   db.query(queryStr, params, function(err, results) {
    //     callback(err, results);
    //   });
    // }
  // },
  }
}