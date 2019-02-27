import React from 'react';
import ReactDOM from 'react-dom';
import { Col
       , Container
       , EntryForm
       , LeftCardColumn
       , RightCardColumn
       , Row
     } from 'Components';
import PropTypes from 'prop-types';
import Styles from './../../styles/styles.css';
const loggers = require('../../../lib/loggers');
const req = require('../../scripts/ClientRequests');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      locked: [],
      released: [],
    };
    // req.retrieveEntries(this.props.username)
    //   .then(results => {
    //     this.setState((state, props) => ({
    //       locked: results.locked,
    //       released: results.released
    //     }));
    //   });
  }

  componentDidMount() {
    req.retrieveEntries(this.props.username)
      .then(results => {
        console.log(results);
        this.setState((state, props) => ({
          locked: results.locked,
          released: results.released
        }));
      })
  }

  render() {
    return (
      <Container className='global-container d-flex d-inline-flex justify-content-center' fluid>
        <Container className='primary-container d-flex align-items-end flex-column'>
          <Row><Col>
              <h1 className='app-title'>TimeLockr</h1>
            <Col className='inline-blk'><LeftCardColumn secrets={this.state.released} /></Col>
          </Col></Row>
          <Row>
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

Main.propTypes = {
  username: PropTypes.string.isRequired,
  viewState: PropTypes.bool.isRequired
}

export default Main;

