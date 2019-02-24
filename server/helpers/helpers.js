const debug = require('debug')('server:helpers');
const Promise = require('bluebird');
const moment = require('moment');

const filterAndFormatSecrets = (secrets) => {
  let locked = [];
  let released = [];
  let todaysDate = moment().toISOString();

  for (let secret of secrets) {
    debug('secret: ', secret);
    if (moment(secret.release_date).isBefore(todaysDate, 'seconds')) {
      let releasedSecret = {
        id: secret.secret_id,
        label: secret.secret_label,
        body: secret.secret_body
      };

      released.push(releasedSecret);
    } else {
      let present = moment(todaysDate).unix();
      let past = moment(secret.creation_date).toISOString();
      let future = moment(secret.release_date).toISOString();
      past = moment(past).unix();
      future = moment(future).unix();

      let fraction = parseFloat(
        ((present - past) / (future - past)).toFixed(2)
      );

      let lockedSecret = {
        id: secret.secret_id,
        label: secret.secret_label,
        todaysDate: todaysDate,
        creationDate: moment(secret.creation_date).toISOString(),
        releaseDate: moment(secret.release_date).toISOString(),
        fraction: fraction,
        timeRemaining: moment(secret.release_date).calendar()
      };
      locked.push(lockedSecret);
    }
  }

  debug(`LOCKED:locked`);
  debug(released);
  return { locked: locked, released: released };
};

const getQueryParams = (req) => {
  let queryParams;
  let tableName = req.path.slice(1, req.path.length);
  let fields = Object.keys(req.body);
  let values = Object.keys(req.body).map(key => req.body[key]);

  if (req.method !== 'put') {
    queryParams = [tableName].concat(fields, values);
  } else {
    queryParams = [tableName].concat(fields[0], values[0], fields[1], values[1]);
  }
  return queryParams;
};

module.exports = {
  filterAndFormatSecrets,
  getQueryParams
};
