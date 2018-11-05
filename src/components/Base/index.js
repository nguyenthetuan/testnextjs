/*
 * File: Base/index.js
 * Desc: provide abstract component what will contain default features like translate ....
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-20 22:10:44
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Base extends Component {
  static propsType = {
    language: PropTypes.shape({
      langCode: PropTypes.string.isRequired,
      data: PropTypes.object.isRequired
    }).isRequired
  };

  static defaultProps = {
    language: { langCode: 'en', data: {} }
  };

  t = originalString => {
    const { data } = this.props.language || {};
    if (data && Object.keys(data).length > 0 && data[originalString] !== undefined) {
      return data[originalString];
    }

    return originalString;
  };
}
