// use https://medium.com/@brandonstilson/lets-encrypt-files-with-node-85037bea8c0e
// note warning at beginning.
// http://www.levigross.com/2014/03/30/how-to-write-an-encrypt-and-decrypt-api-for-data-at-rest-in-nodejs/
// https://dustinpfister.github.io/2018/08/16/nodejs-crypto-create-cipher-iv/

/*
require('dotenv').config();
const debug = require('debug')('server:middleware');
const Crypto = require('crypto');
const fs = require('fs');

const encrypt = (req, res, next) => {
  try {
    // Cipher Suites, key, and the iv
    let a = 'aes-256-cbc',
        key = Buffer.alloc(32), // key should be 32 bytes
        iv = Buffer.alloc(16), // iv should be 16

      // filename = process.argv[2] || 'test.txt',
      bName = path.basename(filename, path.extname(filename)),
      passwd = process.argv[3] || '1234-spaceballs',
      outfile = bName + '.coded';

    // make the key something other than a blank buffer
    key = Buffer.concat([Buffer.from(passwd)], key.length);

    // randomize the iv, for best results
    iv = Buffer.from(Array.prototype.map.call(iv, () => { return Math.floor(Math.random() * 256) })),

      // make the cipher with the current suite, key, and iv
      cipher = crypto.createCipheriv(a, key, iv);

    // read test.txt
    fs.createReadStream(filename)

      // pipe to cipher
      .pipe(cipher)

      // pipe to writer
      .pipe(fs.createWriteStream(outfile)

        .on('close', () => {

          console.log(outfile + ' has been coded with: ');
          console.log('key:');
          console.log(key.toString('hex'));
          console.log('iv');
          console.log(iv.toString('hex'));

          fs.writeFile(bName + '-keys.json',

            // this will be the json
            JSON.stringify({
              key: key.toString('hex'),
              iv: iv.toString('hex')
            }),

            // callback
            (e) => {

              if (e) {

                console.log('error writing keys.json');

              } else {

                console.log('keys.josn written');

              }

            }

          );

        }));


    return _____;
  } catch (exception) {
    throw new Error(exception.message);
  }
  next();
}

const encryptAsync = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try {





    } catch (exception) {
      reject({ message: exception.message });
    }
    fs.writeFile(this.filePath, encrypted, error => {
      if (error) {
        reject(error);
      }
      resolve(_____);
    });
  })
  .then(() => next());
}

const decrypt() {
  try {




    return JSON.parse(decrypted.toString());
  } catch (exception) {
    throw new Error(exception.message);
  }
}

const decryptAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile(this.filePath, (error, data) => {
      if (error) {
        reject(error);
      }
      try {





        resolve(JSON.parse(decrypted.toString()));
      } catch (exception) {
        reject({ message: exception.message });
      }
    });
  });
}

module.exports = {
  encryptAsync,
  encrypt,
  decryptAsync,
  decrypt
};

 */
/*
If you pass anything to the next() function
(except the string 'route'), Express regards
the current request as being an error and will
skip any remaining non-error handling routing
and middleware functions.

const middlewareFcn = (req, res, next) => {
  aFunctionCall(param1, param2, function (err, data) {
    if (err) {
      next(err);
    } else {
      // do something
    }
  });
  next();
};
*/