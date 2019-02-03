import React from 'react';
import ReactDOM from 'react-dom';
import EntryForm from './EntryForm';
import Styles from './../styles/styles.css';
import LeftCardColumn from './LeftCardColumn';
import RightCardColumn from './RightCardColumn';
import Container from 'react-bootstrap/Container';
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

  componentDidMount() {
    rq.retrieveSecrets('Maurine42').then(results => {
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
      <Container className='global-container d-flex d-inline-flex justify-content-center' fluid>
        <Container className='primary-container d-flex align-items-end flex-column'>
          <Row>
            <Col><h1 className='app-title'>TimeLockr</h1></Col>
          </Row>
          <Row>
            <Col className='inline-blk'><LeftCardColumn secrets={this.state.released} /></Col>
            <Col className='inline-blk'>
              <EntryForm />
              <RightCardColumn secrets={this.state.locked} />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default App;

