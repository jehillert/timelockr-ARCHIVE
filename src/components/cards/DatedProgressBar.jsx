import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Box } from 'Components';

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
  <div style={{ width: '100%' }}>
    <S.Box>
      <div>Created</div>
      <div>Release</div>
    </S.Box>
    <Box>
      <S.ProgressBar variant="danger" now={props.entry.fraction * 100} />
    </Box>
    <S.Box>
      <div>{moment(props.entry.creationDate).format('MMM DD, YYYY')}</div>
      <div>{moment(props.entry.releaseDate).format('MMM DD, YYYY')}</div>
    </S.Box>
    <S.Box>
      <div>{moment(props.entry.creationDate).format('H:mm A')}</div>
      <div>{moment(props.entry.releaseDate).format('H:mm A')}</div>
    </S.Box>
  </div>
);

DatedProgressBar.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default DatedProgressBar;
