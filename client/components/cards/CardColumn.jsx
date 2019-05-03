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

const CardColumn = (props) => {
  const {
    Card,
    heading,
    delayIncrement,
    entries,
    refresh,
  } = props;

  return (
    <>
      <S.Column
        ClassName='card-column'
        mt={2}
        mx={0}
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
  Card: PropTypes.elementType.isRequired,
  delayIncrement: PropTypes.number.isRequired,
  entries: PropTypes.array,
  heading: PropTypes.string,
  refresh: PropTypes.func.isRequired,
};

export default CardColumn;
