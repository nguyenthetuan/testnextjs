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
      registerForm: {
        phone: '',
        pinCode: '',
        email: '',
        password: '',
        passwordConfirm: '',
        step2: false,
        categories: [],
        locations: [],
        salary: 0
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

  _renderSignUpStep1 = () => {
    const { registerForm } = this.state;
    const { phone } = registerForm;
    return (
      <form
        id="auth-form"
        ref={r => {
          this._authForm = r;
        }}
      >
        <Input
          name="phone"
          placeholder={this.t('Số di động')}
          floatingLabel
          required
          value={phone}
          ref={r => {
            this._phoneInputRef = r;
          }}
        />
        <Button className="jn-btn__yellow" label={this.t('TIẾP TỤC')} onClick={this._submitForm} />
      </form>
    );
  }

  _renderSignUpStep2 = () => {
    const { registerForm } = this.state;
    const { phone, pinCode, email, password, passwordConfirm, step2 } = registerForm;
    return (
      <form
        id="auth-form"
        ref={r => {
          this._authForm = r;
        }}
      >
        <Input
          name="verify_code"
          placeholder={this.t('Mã xác minh')}
          floatingLabel
          required
          value={pinCode}
          onChange={value => {
            this.setState({ registerForm: { ...registerForm, pinCode: value } });
          }}
        />
        <div className="register-legend">
          <span className="legend">{this.t('Mã xác minh vừa được gửi về số điện thoại 0982503355.')}
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
              {this.t('Click vào đây')}
            </a>
            {this.t('nếu chưa nhận được mã')}
          </span>
        </div>
        <Input
          name="email"
          placeholder={this.t('Email')}
          floatingLabel
          required
          value={email}
          onChange={value => {
            this.setState({ registerForm: { ...registerForm, email: value, emailValid: 0 } }, () => this._verifyPhoneEmail('email'));
          }}
          ref={r => {
            this._emailInputRef = r;
          }}
        />
        <Input
          name="password"
          type="password"
          value={password}
          placeholder={this.t('Mật khẩu')}
          floatingLabel
          required
          onChange={value => {
            this.setState({ registerForm: { ...registerForm, password: value } });
          }}
        />
        <Input
          name="password_confirm"
          type="password"
          required
          value={passwordConfirm}
          placeholder={this.t('Nhắc lại mật khẩu')}
          floatingLabel
          onChange={value => {
            this.setState({ registerForm: { ...registerForm, passwordConfirm: value } });
          }}
        />

        <Button className="jn-btn__yellow register-btn" label={this.t('Đăng ký')} onClick={this._submitForm} />
      </form>
    );
  }

  render() {
    return (
      <div className="register-container">
        <div className="modal-body">
          <Button className="back-button">
            <div className="back-button-text icon-arrow-left">{this.t(' QUAY LẠI')}</div>
          </Button>
          <div className="header">{this.t('Tạo tài khoản')}</div>
          {this._renderSignUpStep2()}
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
