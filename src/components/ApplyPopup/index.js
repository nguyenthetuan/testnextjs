/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-02 01:37:54
 */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Base from '../Base';
import Popup from '../Popup';
import FastApply from './FastApply';
import LoggedInApply from './LoggedInApply';
import './style.scss';

class ApplyPopup extends Base {
  constructor(props) {
    super(props);

    this.state = {
      popupStatus: props.show
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.popupStatus !== nextProps.show) {
      this.setState({ popupStatus: nextProps.show });
    }
  }

  render() {
    const { isLoggedIn, job, cvList } = this.props;
    const wrapperClasses = ['apply-popup-wrapper'];
    if (!cvList || cvList.length === 0) wrapperClasses.push('empty-cv-list');
    if (isLoggedIn) wrapperClasses.push('logged-in');

    return (
      <Popup
        showBox
        clickOutToClose
        className={wrapperClasses.join(' ')}
        toggleButton=".jn-apply-btn a, .auth-pop-wrapper .modal"
        show={this.props.show}
        onClose={() => {
          this.setState({ popupStatus: false }, this.props.hidePopup);
        }}
      >
        <a
          href="#"
          className="close-btn"
          onClick={event => {
            event.preventDefault();
            this.setState({ popupStatus: false }, this.props.hidePopup);
          }}
        >
          <span className="icon-jn-close" />
        </a>
        {(!isLoggedIn || !cvList || cvList.length === 0) && <FastApply job={job} popupStatus={this.state.popupStatus} />}
        {isLoggedIn && cvList && cvList.length > 0 && <LoggedInApply job={job} popupStatus={this.state.popupStatus} />}
      </Popup>
    );
  }
}

export default connect(state => ({ isLoggedIn: state.auth.isLoggedIn, cvList: state.auth.cvList }))(ApplyPopup);
