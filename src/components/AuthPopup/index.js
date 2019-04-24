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

const GOOGLE_CLIENT_ID = '781299732715-fn6q95s6a6scluvru85j3prj6lc2n8ae.apps.googleusercontent.com';
const ZALO_APP_ID = '1554572497263353061';
const FB_APP_ID = '252478468792538';

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
        companyName: this.t('components').AuthPopup.index.messages.companyName,
        contact: this.t('components').AuthPopup.index.messages.contact,
        verify_code: this.t('components').AuthPopup.index.messages.verifyCode,
        password: {
          required: this.t(showRegisterForm ? this.t('components').AuthPopup.index.messages.minPassword : this.t('components').AuthPopup.index.messages.requiredPassword),
          minlength: this.t('components').AuthPopup.index.messages.minlength
        },
        password_confirm: {
          required: this.t('components').AuthPopup.index.messages.passwordConfirm,
          equalTo: this.t('components').AuthPopup.index.messages.equalTo
        },
        email: {
          required: this.t(showRegisterForm || showForgotPwdForm ? this.t('components').AuthPopup.index.messages.showRegisterFormEmail : this.t('components').AuthPopup.index.messages.requiredEmail),
          email: this.t('components').AuthPopup.index.messages.emailError
        },
        phone: {
          required: this.t('components').AuthPopup.index.messages.requiredPhone,
          phoneVN: this.t('components').AuthPopup.index.messages.phoneVN
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
          this.setState({ message: { code: 1, message: `${this.t('components').AuthPopup.index.return.register} ${errorMessage}` }, loading: false });
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
            this.setState({ message: { code: 1, message: this.t('components').AuthPopup.index.return.loginByFacebook } });
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
          this.setState({ message: { code: 1, message: this.t('components').AuthPopup.index.return.googleLogin } });
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
        <div className="header">{this.t('components').AuthPopup.index.return.header}</div>
        <div className="socials-wrapper">
<<<<<<< HEAD
=======
          <Button className="jn-btn__normal zalo-login" onClick={this._zaloLogin}>
            <div className="icon-image zalo-icon">
              <img src="/assets/img/zalo-icon.png" alt="" />
            </div>
            <div className="title">{this.t('components').AuthPopup.index.return.titleZalo}</div>
          </Button>
>>>>>>> issue06
          <FacebookLogin
            appId={FB_APP_ID}
            callback={this._loginByFacebook}
            render={renderProps => (
              <Button className="jn-btn__normal fb-login" onClick={renderProps.onClick}>
                <div className="icon-image fb-icon">
                  <img src="/assets/img/fb-icon.png" alt="" />
                </div>
                <div className="title">{this.t('components').AuthPopup.index.return.titleFacebook}</div>
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
              <div className="title">{this.t('components').AuthPopup.index.return.titleGoogle}</div>
            </GoogleLogin>
          </div>
        </div>

        <div className="separator-wrapper">
          <div className="separator-line" />
          <div className="separator-text">{this.t('components').AuthPopup.index.return.or}</div>
          <div className="separator-line" />
        </div>

        <div className={`login-form-wrapper${message && message.code ? ' has-error-msg' : ''}`}>
          {message && message.code && <div className="error-message">* {this.t(message.message || this.t('components').AuthPopup.index.return.errorLogin)}</div>}
          <form
            id="auth-form"
            ref={r => {
              this._authForm = r;
            }}
          >
            <Input
              name="email"
              placeholder={this.t('components').AuthPopup.index.return.inputEmail}
              floatingLabel
              value={email}
              onChange={value => {
                this.setState({ loginForm: { ...loginForm, email: value } });
              }}
            />
            <Input
              name="password"
              type="password"
              placeholder={this.t('components').AuthPopup.index.return.inputPassword}
              floatingLabel
              value={password}
              onChange={value => {
                this.setState({ loginForm: { ...loginForm, password: value } });
              }}
            />
            <div className="extra-options">
              <CheckBox
                label={this.t('components').AuthPopup.index.return.rememberPassword}
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
                  {this.t('components').AuthPopup.index.return.forgotPassword}
                </a>
              </div>
            </div>
            <Button className="jn-btn__yellow" label={this.t('components').AuthPopup.index.return.submitForm} onClick={this._submitForm} />
          </form>
        </div>

        <div className="register-legend">
          <span className="legend">{this.t('components').AuthPopup.index.return.registerLegend}</span>
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
            {this.t('components').AuthPopup.index.return.registerAccount}
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
              phone: this.t('components').AuthPopup.index.return.getSMSCode
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
              this._phoneInputRef.showError(this.t('components').AuthPopup.index.return.phoneInputRef);
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
              this._emailInputRef.showError(this.t('components').AuthPopup.index.return.emailInputRef);
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
          {this.t('components').AuthPopup.index.return.successMessage}
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

    const VerifiedBtn = <Button label={this.t(message && message.sentSMSCode ? this.t('components').AuthPopup.index.return.sentSMSCode : this.t('components').AuthPopup.index.return.sentSMSCode)} className={veifyBtnClasses.join(' ')} onClick={this._getSMSCode} />;

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
                placeholder={this.t('components').AuthPopup.index.return.phone}
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
              {message && message.code === 0 && <div className="sent-code-success">{this.t('components').AuthPopup.index.return.verification}</div>}
            </div>
            <Input
              name="verify_code"
              placeholder={this.t('components').AuthPopup.index.return.pinCode}
              floatingLabel
              required
              value={pinCode}
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, pinCode: value } });
              }}
            />
            <Input
              name="email"
              placeholder={this.t('components').AuthPopup.index.return.email}
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
              placeholder={this.t('components').AuthPopup.index.return.inputPassword}
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
              placeholder={this.t('components').AuthPopup.index.return.passwordConfirm}
              floatingLabel
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, passwordConfirm: value } });
              }}
            />

            <Button className="jn-btn__yellow register-btn" label={this.t('components').AuthPopup.index.return.registerBtn} onClick={this._submitForm} />
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
          label: this.t('components').AuthPopup.index.return.all,
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
        <div className="header">{this.t('components').AuthPopup.index.return.suitableJobs}</div>
        <div className="annotation">{this.t('components').AuthPopup.index.return.annotation}</div>
        <div className="form-wrapper">
          <form
            id="auth-form"
            ref={r => {
              this._authForm = r;
            }}
          >
            <Select
              placeholder={this.t('components').AuthPopup.index.return.categories}
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
              placeholder={this.t('components').AuthPopup.index.return.locations}
              value={locations}
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, locations: value } });
              }}
            />
            <Select
              placeholder={this.t('components').AuthPopup.index.return.salary}
              options={salaryOptions}
              value={[salary]}
              onChange={value => {
                this.setState({ registerForm: { ...registerForm, salary: value[0] } });
              }}
            />
            <div className="buttons-wrapper">
              <Button className="jn-btn__normal">{this.t('components').AuthPopup.index.return.back}</Button>
              <Button className={savedBtnClasses.join(' ')}>{this.t('components').AuthPopup.index.return.save}</Button>
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
          placeholder={this.t('components').AuthPopup.index.return.forgotPwdEmail}
          floatingLabel
          onChange={value => {
            this.setState({ forgotPwd: { ...forgotPwd, email: value } });
          }}
        />
        <Button className="jn-btn__yellow" label={this.t('components').AuthPopup.index.return.forgotPwd} onClick={this._submitForm} />
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
            <span className="text">{this.t('components').AuthPopup.index.return.text}</span>
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
              {this.t('components').AuthPopup.index.return.sendTo}
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
          placeholder={this.t('components').AuthPopup.index.return.inputPassword}
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
          placeholder={this.t('components').AuthPopup.index.return.passwordConfirm}
          floatingLabel
          onChange={value => {
            this.setState({ forgotPwd: { ...forgotPwd, passwordConfirm: value } });
          }}
        />
        <Button className="jn-btn__yellow" label={this.t('components').AuthPopup.index.return.forgotContainer} onClick={this._submitForm} />
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
          <p>{this.t('components').AuthPopup.index.return.sentMail}</p>
          <p>{this.t('components').AuthPopup.index.return.sentMail2}</p>
        </div>
      );
    } else if (forgotPwd.step === 3) {
      renderedForm = this._renderForgotPwdFormStep3();
    } else if (forgotPwd.step === 4) {
      return (
        <div className="success-message">
          <span className="icon-jn-checked" />
          {this.t('components').AuthPopup.index.return.successPassword}
        </div>
      );
    }

    return (
      <div className={`forgot-form-container${message && message.code ? ' has-error-msg' : ''}`}>
        <div className="header">{this.t('components').AuthPopup.index.return.forgotContainer}</div>
        {message && message.code && <div className="error-message">{this.t('components').AuthPopup.index.return.errorMessage}</div>}
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
