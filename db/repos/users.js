const sql = require('../sql').users;

const cs = {}; // Reusable ColumnSet objects.

function createColumnsets(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({ table: 'users', schema: 'public' });

    cs.insert = new pgp.helpers.ColumnSet(['name'], { table });
    cs.update = cs.insert.extend(['?id']);
  }
  return cs;
}

class UserQueries {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;

    createColumnsets(pgp);
  }

  // Adds a new user, and returns the new object;
  add(name) {
    return this.db.one(sql.add, name);
  }

  // Tries to delete a user by id, and returns the number of records deleted;
  remove(id) {
    return this.db.result('DELETE FROM users WHERE id = $1', +id, r => r.rowCount);
  }

  // Tries to find a user from id;
  findById(id) {
    return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
  }

  // Tries to find a user from name;
  findByName(name) {
    return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
  }

  // Returns all user records;
  all() {
    return this.db.any('SELECT * FROM users');
  }

  // Returns the total number of users;
  total() {
    return this.db.one('SELECT count(*) FROM users', [], a => +a.count);
  }
}

module.exports = UserQueries;
