import React from 'react';
import ClientRequests from './../../scripts/ClientRequests.js';
import PropTypes from 'prop-types';
import { CardColumn
       , Col
       , Container
       , EntryForm
       , ErrorBoundary
       , LeftCard
       , RightCard
       , Row } from 'Components';

/*
  THESE ARE VALID:

    this.setState((state, props) => ({
      title: newTitle
    }));

    this.setState((state) => state.title = newTitle);

    this.setState((state) => {
      return state.title = newTitle
    });

  THIS IS INVALID BECAUSE NO RETURN STATEMENT:

    this.setState((state) => {
      state.title = newTitle
    });
*/

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
    ClientRequests.getEntries(this.props.username)
      .then(results => {
        console.log(results);
        this.setState((state, props) => ({
          locked: results.locked,
          hasLockedChildren: !!(results.locked.length),
          released: results.released,
          hasReleasedChildren: !!(results.released.length)
        }));
      });
  }

  refresh = () => (
    this.getEntries()
  );

// GENERIC CARD-COLUMN IMPLEMENTATION
  render() {
    return (
      <Container className='d-flex d-inline-flex justify-content-center' fluid>
        <Container className='d-flex flex-column justify-content-center'>
          <Row>
            <Col>
              <h1 className='app-title'>TimeLockr</h1>
            </Col>
          </Row>
          <Row>
            <ErrorBoundary>
              {
                this.state.hasReleasedChildren &&
                <CardColumn
                  id='left-card-column'
                  title='Unlocked'
                  Card={LeftCard}
                  entries={this.state.released}
                  refresh={this.refresh}
                  showComponent={this.state.hasReleasedChildren}
                />
              }
            </ErrorBoundary>
            <ErrorBoundary>
              <Col>
                <EntryForm
                  refresh={this.refresh}
                  user_id={this.props.user_id}
                />
              </Col>
            </ErrorBoundary>
            <ErrorBoundary>
              {
                this.state.hasLockedChildren &&
                <CardColumn
                  id='right-card-column'
                  title='Locked'
                  Card={RightCard}
                  entries={this.state.locked}
                  refresh={this.refresh}
                  showComponent={this.state.hasLockedChildren}
                />
              }
            </ErrorBoundary>
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
};

export default Main;