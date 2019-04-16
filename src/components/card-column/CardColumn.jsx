/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Box,
  CardWrapper,
  Header,
} from 'components';

const S = {};

S.Column = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
`;

/*
When you moved key into wrapper component.
When cardmenu made conditional on existence of id.
    LockedEntryCard      23
    StyledMuiCardHeader  8
    LockedEntryCard      21
    LockedEntryCard      20
    CardColumn           73
    CardWrapper          46
    CardWrapper          42
    CardWrapper          39
    CardColumn           69

When you moved key into wrapper component.
    LockedEntryCard:      23
    StyledMuiCardHeader:  8
    LockedEntryCard:      21
    LockedEntryCard:      20
    CardColumn:           45
    CardWrapper:          46
    CardWrapper:          42
    CardWrapper:          39
    CardColumn:           41

When you moved key into wrapped component.
    LockedEntryCardMenuBody  24
    LockedEntryCardMenuBody  23
    LockedEntryCardMenuBody  22
    LockedEntryCardMenu      103
    LockedEntryCard          23
    StyledMuiCardHeader      8
    LockedEntryCard          21
    LockedEntryCard          20
    CardColumn               45
    CardWrapper              46
    CardWrapper              42
    CardWrapper              39
    CardColumn               41
*/

const CardColumn = (props) => {
  const {
    Card,
    id,
    heading,
    delayIncrement,
    entries,
    refresh,
  } = props;

  return (
    <>
      <S.Column
        id={id}
        marginTop={2}
        {...props}
      >
        {heading && <Header text={heading} level='3' mx={2} />}
        {entries.map((entry, index) => (
          <CardWrapper
            key={entry.entryId.toString()}
            delay={index * delayIncrement}
            render={wrapper => (
              <Card
                key={entry.entryId.toString()}
                wrapper={wrapper}
                entry={entry}
                refresh={refresh}
              />
            )}
          />
        ))}
      </S.Column>
    </>
  );
};

CardColumn.propTypes = {
  id: PropTypes.string.isRequired,
  Card: PropTypes.elementType.isRequired,
  delayIncrement: PropTypes.number.isRequired,
  entries: PropTypes.array,
  heading: PropTypes.string,
  refresh: PropTypes.func.isRequired,
};

export default CardColumn;
