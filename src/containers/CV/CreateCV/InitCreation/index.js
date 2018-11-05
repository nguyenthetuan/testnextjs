import React, { Component } from 'react';
import { Base, Button } from '../../../../components';

class InitCreation extends Base {
  render() {
    const { header } = this.props;

    return (
      <div className="create-cv-container">
        {/* Special tab at here... */}
        <div className="header-page">
          <div className="header-content">
            <div className="label-text">{header}</div>
          </div>
        </div>
        <div className="body-page">
          <div className="init-create-cv">
            <div className="init-left">
              <div className="content-label ">
                <div className="main-label">
                  <span className="label-text">{this.t('Tôi chưa có file CV')}</span>
                </div>
              </div>
              <div className="content-btn">
                <Button
                  onClick={() => {
                    this.props.createByFill();
                  }}
                  label={this.t('TẠO HỒ SƠ BẰNG ĐIỀN THÔNG TIN')}
                  className="jn-btn__yellow"
                />
              </div>
            </div>

            <div className="init-right">
              <div className="content-label ">
                <div className="main-label">
                  <span className="label-text">{this.t('Tôi đã có file CV')}</span>
                </div>
              </div>
              <div className="content-btn">
                <Button
                  onClick={() => {
                    this.props.createByCV();
                  }}
                  label={this.t('TẠO HỒ SƠ BẰNG UPLOAD CV')}
                  className="jn-btn__normal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InitCreation;
