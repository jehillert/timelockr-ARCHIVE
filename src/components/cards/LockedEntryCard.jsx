import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { DatedProgressBar
  , StyledMuiCardHeader
  , StyledMuiCardContent
  , LockedEntryCardMenu } from 'components';
import { deleteEntry } from 'utilities';

const LockedEntryCard = (props) => {
  const { entry, refresh } = props;
  const shouldRender = props.wrapper.shouldRender;

  const handleDelete = () => (
    deleteEntry(entry.id)
      .then(() => refresh())
  );

  const handleExtend = () => {
    alert('you said extend.');
  };

  return (
    <>
      {shouldRender &&
        <Card id={entry.id} style={{ width: '20rem' }}>
          <StyledMuiCardHeader
            action={
              <LockedEntryCardMenu handleDelete={handleDelete} handleExtend={handleExtend} />
            }
            title={entry.label}
          />
          <StyledMuiCardContent>
            <DatedProgressBar entry={entry}/>
          </StyledMuiCardContent>
        </Card>
      }
    </>
  );
};

LockedEntryCard.propTypes = {
  entry: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default LockedEntryCard;