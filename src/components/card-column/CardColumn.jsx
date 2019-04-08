/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
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
// console.log('---------------------------------')
// <S.Column id={id} m={3} marginTop={2}>
// </S.Column>

const CardColumn = (props) => {
  const {
    Card,
    id,
    heading,
    delayIncrement,
    entries,
    refresh,
    showCards,
  } = props;

  return (
    <>
      <S.Column
        id={id}
        marginTop={2}
        {...props}
      >
        <Header text={heading} level='3' mx={2} />
        {entries.map((entry, index) => (
          <CardWrapper
            key={entry.entryId}
            delay={index * delayIncrement}
            render={wrapper => (
              <Card
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
