const async = require('async');
const mysql = require('mysql');
// const crypto = require('crypto');
const mysqlConfig = require('../db/config');

var connection = mysql.createConnection(mysqlConfig);
// connection.connect();
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected')
});

const populateTable = (connection, fileName, tableName, callback) => {
  connection.query(`
    SET FOREIGN_KEY_CHECKS=0;`,
    (err) => {
      return console.error(err);
    }
  );
  connection.query(`
    LOAD DATA LOCAL INFILE '${fileName}'
    INTO TABLE ${tableName}
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;`,
    (err) => {
      return console.error(err);
    }
  );
  connection.query(`
    SET FOREIGN_KEY_CHECKS=1;`,
    (err) => {
      return console.error(err);
    }
  );
  callback();
}

async.series([
  function(callback) {
    populateTable(connection, 'dummyCredentials.csv', 'credentials', callback);
  },
  function(callback) {
    populateTable(connection, 'dummyIncogSecrets.csv', 'incogSecrets', callback);
  },
  function(callback) {
    populateTable(connection, 'dummySecrets.csv', 'secrets', callback);
  },
]);

connection.end();

