/*MODELS*/

var db = require('../db');

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
    // userID, secretsID, username, password, lastFormView, created, available, secret
          console.log(params);

      var queryStr = `
      INSERT INTO secrets(params)
      SELECT * FROM credentials
      LEFT JOIN credentials USING (userID)
      (category) VALUE (?);`;
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    // },
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
    }
  },

  // incogSecrets: {
  //   get: function (username, callback) {
  //     var queryStr = `SELECT secretsID, created, available, secret FROM credentials
  //                     LEFT JOIN secrets USING (userID)
  //                     WHERE username IS ${username};`;
  //     db.query(queryStr, function(err, results) {
  //       callback(err, results);
  //     });
  //   },

  //   post: function (params, callback) {
  //     var queryStr = ``;
  //     db.query(queryStr, params, function(err, results) {
  //       callback(err, results);
  //     });
  //   },
  //   put: function (params, callback) {
  //     var queryStr = ``;
  //     db.query(queryStr, params, function(err, results) {
  //       callback(err, results);
  //     });
  //   },
  //   delete: function (params, callback) {
  //     var queryStr = ``;
  //     db.query(queryStr, params, function(err, results) {
  //       callback(err, results);
  //     });
  //   }
  // },
};
