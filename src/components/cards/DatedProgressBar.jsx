import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Box } from 'layout';

const S = {};
S.Box = styled(Box)`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
`;

S.ProgressBar = styled(ProgressBar)`
  height: 1.3rem;
  margin-top: .7rem;
  margin-bottom: .7rem;
`;

const DatedProgressBar = (props) => (
  <>
    <S.Box>
      <span>Created</span>
      <span>Release</span>
    </S.Box>
    <Box>
      <S.ProgressBar variant='danger' now={props.entry.fraction * 100} />
    </Box>
    <S.Box>
      <span>{moment(props.entry.creationDate).format('MMM DD, YYYY')}</span>
      <span>{moment(props.entry.releaseDate).format('MMM DD, YYYY')}</span>
    </S.Box>
    <S.Box>
      <span>{moment(props.entry.creationDate).format('H:mm A')}</span>
      <span>{moment(props.entry.releaseDate).format('H:mm A')}</span>
    </S.Box>
  </>
);

DatedProgressBar.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default DatedProgressBar;
