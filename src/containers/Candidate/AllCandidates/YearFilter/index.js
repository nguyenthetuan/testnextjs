/*
 * File: YearFilter.js
 * Desc: genrate year filter option for all candidates page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-18 10:24:44
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Base, Select } from '../../../../components';
import './style.scss';

export default class YearFilter extends Base {
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
    let selected = props.placeholder;
    if (!selected && props.options.length) {
      selected = props.options[0];
    }
    this.state = {
      showDropdown: false,
      startYear: [selected],
      endYear: [selected]
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
    const { startYear, endYear } = this.state;
    let value = this.t('Tất cả năm sinh');
    let startText = '';
    if (startYear[0] && startYear[0].value) {
      startText = `${this.t('từ')} ${startYear[0].value}`;
    }

    let endText = '';
    if (endYear[0] && endYear[0].value) {
      endText = `${this.t('đến')} ${endYear[0].value}`;
    }
    if (startText || endText) {
      value = `${startText} ${endText}`.trim();
    }

    return `${value[0].toUpperCase()}${value.slice(1)}`;
  };

  _handleYearChange = () => {
    if (typeof this.props.onChange === 'function') {
      const { startYear, endYear } = this.state;
      this.props.onChange(startYear[0].value, endYear[0].value);
    }
  };

  render() {
    const { options, icon } = this.props;
    let dropdownOpts = options;

    const wrapperClasses = ['year-filter jn-select dropdown'];
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
              <span className="select-label">{this.t('từ năm')}</span>
              <Select
                options={dropdownOpts}
                value={this.state.startYear}
                onChange={startYear => {
                  this.setState({ startYear }, this._handleYearChange);
                }}
              />
            </div>
            <div className="year-select-wrapper end-year">
              <span className="select-label">{this.t('đến năm')}</span>
              <Select
                options={dropdownOpts}
                value={this.state.endYear}
                onChange={endYear => {
                  this.setState({ endYear }, this._handleYearChange);
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
