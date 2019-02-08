// GET --- Retrieve User Secrets
module.exports.retrieveSecrets = () => {
  var options = {
    method: 'GET',
    url: 'http://localhost:3000/api/keepsafe/secrets', // uri:
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: this.props.username,
      password: this.props.password
    },
    json: true
  };

  rp(options)
    .then(secrets => console.log(secrets))
    .catch(error => error.console(error));
}

/* POST --- STORE NEW SECRET
     NOTE  --> time server call only needed for changing release_date,
               not initially setting it.
     NOTE  --> handleChange will cover most of the forms. A separate
               function for each is not necessary.*/
// module.exports.handleChange = (e) => {
//   this.setState({e.currentTarget.id: e.currentTarget.value});
// }
module.exports.handleSubmit = () => {
  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/keepsafe/secrets', // uri:
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: this.props.username,
      creation_date: this.state.creation_date,
      release_date: this.state.release_date,
      secret_label: this.state.secret_label,
      secret_body: this.state.secret_body
    }
    json: true
  };

  rp(options)
    .then(parsedBody => {
      // ADD DEBUG STATEMENT HERE
      // DON'T WANT THE INFORMATION POSSIBLY
      // BEING CACHED ON THE USERS COMPUTER
      console.log('Post successful.')
    })
    .catch(error => error.console(error));
}

/* POST --- CREATE NEW USER
     NOTE  --> handleChange will work for both username and password fields.
     NOTE  --> storeCredentials is the onSubmit handler*/
module.exports.handleChange = (e) => {
  this.setState({e.currentTarget.id: e.currentTarget.value});
}


// PUT --- Extend release date.
module.exports.handleChange = (e) => {
  this.setState({e.currentTarget.id: e.currentTarget.value});
}
module.exports.extendReleaseDate = (state, props, credential, extension) => {
  var newDate
  var options = {
    method: 'PUT',
    url: 'http://localhost:3000/api/keepsafe/secrets',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
      newReleaseDate: '2020-08-02 11:11:11' },
    json: true };

  rp(options)
    .then(results => console.log(results))
    .catch(error => error.console(error));
}

// PUT --- delay release date
module.exports.updateCredential(state, props, credential) {
  var options = {
    method: 'PUT',
    url: 'http://localhost:3000/api/keepsafe/credentials',
    headers:
      {
        'Content-Type': 'application/json'
      },
    body: {
      newReleaseDate: '2020-08-02 11:11:11'
    },
    json: true };
  rp(options)
    .then(results => console.log(results))
    .catch(error => error.console(error));
}

// PUT --- Change/update credential
module.exports.updateCredential(state, props, credential) {

  if (moment.isDuration(extension)) {

  }
  var options = {
    method: 'PUT',
    url: 'http://localhost:3000/api/keepsafe/secrets',
    headers:
     {
       'cache-control': 'no-cache',
       'Content-Type': 'application/json'
     },
    body: {
      secret_id: '2',
      newReleaseDate: '2020-08-02 11:11:11' },
    json: true };

  rp(options)
    if (error) throw new Error(error);

    console.log(body);
}


// DELETE - Delete a secret
// router.delete('/credentials', controller.credentials.delete);
// router.delete('/secrets', controller.secrets.delete);

// PUT --- Update username or password
module.exports.updateCredential(state, props, credential) {
  var options = {
    method: 'PUT',
    url: 'http://localhost:3000/api/keepsafe/credentials',
    headers:
      {
        'Content-Type': 'application/json'
      },
    body: {

      newReleaseDate: '2020-08-02 11:11:11' },
    json: true };

  rp(options)
    .then(results => console.log(results))
    .catch(error => error.console(error));
}

module.exports.deleteSecret(e) {
  var options = { method: 'DELETE',
    url: 'http://localhost:3000/api/keepsafe/secret',
    headers:
     { 'cache-control': 'no-cache',
       'Content-Type': 'application/json' },
    body: { secrets_id: '2' },
    json: true };

  rp(options)
    .then(results => console.log(results))
    .catch(error => error.console(error));
}

// DELETE - Delete all secrets
module.exports.deleteAllSecrets(e) {
  var options = {
    method: 'DELETE',
    url: 'http://localhost:3000/api/keepsafe/secret',
    headers: { 'Content-Type': 'application/json' },
    body: { secrets_id: '2' },
    json: true };

  rp(options)
    .then(results => console.log(results))
    .catch(error => error.console(error));
}