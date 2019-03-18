import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { DatedProgressBar } from 'Components';

const ClientRequests = require('./../../scripts/ClientRequests.js');
const S = {};

S.Card = styled(Card)`
  width: ${props => props.width};
`;

S.CardHeader = styled(CardHeader)`
  background-color: #202020;
  span {
    font-size: 1rem;
    color: #839496;
  }
`;

S.CardContent = styled(CardContent)`
  font-size: .8rem;
  padding-top: .75rem;
  padding-bottom: .75rem;
`;

S.IconButton = styled(IconButton)`
  marginLeft={props.marginLeft}
  marginRight={props.marginRight}
  marginTop={props.marginTop}
  marginBottom={props.marginBottom}
`;

/*future change: use circular progress bars instead:
  https://www.npmjs.com/package/react-circular-progressbar
  https://kimmobrunfeldt.github.io/progressbar.js/
  https://bootsnipp.com/snippets/nrDmZ */
class RightCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => (ClientRequests
    .deleteEntry(this.props.entry.id)
    .then(() => this.props.refresh())
  );

  render() {
    return (
      <S.Card width='23rem' >
        <S.CardHeader
          action={
            <IconButton onClick={this.handleClick}>
              <CloseIcon />
            </IconButton>
          }
          title={this.props.entry.label}
        />
        <S.CardContent>
          <DatedProgressBar entry={this.props.entry}/>
        </S.CardContent>
      </S.Card>
    );
  }
}

RightCard.propTypes = {
  entry: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

S.Card.propTypes = {
  width: PropTypes.string
};

S.IconButton.propTypes = {
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string
};

export default RightCard;