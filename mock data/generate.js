'use strict';
const faker = require('faker');
const moment = require('moment');
const async = require('async');
const fs = require('fs');

const aTimeLaterToday = () => {
  let now = moment();
  let midnight = moment().endOf('day');
  let timeInBetween = faker.date.between(now, midnight);
  timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm:ss');
  return timeInBetween;
};

const dFile = (fileName) => {
  try {
    fs.unlinkSync(fileName);
  } catch (err) {
    console.error(`ERROR: ${fileName} not deleted or no file to delete.`);
  }
  return console.log(`Successfully deleted ${fileName}`);
};

dFile('dummyCredentials.csv');
dFile('dummySecrets.csv');

async.waterfall([
  function(callback) {

    // create and open stream to a dummy data file for each table
    const credStream = fs.createWriteStream('dummyCredentials.csv');
    const secretStream = fs.createWriteStream('dummySecrets.csv');

    // event listener - stop indication
    credStream.on('finish', () => { console.log('dummyCredentials.csv written'); });
    secretStream.on('finish', () => { console.log('dummySecrets.csv written'); });

    callback(null, credStream, secretStream);

  },
  function(credStream, secretStream, callback) {

    // all vars used in this block except iterators i,j
    let release_date,
        creation_date,
        password,
        secret_label,
        secret_body,
        secretCount,
        username,
        s = 1,
        numberSameDayTrials = 15;

    // write csv column headers
    credStream.write('user_id,username,password\n');
    secretStream.write('secret_id,user_id,secret_id,creation_date,release_date,secret_label,secret_body\n');

    // generate data & write to files
    faker.seed(123);

    for (let i = 1; i <= 100; i++) {
      username = faker.internet.userName();
      password = faker.internet.password();
      secretCount = faker.random.number({'min': 0, 'max': 2});

      credStream.write(`${i},"${username}","${password}"\n`);
      for (let j = 0; j <= secretCount; j++) {
        secret_label = faker.lorem.words(2)
        secret_body = faker.lorem.lines(1);
        if (i < numberSameDayTrials) {
          creation_date = moment().format('YYYY-MM-DD HH:mm:ss');
          release_date = aTimeLaterToday();
        } else {
          creation_date = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss');
          release_date = moment(faker.date.future()).format('YYYY-MM-DD HH:mm:ss');
        }
        secretStream.write(`${s},${i},${creation_date},${release_date},"${secret_label}","${secret_body}"\n`);
        s++;
      }
    }
    callback(null, credStream, secretStream);
  },
  function(credStream, secretStream, callback) {
    credStream.end();
    secretStream.end();
    callback();
  },
]);
