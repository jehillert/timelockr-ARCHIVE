import React from 'react';
import { EntryFormDialog } from 'components';
import { Box } from 'layout';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LoopIcon from '@material-ui/icons/Loop';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

//S.ActionBar = styled(Box)`
//  display: flex;
//  flex-direction: row;
//  flex-wrap: nowrap;
//  margin-top: 1rem;
//  align-items: center;
//  justify-content: flex-end;
//  grid-column: 2 / span 2;
//`;

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

class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }

  handleOpenDialog = () => {
    this.setState({ dialogIsOpen: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <S.ActionBar>
        <EntryFormDialog
          refresh={this.props.refresh}
          user_id={this.props.user_id}
          username={this.props.username}
        />
        <Fab
          aria-label='Switch-Views'
          className={`${classes.fab}`}
          color='primary'
          size='medium'
        >
          <LoopIcon />
        </Fab>
        <Fab
          aria-label='Sign Off'
          className={`${classes.fab}`}
          color='primary'
          size='medium'
        >
          <MeetingRoomIcon />
        </Fab>
        <Fab
          aria-label='Account'
          className={`${classes.fab}`}
          color='primary'
          size='medium'
        >
          <PersonIcon />
        </Fab>
        <Fab
          aria-label='Settings'
          className={`${classes.fab}`}
          color='primary'
          size='medium'
        >
          <SettingsIcon />
        </Fab>
      </S.ActionBar>
    );
  }
};

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  viewState: PropTypes.bool.isRequired
};

export default withStyles(styles)(ActionBar);