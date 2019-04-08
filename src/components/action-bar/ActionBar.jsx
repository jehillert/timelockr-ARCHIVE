/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { EntryFormDialog } from 'components';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import LoopIcon from '@material-ui/icons/Loop';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../box/Box';


/*
S.ActionBar = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-end;
  grid-column: 2 / span 2;
 `;
*/
const S = {};

S.ActionBar = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
});

function ActionBar(props) {
  const {
    classes,
    refresh,
    userId,
    username,
  } = props;
  return (
    <S.ActionBar>
      <EntryFormDialog
        refresh={refresh}
        userId={userId}
        username={username}
      />
      <Fab
        aria-label='Switch-Views'
        className={classes.fab}
        color='primary'
        size='medium'
      >
        <LoopIcon />
      </Fab>
      <Fab
        aria-label='Sign Off'
        className={classes.fab}
        color='primary'
        size='medium'
      >
        <MeetingRoomIcon />
      </Fab>
      <Fab
        aria-label='Account'
        className={classes.fab}
        color='primary'
        size='medium'
      >
        <PersonIcon />
      </Fab>
      <Fab
        aria-label='Settings'
        className={classes.fab}
        color='primary'
        size='medium'
      >
        <SettingsIcon />
      </Fab>
    </S.ActionBar>
  );
}

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(ActionBar);
