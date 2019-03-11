import React from 'react';
import Octicon, { x } from 'octicons-react';
import PropTypes from 'prop-types';
import { Card, DeleteButton } from 'Components';
const req = require('./../../scripts/ClientRequests');

class LeftCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /*consider moving all req.___ to Main.jsx*/
  handleClick = () => (
    req.deleteEntry(this.props.entry.id)
      .then(() => this.props.refresh())
  );

  render() {
    return (
      <Card id={this.props.entry.id} className="mb-3 shadow" bg="light" style={{ width: '24rem' }}>
        <Card.Header className='d-flex justify-content-between flex-nowrap'>
          {this.props.entry.label}
          <DeleteButton handleClick={this.handleClick}/>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {this.props.entry.body}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

LeftCard.propTypes = {
  entry: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default LeftCard;

// <Octicon icon={x} className='x ml-auto' scale={1.5} />
