import React from 'react';
import ReactDOM from 'react-dom';
import EntryForm from './EntryForm';
import Styles from 'style-loader!css-loader?modules!./../styles/styles.css';
import Table_ReleasedData from './Table_ReleasedData';
import Table_LockedData from './Table_LockedData';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const rq = require('../scripts/ClientRequests');


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
    rq.retrieveSecrets('Maurine42').then(results => {
      this.setState((state, props) => ({
        locked: results.locked,
        released: results.released
      }));
      console.log(this.state.secrets);
      // this.setState({secrets: results});
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <h2>TimeLockr</h2>
        </Row>
        <Row>
          <Col xs={5} sm={5} md={5} lg={5} xl={5}>
            <Table_ReleasedData secrets={this.state.released} />
          </Col>
          <Col xs={5} sm={5} md={5} lg={5} xl={5}>
            <EntryForm />
            <Table_LockedData secrets={this.state.locked} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

