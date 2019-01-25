import React from 'react';
import {Button} from 'primereact/button';
import moment from 'moment';
import request from 'request';

class TestButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = () => {

  }

  render() {
    return (
      <div className="btn">
        <Button label="Test" className="p-button-raised p-button-text" onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default TestButton;