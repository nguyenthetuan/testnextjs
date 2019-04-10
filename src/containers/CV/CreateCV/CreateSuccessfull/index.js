import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Base, Button } from '../../../../components';

import './styles.scss';

class CreateSuccessfull extends Base {
  render() {
    return (
      <div className="create-cv-container">
        <div className="body-page">
          <div className="successfull-create-cv">
            <div className="content-header ">{this.t('containers').CV.CreateCV.CreateSuccessfull.createCV}</div>
            <div className="content-label ">
              <div>{this.t('containers').CV.CreateCV.CreateSuccessfull.label1}</div>
              <div>{this.t('containers').CV.CreateCV.CreateSuccessfull.label2}</div>
            </div>

            <Button
              onClick={() => {
                this.props.history.replace('/cv');
              }}
              label={this.t('containers').CV.CreateCV.CreateSuccessfull.cv}
              className="jn-btn__yellow"
            />
            <Button
              onClick={() => {
                this.props.history.push('/suitable-jobs');
              }}
              label={this.t('containers').CV.CreateCV.CreateSuccessfull.suitableJobs}
              className="jn-btn__normal"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateSuccessfull);
