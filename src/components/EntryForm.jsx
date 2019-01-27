var debug = require('debug')('components:EntryForm');
import React from 'react';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {InputMask} from 'primereact/inputmask';
import {Calendar} from 'react-calendar';
import moment from 'moment';

// moment.defaultFormat = "YYYY-DD-MM HH:mm";

class EntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creation_date: new moment(),
      release_date: new moment(),
      secret_label: `A funny description...`,
      secret_body: `...of something people would want to forget.`,
      val3: null,
      val7: null
    };
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onOpen = this.onOpen.bind(this);

  }

  // Calendar should handle day and month. TimeInput should handle time of day.
  handleDateSelect(e) {
    this.setState({
      [e.currentTarget.id]: e.currentTarget.value
    });
  }

  // For just Calendar should handle day and month. TimeInput should handle time of day.
  handleTimeSelect(e) {
    this.setState({[e.currentTarget.id]: e.currentTarget.value});
  }

  handleChange(e) {
      this.setState({[e.target.id]: e.target.value});
  }

  onOpen() {
      this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
  }

  toggle() {
      this.setState({disabled: !this.state.disabled});
  }

  render() {
    const keys = Object.keys(this.state);

    return (
      <div>
        <div>
          <h4> Enter something you wish to forget. </h4>
            <InputText id="secret_label" value={this.state.secret_label} onChange={this.handleChange} />
            <p></p>
            <InputTextarea id="secret_body" rows={3} cols={30} value={this.state.secret_body} onChange={this.handleChange} autoResize={true} />
        </div>

        <div>
          <h4> Enter date to remember it by. </h4>
          <div className="p-col-12 p-md-4">
              <h3>Time</h3>
              <InputMask
                mask="99:99"
                value={this.state.val7}
                placeholder="99:99"
                slotChar="hh:mm"
                onChange={(e) => this.setState({val7: e.value})}/>
          </div>

          <div className="p-col-12 p-md-4">
              <h3>Date {this.state.val3}</h3>
              <InputMask
                mask="99/99/9999"
                value={this.state.val3}
                placeholder="99/99/9999"
                slotChar="mm/dd/yyyy"
                onChange={(e) => this.setState({val3: e.value})}/>
          </div>

          <Calendar
            value={this.state.date}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default EntryForm;
