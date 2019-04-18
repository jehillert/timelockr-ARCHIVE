SELECT *
FROM users
WHERE username = ${username}
RETURNING user_id
