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
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount = () => (
    this.getEntries()
  );

  refresh = () => (
    this.getEntries()
  );

  render() {
    return (
      <Container className='global-container d-flex d-inline-flex justify-content-center' fluid>
        <Container className='primary-container d-flex flex-column'>
          <Row>
            <Col className='inline-blk'>
              <h1 className='app-title'>TimeLockr</h1>
            </Col>
          </Row>
          <Row>
            <Col className='inline-blk'>
              <LeftCardColumn
                entries={this.state.released}
                refresh={this.refresh} />
            </Col>
            <Col className='inline-blk'>
              <EntryForm
                refresh={this.refresh}
                user_id={this.props.user_id} />
              <RightCardColumn
                entries={this.state.locked}
                refresh={this.refresh} />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  // HELPERS
  getEntries() {
    req.getEntries(this.props.username)
      .then(results => {
        console.log(results);
        this.setState((state, props) => ({
          locked: results.locked,
          released: results.released
        }));
      })
  }
}

Main.propTypes = {
  user_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  viewState: PropTypes.bool.isRequired
}

export default Main;

