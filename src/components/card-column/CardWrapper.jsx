import React from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { Box } from 'layout';
import { deleteEntry, ErrorBoundary } from 'utilities';

class CardWrapper extends React.Component {
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
    clearTimeout(this.timer);
  }

  handleClick = () => (
    deleteEntry(this.props.entry.id)
      .then(() => this.props.refresh())
  );

  render() {
    const show = this.state.show;
    return (
      <Box m={2}>
          {this.state.shouldRender &&
            <Grow
              in={show}
              {...(show ? { timeout: 300 } : {})}>
              <Paper elevation={15} style={{ display: 'inline-block' }}>
                {this.props.render(this.state)}
              </Paper>
            </Grow>
          }
      </Box>
    );
  }
}

CardWrapper.propTypes = {
  delay: PropTypes.number,
  render: PropTypes.func.isRequired
};

export default CardWrapper;
