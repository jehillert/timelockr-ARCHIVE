/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { getEntries } from 'utilities';
import {
  Box,
  CardArea,
  LeftSide,
  RightSide,
} from 'layout';
import {
  ActionBar,
  CardColumn,
  ReleasedEntryCard,
  LockedEntryCard,
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
      showReleased: false,
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    return this.getEntries();
  }

  getEntries = () => {
    const { username } = this.props;
    return getEntries(username)
      .then((results) => {
        console.log(results);
        const { locked, released } = results;
        this.setState((state, props) => ({
          locked,
          released,
          hasLockedChildren: !!(locked.length),
          hasReleasedChildren: !!(released.length),
          showLocked: !!(locked.length),
          showReleased: !!(released.length),
        }));
      });
  }

  refresh = () => (
    this.getEntries()
  );

  render() {
    const {
      released,
      showReleased,
      hasReleasedChildren,
      hasLockedChildren,
      locked,
      showLocked,
    } = this.state;
    return (
      <Box className='wrapper'>
        <LeftSide>
          <h1>TimeLockr</h1>
        </LeftSide>
        <CardArea>
            {hasReleasedChildren
              && (
                <CardColumn
                  id='card-column-released-entries'
                  heading='Unlocked'
                  Card={ReleasedEntryCard}
                  delayIncrement={70}
                  entries={released}
                  refresh={this.refresh}
                  showCards={showReleased}
                />
            )}
            {hasLockedChildren
              && (
              <CardColumn
                id='card-column-locked-entries'
                heading='Locked'
                Card={LockedEntryCard}
                delayIncrement={70}
                entries={locked}
                refresh={this.refresh}
                showCards={showLocked}
              />
            )}
        </CardArea>
        <RightSide>
            <ActionBar {...this.props} refresh={this.refresh} />
        </RightSide>
      </Box>
    );
  }
}

Main.propTypes = {
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  viewState: PropTypes.bool.isRequired,
};

export default Main;
