/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-02 08:45:24
 */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { jobApi } from '../../../services';
import Base from '../../Base';
import Button from '../../Button';
import Radios from '../../Radio';
import './style.scss';

class LoggedInApply extends Base {
  constructor(props) {
    super(props);
    this.state = {
      selectedCv: null,
      showError: false,
      message: { code: 0 },
      popupStatus: props.popupStatus
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popupStatus && nextProps.popupStatus !== this.state.popupStatus) {
      this.setState({ message: null, popupStatus: nextProps.popupStatus });
    }
  }

  _handleApplyClick = async () => {
    if (!this.state.selectedCv && !this.state.showError) {
      this.setState({ showError: true });
    } else {
      const { job } = this.props;
      const { selectedCv } = this.state;
      const response = await jobApi.applyJob({ job: job._id, resume: selectedCv });
      if (response && response.result === true) {
        this.setState({ message: { code: 0 } });
      } else {
        this.setState({ message: { code: 1 } });
      }
    }
  };

  render() {
    const { cv, job, user } = this.props;
    const { title, company } = job || {};

    const opts = (cv || []).map((item, index) => {
      const radioLabel = (
        <div className="label-wrapper">
          <div className="cv-icon-wrapper">
            <img src="/assets/img/cv-icon.png" alt="" />
          </div>
          <div className="info-wrapper">
            <div className="cv-title">{item.title}</div>
            <div className="cv-name">{user.fullname}</div>
          </div>
        </div>
      );
      return { label: radioLabel, value: item._id };
    });
    const { message } = this.state;

    return (
      <div className="loggedin-apply-wrapper">
        {message && message.code === 0 ? (
          <div className="apply-success-msg">{this.t('components').AdvancedSearch.LoggedInApply.applySuccess}</div>
        ) : (
          <div className="job-info">
            <div className="job-title">{title}</div>
            <div className="company-name">{company && company.name}</div>
          </div>
        )}
        {(!message || message.code !== 0) && (
          <div className="form-wrapper">
            {message && <div className="error-message">{this.t('components').AdvancedSearch.LoggedInApply.errorMessage}</div>}
            <Radios
              options={opts}
              value={this.state.selectedCv}
              onChange={value => {
                this.setState({ showError: false, selectedCv: value });
              }}
            />
            {this.state.showError && (
              <div className="help-block" style={{ display: 'block' }}>
                {this.t('components').AdvancedSearch.LoggedInApply.helpBlock}
              </div>
            )}
            <Button className="jn-btn__yellow jn-btn-apply" label={this.t('components').AdvancedSearch.LoggedInApply.btnApply} onClick={this._handleApplyClick} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ cv: state.auth.cvList, user: state.auth.info }),
  {}
)(LoggedInApply);
