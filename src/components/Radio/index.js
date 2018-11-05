/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-26 11:01:52
 */
import React from 'react';
import Base from '../Base';
import './style.scss';

export default class Radios extends Base {
  static idNo = 0;

  constructor(props) {
    super(props);
    this.state = {
      value: `${props.value}` || '',
      showError: false
    };
    this._id = ++Radios.idNo;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  showError = message => {
    this.setState({ showError: true, message });
  };

  hideErrorMessage = () => {
    this.setState({ showError: false });
  };

  _onChange = event => {
    if (event.target.checked) {
      this.setState({ value: event.target.value }, this._updateToParent);
    }
  };

  _onLabelClick = (event, opt) => {
    event.preventDefault();
    this.setState({ value: `${opt.value}` }, this._updateToParent);
  };

  _updateToParent = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value);
    }
  };

  render() {
    const { name, options, label, required } = this.props;
    const { showError, message } = this.state;

    if (!options || options.length === 0) {
      return null;
    }

    return (
      <div className={`jn-radios${(label && ' has-label') || ''}`}>
        {label && (
          <label>
            {this.t(label)}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="control-wrapper">
          <div className="controls">
            {options.map((opt, index) => {
              return (
                <div className="radio" key={`radio-${this._id}-${index}`}>
                  <label>
                    <input
                      type="radio"
                      name={name}
                      value={opt.value}
                      checked={this.state.value === `${opt.value}`}
                      onChange={this._onChange}
                    />
                    <span className="circle" />
                    <span className="check" />
                  </label>
                  <div className="label-wrapper">
                    <a
                      href="#"
                      className="main-text"
                      onClick={event => {
                        this._onLabelClick(event, opt);
                      }}
                    >
                      {this.t(opt.label)}
                    </a>
                    {opt.extraComponent}
                  </div>
                </div>
              );
            })}
          </div>
          {showError && <div className="error-msg">{message}</div>}
        </div>
      </div>
    );
  }
}
