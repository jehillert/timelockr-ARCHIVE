const Promise = require('bluebird');
const ntpClient = Promise.promisifyAll(require('ntp-client'))
const moment = require('moment');

const getTime = () => {
  return ntpClient
    .getNetworkTimeAsync("pool.ntp.org", 123)
    .then(date => moment(date).format('YYYY-MM-DD HH:mm:ss'))
    .then(date => {
      console.log(`Retrieved current network time: ${date}`)
      return date;
    })
    .catch(error => console.error(`${error}\nNote: Error indicates that getTime() failed to retrieve internet time.`));
}

module.exports = {
  getTime
};

