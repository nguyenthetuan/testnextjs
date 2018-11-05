/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 14:40:23
 */
import React from 'react';
import Moment from 'moment';
import { Base, Button } from '../../../components';
import FieldInfo from './FieldInfo';

export default class MainInfoBlock extends Base {
  render() {
    const {
      title,
      name,
      fullname,
      dateofbirth,
      photo,
      address,
      gender,
      view_information,
      phone,
      email
    } = this.props.info;
    const avatar = (photo && photo.url) || '/assets/img/default-avatar.png';
    const renderedPhone = view_information && view_information.viewed ? view_information.phone : 'xxxxxxxxxx';
    const renderedEmail = view_information && view_information.viewed ? view_information.email : 'xxxxxxxxxx@xxx.xxx';
    const isFastAppliedCandidate = window.location.href.indexOf('ja_candidate=true') > -1;

    return (
      <div
        className={`block-container candidate-info${
          isFastAppliedCandidate ? ' fast-candidate' : ''
        }`}
      >
        <div className="block-header">
          <div className="title">
            {this.t('Hồ sơ ứng viên')} {fullname || name}
          </div>
          {(!view_information || !view_information.viewed)
            && !phone && (
              <Button
                label={this.t('Xem thông tin liên hệ')}
                onClick={this.props.showViewInfoConfirm}
                className="jn-btn__yellow"
              />
          )}
        </div>
        <div className="block-body info-wrapper">
          <div className="avatar-wrapper">
            <img src={avatar} alt="" />
          </div>
          <div className="info">
            <div className="candidate-name">{fullname || name}</div>
            <div className="candidate-title">{title}</div>

            <div className="extra-info">
              {!isFastAppliedCandidate && (
                <div className="info-col">
                  <div className="gender-bird-info">
                    <FieldInfo
                      label={this.t('Giới tính')}
                      value={this.t((gender === 'male' && 'Nam') || 'Nữ')}
                    />
                    <span className="separator">|</span>
                    <FieldInfo
                      label={this.t('Ngày sinh')}
                      value={Moment(dateofbirth).format('DD/MM/YYYY')}
                    />
                  </div>
                  <FieldInfo
                    label={this.t('Địa chỉ')}
                    value={address}
                    className="address-info"
                    hasWrapper
                  />
                </div>
              )}
              <div className="info-col">
                <FieldInfo
                  label={this.t('Số điện thoại')}
                  value={phone || renderedPhone}
                  className="phone-info"
                  hasWrapper
                />
                <FieldInfo
                  label={this.t('Email')}
                  value={email || renderedEmail}
                  className="email-info"
                  hasWrapper
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
