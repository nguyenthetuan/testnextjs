/*
 * @Author: CuongHx 
 * @Date: 2018-08-19 10:35:53 
 * @Last Modified by: 
 * @Last Modified time: 2018-09-03 12:23:11
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default class TabBar extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
    // default: PropTypes.number
  };

  static defaultProps = {
    onChange: null
    // default: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: props.data[0]
    };
  }

  _onChange = (event, item) => {
    event.preventDefault();
    this.setState({ currentTab: item });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(item.key);
    }
  };

  render() {
    const { data } = this.props;
    const { currentTab } = this.state;
    return (
      <div className="xc-tab">
        {data.map((item, index) => (
          <a className={currentTab.key === item.key ? 'active' : ''} href="#" onClick={e => this._onChange(e, item)} key={`tab-index-${index}`}>
            {item.label}
          </a>
        ))}
      </div>
    );
  }
}
