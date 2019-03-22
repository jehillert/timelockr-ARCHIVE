import React from 'react';
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
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class RightCardMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (e) => {
    this.setState({
      anchorEl: null
    }, () => {
      alert(e.currentTarget.dataset.callback);
        if (e.currentTarget.attributes['callback'].value === 'extend') {
        this.props.handleDelete();
      } else if (e.currentTarget.attributes['callback'].value === 'delete') {
        this.props.handleExtend();
      }
    });
  };

  render() {
    const { classes } = this.props;
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label='More'
          aria-owns={open ? 'right-card-menu' : undefined}
          aria-haspopup='true'
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Paper>
          <ClickAwayListener onClickAway={this.handleClose}>
            <Menu
              id='right-card-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem className={classes.menuItem} data-callback='rcm-extend' onClick={this.handleClose}>
                <ListItemIcon className={classes.icon}>
                  <HourglassEmptyIcon />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary='Extend Time' />
              </MenuItem>
              <MenuItem className={classes.menuItem} data-callback='rcm-delete' onClick={this.handleClose}>
                <ListItemIcon className={classes.icon}>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary='Delete Entry' />
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={this.handleClose}>
                <ListItemIcon className={classes.icon}>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary='Exit' />
              </MenuItem>
            </Menu>
          </ClickAwayListener>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(RightCardMenu);