import React from 'react';
import { Col
       , Container
       , EntryForm
       , LeftCardColumn
       , RightCardColumn
       , Row
     } from 'Components';
import PropTypes from 'prop-types';
const req = require('../../scripts/ClientRequests');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: [],
      hasLockedChildren: false,
      released: [],
      hasReleasedChildren: false,
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount = () => (
    this.getEntries()
  );

  getEntries = () => {
    req.getEntries(this.props.username)
      .then(results => {
        console.log(results);
        this.setState((state, props) => ({
          locked: results.locked,
          hasLockedChildren: !!(results.locked.length),
          released: results.released,
          hasReleasedChildren: !!(results.released.length)
        }));
      })
  }

  refresh = () => (
    this.getEntries()
  );

  render() {
    return (
      <Container className='d-flex d-inline-flex justify-content-center' fluid>
        <Container className='primary-container d-flex flex-column justify-content-center'>
          <Row>
            <Col>
              <h1 className='app-title'>TimeLockr</h1>
            </Col>
          </Row>
          <Row>
            {
              this.state.hasReleasedChildren &&
              <LeftCardColumn
                entries={this.state.released}
                refresh={this.refresh}
                showColumn={this.state.hasReleasedChildren}
              />
            }
            <Col>
              <EntryForm
                refresh={this.refresh}
                user_id={this.props.user_id}
              />
            </Col>
            {
              this.state.hasLockedChildren &&
              <RightCardColumn
                entries={this.state.locked}
                refresh={this.refresh}
                showColumn={this.state.hasLockedChildren}
              />
            }
          </Row>
        </Container>
      </Container>
    );
  }

}

Main.propTypes = {
  user_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  viewState: PropTypes.bool.isRequired
}

export default Main;

