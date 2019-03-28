import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Header } from 'layout';
import { ErrorBoundary } from 'utilities';
import { CardWrapper } from 'components';

const S = {};

S.Column = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
`;

const CardColumn = (props) => {
  return (
    <>
      {props.showCards &&
        <S.Column id={props.id} m={3} marginTop={2}>
          <Header text={props.title} level='3' mx={2} />
          <ErrorBoundary>
            {props.entries.map((entry, index) => (
              <CardWrapper key={index} delay={index * props.delayIncrement} render={(wrapper) => (
                <props.Card
                  wrapper={wrapper}
                  entry={entry}
                  refresh={props.refresh}
                />)}
              />
            ))}
          </ErrorBoundary>
        </S.Column>
      }
    </>
  );
};

CardColumn.propTypes = {
  id: PropTypes.string.isRequired,
  Card: PropTypes.elementType.isRequired,
  entries: PropTypes.array,
  refresh: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default CardColumn;