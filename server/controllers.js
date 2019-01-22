const models = require('./models');

module.exports = {

  credentials: {
    post: (req, res) => postToTable('credentials', req, res),
    put: (req, res) => updateField('credentials', req, res),
    delete: (req, res) => deleteFromTable('credentials', req, res)
  },

  secrets: {
    get: (req, res) => {
      return models.secrets.get(req.body.username)
        .then(results => res.json(results))
        .catch(error => console.error('Error', error));
    },
    put: (req, res) => updateField('secrets', req, res),
    delete: (req, res) => deleteFromTable('secrets', req, res),
    post: (req, res) => {
      let params = {
        username: req.body.username,
        password: req.body.password,
        creation_date: req.body.creation_date,
        release_date: req.body.release_date,
        secret_label: req.body.secret_label,
        secret_body: req.body.secret_body
      };
      return models.secret.post(params)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
    }
  }

};

function updateField(tableName, req, res) {
  // query requires: table_name, targetFields, targetValues, reference_fields, reference_values
// (`UPDATE ?? SET ?? = ? WHERE ?? = ?;`, params)

  fields = Object.keys(req.body);
  values = Object.keys(req.body).map(key => req.body[key]);

  let params = [tableName].concat(fields[0], values[0], fields[1], values[1]);

  models.general.put(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function postToTable(tableName, req, res) {
  // query requires: tableName, targetFields, targetValues
  fields = Object.keys(req.body);
  values = Object.keys(req.body).map(key => req.body[key]);

  let params = [tableName].concat(fields, values);

  models[tableName].post(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function deleteFromTable(tableName, req, res) {
  // query requires: tableName, reference_fields, reference_values
  fields = Object.keys(req.body);
  values = Object.keys(req.body).map(key => req.body[key]);

  let params = [tableName].concat(fields, values);
  console.log(params);
  models.general.delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}
