-- USING PG
('SELECT * FROM users ORDER BY id ASC')
('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
('DELETE FROM users WHERE id = $1', [id])
('SELECT * FROM users WHERE id = $1', [id])

-- DRAFT
--------------------------------------------------------
SELECT *
FROM users
WHERE username = ?;

[username]
--------------------------------------------------------
INSERT INTO users(username, hash, salt)
VALUES
  (?, ?, ?);

[username, hash, salt]
--------------------------------------------------------
UPDATE entries
SET release_date = ?
WHERE
  entry_id = ?
ON CONFLICT DO NOTHING;

[releaseDate, entry_id]
--------------------------------------------------------
DELETE FROM entries
WHERE entry_id = ?;

[entry_id]
--------------------------------------------------------
SELECT
  *
FROM
  entries
LEFT JOIN users ON users.user_id = entries.user_id
WHERE username = ?
ORDER BY
  release_date ASC;

[req.query.username]
--------------------------------------------------------

-- mysql queries - segregated params
('SELECT * FROM ?? WHERE ?? = ?', [users, username, username])
('INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)', [users, username, hash, salt, username, hash, salt])
('UPDATE IGNORE ?? SET ?? = ? WHERE ?? = ?', [entries, release_date, releaseDate, entry_id, entry_id])
('DELETE FROM ?? WHERE ?? = ?', [entries, entry_id, entry_id])
('SELECT * FROM ?? LEFT JOIN ?? USING (??) WHERE ?? = ? ORDER BY ?? ASC', [entries, users, user_id, username, req.query.username, release_date])
('INSERT INTO ??(entry_id, ??, ??, ??, ??, ??) VALUES (0, ?,?,?,?,?)', [entries, user_id, creation_date, release_date, description, content, user_id, creation_date, release_date, description, content])

-- mysql queries - integrated params
DELETE FROM entries WHERE entry_id = entry_id;
UPDATE IGNORE entries SET release_date = releaseDate WHERE entry_id = entry_id;
SELECT * FROM users WHERE username = username;
INSERT INTO users (username, hash, salt) VALUES (username, hash, salt);
SELECT * FROM entries LEFT JOIN users USING (user_id) WHERE username = username ORDER BY release_date ASC;
INSERT INTO entries(entry_id, user_id, creation_date, release_date, description, content) VALUES (0, user_id,creation_date,release_date,description,content);

-- PG-PROMISE
db.any('SELECT * FROM product WHERE price BETWEEN $1 AND $2', [1, 10])
db.any('SELECT * FROM users WHERE name = $1', 'John')
db.any('SELECT * FROM users WHERE name = ${name} AND active = $/active/', {
    name: 'John',
    active: true
});

-- ----------------------------------------------------------------------

-- When a query method is parameterized with values as an object, the formatting
-- engine expects the query to use the Named Parameter syntax $*propName*, with *
-- being any of the following open-close pairs: {}, (), <>, [], //.

-- ----------------------------------------------------------------------

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${result.insertId}`);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    },
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
