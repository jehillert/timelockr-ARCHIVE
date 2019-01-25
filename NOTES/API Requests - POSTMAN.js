————————————————————————————————————————————————————————————
var options = { method: 'GET',
  url: 'http://localhost:3000/api/keepsafe/secrets',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { username: 'Maurine42' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
————————————————————————————————————————————————————————————
var options = { method: 'GET',
  url: 'http://localhost:3000/api/keepsafe/credentials',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { username: 'Maurine42' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
————————————————————————————————————————————————————————————
var options = { method: 'POST',
  url: 'http://localhost:3000/api/keepsafe/secret',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body:
   { username: 'dfdf', password: 'sparksPassword',
     creation_date: '2017-08-01 23:12:00',
     release_date: '2017-08-02 21:00:00',
     secret_label: 'Cow Secret',
     secret_body: 'A cow has no name.' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
————————————————————————————————————————————————————————————
var options = { method: 'PUT',
  url: 'http://localhost:3000/api/keepsafe/secrets',
  headers:
   {
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { secret_id: '2', newReleaseDate: '2020-08-02 11:11:11' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
————————————————————————————————————————————————————————————
var options = { method: 'DELETE',
  url: 'http://localhost:3000/api/keepsafe/secret',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { secrets_id: '2' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
————————————————————————————————————————————————————————————
