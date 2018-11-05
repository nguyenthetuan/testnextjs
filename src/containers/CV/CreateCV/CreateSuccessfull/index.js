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
            <div className="content-header ">{this.t('TẠO HỒ SƠ THÀNH CÔNG')}</div>
            <div className="content-label ">
              <div>{this.t('Bạn đã tạo xong hồ sơ. Hồ sơ của bạn sẽ được JobNow kiểm duyệt trong vòng 24h. ')}</div>
              <div>{this.t('Ngay bây giờ, bạn có thể dùng hồ sơ vừa tạo để “NỘP HỒ SƠ” vào các việc làm phù hợp trên JobNow.')}</div>
            </div>

            <Button
              onClick={() => {
                this.props.history.replace('/cv');
              }}
              label={this.t('QUẢN LÝ HỒ SƠ')}
              className="jn-btn__yellow"
            />
            <Button
              onClick={() => {
                this.props.history.push('/suitable-jobs');
              }}
              label={this.t('XEM CÁC VIỆC LÀM PHÙ HỢP')}
              className="jn-btn__normal"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateSuccessfull);
