const Promise = require('bluebird');
const ntpClient = require('ntp-client');
const moment = require('moment');

const getTime = (callback) => {
  ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
    if(err) {
      return console.error(err);
    }
    date = moment(date).format('YYYY-MM-DD HH:mm:ss')
    callback(date);
  })
}

module.exports = {
  getTime
};