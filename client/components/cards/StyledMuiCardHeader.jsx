import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';

// Overrides action attribute margins.
// see https://material-ui.com/guides/interoperability/ at 'Deeper Elements'
const StyledMuiCardHeader = styled(({ ...other }) => (
  <CardHeader classes={{ action: 'action' }} {...other} />
))`
  background-color: ${props => props.theme.secondaryColor};
  span {
    color: ${props => props.theme.secondaryFontColor};
    font-size: 1rem;
  }
  & .action {
    margin-top: -16px;
    margin-right: -16px;
  }
`;

export default StyledMuiCardHeader;