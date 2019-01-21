import React from 'react';
import Safe from '../../lib/safe'
class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id='app'>

        Howdy
      </div>
    );
  }
}

export default App;



/*
decryptAsync() {
    return new Promise((resolve, reject) => {
        FileSystem.readFile(this.filePath, (error, data) => {
            if(error) {
                reject(error);
            }
            try {
                var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
                var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
                resolve(JSON.parse(decrypted.toString()));
            } catch (exception) {
                reject({ message: exception.message });
            }
        });
    });
}
*/