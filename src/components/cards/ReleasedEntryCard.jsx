import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { deleteEntry } from 'utilities';
import { Box } from 'layout';
import { StyledMuiCardContent
  , StyledMuiCardHeader } from 'components';

const S = {};

S.Card = styled(Card)`
 width: 19rem;
`;

// Overrides IconButton padding
// see https://www.styled-components.com/docs/basics
// at Pseudoelements, pseudoselectors, and nesting
S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 8px 7px 8px 7px;
  }
`;

const ReleasedEntryCard = (props) => {
  const { entry, refresh } = props;
  const shouldRender = props.wrapper.shouldRender;

  const handleClick = () => (
    deleteEntry(entry.id)
      .then(() => refresh())
  );

  return (
    <Box display='flex'>
      {shouldRender &&
        <S.Card id={entry.id}>
          <StyledMuiCardHeader
            action={
              <S.IconButton className='s-icon-button' onClick={handleClick}>
                <CloseIcon />
              </S.IconButton>
            }
            title={entry.label}
          />
          <StyledMuiCardContent>
            <Typography>
              {entry.body}
            </Typography>
          </StyledMuiCardContent>
        </S.Card>
      }
    </Box>
  );
};

ReleasedEntryCard.propTypes = {
  entry: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  render: PropTypes.func
};

export default ReleasedEntryCard;
