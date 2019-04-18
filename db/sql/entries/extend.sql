UPDATE entries
SET release_date = {$releaseDate}
WHERE
  entry_id = {$entryId}
ON CONFLICT DO NOTHING
RETURNING release_date, entry_id
