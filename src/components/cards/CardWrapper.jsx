/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { Box } from 'layout';

class CardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRenderCard: false,
      show: false,
    };
  }

  componentDidMount() {
    const { delay } = this.props;
    this.timer = setTimeout(() => {
      this.setState({
        shouldRenderCard: true,
        show: true,
      });
    }, delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {
      show,
      shouldRenderCard,
    } = this.state;
    const { render } = this.props;
    return (
      <Box m={2}>
        {shouldRenderCard
          && (
            <Grow
              in={show}
              {...(show ? { timeout: 300 } : {})}
            >
              <Paper
                elevation={15}
                css='display: inline-block'
              >
                {render(this.state)}
              </Paper>
            </Grow>
          )}
      </Box>
    );
  }
}

CardWrapper.defaultProps = {
  delay: 0,
};

CardWrapper.propTypes = {
  delay: PropTypes.number,
  render: PropTypes.func.isRequired,
};

export default CardWrapper;

