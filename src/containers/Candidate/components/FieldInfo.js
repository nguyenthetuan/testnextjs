/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-16 08:51:00
 */
import React, { PureComponent } from 'react';
import { Base } from '../../../components';

export default class FieldInfo extends PureComponent {
  render() {
    const { icon, label, value, className, hasWrapper } = this.props;

    const renderedField = (
      <span className="field-info">
        {icon && <i className={icon} />}
        <span className="info-label">{label}:</span>
        <span className="info-value">{value}</span>
      </span>
    );

    if (hasWrapper) {
      return <div className={className}>{renderedField}</div>;
    }

    return renderedField;
  }
}
