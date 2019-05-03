/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  EntryFormDialogButton,
  Box,
  CardAreaTabs,
  LeftSide,
  MainMenu,
  RightSide,
} from 'components';

const S = {};

S.Middle = styled(Box)`
  grid-column: 2;
  width: 44rem;
`;

S.AppBar = styled.div`
  background-color: #A18664;
  justify-items: flex-end;
  height: 3rem;
  width: ${props => props.cardAreaWidth};
  grid-area: ${props => props.gridArea};
`;

S.AppBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 0 0.25rem 0 1rem;
`;

S.EntryFormDialogButton = styled(props => <EntryFormDialogButton {...props} />)`
  display: grid;
  margin-top: 1rem;
`;

const Main = (props) => {
  const { entries, refresh } = props;
  return (
    <Box className='grid-desktop'>
      <LeftSide gridArea='leftSide' title='TimeLockr' />
        <S.Middle>
          <S.AppBar gridArea='appBar'>
            <S.AppBarContainer><MainMenu /></S.AppBarContainer>
          </S.AppBar>
          <CardAreaTabs
            id='card-area-tabs'
            gridArea='cardArea'
            entries={entries}
            refresh={refresh}
          />
        </S.Middle>
      <RightSide gridArea='rightSide'>
          <S.EntryFormDialogButton {...props} />
      </RightSide>
    </Box>
  );
};

Main.defaultProps = {
  entries: {},
};

Main.propTypes = {
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }),
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default Main;
