import React from 'react';
import PropTypes from 'prop-types';
import { getEntries, ErrorBoundary } from 'utilities';
import { ActionBar
  , Box
  , CardArea
  , LeftSide
  , RightSide } from 'layout';
import { CardColumn
  , ReleasedEntryCard
  , LockedEntryCard
} from 'components';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: [],
      hasLockedChildren: false,
      showLocked: false,
      released: [],
      hasReleasedChildren: false,
      showReleased: false
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount = () => (
    this.getEntries()
  );

  getEntries = () => {
    getEntries(this.props.username)
      .then(results => {
        console.log(results);
        this.setState((state, props) => ({
          locked: results.locked,
          hasLockedChildren: !!(results.locked.length),
          showLocked: !!(results.locked.length),
          released: results.released,
          hasReleasedChildren: !!(results.released.length),
          showReleased: !!(results.released.length)
        }));
      });
  }

  refresh = () => (
    this.getEntries()
  );

  render() {
    return (
      <Box className='wrapper'>
        <LeftSide>
          <h1>TimeLockr</h1>
        </LeftSide>
        <CardArea>
          <ErrorBoundary>
            {
              this.state.hasReleasedChildren &&
              <CardColumn
                id='card-column-released-entries'
                title='Unlocked'
                Card={ReleasedEntryCard}
                delayIncrement={50}
                entries={this.state.released}
                refresh={this.refresh}
                showCards={this.state.showReleased}
              />
            }
          </ErrorBoundary>
          <ErrorBoundary>
            {
              this.state.hasLockedChildren &&
              <CardColumn
                id='card-column-locked-entries'
                title='Locked'
                Card={LockedEntryCard}
                delayIncrement={50}
                entries={this.state.locked}
                refresh={this.refresh}
                showCards={this.state.showLocked}
              />
            }
          </ErrorBoundary>
        </CardArea>
        <RightSide>
          <ErrorBoundary>
            <ActionBar {...this.props} refresh={this.refresh} />
          </ErrorBoundary>
        </RightSide>
      </Box>
    );
  }
}

Main.propTypes = {
  user_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  viewState: PropTypes.bool.isRequired
};

export default Main;
