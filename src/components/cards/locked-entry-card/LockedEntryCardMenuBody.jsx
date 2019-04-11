import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

function LockedEntryCardMenuBody(props) {
  const {
    anchorEl,
    handleClose,
    handleSelect,
    open,
  } = props;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Paper>
        <Menu
          id='right-card-menu'
          anchorEl={anchorEl}
          onClose={handleClose}
          open={open}
        >
          <MenuItem data-value='extend' onClick={handleSelect}>
            <ListItemIcon>
              <HourglassEmptyIcon />
            </ListItemIcon>
            <ListItemText inset primary='Extend Time' />
          </MenuItem>
          <MenuItem data-value='delete' onClick={handleSelect}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText inset primary='Delete Entry' />
          </MenuItem>
          <MenuItem data-value='close' onClick={handleClose}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText inset primary='Exit' />
          </MenuItem>
        </Menu>
      </Paper>
    </ClickAwayListener>
  );
}

LockedEntryCardMenuBody.defaultProps = {
  anchorEl: null,
};

LockedEntryCardMenuBody.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  handleClose: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default LockedEntryCardMenuBody;
