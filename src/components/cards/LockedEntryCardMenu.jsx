import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Promise from 'bluebird';
import styled from 'styled-components';

const S = {};

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 11px 5px 11px 5px;
  }
`;

class LockedEntryCardMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      selected: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  setStateAsync = Promise.promisify(this.setState);

  handleClick = event => {
    return this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    return this.setStateAsync({
      anchorEl: null,
    }).then(() => {
      if (this.state.selected === 'extend') {
        return this.props.handleExtend();
      }
      if (this.state.selected === 'delete') {
        return this.props.handleDelete();
      }
    }).then(() => this.setState({
      selected: ''
    })).catch (err => console.error(err));
  };

  handleSelect = (event) => {
    return this.setState({
      selected: event.currentTarget.dataset.value
    },
    (err) => {
      if (err) {
        return console.error(err);
      }
      return this.handleClose();
    });
  };

  render() {
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);

    return (
      <>
        <S.IconButton
          aria-label='More'
          aria-owns={open ? 'right-card-menu' : undefined}
          aria-haspopup='true'
          className='s-icon-button'
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </S.IconButton>
        <Paper>
          <ClickAwayListener onClickAway={this.handleClose}>
            <Menu
              id='right-card-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem data-value='extend' onClick={this.handleSelect}>
                <ListItemIcon>
                  <HourglassEmptyIcon />
                </ListItemIcon>
                <ListItemText inset primary='Extend Time' />
              </MenuItem>
              <MenuItem data-value='delete' onClick={this.handleSelect}>
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText inset primary='Delete Entry' />
              </MenuItem>
              <MenuItem data-value='close' onClick={this.handleClose}>
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText inset primary='Exit' />
              </MenuItem>
            </Menu>
          </ClickAwayListener>
        </Paper>
      </>
    );
  }
}

LockedEntryCardMenu.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleExtend: PropTypes.func.isRequired,
};

export default LockedEntryCardMenu;

