const Promise = require('bluebird');
// const ntpClient = Promise.promisifyAll(require('ntp-client'));
import moment from 'moment';

module.exports = getTime = () => {
  return ntpClient
    .getNetworkTimeAsync("time1.google.com", 123)
    .then(date => moment(date).format('YYYY-MM-DD HH:mm:ss'))
    .then(date => {
      console.log(`Retrieved current network time: ${date}`);
      return date;
    })
    .catch(error => console.error(`${error}\nNote: Error indicates that getTime() failed to retrieve internet time.`));
};


// export default getServerTime;