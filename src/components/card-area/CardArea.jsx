import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  LockedEntryCard,
  ReleasedEntryCard,
} from 'components';
import CardColumn from '../card-column/CardColumn'

const S = {};

S.CardArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  grid-column: 2 / span 2;
`;

const CardArea = ({ entries, refresh }) => {
  const { locked, released } = entries;
  const hasLockedChildren = !!(locked.length);
  const hasReleasedChildren = !!(released.length);

  const [showLocked, updateShowLocked] = useState(false);
  const [showReleased, updateShowReleased] = useState(false);

  useEffect(() => {
      updateShowLocked(true);
      updateShowReleased(true);
    },
    []);

  return (
    <S.CardArea>
      {(hasReleasedChildren && showReleased)
        && (
          <CardColumn
            id='card-column-released-entries'
            css='
              margin-left = 2rem;
              margin-right = 1rem;
            '
            heading='Unlocked'
            Card={ReleasedEntryCard}
            delayIncrement={70}
            entries={released}
            refresh={refresh}
          />
      )}
      {(hasLockedChildren && showLocked)
        && (
          <CardColumn
            id='card-column-locked-entries'
            mr={4}
            ml={1}
            heading='Locked'
            Card={LockedEntryCard}
            delayIncrement={70}
            entries={locked}
            refresh={refresh}
          />
      )}
    </S.CardArea>
  );
};

CardArea.propTypes = {
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CardArea;
