/*
 * File: components/Button
 * Desc: generate button component base on design
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-07 08:02:15
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAuthPopup } from '../../actions/auth';
import './style.scss';

class Button extends PureComponent {
  // static propsType = {
  //   requiredAuth: PropTypes.bool
  // };

  // static defaultProps = {
  //   requiredAuth: false
  // };

  _onClick = event => {
    event.preventDefault();
    // show auth popup for case button required login
    const { requiredAuth, isLoggedIn } = this.props;

    if (requiredAuth && !isLoggedIn) {
      this.props.showAuthPopup('login');
      return;
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  };

  render() {
    const { label, children, className } = this.props;
    let classes = ['jn-btn'];
    classes.push(className);
    return (
      <div className={classes.join(' ')}>
        <a href="#" onClick={this._onClick}>
          {label || children}
        </a>
      </div>
    );
  }
}

export default connect(
  state => ({ isLoggedIn: state.auth.isLoggedIn }),
  { showAuthPopup }
)(Button);
