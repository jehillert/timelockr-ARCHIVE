// ENVIRONMENT
require('dotenv').config();

// DEPENDENCIES
const axios = require('axios');
const faker = require('faker');
const fs = require('fs');
const moment = require('moment');
const table = require('table').table;
const getBorderCharacters = require('table').getBorderCharacters
const Promise = require('bluebird');

// VARIABLES
const fixedEntries = 5;
const minEntries = 15;
const maxEntries = 30;
const numOfUsers = 25;

let fileFormattedCredentials = '';
let entries = [];
let users = [];

// FUNCTIONS (ABC)
function aTimeLaterToday() {
  const now = moment();
  const midnight = moment().endOf('hour');
  let timeInBetween = faker.date.between(now, midnight);
  timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm:ss+00');
  return timeInBetween;
};

function generateEntriesForUsers(users, fixedEntries, minEntries, maxEntries) {
  let numOfUserEntries;

  if (fixedEntries) {
    numOfUserEntries = fixedEntries;
  }

  users.forEach(genUserEntries = (user) => {
    if (!fixedEntries) {
      numOfUserEntries = faker.random.number({ min: minEntries, max: maxEntries });
    }
    const entries = [];
    for (let e = 0; e < numOfUserEntries; e += 1) {
      const creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss+00');
      const releaseDate = Math.random() < 0.5
                      ? aTimeLaterToday()
                      : moment(faker.date.future()).format('YYYY-MM-DD HH:mm:ss+00');
      const entry = {
        userId: user.userId,
        creationDate,
        releaseDate,
        description: faker.lorem.words(Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1)),
        content: faker.lorem.sentence(),
      };

      entries.push(entry);
    }

    user.entries = entries;
  });

  return users;
};

function formatCredentialsAsString(usersCredentials) {
  const concatCred = (accumCreds, user) => (
    `${accumCreds}\nusername: '${user.username}',\npassword: '${user.password}',\n`
  );
  return usersCredentials.reduce(concatCred, '');
}

function generateUsers(numOfUsers, users = []) {
  let usersTableArray = [];
  let data = '';

  for (let i = 1; i <= numOfUsers; i += 1) {
    const user = {
      userId: i,
      username: faker.internet.email(),
      password: faker.internet.password(),
    };

    users.push(user);
  }

  return users;
};

function getAllEntries(users) {
  const entries = [];
  users.forEach(getUserEntries = (user) => {
    user.entries.forEach(pushEntry = (entry) => {
      entries.push(entry);
    })
  })
  return entries;
}

function writeDataToFile(data) {
  console.log(data);
  fs.writeFile('fake-credentials.data', data, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Mock user credentials written to 'fake-credentials.data'`)
  })
}

// MAIN
console.clear();

faker.seed(123);
users = generateUsers(numOfUsers);
console.table(users);

fileFormattedCredentials = formatCredentialsAsString(users);
writeDataToFile(fileFormattedCredentials);

users = generateEntriesForUsers(users, fixedEntries, minEntries, maxEntries);
entries = getAllEntries(users);

console.table(entries);

Promise.each(
  users, user => axios.post(
    'http://localhost:3000/api/db/signup',
    { username: user.username, password: user.password },
  )
  .then(() => console.log(user.username, user.password))
  .then(() => (Promise.each(
      user.entries,
      entry => axios.post('http://localhost:3000/api/db/entries', {
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
    )),
  ).then(() => console.log('done')))
.catch(err => console.log(err));

/*
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
