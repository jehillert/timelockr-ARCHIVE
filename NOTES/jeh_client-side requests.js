import rp from 'request-promise';

/*** GET REQUEST --- VERIFY USER CREDENTIALS ***
     ROUTE --> router.get('/credentials', controller.credentials.get);*/
const verifyUser = () => {
  var options = {
    method: 'GET',
    url: 'http://localhost:3000/api/keepsafe/credentials',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: this.state.username,
      password: this.state.password
    },
    json: true
  };
  // need to add error handling for non-existant user
  rp(options)
    .then(username => console.log(username))
    .catch(error => error.console(error));
}

/*** GET REQUEST --- RETRIEVE USER DATA ***
     ROUTE --> router.get('/secrets', controller.secrets.get)*/
componentWillMount() {
  // populate table and chart
}
const retrieveUserData = () => {
  var options = {
    method: 'GET',
    url: 'http://localhost:3000/api/keepsafe/secrets', // uri:
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: this.props.username
      password: this.props.password
    },
    json: true
  };

  rp(options)
    .then(secrets => console.log(secrets))
    .catch(error => error.console(error));
}

/*** POST REQUEST --- STORE NEW SECRET ***
     ROUTE --> router.post('/secrets', controller.secrets.post);
     NOTE  --> time server call only needed for changing release_date,
               not initially setting it.
     NOTE  --> handleChange will cover most of the forms. A separate
               function for each is not necessary.*/
const handleChange = (e) => {
  this.setState({e.currentTarget.id: e.currentTarget.value});
}
const handleSubmit = () => {
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

/*** POST REQUEST --- CREATE NEW USER ***
     ROUTE --> router.post('/credentials', controller.credentials.post);
     NOTE  --> handleChange will work for both username and password fields.
     NOTE  --> storeCredentials is the onSubmit handler*/
const handleChange = (e) => {
  this.setState({e.currentTarget.id: e.currentTarget.value});
}
const storeCredentials = (state, props) => {
  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/keepsafe/secrets', // uri:
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: this.state.username,
      usernamepassword: this.state.password,
    }
    json: true
  };

  rp(options)
    .then(parsedBody => {
      // ADD DEBUG STATEMENT HERE
      // DON'T WANT USERS CREDENTIALS
      // BEING CACHED ON THE USERS COMPUTER
      console.log('New user successfully created.')
    })
    .catch(error => error.console(error));
}

/*** PUT REQUEST --- DELAY RELEASE DATE ***
     ROUTE --> router.put('/secrets', controller.secrets.put)*/
const delayReleaseDate = (state, props, credential, extension) => {
  var newDate
  var options = {
    method: 'PUT',
    url: 'http://localhost:3000/api/keepsafe/secrets',
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


/*** PUT REQUEST --- DELAY RELEASE DATE ***
     ROUTE --> router.put('/credentials', controller.credentials.put)*/
const updateCredential(state, props, credential) {

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

const updateCredential(state, props, credential) {

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
// router.delete('/credentials', controller.credentials.delete);
// router.delete('/secrets', controller.secrets.delete);
var options = { method: 'DELETE',
  url: 'http://localhost:3000/api/keepsafe/secret',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { secrets_id: '2' },
  json: true };

rp(options)
  if (error) throw new Error(error);
  console.log(body);


—————————————————————————————————————————————————————————

/*OTHER EXAMPLES*/
var request = require("request");
var userDetails;

function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function main() {
    var initializePromise = initialize();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here
        console.log(userDetails)
    }, function(err) {
        console.log(err);
    })
}

main();
—————————————————————————————————————————————————————————
var request = require('request');

var dbName = 'archive';
var dbUrl = 'mongodb://localhost:27017/' + dbName;

var archiveServer = 'http://127.0.0.1:8080/index.html';
var archiveForm = {url: 'google.com'};

request(
  {
    method: 'POST',
    uri: archiveServer,
    form: archiveForm
  },
  function(error, response, body) {
    waits(1000);
    runs(function() {
      mongoClient.connect(dbUrl, function(err, db) {
        var collectionName = 'archive';
        db.createCollection(collectionName, function(err, collection) {
          collection.find().toArray(function(err, results) {
            db.close();
            done();
          });
        });
      });
  });
});

request(archivedPage, function(error, response, body) {
  db.close();
  done();
});


ONE REQUEST - 2 REQUESTS, CHANGED SERIALLY
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!

var tablename = 'messages';
  // Post the user to the chat server.
  request({
    method: 'POST',
    uri: 'http://127.0.0.1:3000/classes/users',
    json: { username: 'Valjean' }
  }, function () {
    // Post a message to the node chat server:
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Valjean',
        message: 'In mercy\'s name, three days is all I need.',
        roomname: 'Hello'
      }
    }, function () {
      var queryString = 'SELECT * FROM messages';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        // Should have one result:
        expect(results.length).to.equal(1);

        // TODO: If you don't have a column named text, change this test.
        expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

        done();
      });
    });
  });

GET ALL MESSAGES
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
  var queryString = 'INSERT INTO messages(text, userid, roomname) VALUES (?, ?, ?)';
  var queryArgs = ['Men like you can never change!', 1, 'main'];

  dbConnection.query(queryString, queryArgs, function(err) {
    if (err) { throw err; }
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var messageLog = JSON.parse(body);
      expect(messageLog[0].text).to.equal('Men like you can never change!');
      expect(messageLog[0].roomname).to.equal('main');
      done();
    });
  });

—————————————————————————————————————————————————————————

var fs = require('fs');
var request = require('request');

var getStatusCode = function(url, callback) {
  request.get(url, function(err, response, body) {
    // An alternate way to implement our error guard
    if (err) { return callback(err, null); }
    callback(null, response.statusCode);
  });
};

USED FOR HR TESTS
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
  done();
});

request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
  var parsedBody = JSON.parse(body);
  done();
});

———————————————————————————————————————————————————————————————————————————————
var options = {method: 'POST',
  uri: 'http://127.0.0.1:3000/classes/messages',
  json: {
    username: username,
    text: 'Do my bidding!'}
};

request(options, function(error, response, body) {
  done();
});
———————————————————————————————————————————————————————————————————————————————
var options = {method: 'POST',
  uri: 'http://127.0.0.1:3000/classes/messages',
  json: {
    username: 'Jono',
    text: 'Do my bidding!'}
};

request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
  done();
});


request(options, function(error, response, body) {
  // Now if we request the log, that message we posted should be there:
  request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
    var messages = JSON.parse(body).results;
    expect(messages[0].username).to.equal('Jono');
    expect(messages[0].text).to.equal('Do my bidding!');
    done();
  });
});


PROMISIFICATION/ROUTING
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};


var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};


var generateRandomTokenAsync = Promise.promisify(generateRandomToken);


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};


// This function violates rule (2) of the node style callback pattern,
// therefore we have to reimplement it using the `new Promise` constructor
var readFileAndMakeItFunnyAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, file) {
      if (err) { return reject(err); }

      var funnyFile = file.split('\n')
        .map(function(line) {
          return line + ' lol';
        })
        .join('\n');

      resolve(funnyFile);
    });
  });
};

// Alternatively, we could use our previously written function
// and do some error checking on the only argument passed to the callback
readFileAndMakeItFunnyAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    readFileAndMakeItFunny(filePath, function(errorOrFile) {
      if (errorOrFile instanceof Error) {
        reject(errorOrFile);
      } else {
        resolve(errorOrFile);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};


ADVANCED CHAINING LIBRARY
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
var Clarifai = require('clarifai');
var request = require('request');
var Promise = require('bluebird');

var clarifaiApp = new Clarifai.App({
  apiKey: 'YOUR_API_KEY_HERE'
});
/*
 * getIntersection(arrays) =>
 *   @param {Array} arrays - an array of arrays, each containing a set of values
 *   @return {Array} - a single array with the intersection of values from all arrays
 */

var getIntersection = function(arrays) {
  return arrays.shift().filter(function(v) {
    return arrays.every(function(a) {
      return a.indexOf(v) !== -1;
    });
  });
};

/**
 * getGitHubProfile(handle) =>
 *   @param {String} handle - the handle of a GitHub user
 *   @return {Promise} - resolves with the user's profile in the following format:
 *     {
 *       handle: 'danthareja',
 *       name: 'Dan Thareja',
 *       avatarUrl: 'https://avatars.githubusercontent.com/u/6980359?v=3.jpg'
 *     }
 */

var getGitHubProfile = function(user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true // will JSON.parse(body) for us
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, data, body) {
      if (err) { return reject(err); }

      var simpleProfile = {
        handle: body.login,
        name: body.name,
        avatarUrl: body.avatar_url + '.jpg', // extension necessary for image tagger
      };
      resolve(simpleProfile);
    });
  });
};


/**
 * predictImage(imageUrl) =>
 *   @param {String} imageUrl - the url of the image you want to tag
 *   @return {Promise} - resolves with an array of tags
 */

var predictImage = function (imageUrl) {
  if (clarifaiApp._config.apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error('You must add your API key before you can predict an image');
  }

  return clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl)
    .then(function (response) {
      return response.outputs[0].data.concepts.map(function ({ name }) {
        return name;
      });
    })
    .catch(function (err) {
      return err;
    });
};


module.exports = {
  predictImage: predictImage,
  getIntersection: getIntersection,
  getGitHubProfile: getGitHubProfile,
};



SHORTLY-EXPRESS
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
const crypto = require('crypto');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'), { multiArgs: true });
const Model = require('./model');

/**
 * Links is a class with methods to interact with the links table, which
 * stores information (id, url, baseUrl, code, title, and visits) about
 * the shortened links.
 * @constructor
 * @augments Model
 */
class Links extends Model {
  constructor() {
    super('links');
    this.rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  }

  /**
   * Makes a request to the url and uses regex to get the title from the html.
   * @param {string} url - The url of the website from which to get the title.
   * @returns {Promise<string>} Returns a promise that is fulfilled with the title
   * as a string or is rejected with the error that occured.
   */
  getUrlTitle(url) {
    return request(url).spread((response, html) => {
      let tag = /<title>(.*)<\/title>/;
      let match = response.body.match(tag);
      let title = match ? match[1] : url;
      return title;
    });
  }

  /**
   * Checks a url string to determine if it is valid.
   * @param {string} url - The url to check for validity.
   * @returns {boolean} Returns a boolean indicating if the url is valid.
   */
  isValidUrl(url) {
    return url.match(this.rValidUrl);
  }

  /**
   * Creates a new row in the links table.
   * @param {Object} link - An object containing url, title, and base url.
   * @returns {Promise<Object>} Returns a promise that is fulfilled with the result
   * of the insert query or is rejected with the error that occured.
   */
  create(link) {
    let shasum = crypto.createHash('sha1');
    shasum.update(link.url);
    link.code = shasum.digest('hex').slice(0, 5);

    return super.create.call(this, link);
  }
}

module.exports = new Links();

SHORTLY-EXPRESS TESTS
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
var expect = require('chai').expect;
var mysql = require('mysql');
var request = require('request');
var httpMocks = require('node-mocks-http');

var app = require('../server/app.js');
var schema = require('../server/db/config.js');
var port = 4568;

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
var xbeforeEach = function() {};
/************************************************************/


describe('', function() {
  var db;
  var server;

  var clearDB = function(connection, tablenames, done) {
    var count = 0;
    tablenames.forEach(function(tablename) {
      connection.query('DROP TABLE IF EXISTS ' + tablename, function() {
        count++;
        if (count === tablenames.length) {
          return schema(db).then(done);
        }
      });
    });
  };

  beforeEach(function(done) {

    /*************************************************************************************/
    /* TODO: Update user and password if different than on your local machine            */
    /*************************************************************************************/
    db = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'shortly'
    });

    /**************************************************************************************/
    /* TODO: If you create a new MySQL tables, add it to the tablenames collection below. */
    /**************************************************************************************/
    var tablenames = ['links', 'clicks', 'users', 'sessions'];

    db.connect(function(err) {
      if (err) { return done(err); }
      /* Empties the db table before each test so that multiple tests
       * (or repeated runs of the tests) won't screw each other up: */
      clearDB(db, tablenames, function() {
        server = app.listen(port, done);
      });
    });

    afterEach(function() { server.close(); });
  });

  describe('Database Schema:', function() {
    it('contains a users table', function(done) {
      var queryString = 'SELECT * FROM users';
      db.query(queryString, function(err, results) {
        if (err) { return done(err); }

        expect(results).to.deep.equal([]);
        done();
      });
    });

    it('contains id, username, password columns', function(done) {
      var newUser = {
        username: 'Howard',
        password: 'p@ssw0rd'
      };
      db.query('INSERT INTO users SET ?', newUser, function(err, results) {
        db.query('SELECT * FROM users WHERE username = ?', newUser.username, function(err, results) {
          var user = results[0];
          expect(user.username).to.exist;
          expect(user.password).to.exist;
          expect(user.id).to.exist;
          done();
        });
      });
    });

    it('only allows unique usernames', function(done) {
      var newUser = {
        username: 'Howard',
        password: 'p@ssw0rd'
      };
      db.query('INSERT INTO users SET ?', newUser, function(err, results) {
        var sameUser = newUser;
        db.query('INSERT INTO users SET ?', sameUser, function(err) {
          expect(err).to.exist;
          expect(err.code).to.equal('ER_DUP_ENTRY');
          done();
        });
      });
    });

    it('should increment the id of new rows', function(done) {
      var newUser = {
        username: 'Howard',
        password: 'p@ssw0rd'
      };
      db.query('INSERT INTO users SET ?', newUser, function(error, result) {
        var newUserId = result.insertId;
        var otherUser = {
          username: 'Muhammed',
          password: 'p@ssw0rd'
        };
        db.query('INSERT INTO users SET ?', otherUser, function(err, results) {
          var userId = results.insertId;
          expect(userId).to.equal(newUserId + 1);
          done(error || err);
        });
      });
    });
  });


  describe ('Account Creation:', function() {

    it('signup creates a new user record', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Samantha',
          'password': 'Samantha'
        }
      };

      request(options, function(error, res, body) {
        var queryString = 'SELECT * FROM users where username = "Samantha"';
        db.query(queryString, function(err, rows) {
          if (err) { done(err); }
          var user = rows[0];
          expect(user).to.exist;
          expect(user.username).to.equal('Samantha');
          done();
        });
      });
    });

    it('does not store the user\'s original text password', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Samantha',
          'password': 'Samantha'
        }
      };

      request(options, function(error, res, body) {
        if (error) { return done(error); }
        var queryString = 'SELECT password FROM users where username = "Samantha"';
        db.query(queryString, function(err, rows) {
          if (err) { return done (err); }
          var user = rows[0];
          expect(user.password).to.exist;
          expect(user.password).to.not.equal('Samantha');
          done();
        });
      });
    });

    it('redirects to signup if the user already exists', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Samantha',
          'password': 'Samantha'
        }
      };

      request(options, function(error, res, body) {
        if (error) { return done(error); }
        request(options, function(err, response, resBody) {
          if (err) { return done(err); }
          expect(response.headers.location).to.equal('/signup');
          done();
        });
      });
    });

    it('redirects to index after user is created', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Samantha',
          'password': 'Samantha'
        }
      };

      request(options, function(error, res, body) {
        if (error) { return done(error); }
        expect(res.headers.location).to.equal('/');
        done();
      });
    });
  });


  describe ('Account Login:', function() {

    beforeEach(function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Samantha',
          'password': 'Samantha'
        }
      };

      request(options, function(error, res, body) {
        done(error);
      });
    });

    it('Logs in existing users', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/login',
        'json': {
          'username': 'Samantha',
          'password': 'Samantha'
        }
      };

      request(options, function(error, res, body) {
        if (error) { return done(error); }
        expect(res.headers.location).to.equal('/');
        done();
      });
    });

    it('Users that do not exist are kept on login page', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/login',
        'json': {
          'username': 'Fred',
          'password': 'Fred'
        }
      };

      request(options, function(error, res, body) {
        if (error) { return done(error); }
        expect(res.headers.location).to.equal('/login');
        done();
      });
    });

    it('Users that enter an incorrect password are kept on login page', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/login',
        'json': {
          'username': 'Samantha',
          'password': 'Alexander'
        }
      };

      request(options, function(error, res, body) {
        if (error) { return done(error); }
        expect(res.headers.location).to.equal('/login');
        done();
      });
    });
  });


  describe ('Sessions Schema:', function() {
    it('contains a sessions table', function(done) {
      var queryString = 'SELECT * FROM sessions';
      db.query(queryString, function(err, results) {
        if (err) { return done(err); }
        expect(results).to.deep.equal([]);
        done();
      });
    });

    it('contains id, hash, userId columns', function(done) {
      var newSession = {
        hash: 'e98f26e5c90a09e391eee2211b57a61b5dc836d5'
      };
      db.query('INSERT INTO sessions SET ?', newSession, function(error, result) {
        if (error) { return done(error); }
        db.query('SELECT * FROM sessions WHERE hash = ?', newSession.hash, function(err, results) {
          if (err) { return done(err); }
          var session = results[0];
          expect(session.id).to.exist;
          expect(session.userId).to.be.null;
          expect(session.hash).to.equal(newSession.hash);
          done();
        });
      });
    });

    it('should increment the id of new rows', function(done) {
      var newSession = {
        hash: 'e98f26e5c90a09e391eee2211b57a61b5dc836d5'
      };
      db.query('INSERT INTO sessions SET ?', newSession, function(error, result) {
        if (error) { return done(error); }
        var newSessionId = result.insertId;

        var otherSession = {
          hash: 'eba8eb6ec4ede04f2287e67014ccd4c3c070a20f'
        };
        db.query('INSERT INTO sessions SET ?', otherSession, function(err, results) {
          if (err) { return done(err); }
          var sessionId = results.insertId;
          expect(sessionId).to.equal(newSessionId + 1);
          done(err);
        });
      });
    });
  });


  describe ('Express Middleware', function() {
    var cookieParser = require('../server/middleware/cookieParser.js');
    var createSession = require('../server/middleware/auth.js').createSession;

    describe('Cookie Parser', function() {

      it('parses cookies and assigns an object of key-value pairs to a session property on the request', function(done) {
        var requestWithoutCookies = httpMocks.createRequest();
        var requestWithCookies = httpMocks.createRequest({
          headers: {
            Cookie: 'shortlyid=8a864482005bcc8b968f2b18f8f7ea490e577b20'
          }
        });
        var requestWithMultipleCookies = httpMocks.createRequest({
          headers: {
            Cookie: 'shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66; otherCookie=2a990382005bcc8b968f2b18f8f7ea490e990e78; anotherCookie=8a864482005bcc8b968f2b18f8f7ea490e577b20'
          }
        });

        var response = httpMocks.createResponse();

        cookieParser(requestWithoutCookies, response, function() {
          var cookies = requestWithoutCookies.cookies;
          expect(cookies).to.be.an('object');
          expect(cookies).to.eql({});
        });

        cookieParser(requestWithCookies, response, function() {
          var cookies = requestWithCookies.cookies;
          expect(cookies).to.be.an('object');
          expect(cookies).to.eql({ shortlyid: '8a864482005bcc8b968f2b18f8f7ea490e577b20' });
        });

        cookieParser(requestWithMultipleCookies, response, function() {
          var cookies = requestWithMultipleCookies.cookies;
          expect(cookies).to.be.an('object');
          expect(cookies).to.eql({
            shortlyid: '18ea4fb6ab3178092ce936c591ddbb90c99c9f66',
            otherCookie: '2a990382005bcc8b968f2b18f8f7ea490e990e78',
            anotherCookie: '8a864482005bcc8b968f2b18f8f7ea490e577b20'
          });
          done();
        });
      });
    });

    describe('Session Parser', function() {
      it('initializes a new session when there are no cookies on the request', function(done) {
        var requestWithoutCookies = httpMocks.createRequest();
        var response = httpMocks.createResponse();

        createSession(requestWithoutCookies, response, function() {
          var session = requestWithoutCookies.session;
          expect(session).to.exist;
          expect(session).to.be.an('object');
          expect(session.hash).to.exist;
          done();
        });
      });

      it('sets a new cookie on the response when a session is initialized', function(done) {
        var requestWithoutCookie = httpMocks.createRequest();
        var response = httpMocks.createResponse();

        createSession(requestWithoutCookie, response, function() {
          var cookies = response.cookies;
          expect(cookies['shortlyid']).to.exist;
          expect(cookies['shortlyid'].value).to.exist;
          done();
        });
      });

      it('assigns a session object to the request if a session already exists', function(done) {

        var requestWithoutCookie = httpMocks.createRequest();
        var response = httpMocks.createResponse();

        createSession(requestWithoutCookie, response, function() {
          var cookie = response.cookies.shortlyid.value;
          var secondResponse = httpMocks.createResponse();
          var requestWithCookies = httpMocks.createRequest();
          requestWithCookies.cookies.shortlyid = cookie;

          createSession(requestWithCookies, secondResponse, function() {
            var session = requestWithCookies.session;
            expect(session).to.be.an('object');
            expect(session.hash).to.exist;
            expect(session.hash).to.be.cookie;
            done();
          });
        });
      });

      it('creates a new hash for each new session', function(done) {
        var requestWithoutCookies = httpMocks.createRequest();
        var response = httpMocks.createResponse();

        createSession(requestWithoutCookies, response, function() {
          var sessionHashOne = requestWithoutCookies.session.hash;
          var secondRequestWithoutCookies = httpMocks.createRequest();
          var responseTwo = httpMocks.createResponse();

          createSession(secondRequestWithoutCookies, responseTwo, function() {
            var sessionHashTwo = secondRequestWithoutCookies.session.hash;
            expect(sessionHashOne).to.not.equal(sessionHashTwo);
            done();
          });
        });
      });

      it('assigns a username and userId property to the session object if the session is assigned to a user', function(done) {
        var requestWithoutCookie = httpMocks.createRequest();
        var response = httpMocks.createResponse();
        var username = 'BillZito';

        db.query('INSERT INTO users (username) VALUES (?)', username, function(error, results) {
          if (error) { return done(error); }
          var userId = results.insertId;

          createSession(requestWithoutCookie, response, function() {
            var hash = requestWithoutCookie.session.hash;
            db.query('UPDATE sessions SET userId = ? WHERE hash = ?', [userId, hash], function(error, result) {

              var secondResponse = httpMocks.createResponse();
              var requestWithCookies = httpMocks.createRequest();
              requestWithCookies.cookies.shortlyid = hash;

              createSession(requestWithCookies, secondResponse, function() {
                var session = requestWithCookies.session;
                expect(session).to.be.an('object');
                expect(session.user.username).to.eq(username);
                expect(session.userId).to.eq(userId);
                done();
              });
            });
          });
        });
      });

      it('clears and reassigns a new cookie if there is no session assigned to the cookie', function(done) {
        var maliciousCookieHash = '8a864482005bcc8b968f2b18f8f7ea490e577b20';
        var response = httpMocks.createResponse();
        var requestWithMaliciousCookie = httpMocks.createRequest();
        requestWithMaliciousCookie.cookies.shortlyid = maliciousCookieHash;

        createSession(requestWithMaliciousCookie, response, function() {
          var cookie = response.cookies.shortlyid;
          expect(cookie).to.exist;
          expect(cookie).to.not.equal(maliciousCookieHash);
          done();
        });
      });
    });
  });


  describe ('Sessions and cookies', function() {
    var requestWithSession;
    var cookieJar;

    var addUser = function(callback) {

      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Vivian',
          'password': 'Vivian'
        }
      };

      requestWithSession(options, callback);
    };

    beforeEach(function(done) {
      cookieJar = request.jar();
      requestWithSession = request.defaults({ jar: cookieJar });
      done();
    });

    it('saves a new session when the server receives a request', function(done) {
      requestWithSession('http://127.0.0.1:4568/', function(err, res, body) {
        if (err) { return done(err); }
        var queryString = 'SELECT * FROM sessions';
        db.query(queryString, function(error, sessions) {
          if (error) { return done(error); }
          expect(sessions.length).to.equal(1);
          expect(sessions[0].userId).to.be.null;
          done();
        });
      });
    });

    it('sets and stores a cookie on the client', function(done) {
      requestWithSession('http://127.0.0.1:4568/', function(error, res, body) {
        if (error) { return done(error); }
        var cookies = cookieJar.getCookies('http://127.0.0.1:4568/');
        expect(cookies.length).to.equal(1);
        done();
      });
    });

    it('assigns session to a user when user logs in', function(done) {
      addUser(function(err, res, body) {
        if (err) { return done(err); }
        var cookies = cookieJar.getCookies('http://127.0.0.1:4568/');
        var cookieValue = cookies[0].value;

        var queryString = `
          SELECT users.username FROM users, sessions
          WHERE sessions.hash = ? AND users.id = sessions.userId
        `;

        db.query(queryString, cookieValue, function(error, users) {
          if (error) { return done(error); }
          var user = users[0];
          expect(user.username).to.equal('Vivian');
          done();
        });
      });
    });

    it('destroys session and cookie when logs out', function(done) {
      addUser(function(err, res, body) {
        if (err) { return done(err); }
        var cookies = cookieJar.getCookies('http://127.0.0.1:4568/');
        var cookieValue = cookies[0].value;

        requestWithSession('http://127.0.0.1:4568/logout', function(error, response, resBody) {
          if (error) { return done(error); }

          var cookies = cookieJar.getCookies('http://127.0.0.1:4568/');
          var newCookieValue = cookies[0].value;
          expect(cookieValue).to.not.equal(newCookieValue);

          var queryString = 'SELECT * FROM sessions WHERE hash = ?';
          db.query(queryString, cookieValue, function(error2, sessions) {
            if (error2) { return done(error2); }
            expect(sessions.length).to.equal(0);
            done();
          });
        });
      });
    });
  });


  describe ('Privileged Access:', function() {

    it('Redirects to login page if a user tries to access the main page and is not signed in', function(done) {
      request('http://127.0.0.1:4568/', function(error, res, body) {
        if (error) { return done(error); }
        expect(res.req.path).to.equal('/login');
        done();
      });
    });

    it('Redirects to login page if a user tries to access the create page and is not signed in', function(done) {
      request('http://127.0.0.1:4568/create', function(error, res, body) {
        if (error) { return done(error); }
        expect(res.req.path).to.equal('/login');
        done();
      });
    });

    it('Redirects to login page if a user tries to see all of the links and is not signed in', function(done) {
      request('http://127.0.0.1:4568/links', function(error, res, body) {
        if (error) { return done(error); }
        expect(res.req.path).to.equal('/login');
        done();
      });
    });
  });


  describe ('Link creation:', function() {

    var cookies = request.jar();
    var requestWithSession = request.defaults({ jar: cookies });
    var options = {
      'method': 'POST',
      'followAllRedirects': true,
      'uri': 'http://127.0.0.1:4568/links',
      'json': {
        'url': 'http://www.google.com/'
      }
    };


    beforeEach
    (function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/signup',
        'json': {
          'username': 'Vivian',
          'password': 'Vivian'
        }
      };
      requestWithSession(options, done);
    });

    afterEach(function(done) {
      requestWithSession('http://127.0.0.1:4568/logout', done);
    });

    describe('Creating new links:', function(done) {

      it('Only shortens valid urls, returning a 404 - Not found for invalid urls', function(done) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/links',
          'json': {
            'url': 'definitely not a valid url'
          }
        };

        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          expect(res.statusCode).to.equal(404);
          done();
        });
      });

      it('Responds with the short code', function(done) {

        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          expect(res.body.url).to.equal('http://www.google.com/');
          expect(res.body.code).to.not.be.null;
          done();
        });
      });

      it('New links create a database entry', function(done) {
        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          db.query('SELECT * FROM links WHERE url = "http://www.google.com/"', function(err, links) {
            var foundUrl;
            if (err) { return done(err); }
            if (links[0] && links[0]['url']) {
              foundUrl = links['0']['url'];
            }
            expect(foundUrl).to.equal('http://www.google.com/');
            done();
          });
        });
      });

      it('Fetches the link url title', function(done) {
        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          db.query('SELECT * FROM links WHERE title = "Google"', function(err, links) {
            if (err) { return done(err); }
            var foundUrl = links[0];
            expect(foundUrl).to.exist;

            var linkTitle = foundUrl.title;
            expect(linkTitle).to.equal('Google');
            done();
          });
        });
      });
    });

    describe('With previously saved urls:', function() {

      var link;

      beforeEach(function(done) {
        // save a link to the database
        link = {
          url: 'http://www.google.com/',
          title: 'Google',
          baseUrl: 'http://127.0.0.1:4568',
          code: '2387f'
        };
        db.query('INSERT INTO links SET ?', link, done);
      });

      it('Returns the same shortened code', function(done) {
        var options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:4568/links',
          'json': {
            'url': 'http://www.google.com/'
          }
        };

        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          var code = res.body.code;
          expect(code).to.equal(link.code);
          done();
        });
      });

      it('Shortcode redirects to correct url', function(done) {
        var options = {
          'method': 'GET',
          'uri': 'http://127.0.0.1:4568/' + link.code
        };

        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          var currentLocation = res.request.href;
          expect(currentLocation).to.equal('http://www.google.com/');
          done();
        });
      });

      it('Shortcode redirects to index if shortcode does not exist', function(done) {
        var options = {
          'method': 'GET',
          'uri': 'http://127.0.0.1:4568/doesNotExist'
        };

        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          var currentLocation = res.request.href;
          expect(currentLocation).to.equal('http://127.0.0.1:4568/');
          done();
        });
      });

      it('Returns all of the links to display on the links page', function(done) {
        var options = {
          'method': 'GET',
          'uri': 'http://127.0.0.1:4568/links'
        };

        requestWithSession(options, function(error, res, body) {
          if (error) { return done(error); }
          expect(body).to.include('"title":"Google"');
          expect(body).to.include('"code":"' + link.code + '"');
          done();
        });
      });
    });
  });
});


||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

var options = {
    uri: 'https://api.github.com/user/repos',
    qs: {
        access_token: 'xxxxx xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
};