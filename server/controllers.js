const models = require('./models');

module.exports = {

  secret: {
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
    },
    put: (req, res) => {
      var params = [req.body.newReleaseDate, req.body.secret_id];
      models.secret.put(params)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
    },
    delete: (req, res) => {
      models.secret.delete(req.body.secret_id)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
    }
  },

  secrets: {
    get: (req, res) => {
      var username = [req.body.username];
      return models.secrets.get(username)
        .then(results => res.json(results))
        .catch(error => console.error('Error', error));
    },
    delete: (req, res) => {
      models.secrets.delete(req.body.user_id)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
    }
  }

};