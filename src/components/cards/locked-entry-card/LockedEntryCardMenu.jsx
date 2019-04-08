import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TimeExtensionDialog,
  LockedEntryCardMenuBody,
} from 'components';

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
  }

  setStateAsync = Promise.promisify(this.setState);

  setDialogVisibility = () => (
    this.setState({ shouldRenderDialog: !this.state.shouldRenderDialog })
  );

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
        <LockedEntryCardMenuBody
          anchorEl={anchorEl}
          handleClose={this.handleClose}
          handleSelect={this.handleSelect}
          open={open}
        />
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
