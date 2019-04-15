import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CardColumn,
  LockedEntryCard,
  ReleasedEntryCard,
} from 'components';

const S = {};

S.CardArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  grid-column: 2;
  grid-row: 2;
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
    <>
      <S.CardArea>
        {(hasReleasedChildren && showReleased)
          && (
            <CardColumn
              id='card-column-released-entries'
              mr={0}
              ml={2}
              Card={ReleasedEntryCard}
              delayIncrement={100}
              entries={released}
              refresh={refresh}
            />
          )}
        {(hasLockedChildren && showLocked)
          && (
            <CardColumn
              id='card-column-locked-entries'
              mr={1.625}
              ml={0}
              Card={LockedEntryCard}
              delayIncrement={100}
              entries={locked}
              refresh={refresh}
            />
        )}
      </S.CardArea>
    </>
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
