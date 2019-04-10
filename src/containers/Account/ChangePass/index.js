/*
 * File: containers/Account
 * Desc: generate login page
 * Author: DuyNg (duy@megadrupal.com)
 */
import React from 'react';
import { connect } from 'react-redux';
import createPage from '../../createPage';
import { userApi } from '../../../services';
import { Base, Input, Button, Popup } from '../../../components';
import './style.scss';

const _$ = window.jQuery.noConflict();

class AccountPage extends Base {
  static wrapperClasses = 'account-page';

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      message: null
    };
  }

  validationRules = {
    highlight: element => {
      _$(element)
        .closest('.form-group')
        .addClass('has-error');
    },
    unhighlight: element => {
      _$(element)
        .closest('.form-group')
        .removeClass('has-error');
    },
    errorElement: 'div',
    errorClass: 'help-block',
    errorPlacement: (element, e) => {
      _$(e)
        .parents('.form-group:first > .input-wrapper')
        .append(element);
    },
    rules: {
      current_password: {
        required: true
      },
      password: {
        required: true,
        minlength: 6
      },
      confirm_password: {
        required: true,
        equalTo: '#password'
      }
    },
    messages: {
      current_password: this.t('containers').Account.ChangePass.currentPassword,
      password: {
        required: this.t('containers').Account.ChangePass.requiredPassword,
        minlength: this.t('containers').Account.ChangePass.minlength
      },
      confirm_password: {
        required: this.t('containers').Account.ChangePass.confirmPassword,
        equalTo: this.t('containers').Account.ChangePass.equalTo
      }
    }
  };

  componentDidMount() {
    _$('#change-password-form').on('submit', event => {
      event.preventDefault();
    });
    this._validator = _$('#change-password-form').validate(this.validationRules);
  }

  _changePassword = async () => {
    _$('#change-password-form').submit();
    if (this._validator.errorList.length === 0) {
      let info = { ...this.state };
      delete info.messages;
      delete info.confirmPassword;
      const response = await userApi.changePassword(this.props.uid, info);

      if (
        response &&
        response.code === undefined &&
        (response.result === undefined || response.response)
      ) {
        this.setState({
          message: {
            code: 0,
            message: this.t('containers').Account.ChangePass.changePassword
          },
          currentPassword: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        this.setState({
          message: {
            code: 1,
            message: this.t('containers').Account.ChangePass.messageError
          }
        });
      }
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="form-header">
          <h2>{this.t('containers').Account.ChangePass.formHeader}</h2>
          <div className="legend">
            {this.t('containers').Account.ChangePass.legend}
          </div>
        </div>
        <div className="form-wrapper">
          <form id="change-password-form">
            <Input
              type="password"
              name="current_password"
              required
              placeholder={this.t('containers').Account.ChangePass.password}
              value={this.state.currentPassword}
              onChange={value => this.setState({ currentPassword: value })}
            />
            <Input
              type="password"
              name="password"
              placeholder={this.t('containers').Account.ChangePass.newPassword}
              required
              value={this.state.password}
              onChange={value => this.setState({ password: value })}
            />
            <Input
              type="password"
              name="confirm_password"
              value={this.state.confirmPassword}
              required
              placeholder={this.t('containers').Account.ChangePass.confirmNewPassword}
              onChange={value => this.setState({ confirmPassword: value })}
            />
            <div className="button-wrapper">
              <Button className="jn-btn__yellow" onClick={this._changePassword}>
                {this.t('containers').Account.ChangePass.save}
              </Button>
            </div>
          </form>
        </div>
        {this.state.message && (
          <Popup show showBox clickOutToClose>
            <div className="message">
              <span
                className={[
                  'msg-icon',
                  this.state.message.code === 0 ? 'icon-jn-checked' : 'icon-close'
                ].join(' ')}
              />
              <div className="msg">{this.state.message.message}</div>
            </div>
          </Popup>
        )}
      </div>
    );
  }
}

export default createPage(
  connect(state => ({
    uid: state.auth.info && state.auth.info._id
  }))(AccountPage)
);
