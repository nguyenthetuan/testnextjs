import React, { Component } from 'react';
import DateTime from 'react-datetime';
import PropTypes from 'prop-types';
import 'react-datetime/css/react-datetime.css';
import Moment, { min } from 'moment';
import { _validateDigits } from '../../utils/commonFunctions';
import './style.scss';

Moment.locale();

class DatePicker extends Component {
  static propsType = {
    defaultCreatedAt: PropTypes.string,
    showHour: PropTypes.bool
  };

  static defaultProps = {
    showHour: true
  };

  constructor(props) {
    super(props);
    const { defaultCreatedAt } = props;
    if (defaultCreatedAt !== null) {
      const createdAt = defaultCreatedAt ? Moment(defaultCreatedAt) : Moment();
      this.state = {
        hour: props.showHour ? createdAt.format('HH') : '00',
        minute: props.showHour ? createdAt.format('mm') : '00',
        createdAt,
        showError: false
      };
    } else {
      this.state = {
        hour: '',
        minute: '',
        createdAt: '',
        showError: false
      };
    }
  }

  componentDidMount() {
    if (this.props.defaultCreatedAt === null) {
      this._wrapper.querySelector('.rdt > input').value = '';
    }
  }

  componentWillReceiveProps(nextProps) {
    const { defaultCreatedAt } = nextProps;
    if (
      defaultCreatedAt !== this.props.defaultCreatedAt &&
      defaultCreatedAt !== this.state.createdAt
    ) {
      if (nextProps.defaultCreatedAt !== null) {
        const createdAt = defaultCreatedAt ? Moment(defaultCreatedAt) : Moment();
        const hour = this.props.showHour ? createdAt.format('HH') : '00';
        const minute = this.props.showHour ? createdAt.format('mm') : '00';
        this.setState({ hour, minute, createdAt });
      } else {
        this.setState({
          hour: '',
          minute: '',
          createdAt: ''
        });
      }
    }
  }

  getTime = () => {
    return this._getCreatedAt();
  };

  showError = message => {
    this.setState({ showError: true, message });
  };

  hideError = () => {
    this.setState({ showError: false });
  };

  // this function will only return date
  _getSelectedDate = () => {
    return this.state.createdAt.format('DD/MM/YYYY');
  };

  // this function will return the selected date time, the server is able to understand.
  _getCreatedAt = () => {
    const createdAt = this.state.createdAt;
    return this.props.exportFormat
      ? createdAt.format(this.props.exportFormat)
      : createdAt.toISOString();
  };

  _handleOnChange = e => {
    const curHour = this.state.hour;
    const curMinute = this.state.minute;
    const createdAt = this._createUpdatedMObj(e, curHour, curMinute);
    const retrieveValFunc = this.props.retrieveValue;
    if (retrieveValFunc) {
      retrieveValFunc(
        this.props.exportFormat
          ? Moment(createdAt).format(this.props.exportFormat)
          : Moment(createdAt).toISOString()
      );
    }
    this.setState({
      createdAt: createdAt,
      hour: e && e.format ? e.format('HH') : '',
      minute: e && e.format ? e.format('MM') : ''
    });
  };

  _createUpdatedMObj = (e, curHour, curMinute) => {
    const hh = `${curHour}`.length === 1 ? `0${curHour}` : curHour;
    const mm = `${curMinute}`.length === 1 ? `0${curMinute}` : curMinute;
    return e && typeof e.format === 'function'
      ? Moment(e.format('DD/MM/YYYY').concat(` ${hh}${mm}00`), 'DD/MM/YYYY hhmmss')
      : null;
  };

  _handleHourChange = e => {
    const value = e.target.value;
    const hourVal = _validateDigits(value) ? parseInt(value, 10) : -1;

    if (hourVal >= 0 && hourVal <= 23) {
      const { minute, createdAt } = this.state;
      const newTime = this._createUpdatedMObj(createdAt, hourVal, minute);
      const retrieveValFunc = this.props.retrieveValue;
      if (retrieveValFunc) {
        retrieveValFunc(
          this.props.exportFormat
            ? Moment(createdAt).format(this.props.exportFormat)
            : Moment(createdAt).toISOString()
        );
      }
      this.setState({ createdAt: newTime, hour: hourVal });
    }
  };

  _handleMinuteChange = e => {
    const value = e.target.value;

    const minuteVal = _validateDigits(value) ? parseInt(value, 10) : -1;
    if (minuteVal >= 0 && minuteVal <= 59) {
      const { hour, createdAt } = this.state;
      const newTime = this._createUpdatedMObj(createdAt, hour, minuteVal);
      const retrieveValFunc = this.props.retrieveValue;
      if (retrieveValFunc) {
        retrieveValFunc(
          this.props.exportFormat
            ? Moment(createdAt).format(this.props.exportFormat)
            : Moment(createdAt).toISOString()
        );
      }
      this.setState({ minute: minuteVal, createdAt: newTime });
    }
  };

  _renderHourPicker = () => {
    if (this.props.showHour) {
      return [
        <span key={`dp-separator@-${Date.now()}-${Math.random()}`}>@</span>,
        <span className="hour-picker" key={`dp-hour-${Date.now()}-${Math.random()}`}>
          <input
            type="number"
            className="form-control"
            id="hours"
            onChange={e => this._handleHourChange(e)}
            value={this.state.hour}
            placeholder="00"
          />
        </span>,
        <span key={`dp-separator:-${Date.now()}-${Math.random()}`}>:</span>,
        <span className="min-picker" key={`dp-min-${Date.now()}-${Math.random()}`}>
          <input
            type="number"
            className="form-control"
            onChange={e => this._handleMinuteChange(e)}
            value={this.state.minute}
            id="minute"
            placeholder="00"
          />
        </span>
      ];
    }

    return null;
  };

  render() {
    const { label, required, className } = this.props;
    const { createdAt, showError, message } = this.state;
    return (
      <div
        className={['jn-datepicker', className].join(' ')}
        ref={r => {
          this._wrapper = r;
        }}
      >
        {label && (
          <label>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="field-wrapper">
          <div className="field-body">
            <span className="date-picker">
              <span>
                <DateTime
                  value={createdAt ? createdAt.toDate() : undefined}
                  closeOnSelect
                  onChange={e => this._handleOnChange(e)}
                  timeFormat={false}
                  dateFormat="DD/MM/YYYY"
                  isValidDate={current => {
                    if (typeof this.props.isValidDate === 'function') {
                      return this.props.isValidDate(current);
                    }
                    return true;
                  }}
                />
              </span>
              <i className="icon-datepicker" />
            </span>
            {this._renderHourPicker()}
          </div>
          {showError && <div className="error-msg">{message}</div>}
        </div>
      </div>
    );
  }
}

export default DatePicker;
