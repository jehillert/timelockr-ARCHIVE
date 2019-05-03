import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CardColumn,
} from 'components';

const S = {};

S.CardArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
`;

const CardArea = ({ id, Card, entries, refresh }) => {
  let cardAreaContents;
  const hasChildren = !!entries.length;
  const childCount = entries.length;

  const [showEntries, updateShowEntries] = useState(false);

  useEffect(() => {
    updateShowEntries(true);
  }, []);

  if (childCount > 1) {
    const leftEntries = entries.slice(0, Math.ceil(childCount / 2));
    const rightEntries = entries.slice(Math.ceil(childCount / 2), childCount);

    cardAreaContents = (
      <>
        <CardColumn
          pl={0.5}
          pr={1.5}
          Card={Card}
          delayIncrement={100}
          entries={leftEntries}
          refresh={refresh}
        />
        <CardColumn
          pr={0.5}
          pl={1.5}
          Card={Card}
          delayIncrement={100}
          entries={rightEntries}
          refresh={refresh}
        />
      </>
    );
  } else {
    cardAreaContents = (
      <CardColumn
        mr={0}
        ml={2}
        Card={Card}
        delayIncrement={100}
        entries={entries}
        refresh={refresh}
      />
    );
  }

  return (
    <S.CardArea id={id}>
      {(hasChildren && showEntries) && cardAreaContents}
    </S.CardArea>
  );
};

CardArea.defaultProps = {
  id: 'card-area',
};

CardArea.propTypes = {
  id: PropTypes.string,
  Card: PropTypes.elementType.isRequired,
  entries: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CardArea;

/*
! for some reason the following code fails for the 'released entries'
*/
// entries: PropTypes.oneOfType([
//   PropTypes.shape({
//     locked: PropTypes.array,
//     released: PropTypes.array,
//   }).isRequired,
//   PropTypes.shape({
//     entryId: PropTypes.number,
//     description: PropTypes.string,
//     content: PropTypes.string,
//   }),
//   PropTypes.shape({
//     entryId: PropTypes.number,
//     label: PropTypes.string,
//     todaysDate: PropTypes.string,
//     creationDate: PropTypes.string,
//     releaseDate: PropTypes.string,
//     fraction: PropTypes.number,
//   }),
// ]).isRequired,


// const hasChildren = !!(entries.length);
// { (hasChildren && showEntries)
