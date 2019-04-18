SELECT
  *
FROM
  entries
LEFT JOIN users ON users.user_id = entries.user_id
WHERE username = ${req.query.username}
ORDER BY
  release_date ASC
