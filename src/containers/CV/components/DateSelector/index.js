import React from 'react';
import Momment from 'moment';
import { Base, Select } from '../../../../components';
import './style.scss';

export default class DateSelector extends Base {
  constructor(props) {
    super(props);
    this.state = this._parseValue(props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this._getValueString()) {
      this.setState(this._parseValue(nextProps.value));
    }
  }

  _parseValue = (value = undefined) => {
    const parsingValue = (value !== undefined && value) || this.props.value;
    if (typeof parsingValue === 'string') {
      const date = Momment(parsingValue, ['YYYY/MM', 'YYYY-MM-DD']);

      if (date.isValid()) {
        return { month: { value: date.month() + 1, label: date.month() + 1 }, year: { value: date.year(), label: date.year() } };
      }
    }

    const currentYear = parseInt(Momment().format('YYYY'), 10);
    return { month: { value: 1, label: 1 }, year: { value: currentYear, label: currentYear } };
  };

  _generateOptions = () => {
    let yearOpts = [];
    const currentYear = parseInt(Momment().format('YYYY'), 10);
    for (let i = currentYear; i >= 1970; i--) {
      yearOpts.push({ value: i, label: i });
    }

    let monthOpts = [];
    for (let i = 1; i <= 12; i++) {
      monthOpts.push({ value: i, label: i });
    }

    return { yearOpts, monthOpts };
  };

  _getValueString = () => {
    const { year, month } = this.state;
    return `${year.value}/${month.value}`;
  };

  _updateValues = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this._getValueString());
    }
  };

  render() {
    const { monthOpts, yearOpts } = this._generateOptions();
    const { year, month } = this.state;

    return (
      <div className="jn-date-seletor">
        <Select
          options={monthOpts}
          className="month-selector"
          value={[month]}
          onChange={selected => {
            this.setState({ month: { ...selected[0] } }, this._updateValues);
          }}
        />
        <Select
          options={yearOpts}
          className="year-selector"
          value={[year]}
          onChange={selected => {
            this.setState({ year: { ...selected[0] } }, this._updateValues);
          }}
        />
      </div>
    );
  }
}
