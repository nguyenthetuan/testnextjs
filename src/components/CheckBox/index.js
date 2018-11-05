/*
 * File: components/Checkbox/index.js
 * Desc: generate checkbox component
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-23 15:19:33
 */
import React, { PureComponent } from 'react';
import './style.scss';

export default class CheckBox extends PureComponent {
  _onValueChange = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this._checkboxInput.checked);
    }
  };

  render() {
    const { label } = this.props;
    return (
      <span className="jn-checkbox">
        <span className="checkbox">
          <label
            ref={r => {
              this._labelRef = r;
            }}
          >
            <input
              type="checkbox"
              value="1"
              id={this.props.id}
              onChange={this._onValueChange}
              checked={this.props.checked}
              ref={r => {
                this._checkboxInput = r;
              }}
            />
            <span className="checkbox-material">
              <span className="check" />
            </span>
          </label>
        </span>
        {label && (
          <a
            href="#"
            className="checkbox-label"
            onClick={event => {
              event.preventDefault();
              this._labelRef.click();
            }}
          >
            {label}
          </a>
        )}
      </span>
    );
  }
}
