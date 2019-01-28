const debug = require('debug')('TimeLocker:lib:helpers');
const Promise = require('bluebird');
const ntpClient = Promise.promisifyAll(require('ntp-client'));
const moment = require('moment');

// Should be unnecessary since backend will use server's time and not the client's.
const getTime = () => {
  return ntpClient
    .getNetworkTimeAsync("time1.google.com", 123)
    .then(date => moment(date).format('YYYY-MM-DD HH:mm:ss'))
    .then(date => {
      console.log(`Retrieved current network time: ${date}`);
      return date;
    })
    .catch(error => console.error(`${error}\nNote: Error indicates that getTime() failed to retrieve internet time.`));
};

const filterAndFormatSecrets = (secrets) => {
  let locked = [];
  let released = [];
  let todaysDate = moment().toISOString();
  for (let secret of secrets) {

    if (moment(secret.release_date).isBefore(todaysDate, 'seconds')) {
      let releasedSecret = {
        id: secret.secret_id,
        label: secret.secret_label,
        body: secret.secret_body
      };
      released.push(releasedSecret);

    } else {
      let rd = moment(secret.release_date).format('YYYYMMDD').toString();

      let lockedSecret = {
        id: secret.secret_id,
        label: secret.secret_label,
        todaysDate: todaysDate,
        creationDate: moment(secret.creation_date).format('MMM DD, YYYY').toString(),
        creationTime: moment(secret.creation_date).format('h:mm A').toString(),
        releaseDate: moment(secret.release_date).format('MMM DD, YYYY').toString(),
        releaseTime: moment(secret.release_date).format('h:mm A').toString(),
        timeRemaining: moment(rd, "YYYYMMDD").toNow()
      };

      // lockedSecret.fractionComplete = releaseDate.diff(todaysDate, 'days', true)/todaysDate.diff(creationDate, 'days', true);
      // lockedSecret.fractionComplete = parseFloat(lockedSecret.fractionComplete.toFixed(2));
      locked.push(lockedSecret);
    }
  }

  debug(locked, released);
  return {locked: locked, released: released};
}

const getParams = (tableName, req) => {
  fields = Object.keys(req.body);
  values = Object.keys(req.body).map(key => req.body[key]);
  return params = [tableName].concat(fields, values);
}

module.exports = {
  getTime,
  filterAndFormatSecrets,
  getParams
};