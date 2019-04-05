/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-28 10:40:48
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import _ from 'lodash';
import Base from '../Base';
import Popup from '../Popup';
import Button from '../Button';
import Input from '../Input';
import CheckBox from '../CheckBox';
import Select from '../Select';
import { hideAuthPopup, showAuthPopup, login, loginSuccess } from '../../actions/auth';
import { authApi } from '../../services';
import './style.scss';

const _$ = window.jQuery;

const GOOGLE_CLIENT_ID = '560403396608-ejfu34fi2ktib679kfdr5v66505ndn0t.apps.googleusercontent.com';
const ZALO_APP_ID = '1554572497263353061';
const FB_APP_ID = '1060870910781241';

class AuthPopup extends Base {
  constructor(props) {
    super(props);

    const { data } = props;
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
      loginForm: {
        email: '',
        password: '',
        rememberPassword: false
      },
      forgotPwd: {
        email: (data && data.email) || '',
        password: '',
        passwordConfirm: '',
        step: (data && data.step) || 1,
        code: (data && data.code) || '',
        validCode: (data && data.validCode) || false
      },
      loading: false,
      message: null,
      phoneValid: 0,
      emailValid: 0
    };
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
        companyName: this.t('Nhập tên công ty.'),
        contact: this.t('Nhập tên người liên hệ.'),
        verify_code: this.t('Nhập mã xác minh.'),
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

  componentWillReceiveProps(nextProps) {
    const { showForgotPwdForm, showRegisterForm, isLoggedIn, data } = nextProps;
    if (!_.isEqual(nextProps.data, this.props.data)) {
      const { forgotPwd } = this.state;
      this.setState({ forgotPwd: { ...forgotPwd, ...nextProps.data } });
    }

    if (!this.props.show && nextProps.show && data && data.redirect) {
      this._redirectPath = data.redirect;
    }

    // process redirect after login
    if (!showForgotPwdForm && !showRegisterForm && isLoggedIn && !this.props.isLoggedIn && this.props.show) {
      const redirectPath = this._redirectPath || '/dashboard';
      this._redirectPath = false;
      this.props.history.push(redirectPath);
    }
  }

  componentDidMount() {
    this._validator = _$('#auth-form').validate(this.validationRules());

    window.Zalo.init({
      version: '3.0',
      appId: ZALO_APP_ID,
      redirectUrl: `${window.location.origin}/zalo-redirect`
    });
  }

  componentDidUpdate() {
    if (this._validator) this._validator.destroy();
    this._validator = _$('#auth-form').validate(this.validationRules());
  }

  componentWillUnmount() {
    if (this._validator) {
      this._validator.destroy();
    }
  }

  _register = () => {
    const { loading, emailValid, phoneValid } = this.state;
    if (this._validator.errorList.length === 0 && !loading && phoneValid === 2 && emailValid === 2) {
      this.setState({ loading: true }, async () => {
        const { registerForm } = this.state;
        const phone = registerForm.phone.trim();
        const email = registerForm.email.trim();
        const password = registerForm.password.trim();
        const pinCode = registerForm.pinCode.trim();

        const response = await authApi.register({ phone, email, password, pinCode });
        if (response && response.code === undefined && (response.result || response.result === undefined)) {
          this.setState({
            message: { code: 0 },
            loading: false
          });

          setTimeout(() => {
            const newState = {
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
              message: null
            };
            this.setState(newState);
            this.props.hideAuthPopup();
            this.props.loginSuccess({ info: response.data.user, token: response.data.token });
            this.props.history.push('/dashboard');
          }, 1000);
        } else {
          const errorMessage = (response && response.data && response.data.errors && response.data.errors.message) || '';
          this.setState({ message: { code: 1, message: `${this.t('* Đăng ký không thành công.')} ${errorMessage}` }, loading: false });
        }
      });
    }
  };

  _changePassword = () => {
    if (this._validator.errorList.length === 0 && !this.state.loading) {
      this.setState({ loading: true }, async () => {
        if (this.state.forgotPwd.step === 1) {
          const response = await authApi.sendForgotPasswordEmail(this.state.forgotPwd.email.trim());
          if (response && response.code === undefined && (response.result || response.result === undefined)) {
            const { forgotPwd } = this.state;
            this.setState({ forgotPwd: { ...forgotPwd, step: 2 }, loading: false });
          } else {
            this.setState({ message: { code: 1 }, loading: false });
          }
        } else if (this.state.forgotPwd.step === 3) {
          // send new password form
          const { email, password, code } = this.state.forgotPwd;
          const response = await authApi.updatePassword({ email, code, password });
          if (response && response.code === undefined && (response.result || response.result === undefined)) {
            const { forgotPwd } = this.state;
            this.setState({
              forgotPwd: { ...forgotPwd, step: 4 },
              loading: false,
              message: { code: 0 }
            });
          } else {
            this.setState({ message: { code: 1 }, loading: false });
          }
        }
      });
    }
  };

  _submitForm = () => {
    _$('#auth-form')
      .on('submit', event => {
        event.preventDefault();
      })
      .submit();
    if (this._validator.errorList.length === 0) {
      if (this.props.showForgotPwdForm) {
        this._changePassword();
      } else if (this.props.showRegisterForm) {
        this._register();
      } else {
        const { email, password, rememberPassword } = this.state.loginForm;
        this.props.login(email, password, rememberPassword);
      }
    }
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

  _zaloLogin = () => {
    window.Zalo.login();
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

  _renderSignForm = () => {
    if (this.props.showRegisterForm || this.props.showForgotPwdForm) {
      return null;
    }

    const { loginForm } = this.state;
    const { email, password, rememberPassword } = loginForm;
    const message = this.props.message || this.state.message;

    return (
      <div className="login-form-container">
        <div className="header">{this.t('Đăng nhập vào JobNow')}</div>
        <div className="socials-wrapper">
          <FacebookLogin
            appId={FB_APP_ID}
            callback={this._loginByFacebook}
            render={renderProps => (
              <Button className="jn-btn__normal fb-login" onClick={renderProps.onClick}>
                <div className="icon-image fb-icon">
                  <img src="/assets/img/fb-icon.png" alt="" />
                </div>
                <div className="title">{this.t('Tiếp tục với Facebook')}</div>
              </Button>
            )}
          />
          <div className="jn-btn jn-btn__normal google-login">
            <GoogleLogin
              className=""
              tag="a"
              clientId={GOOGLE_CLIENT_ID}
              onSuccess={user => {
                this._googleLogin(user.accessToken);
              }}
              style={{}}
            >
              <div className="icon-image google-icon">
                <img src="/assets/img/google-icon.png" alt="" />
              </div>
              <div className="title">{this.t('Tiếp tục với Google')}</div>
            </GoogleLogin>
          </div>
        </div>

        <div className="separator-wrapper">
          <div className="separator-line" />
          <div className="separator-text">{this.t('hoặc')}</div>
          <div className="separator-line" />
        </div>

        <div className={`login-form-wrapper${message && message.code ? ' has-error-msg' : ''}`}>
          {message && message.code && <div className="error-message">* {this.t(message.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.')}</div>}
          <form
            id="auth-form"
            ref={r => {
              this._authForm = r;
            }}
          >
            <Input
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
        </div>

        <div className="register-legend">
          <span className="legend">{this.t('Bạn chưa có tài khoản ?')}</span>
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
            {this.t('Đăng ký tài khoản')}
          </a>
        </div>
      </div>
    );
  };

  _getSMSCode = () => {
    const isValidPhone = this._validator.element('#phone');
    const { loading, message, phoneValid } = this.state;
    if (isValidPhone && !loading && !(message && message.sentSMSCode) && phoneValid === 2) {
      this.setState({ loading: true }, async () => {
        const response = await authApi.getSMSCode(this.state.registerForm.phone.trim());

        if (response && response.code === undefined && response.sent) {
          this.setState({ message: { code: 0, sentSMSCode: true }, loading: false });
          setTimeout(() => {
            this.setState({ message: null });
          }, 120000);
        } else {
          this.setState({ loading: false }, () => {
            this._validator.showErrors({
              phone: this.t('Gửi mã xác minh không thành công. Vui lòng kiểm tra lại số điện thoại.')
            });
          });
        }
      });
    }
  };

  _verifyPhoneEmail = fieldName => {
    const { registerForm } = this.state;
    if (fieldName === 'phone') {
      this._phoneInputRef.showError(null);

      if (this._validator.element('#phone') && this.state.phoneValid !== 1) {
        this.setState({ phoneValid: 1 }, async () => {
          const response = await authApi.verifyPhoneEmail(registerForm.phone);
          this.setState({ phoneValid: (response && response.unique && 2) || -1 }, () => {
            if (this.state.phoneValid === -1) {
              this._phoneInputRef.showError(this.t('Số điện thoại này đã đăng ký, vui lòng sử dụng số điện thoại khác.'));
            }
          });
        });
      }
    } else if (fieldName === 'email' && this.props.showRegisterForm) {
      this._emailInputRef.showError(null);

      if (this._validator.element('#email') && this.state.emailValid !== 1) {
        this.setState({ emailValid: 1 }, async () => {
          const response = await authApi.verifyPhoneEmail(registerForm.email);
          this.setState({ emailValid: (response && response.unique && 2) || -1 }, () => {
            if (this.state.emailValid === -1) {
              this._emailInputRef.showError(this.t('Email này đã đăng ký, vui lòng sử dụng email khác.'));
            }
          });
        });
      }
    }
  };

  _renderRegisterForm = () => {
    if (!this.props.showRegisterForm) {
      return null;
    }
    const { registerForm, message } = this.state;
    const { phone, pinCode, email, password, passwordConfirm, step2 } = registerForm;

    if (message && message.code === 0 && !message.sentSMSCode) {
      return (
        <div className="success-message">
          <span className="icon-jn-checked" />
          {this.t('Đăng ký thành công.')}
        </div>
      );
    }

    if (step2) {
      return this._renderRegisterStep2();
    }

    let veifyBtnClasses = ['jn-btn__yellow get-sms-code'];
    if (!phone || !this._validator || !this._validator.element('#phone') || this.state.phoneValid !== 2) veifyBtnClasses.push('inactive');
    if (message && message.code === 0 && message.sentSMSCode) {
      veifyBtnClasses.push('inactive');
    }

    const VerifiedBtn = <Button label={this.t(message && message.sentSMSCode ? 'Đã gửi mã xác minh' : 'Gửi mã xác minh')} className={veifyBtnClasses.join(' ')} onClick={this._getSMSCode} />;

    return (
      <div className={`register-form-container${message && message.code ? ' has-error-msg' : ''}`}>
        <div className="header">{this.t('Đăng ký tài khoản')}</div>
        {message && message.code !== 0 && <div className="error-message">{message.message}</div>}
        <div className="form-wrapper">
          <form
            id="auth-form"
            ref={r => {
              this._authForm = r;
            }}
          >
            <div className="phone-wrapper">
              <Input
                name="phone"
                placeholder={this.t('Số di động')}
                floatingLabel
                required
                value={phone}
                rightComponent={VerifiedBtn}
                onChange={value => {
                  if (value !== registerForm.phone) {
                    this.setState({ registerForm: { ...registerForm, phone: value, phoneValid: 0 } }, () => this._verifyPhoneEmail('phone'));
                  }
                }}
                ref={r => {
                  this._phoneInputRef = r;
                }}
              />
              {message && message.code === 0 && <div className="sent-code-success">{this.t('Mã xác thực đã được gửi đến tin nhắn của bạn.')}</div>}
            </div>
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
        </div>
      </div>
    );
  };

  _renderRegisterStep2 = () => {
    const { sallaryOpts } = this.props;
    let locationOpts = this.props.locations.map(({ city, district }) => {
      let output = { value: city, label: city };

      if (district && district.length) {
        output.children = district.map(({ name }) => ({ value: name, label: name }));

        output.children.unshift({
          value: city,
          label: 'Tất cả',
          selectParent: true
        });
      }
      return output;
    });

    const salaryOptions = Object.keys(sallaryOpts).map(key => ({
      value: key,
      label: sallaryOpts[key]
    }));
    const { registerForm } = this.state;
    const { categories, salary, locations } = registerForm;
    const savedBtnClasses = ['jn-btn__yellow'];
    if (categories.length === 0 || locations.length === 0 || !salary) {
      savedBtnClasses.push('inactive');
    }

    return (
      <div className="register-form-container step-2">
        <div className="header">{this.t('Việc làm phù hợp')}</div>
        <div className="annotation">{this.t('Vui lòng chọn các thông tin công việc bạn đang quan tâm để JobNow gợi ý cho bạn các việc làm phù hợp')}</div>
        <div className="form-wrapper">
          <form
            id="auth-form"
            ref={r => {
              this._authForm = r;
            }}
          >
            <Select
              placeholder={this.t('Chọn ngành nghề')}
              value={categories}
              options={[]}
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, categories: value } });
              }}
            />
            <Select
              options={locationOpts}
              selectSubLevel
              multiple
              placeholder={this.t('Địa điểm')}
              value={locations}
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, locations: value } });
              }}
            />
            <Select
              placeholder={this.t('Chọn mức lương tối thiểu')}
              options={salaryOptions}
              value={[salary]}
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, salary: value[0] } });
              }}
            />
            <div className="buttons-wrapper">
              <Button className="jn-btn__normal">{this.t('Trở lại')}</Button>
              <Button className={savedBtnClasses.join(' ')}>{this.t('Lưu lại')}</Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  _renderForgotPwdFormStep1 = () => {
    const { forgotPwd } = this.state;
    return (
      <form
        id="auth-form"
        ref={r => {
          this._authForm = r;
        }}
      >
        <Input
          name="email"
          value={this.state.forgotPwd.email}
          required
          placeholder={this.t('Email của bạn')}
          floatingLabel
          onChange={value => {
            this.setState({ forgotPwd: { ...forgotPwd, email: value } });
          }}
        />
        <Button className="jn-btn__yellow" label={this.t('Lấy lại mật khẩu')} onClick={this._submitForm} />
      </form>
    );
  };

  _renderForgotPwdFormStep3 = () => {
    const { forgotPwd } = this.state;

    if (!forgotPwd.validCode) {
      return (
        <div className="invalid-code-msg">
          <span className="message">
            <span className="icon-close" />
            <span className="text">{this.t('Đường dẫn thay đổi mật khẩu không đúng hoặc quá hạn. Vui lòng thử lại')}</span>
          </span>
          <div className="button-wrapper">
            <Button
              className="jn-btn__yellow"
              onClick={() => {
                setTimeout(() => {
                  this.setState({ forgotPwd: { ...forgotPwd, step: 1 } });
                }, 0);
              }}
            >
              {this.t('Gửi lại')}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <form
        id="auth-form"
        ref={r => {
          this._authForm = r;
        }}
      >
        <Input
          name="password"
          type="password"
          value={this.state.forgotPwd.password}
          required
          placeholder={this.t('Mật khẩu')}
          floatingLabel
          onChange={value => {
            this.setState({ forgotPwd: { ...forgotPwd, password: value } });
          }}
        />
        <Input
          name="password_confirm"
          type="password"
          value={this.state.forgotPwd.passwordConfirm}
          required
          placeholder={this.t('Nhắc lại mật khẩu')}
          floatingLabel
          onChange={value => {
            this.setState({ forgotPwd: { ...forgotPwd, passwordConfirm: value } });
          }}
        />
        <Button className="jn-btn__yellow" label={this.t('Lấy lại mật khẩu')} onClick={this._submitForm} />
      </form>
    );
  };

  _renderForgotPasswordForm = () => {
    const { showForgotPwdForm } = this.props;
    if (!showForgotPwdForm) return null;

    const { message, forgotPwd } = this.state;
    let renderedForm = this._renderForgotPwdFormStep1();
    if (forgotPwd.step === 2) {
      renderedForm = (
        <div className="sent-mail-msg">
          <p>{this.t('JobNow vừa gửi vào email bạn đã đăng ký đường link để kích hoạt lại mật khẩu.')}</p>
          <p>{this.t('Vui lòng check email và làm theo hướng dẫn')}</p>
        </div>
      );
    } else if (forgotPwd.step === 3) {
      renderedForm = this._renderForgotPwdFormStep3();
    } else if (forgotPwd.step === 4) {
      return (
        <div className="success-message">
          <span className="icon-jn-checked" />
          {this.t('Đổi mật khẩu thành công.')}
        </div>
      );
    }

    return (
      <div className={`forgot-form-container${message && message.code ? ' has-error-msg' : ''}`}>
        <div className="header">{this.t('Lấy lại mật khẩu')}</div>
        {message && message.code && <div className="error-message">{this.t('Không tìm thấy email trong hệ thống. Vui lòng kiểm tra lại.')}</div>}
        <div className="form-wrapper">{renderedForm}</div>
      </div>
    );
  };

  render() {
    const { message, loading } = this.state;

    return (
      <Popup
        className="auth-pop-wrapper"
        show={this.props.show}
        showBox
        showLoading={loading}
        clickOutToClose={!message || message.code !== 0}
        onClose={() => {
          if (this.props.showForgotPwdForm && (this.state.forgotPwd.step === 4 || this.state.forgotPwd.step === 3)) {
            this.props.history.replace('/');
          }
          this.props.hideAuthPopup();
        }}
        toggleButton=".candidate-menu a.candidate-signin, .actions-menu a.register-toggle, .login-form-container a.register-link, .fast-apply-wrapper .login-register-btn a, .candidate-mobile-menu a, .job-header-wrapper .jn-saved-job a, .actions-menu a.make-cv, .candidate-menu .make-cv, .candidate-menu > a"
      >
        {(!message || message.code !== 0) && (
          <div className="close-btn">
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this.props.hideAuthPopup();
              }}
            >
              <i className="icon-jn-close" />
            </a>
          </div>
        )}
        {this._renderSignForm()}
        {this._renderRegisterForm()}
        {this._renderForgotPasswordForm()}
      </Popup>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      message: state.auth.message,
      show: state.auth.showAuthPopup,
      isLoggedIn: state.auth.isLoggedIn,
      showRegisterForm: state.auth.currentForm === 'register',
      showForgotPwdForm: state.auth.currentForm === 'forgot',
      data: state.auth.popupData,
      locations: state.locations.cities || [],
      sallaryOpts: (state.constants.data.jobs && state.constants.data.jobs.salary) || {}
    }),
    { hideAuthPopup, showAuthPopup, login, loginSuccess }
  )(AuthPopup)
);
