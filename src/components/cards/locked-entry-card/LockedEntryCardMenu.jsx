/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
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
import { TimeExtensionDialog } from 'components';

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
      selected: '',
      shouldRenderDialog: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setDialogVisibility = this.setDialogVisibility.bind(this);
  }

  setStateAsync = Promise.promisify(this.setState);

  setDialogVisibility = () => {
    this.setState({ shouldRenderDialog: !this.state.shouldRenderDialog });
    // alert('you said extend.');
  };

  handleClick = event => (
    this.setState({ anchorEl: event.currentTarget })
  );

  handleClose = () => {
    const { handleDelete } = this.props;
    const { selected } = this.state;
    return this.setStateAsync({
      anchorEl: null,
    }).then(() => {
      if (selected === 'extend') {
        return this.setDialogVisibility();
      }
      if (selected === 'delete') {
        return handleDelete();
      }
      return undefined;
    }).then(() => this.setState({
      selected: '',
    })).catch(err => console.error(err));
  };

  handleSelect = event => this.setStateAsync({
      selected: event.currentTarget.dataset.value,
    })
    .then(() => this.handleClose())
    .catch(err => console.error(err));

  render() {
    const { anchorEl, shouldRenderDialog } = this.state;
    const { entryId, releaseDate, refresh } = this.props;
    const open = Boolean(anchorEl);

    return (
      <>
        {shouldRenderDialog
          && (
            <TimeExtensionDialog
              entryId={entryId}
              open={shouldRenderDialog}
              releaseDate={releaseDate}
              refresh={refresh}
              setDialogVisibility={this.setDialogVisibility}
            />
          )
        }
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
              onClose={this.handleClose}
              open={open}
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
  entryId: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  releaseDate: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,

};

export default LockedEntryCardMenu;
