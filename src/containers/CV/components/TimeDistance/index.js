import React from 'react';
import PropTypes from 'prop-types';

import { Base, CheckBox } from '../../../../components';
import DateSelector from '../DateSelector';
import './styles.scss';

class TimeDistance extends Base {
  static propsType = {
    showCurrentWorking: PropTypes.bool
  };

  static defaultProps = {
    showCurrentWorking: false
  };

  constructor(props) {
    super(props);
    const { time_start, time_end, current } = props.data;

    console.log('dasdasdasdasda', this.props.data);
    this.state = {
      time_start: time_start || new Date(),
      time_end: time_end || new Date(),
      current: current || false
    };
  }

  _onChangeCurrentWork = value => {
    this.setState({ current: value }, () => {
      this.props.onChange(this.state);
    });
  };

  _updateTime = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ ...this.state });
    }
  };

  render() {
    const { time_start, time_end, current } = this.state;
    const { label, required, showCurrentWorking } = this.props;
    return (
      <div className="time-distance-container">
        {label && (
          <label>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="field-wrapper">
          <div className="field-body">
            <DateSelector
              value={time_start}
              onChange={value => {
                this.setState({ time_start: value }, this._updateTime);
              }}
            />
            <div className="seperate">{this.t('đến')}</div>
            {!current ? (
              <DateSelector
                value={time_end}
                onChange={value => {
                  this.setState({ time_end: value }, this._updateTime);
                }}
              />
            ) : (
              <div className="current-job">{this.t('hiện tại')}</div>
            )}
          </div>
          {showCurrentWorking && (
            <div className="working-checkbox">
              <CheckBox
                label={this.t('Công việc hiện tại')}
                checked={current}
                onChange={value => {
                  this.setState({ current: value }, this._updateTime);
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TimeDistance;
