INSERT INTO users
VALUES
  (${username}, ${hash}, ${salt})
RETURNING user_id
