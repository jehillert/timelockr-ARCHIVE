const models = require("./models");

module.exports = {

  secrets: {

    get: (req, res) => {
      var username = [req.body.username];
      return models.secrets.get(username)
        .then(results => res.json(results))
        .catch(error => console.error('Error', error));
    },

    post: (req, res) => {
      let params = {
        username: req.body.username,
        password: req.body.password,
        created: req.body.created,
        available: req.body.available,
        secret: req.body.secret
      };
      return models.secrets.post(params)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
    },

    put: (req, res) => {
      var params = [req.body.newReleaseDate, req.body.secretsId];
      models.secrets.put(params)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
      },

    delete: (req, res) => {
      models.secrets.delete(req.body.secretsId)
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));

    }
  }
}