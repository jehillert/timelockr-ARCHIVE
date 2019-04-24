/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  EntryFormDialog,
} from 'components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
    <>
      <EntryFormDialog
        refresh={refresh}
        userId={userId}
        username={username}
      />
    </>
  );
}

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(ActionBar);
