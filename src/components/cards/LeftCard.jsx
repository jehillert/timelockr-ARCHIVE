import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

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

class LeftCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!!this.props.delay) {
      this.timer = setTimeout(() => {
        this.setState({
          shouldRender: true,
          show: true
        });
      }, this.props.delay);
    } else {
      this.setState({
        shouldRender: true,
        show: true
      });
    }
  }

  componentWillUnMount() {
  // cleanup
    clearTimeout(this.timer);
  }

  handleClick = () => (
    ClientRequests.deleteEntry(this.props.entry.id)
      .then(() => this.props.refresh())
  );

  render() {
    const show = this.state.show;
    return (
      <div>
        {this.state.shouldRender &&
          <Grow
            in={show}
            {...(show ? { timeout: 300 } : {})} >
            <Paper elevation={15}>
              <S.Card width={'20rem'}>
                <S.CardHeader
                  action={
                    <IconButton onClick={this.handleClick}>
                      <CloseIcon />
                    </IconButton>
                  }
                  title={this.props.entry.label}
                />
                <S.CardContent>
                  <Typography>
                    {this.props.entry.body}
                  </Typography>
                </S.CardContent>
              </S.Card>
            </Paper>
          </Grow>
        }
      </div>
    );
  }
}
LeftCard.propTypes = {
  delay: PropTypes.number,
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

export default LeftCard;
