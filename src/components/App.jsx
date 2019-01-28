import React from 'react';
import ReactDOM from 'react-dom';
import EntryForm from './EntryForm';
// import Grid from './Grid';
// import LoginForm from './LoginForm';
import Table from './Table';
import {Grid, Row, Col} from 'react-bootstrap';
const rq = require('../../lib/ClientRequests');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      username: '',
      locked: [],
      released: []
    };
  }

  componentDidMount = () => {
    rq.retrieveSecrets('Makenzie.Kohler83')
      .then(results => {
        this.setState((state, props) => ({
          locked: results.locked,
          released: results.released
        }));
      console.log(this.state.secrets);
        // this.setState({secrets: results});
      });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col lg={4} md={4}>
              <Table secrets={this.state.released}/>
            </Col>
          </Row>
        </Grid>
        <EntryForm />
      </div>
    );
  }
}

export default App;