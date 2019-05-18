/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-06 10:12:12
 */
import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Base, Button } from '../../../../components';
import AccountForm from '../../../Account/Information/AccountForm';
import './style.scss';

class GeneralInfo extends Base {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  _renderViewBlock = () => {
    const { info, constants } = this.props;
    const { address, avatar, dateofbirth, email, fullname, gender, level, marital_status, phone } = info;

    return (
      <div className="block-body">
        <div className="avatar-wrapper">
          <img src={avatar} alt="" />
        </div>

        <div className="main-info-wrapper">
          <div className="col">
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.name}:</div>
              <div className="info-value">{fullname}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.phone}:</div>
              <div className="info-value">{phone}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.email}:</div>
              <div className="info-value">{email}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.date}:</div>
              <div className="info-value">{Moment(dateofbirth).format('DD/MM/YYYY')}</div>
            </div>
          </div>
          <div className="col">
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.genderOpts}:</div>
              <div className="info-value">{(constants && constants.gender[gender]) || this.t('Không xác định')}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.marital}:</div>
              <div className="info-value">{constants && constants.marital_status[marital_status]}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.address}:</div>
              <div className="info-value">{address}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('containers').CV.EditCV.GeneralInfo.level}:</div>
              <div className="info-value">{constants && constants.level[level]}</div>
            </div>
          </div>
          <div className="actions-wrapper">
            <Button
              onClick={() => {
                this.setState({ isEditing: true });
              }}
            >
              <span className="icon-pencil" />
              <span className="btn-title">{this.t('containers').CV.EditCV.GeneralInfo.edit}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="general-info">
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">{this.t('containers').CV.EditCV.GeneralInfo.info}</div>
          </div>
          {(this.state.isEditing && (
            <AccountForm
              showCancelBtn
              onCancelClick={() => {
                this.setState({ isEditing: false });
              }}
              onSubmitDone={message => {
                this.setState({ message, isEditing: message.code !== 0 });
              }}
            />
          )) ||
            this._renderViewBlock()}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.auth.info, constants: state.constants.data.users }))(GeneralInfo);
