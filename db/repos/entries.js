const sql = require('../sql').entries;

const cs = {};

function createColumnsets(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({ table: 'entries', schema: 'public' });

    cs.insert = new pgp.helpers.ColumnSet(['name'], { table });
    cs.update = cs.insert.extend(['?id', '?user_id']);
  }
  return cs;
}

class EntryQueries {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;

    createColumnsets(pgp);
  }

  add(values) {
    return this.db.one(sql.add, {
      userId: +values.userId,
      productName: values.name
    });
  }

  delete(values) {
    return this.db.one(sql.delete, {
      userId: +values.userId,
      productName: values.name
    });
  }

  deleteAll(values) {
    return this.db.one(sql.deleteAll, {
      userId: +values.userId,
      productName: values.name
    });
  }

  extend(values) {
    return this.db.one(sql.extend, {
      userId: +values.userId,
      productName: values.name
    });
  }

  get(values) {
    return this.db.one(sql.get, {
      userId: +values.userId,
      productName: values.name
    });
  }

}

module.exports = EntryQueries;
