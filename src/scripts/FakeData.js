/*                  DO NOT FUCK WITH THIS FILE !!!!                  */

require('dotenv').config();
const axios = require('axios');
const cmd = require('node-cmd');
const faker = require('faker');
const moment = require('moment');
const Promise = require('bluebird');
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

faker.seed(123);

const aTimeLaterToday = () => {
  let now = moment();
  let midnight = moment().endOf('day');
  let timeInBetween = faker.date.between(now, midnight);
  timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm');
  // timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm:ss');
  return timeInBetween;
};
const generateUserEntries = (user, maxEntries = 7) => {
  entries = [];

  let numOfUserEntries = faker.random.number({ min: 0, max: maxEntries });

  for (let e = 0; e < numOfUserEntries; e++) {
    let creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm');
    let releaseDate = Math.random() < 0.5
                    ? aTimeLaterToday()
                    : moment(faker.date.future()).format('YYYY-MM-DD HH:mm');

    let entry = {
      user_id: user.user_id,
      creation_date: creationDate,
      release_date: releaseDate,
      secret_label: faker.lorem.words(Math.floor((Math.random() * 10))),
      secret_body: faker.lorem.sentence()
    };

    // console.log(entry);
    entries.push(entry);
  }
  return entries;
};
const generateUsers = (numOfUsers = 100, users = []) => {
  for (let i = 1; i <= numOfUsers; i++ ) {
    let user = {
      user_id: i,
      username: faker.internet.userName(),
      password: faker.internet.password()
    };
    user.entries = generateUserEntries(user);
    // console.log(`[${user.user_id}, '${user.username}', '${user.password}'],`);
    users.push(user);
  }
  return users;
};

let users;
const numOfUsers = 25;
console.clear();

getAsync('mysql -u root <schema.sql')
  .then(() => { console.log('db tabledds cleared') })
  .then(() => generateUsers(numOfUsers))
  .then((users) => {
    // add each user to credentials table
    return Promise.each(users, function(user) {
      console.log(user.username, user.password);
      return axios.post('http://localhost:3000/api/keepsafe/signup', {
        username: user.username,
        password: user.password
      })
      .then(() => {
        // add entry to entries section
        return Promise.each(user.entries, function(entry) {
          console.log(entry.user_id, entry.creation_date, entry.release_date, entry.secret_label, entry.secret_body);
          return axios.post('http://localhost:3000/api/keepsafe/secrets', {
            user_id: entry.user_id,
            creation_date: entry.creation_date,
            release_date: entry.release_date,
            secret_label: entry.secret_label,
            secret_body: entry.secret_body
          });
        });
      });
    }).then(function() {
      console.log('done')
    });
  })
  .catch(err => {
    console.log('cmd err', err);
  });
