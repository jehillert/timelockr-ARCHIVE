/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ActionBar,
  Box,
  CardAreaTabs,
  LeftHead,
  LeftSide,
  MainMenu,
  RightHead,
  RightSide,
} from 'components';

const S = {};

S.AppBar = styled.div`
  grid-area: ${props => props.gridArea};
  justify-items: flex-end;
  background-color: #A18664;
`;

S.AppBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 46.5rem;
  padding: 1rem 2rem;
`;

S.ActionBar = styled(props => <ActionBar {...props} />)`
  display: grid;
  margin-top: 1rem;
`;

const Main = (props) => {
  const { entries, refresh } = props;
  return (
    <Box className='grid-desktop'>
      <LeftHead gridArea='leftHead'><h1>TimeLockr</h1></LeftHead>
      <LeftSide gridArea='leftSide' />
      <S.AppBar gridArea='appBar'>
        <S.AppBarContainer><MainMenu /></S.AppBarContainer>
      </S.AppBar>
      <CardAreaTabs
        gridArea='cardArea'
        entries={entries}
        refresh={refresh}
      />
      <RightHead gridArea='rightHead' />
      <RightSide gridArea='rightSide'>
          <S.ActionBar
            {...props}
          />
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
