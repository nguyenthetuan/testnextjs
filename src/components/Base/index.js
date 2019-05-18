/*
 * File: Base/index.js
 * Desc: provide abstract component what will contain default features like translate ....
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-20 22:10:44
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import language from '../../config/language/index';
import { getLanguage } from '../../utils/localData';

export default class Base extends Component {
  static propsType = {
    language: PropTypes.shape({
      langCode: PropTypes.string.isRequired,
      data: PropTypes.object.isRequired
    }).isRequired
  };

  static defaultProps = {
    language: { langCode: 'en', data: language }
  };

  constructor(props) {
    super(props);
    if (!_.isEmpty(getLanguage()) && !_.isEmpty(getLanguage().language)) {
      const locallanguage = getLanguage().language;
      language.setLanguage(locallanguage);
    } else {
      language.setLanguage(language._language);
    }
  }

  t = originalString => {
    let { data } = this.props.language || {};
    if (_.isEmpty(data)) {
      data = language;
    }
    if (data && Object.keys(data).length > 0 && data[originalString] !== undefined) {
      return data[originalString];
    }

    return originalString;
  };
}