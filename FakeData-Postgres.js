/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const cmd = require('node-cmd');
const faker = require('faker');
const moment = require('moment');
const Promise = require('bluebird');

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

    // console.log(entry);
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
    // console.log(`[${user.userId}, '${user.username}', '${user.password}'],`);
    users.push(user);
  }
  return users;
};

const numOfUsers = 25;
console.clear();

getAsync('mysql -u root <schema.sql')
  .then(() => { console.log('db tables cleared'); })
  .then(() => generateUsers(numOfUsers))
  // add each user to users table
  .then(users => Promise.each(
    users, user => axios.post(
      'http://localhost:3000/api/keepsafe/signup',
      {
        username: user.username,
        password: user.password,
      })
    .then(() => console.log(user.username, user.password))
    .then(() => (Promise.each(
        user.entries,
        entry => axios.post('http://localhost:3000/api/keepsafe/entries', {
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
      // console.log(user.username, user.password);
/*
  Maurine42               6bUeeOIkHbXNFGA
  Adam.OKeefe             yVXI4eEbpYMgFMc
  Earline29               HuLyOXuUAPNuyf3
  Jaquan.Muller88         IDzsXxVshRDvpBG
  Willard.Keebler53       8yttFU_UE2M0RBU
  Vance_Leuschke          YsGUZsmaOcFoZ1_
  Arne_Little             _VP63OJWcmsAI2N
  Ismael50                _Y6_egqJCOxj8hg
  Dario_Bashirian54       sQtDoIAxnwKAujR
  Amaya_Reichel           9CEigbzawo0xTXU
  Buster_Feil             f1HL0Rh0l059ja1
  Crystal33               _RlHJdlloj5bK3f
  Pascale81               kcdMPEO2e34CXb0
  Holly.Lesch56           V8SJA6wv4TMBkIx
  Paris.Terry             QZCeQdMceSD_Fj1
  Laverne34               DiuldAjd77iI7Uk
  Vaughn.Nader            Njw9inzAYkW374b
  Nestor26                3Zrq4IVKreN2etN
  Willie_Rippin           ihisRO5WVPARMD6
  Eudora54                r3WPpU5Ynm3OwGI
  Gladyce_Nolan13         bqqusRch5Ig6CSM
  Ahmed.Beatty81          S_LRibJhh2bh5bX
  Alivia77                utEs369H0Eb3abK
  Christophe.Windler59    SY0qN0RCwVk360s
  Garfield13              m0ck5P_0Nvxej6s
*/
