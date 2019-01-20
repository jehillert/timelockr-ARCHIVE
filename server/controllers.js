var models = require('./models');

module.exports = {

  secrets: {
    get: function (req, res) {
      var username = [req.body.username];
      console.log(username);
      models.secrets.get(username, function(err, results) {
        if (err) {
          console.error(err);
        }
        console.log(results);
        res.json(results);
      });
    },
    post: function (req, res) {
      let params = {
        username: req.body.username,
        password: req.body.password,
        created: req.body.created,
        available: req.body.available,
        secret: req.body.secret
      };
      // let params = [req.body.created, req.body.available, req.body.secret];
      models.secrets.post(params, function(err, results) {
        if (err) {
          return console.error(err);
        }
        res.sendStatus(201);
      });
    },
    put: function (req, res) {
      var params = [req.body.message, req.body.username, req.body.roomname];
      models.secrets.delete(params, function(err, results) {
        if (err) {
          return console.error(err);
        }
        res.sendStatus(201);
      });
    },
    delete: function (req, res) {
      var params = [req.body.message, req.body.username, req.body.roomname];
      models.secrets.delete(params, function(err, results) {
        if (err) {
          return console.error(err);
        }
        res.sendStatus(201);
      });
    }
  }
};
