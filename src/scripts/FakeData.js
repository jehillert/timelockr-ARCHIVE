/*                  DO NOT FUCK WITH THIS FILE !!!!                  */

const axios = require('axios');
const cmd = require('node-cmd');
const faker = require('faker');
const moment = require('moment');
const Promise = require('bluebird');
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

faker.seed(123);

const aTimeLaterToday = () => {
  let now = moment();
  let midnight = moment().endOf('hour');
  let timeInBetween = faker.date.between(now, midnight);
  timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm');
  // timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm:ss');
  return timeInBetween;
};
const generateUserEntries = (user, minEntries = 15, maxEntries = 30) => {
  entries = [];

  let numOfUserEntries = faker.random.number({ min: minEntries, max: maxEntries });

  for (let e = 0; e < numOfUserEntries; e++) {
    let creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm');
    let releaseDate = Math.random() < 0.5
                    ? aTimeLaterToday()
                    : moment(faker.date.future()).format('YYYY-MM-DD HH:mm');

    let entry = {
      userId: user.userId,
      creationDate: creationDate,
      releaseDate: releaseDate,
      description: faker.lorem.words(Math.floor((Math.random() * 10))),
      content: faker.lorem.sentence()
    };

    // console.log(entry);
    entries.push(entry);
  }
  return entries;
};
const generateUsers = (numOfUsers = 100, users = []) => {
  for (let i = 1; i <= numOfUsers; i++ ) {
    let user = {
      userId: i,
      username: faker.internet.userName(),
      password: faker.internet.password()
    };
    user.entries = generateUserEntries(user);
    // console.log(`[${user.userId}, '${user.username}', '${user.password}'],`);
    users.push(user);
  }
  return users;
};

let users;
const numOfUsers = 25;
console.clear();

getAsync('mysql -u root <schema.sql')
  .then(() => { console.log('db tables cleared') })
  .then(() => generateUsers(numOfUsers))
  .then((users) => {
    // add each user to users table
    return Promise.each(users, function(user) {
      console.log(user.username, user.password);
      return axios.post('http://localhost:3000/api/keepsafe/signup', {
        username: user.username,
        password: user.password
      })
        .then(() => {
          // add entry to entries section
          return Promise.each(user.entries, function(entry) {
            console.log(entry.userId, entry.creationDate, entry.releaseDate, entry.description, entry.content);
            return axios.post('http://localhost:3000/api/keepsafe/entries', {
              userId: entry.userId,
              creationDate: entry.creationDate,
              releaseDate: entry.releaseDate,
              description: entry.description,
              content: entry.content
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
