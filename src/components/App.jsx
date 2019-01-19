import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id='app'>
        {console.log(process.env)}
        Howdy
      </div>
    );
  }
}

export default App;