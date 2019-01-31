import React from 'react';
import ReactDOM from 'react-dom';
import EntryForm from './EntryForm';
import Table_ReleasedData from './Table_ReleasedData';
import Table_LockedData from './Table_LockedData';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Styles from 'style-loader!css-loader?modules!./styles.css';
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
        <Row className="justify-content-md-center">
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Table_ReleasedData secrets={this.state.released} />
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Table_LockedData secrets={this.state.locked} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <EntryForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
