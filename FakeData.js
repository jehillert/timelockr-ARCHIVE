/* eslint-disable import/no-extraneous-dependencies */
// See EOF notes
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const Debug = require('debug');
const axios = require('axios');
const cmd = require('node-cmd');
const faker = require('faker');
const moment = require('moment');
const Promise = require('bluebird');

const debug = Debug('■■■■:');
debug('Client Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

faker.seed(123);

const aTimeLaterToday = () => {
  const now = moment();
  const midnight = moment().endOf('hour');
  let timeInBetween = faker.date.between(now, midnight);
  timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm');
  // timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm:ss');
  return timeInBetween;
};
const generateUserEntries = (user, minEntries = 15, maxEntries = 30) => {
  const entries = [];

  const numOfUserEntries = faker.random.number({ min: minEntries, max: maxEntries });

  for (let e = 0; e < numOfUserEntries; e += 1) {
    const creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm');
    const releaseDate = Math.random() < 0.5
                    ? aTimeLaterToday()
                    : moment(faker.date.future()).format('YYYY-MM-DD HH:mm');

    const entry = {
      userId: user.userId,
      creationDate,
      releaseDate,
      description: faker.lorem.words(Math.floor((Math.random() * 10))),
      content: faker.lorem.sentence(),
    };

    entries.push(entry);
  }
  return entries;
};
const generateUsers = (numOfUsers = 100, users = []) => {
  for (let i = 1; i <= numOfUsers; i += 1) {
    const user = {
      userId: i,
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    user.entries = generateUserEntries(user);
    users.push(user);
  }
  return users;
};

const numOfUsers = 25;
console.clear();

getAsync('psql service=tldb<schema.sql')
  .then(() => { console.log('db tables cleared'); })
  .then(() => generateUsers(numOfUsers))
  .tap(() => debug(`NUMBER OF USERS: ${numOfUsers}`))
  .then(users => Promise.each(
    users, user => axios.post(
      'http://localhost:3000/api/timelockr_dev_db/signup',
      { username: user.username, password: user.password },
    )
    .then(() => console.log(user.username, user.password))
    .then(() => (Promise.each(
        user.entries,
        entry => axios.post('http://localhost:3000/api/timelockr_dev_db/entries', {
            userId: entry.userId,
            creationDate: entry.creationDate,
            releaseDate: entry.releaseDate,
            description: entry.description,
            content: entry.content,
          })
        .then(() => console.log(
          entry.userId,
          entry.creationDate,
          entry.releaseDate,
          entry.description,
          entry.content,
        )),
      ))),
    ).then(() => console.log('done')))
  .catch(err => console.log('cmd err', err));
/*
const axios = require('axios');
const cmd = require('node-cmd');
const faker = require('faker');
const moment = require('moment');
const Promise = require('bluebird');

import * as Debug from 'debug';
import axios from 'axios';
import cmd from 'node-cmd';
import faker from 'faker';
import moment from 'moment';
import bluebird from 'bluebird';

const Debug = require('debug');
const debug = Debug('client:components:app');
debug('Client Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');

SCRIPT NOTES:
This script requires the following file to be located in the home directory:
  .pg_service.conf

The file should have the following contents:
  [tldb]
  dbname=postgres
  host=localhost
  port=5432
  user=jhillert
  password=OMITTED

Note: Users should be logging in under user credentials, not with 'jhillert'
*/
// getAsync('/home/jhillert/Dropbox/Scripts/psql service=tldb<schema.sql')
// getAsync('./load_schema.sh')
// getAsync('/home/jhillert/Dropbox/Projects/TimeLockr/load_schema.sh')
// getAsync('psql --host=localhost --username=jhillert --port=5432<schema.sql')
