// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {
  DatedProgressBar,
  StyledMuiCardHeader,
  StyledMuiCardContent,
  LockedEntryCardMenu,
} from 'components';

const LockedEntryCard = (props) => {
  const { entry, refresh, wrapper } = props;
  const { shouldRenderCard } = wrapper;

  return (
    <>
      {shouldRenderCard
        && (
          <Card id={entry.entryId} css='width: 20rem;'>
            <StyledMuiCardHeader
              action={(
                <LockedEntryCardMenu
                  entryId={entry.entryId}
                  refresh={refresh}
                  releaseDate={entry.releaseDate}
                />
              )}
              title={entry.description}
            />
            <StyledMuiCardContent>
              <DatedProgressBar entry={entry} />
            </StyledMuiCardContent>
          </Card>
        )
      }
    </>
  );
};

LockedEntryCard.propTypes = {
  entry: PropTypes.shape({
    entryId: PropTypes.number,
    label: PropTypes.string,
    todaysDate: PropTypes.string,
    creationDate: PropTypes.string,
    releaseDate: PropTypes.string,
    fraction: PropTypes.number,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  wrapper: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default LockedEntryCard;
