/* eslint-disable camelcase */
const debug = require('debug')('server:helpers');
const moment = require('moment');

const filterAndFormatEntries = (entries) => {
  // Database dates are UTC.
  const locked = [];
  const released = [];

  const todayInISO = new Date().toISOString();
  const present = moment().unix();

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of entries) {
    const content = entry.content;
    const creationDate = entry.creation_date;
    const description = entry.description;
    const entryId = entry.entry_id;
    const releaseDate = entry.release_date;

    debug({
      entryId,
      creationDate,
      releaseDate,
    });

    if (moment(releaseDate).isBefore(todayInISO, 'seconds')) {
      const releasedEntry = {
        entryId,
        description,
        content,
      };

      released.push(releasedEntry);
    } else {
      const past = moment(creationDate).unix();
      const future = moment(releaseDate).unix();
      const fraction = parseFloat(
        ((present - past) / (future - past)).toFixed(2),
      );

      const lockedEntry = {
        entryId,
        description,
        creationDate,
        releaseDate,
        fraction,
      };
      locked.push(lockedEntry);
    }
  }

  return { locked, released };
};

const getQueryParams = (req) => {
  let queryParams;
  const tableName = req.path.slice(1, req.path.length);
  const fields = Object.keys(req.body);
  const values = Object.keys(req.body).map(key => req.body[key]);

  if (req.method !== 'put') {
    queryParams = [tableName].concat(fields, values);
  } else {
    queryParams = [tableName].concat(fields[0], values[0], fields[1], values[1]);
  }
  return queryParams;
};

module.exports = {
  filterAndFormatEntries,
  getQueryParams,
};
