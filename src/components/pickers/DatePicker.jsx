import React from 'react';
const { Octicon, Octicons } = require('octicons-react');
import PropTypes from 'prop-types';
import { Button
        , Calendar
        , Col
        , Form
        , InputGroup } from 'Components';



// ADD ERROR-BOUNDARY STUFF




class DatePicker extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <InputGroup id={props.id} className="field-group mb-3">
        <Form.Row>
          <Col><Form.Label>{props.label}</Form.Label></Col>
        </Form.Row>
        <Form.Row>
          <Col className='d-flex flex-nowrap'>
            <InputGroup.Prepend>
              <button className='icon-btn' >
                <Octicon icon={Octicons[props.icon]} scale={2.75} />
              </button>
            </InputGroup.Prepend>
            <Form.Control {...props} className='align-self-stretch' /></Col>
        </Form.Row>
      </InputGroup>
    );
  }
}

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default DatePicker;