/*
 * File: containers/Login
 * Desc: generate login page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-06 15:55:53
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import createPage from '../createPage';
import { login } from '../../actions/auth';
import { Base, CheckBox, Input, Button, Select, AddressInput } from '../../components';
import { authApi } from '../../services';
import './style.scss';

const _$ = window.jQuery;

class RegisterPage extends Base {
  static wrapperClasses = 'register-page';

  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        email: '',
        password: '',
        rememberPassword: false
      },
      phone: '',
      companyName: '',
      size: undefined,
      contact: '',
      condition: false
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { loginForm } = this.state;
    const { email, password, rememberPassword } = loginForm;
    return (
      <div className="register-container">
        <div className="modal-body">
          <Button className="back-button">
            <div className="back-button-text icon-arrow-left">{this.t(' QUAY LẠI')}</div>
          </Button>
          <div className="header">{this.t('Đăng nhập')}</div>
          <form
            id="auth-form"
            ref={r => {
              this._authForm = r;
            }}
          >
            <Input
              className="input"
              name="email"
              placeholder={this.t('Email hoặc số điện thoại')}
              floatingLabel
              value={email}
              onChange={value => {
                this.setState({ loginForm: { ...loginForm, email: value } });
              }}
            />
            <Input
              name="password"
              type="password"
              placeholder={this.t('Mật khẩu')}
              floatingLabel
              value={password}
              onChange={value => {
                this.setState({ loginForm: { ...loginForm, password: value } });
              }}
            />
            <div className="extra-options">
              <CheckBox
                label={this.t('Ghi nhớ đăng nhập')}
                checked={rememberPassword}
                onChange={value => {
                  this.setState({ loginForm: { ...loginForm, rememberPassword: value } });
                }}
              />
              <div className="forgot-pwd">
                <a
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    setTimeout(() => {
                      this.props.showAuthPopup('forgot'); // show forgot password form
                    }, 0);
                  }}
                >
                  {this.t('Quên mật khẩu')}
                </a>
              </div>
            </div>
            <Button className="jn-btn__yellow" label={this.t('Đăng nhập')} onClick={this._submitForm} />
          </form>
          <div className="register-legend">
            <span className="legend">{this.t('Bạn chưa có tài khoản?')}</span>
            <a
              href="#"
              className="register-link"
              onClick={event => {
                event.preventDefault();
                setTimeout(() => {
                  this.props.showAuthPopup('register'); // show register form
                }, 0);
              }}
            >
              {this.t('Tạo ngay tài khoản')}
            </a>
            <span className="legend">{this.t('trong 30s')}</span>
          </div>
          <div className="social-login">
            <span className="legend">{this.t('Đăng nhập nhanh với')}</span>
            <span className="icon-jn-facebook" />
            <span className="icon-social-google" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const constants = state.constants.data;
  return {
    isLoggedIn: state.auth.isLoggedIn,
    companyOpts: (constants.companies && constants.companies.size) || {},
    locations: state.locations.cities || []
  };
};

export default createPage(
  connect(
    mapStateToProps,
    { login }
  )(RegisterPage), true, false
);
