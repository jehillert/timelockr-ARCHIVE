import React from 'react';
import PropTypes from 'prop-types';
import Octicon, { x } from 'octicons-react';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      color: '#A3A3A3'
    };

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover = () => (
    this.setState({hover: !this.state.hover})
  );

  render = () =>  {
    const buttonStyle = {
      color: this.state.color,
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      marginTop: '-6px',
      marginRight: '-14px',
      marginLeft: '20px',
      textAlign: 'top',
      appearance: 'none',
      background: 'transparent',
      border: '0',
      outline: 'none',
      padding: '0',
    };

    if (this.state.hover) {
      buttonStyle.color = '#DC3545';
    } else {
      buttonStyle.color = '#A3A3A3';
    }
    return (
      <button
        className='d-flex align-self-start ml-auto'
        style={buttonStyle}
        onMouseOver={this.toggleHover}
        onMouseOut={this.toggleHover}
        onClick={this.props.handleClick}>
          <Octicon icon={x}  scale={1.5} style={this.iconStyle} />
      </button>
    )
  }
}

DeleteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DeleteButton;