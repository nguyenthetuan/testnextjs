/*
 * File: containers/Login
 * Desc: generate login page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-06 15:55:53
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import createPage from '../createPage';
import { login } from '../../actions/auth';
import { Base, CheckBox, Input, Button, Select, AddressInput } from '../../components';
import { authApi } from '../../services';
import './style.scss';

const _$ = window.jQuery;

const GOOGLE_CLIENT_ID = '560403396608-ejfu34fi2ktib679kfdr5v66505ndn0t.apps.googleusercontent.com';
const FB_APP_ID = '2708440305839896';

class RegisterPage extends Base {
  static wrapperClasses = 'signin-page';

  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        email: '',
        password: '',
        rememberPassword: false
      },
    };
  }

  componentDidMount() {
    this._validator = _$('#auth-form').validate(this.validationRules());
  }

  componentDidUpdate() {
    if (this._validator) this._validator.destroy();
    this._validator = _$('#auth-form').validate(this.validationRules());
  }

  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, redirectPath } = nextProps;

    if (redirectPath && redirectPath !== '/') {
      this._redirectPath = redirectPath;
    }

    // process redirect after login
    if (isLoggedIn && !this.props.isLoggedIn) {
      const path = this._redirectPath || '/dashboard';
      this._redirectPath = false;
      this.props.history.push(path);
    }
  }

  validationRules = () => {
    const { showForgotPwdForm, showRegisterForm } = this.props;
    return {
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
        phone: {
          required: true,
          phoneVN: true
        },
        verify_code: { required: true },
        email: {
          required: true,
          email: showRegisterForm || showForgotPwdForm
        },
        password: {
          required: true,
          minlength: 6
        },
        password_confirm: {
          required: true,
          equalTo: '#password'
        }
      },
      messages: {
        password: {
          required: this.t(showRegisterForm ? 'Nhập mật khẩu có độ dài tối thiểu 6 ký tự.' : 'Nhập mật khẩu.'),
          minlength: this.t('Nhập tối thiểu 6 ký tự.')
        },
        password_confirm: {
          required: this.t('Nhập lại mật khẩu.'),
          equalTo: this.t('Nhập mật khẩu không khớp.')
        },
        email: {
          required: this.t(showRegisterForm || showForgotPwdForm ? 'Nhập địa chỉ email.' : 'Nhập địa chỉ email/số điện thoại.'),
          email: this.t('Không đúng định dạng email.')
        },
        phone: {
          required: this.t('Nhập số điện thoại.'),
          phoneVN: this.t('Không đúng định dạng số điện thoại')
        }
      }
    };
  };

  _loginByFacebook = response => {
    if (response && response.accessToken) {
      this.setState({ loading: true }, async () => {
        const fbLoginResponse = await authApi.socialLogin('facebook', response.accessToken);
        this.setState({ loading: false }, () => {
          if (fbLoginResponse && fbLoginResponse.token) {
            this.props.loginSuccess({ info: fbLoginResponse.user, token: fbLoginResponse.token });
          } else {
            this.setState({ message: { code: 1, message: 'Đăng nhập không thành công.' } });
          }
        });
      });
    }
  };

  _googleLogin = async token => {
    this.setState({ loading: true }, async () => {
      const response = await authApi.socialLogin('google', token);
      this.setState({ loading: false }, () => {
        if (response && response.token && response.user) {
          this.props.loginSuccess({ token: response.token, info: response.user });
        } else {
          this.setState({ message: { code: 1, message: 'Đăng nhập không thành công.' } });
        }
      });
    });
  };

  _submitForm = () => {
    _$('#auth-form')
      .on('submit', event => {
        event.preventDefault();
      })
      .submit();
    if (this._validator.errorList.length === 0) {
      const { email, password, rememberPassword } = this.state.loginForm;
      this.props.login(email, password, rememberPassword);
    }
  };

  _onBackClick = () => {
    this.props.history.goBack();
  }

  render() {
    const { loginForm } = this.state;
    const { email, password, rememberPassword } = loginForm;
    const message = this.props.message || this.state.message;
    return (
      <div className="register-container">
        <div className="modal-body">
          <Button className="back-button" onClick={this._onBackClick}>
            <div className="back-button-text icon-arrow-left">{this.t(' QUAY LẠI')}</div>
          </Button>
          <div className="header">{this.t('Đăng nhập')}</div>
          {message && message.code && <div className="error-message">* {this.t(message.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.')}</div>}
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
                  href="/forgotpassword"
                >
                  {this.t('Quên mật khẩu')}
                </a>
              </div>
            </div>
            <Button className="jn-btn__yellow" label={this.t('Đăng nhập')} onClick={this._submitForm} />
          </form>
          <div className="register-legend">
            <span className="legend">
              {this.t('Bạn chưa có tài khoản?')}
              <a
                href="/signup"
                className="register-link"
              >
                {this.t('Tạo ngay tài khoản')}
              </a>
              {this.t('trong 30s')}
            </span>
          </div>
          <div className="social-login">
            <span className="legend">{this.t('Đăng nhập nhanh với')}</span>
            <div className="social-button">
              <FacebookLogin
                appId={FB_APP_ID}
                callback={this._loginByFacebook}
                render={renderProps => (
                  <Button className="icon-jn-facebook" onClick={renderProps.onClick} />
                )}
              />
              <GoogleLogin
                className="icon-social-google"
                tag="a"
                clientId={GOOGLE_CLIENT_ID}
                onSuccess={user => {
                  this._googleLogin(user.accessToken);
                }}
                style={{}}
              >
                <span />
              </GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    redirectPath: state.auth.redirectPath,
    message: state.auth.message,
  };
};

export default createPage(
  connect(
    mapStateToProps,
    { login }
  )(RegisterPage), true, false
);
