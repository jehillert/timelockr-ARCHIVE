const debug = require('debug')('server:helpers');
const moment = require('moment');

const filterAndFormatEntries = (entries) => {
  let locked = [];
  let released = [];
  let todaysDate = moment().toISOString();

  for (let entry of entries) {
    debug('entry: ', entry);
    if (moment(entry.release_date).isBefore(todaysDate, 'seconds')) {
      let releasedEntry = {
        id: entry.entry_id,
        label: entry.description,
        body: entry.content
      };

      released.push(releasedEntry);
    } else {
      let present = moment(todaysDate).unix();
      let past = moment(entry.creation_date).toISOString();
      let future = moment(entry.release_date).toISOString();
      past = moment(past).unix();
      future = moment(future).unix();

      let fraction = parseFloat(
        ((present - past) / (future - past)).toFixed(2)
      );

      let lockedEntry = {
        id: entry.entry_id,
        label: entry.description,
        todaysDate: todaysDate,
        creationDate: moment(entry.creation_date).toISOString(),
        releaseDate: moment(entry.release_date).toISOString(),
        fraction: fraction,
        timeRemaining: moment(entry.release_date).calendar()
      };
      locked.push(lockedEntry);
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
  filterAndFormatEntries,
  getQueryParams
};
