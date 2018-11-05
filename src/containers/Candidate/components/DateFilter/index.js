/*
 * File: DateFilter.js
 * Desc: genrate date filter option for saved candidates page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-18 10:24:44
 */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Base, DatePicker } from '../../../../components';
import './style.scss';

export default class DateFilter extends Base {
  static propsType = {
    options: PropTypes.shape([
      {
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }
    ]),
    value: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    onChange: PropTypes.func
  };

  static defaultProps = {
    options: [],
    value: null,
    placeholder: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      startDate: undefined,
      endDate: undefined
    };
    this._addSelect = false;
    this._renderChildrenOpts = true;
  }

  componentDidMount() {
    document.addEventListener('click', this._onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick = event => {
    if (this.state.showDropdown && !this._inputRef.contains(event.target)) {
      this.setState({ showDropdown: false });
    }
  };

  _renderDisplayValue = () => {
    const { startDate, endDate } = this.state;
    let value = this.t('Chọn thời gian');
    let startText = '';
    if (startDate) {
      startText = `${this.t('từ')} ${Moment(startDate).format('DD/MM/YYYY')}`;
    }

    let endText = '';
    if (endDate) {
      endText = `${this.t('đến')} ${Moment(endDate).format('DD/MM/YYYY')}`;
    }
    if (startText || endText) {
      value = `${startText} ${endText}`.trim();
    }

    return `${value[0].toUpperCase()}${value.slice(1)}`;
  };

  _changeState = state => {
    this.setState(state, () => {
      if (typeof this.props.onChange === 'function') {
        const { startDate, endDate } = this.state;
        this.props.onChange(startDate, endDate);
      }
    });
  };

  render() {
    const { icon } = this.props;

    const wrapperClasses = ['date-filter jn-select dropdown'];
    if (this.state.showDropdown) {
      wrapperClasses.push('open');
    }

    return (
      <div
        className={wrapperClasses.join(' ')}
        ref={r => {
          this._inputRef = r;
        }}
      >
        <div className="select-display">
          {icon && <i className={icon} />}
          <input
            type="text"
            readOnly="true"
            value={this._renderDisplayValue()}
            onClick={e => {
              this.setState({ showDropdown: true });
            }}
            className="fakeinput select form-control"
          />
          <span className={`icon-arrow-${this.state.showDropdown ? 'up' : 'down'}`} />
        </div>
        <ul className="dropdown-menu">
          <li>
            <div className="year-select-wrapper start-year">
              <span className="select-label">{this.t('Từ')}:</span>
              <DatePicker
                showHour={false}
                defaultValue={this.state.startDate}
                retrieveValue={date => {
                  this._changeState({ startDate: date });
                }}
              />
            </div>
            <div className="year-select-wrapper end-year">
              <span className="select-label">{this.t('Đến')}:</span>
              <DatePicker
                showHour={false}
                defaultValue={this.state.endDate}
                retrieveValue={date => {
                  this._changeState({ endDate: date });
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
