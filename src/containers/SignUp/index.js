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
import { login, loginSuccess } from '../../actions/auth';
import { Base, CheckBox, Input, Button, Select, AddressInput } from '../../components';
import { authApi } from '../../services';
import './style.scss';

const _$ = window.jQuery;

class RegisterPage extends Base {
  static wrapperClasses = 'signup-page';

  constructor(props) {
    super(props);
    this.state = {
      registerForm: {
        phone: '',
        pinCode: '',
        email: '',
        password: '',
        passwordConfirm: '',
        categories: [],
        locations: [],
        salary: 0
      },
      step2: false,
      loading: false,
      message: null,
      phoneValid: 0,
      emailValid: 0
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

    if (redirectPath) {
      this._redirectPath = redirectPath;
    }

    // process redirect after login
    if (isLoggedIn && !this.props.isLoggedIn) {
      const path = this._redirectPath || '/dashboard';
      this._redirectPath = false;
      this.props.history.push(path);
    }
  }

  _submitForm = () => {
    _$('#auth-form')
      .on('submit', event => {
        event.preventDefault();
      })
      .submit();
    if (this._validator.errorList.length === 0) {
      this._register();
    }
  };

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
            this.props.loginSuccess({ info: response.data.user, token: response.data.token });
          }, 1000);
        } else {
          const errorMessage = (response && response.data && response.data.errors && response.data.errors.message) || '';
          this.setState({ message: { code: 1, message: `${this.t('* Đăng ký không thành công.')} ${errorMessage}` }, loading: false });
        }
      });
    }
  };

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

  _getSMSCode = () => {
    const isValidPhone = this._validator.element('#phone');
    const { loading, message, phoneValid, setp2 } = this.state;
    if (isValidPhone && !loading && !(message && message.sentSMSCode) && phoneValid === 2) {
      this.setState({ loading: true }, async () => {
        const response = await authApi.getSMSCode(this.state.registerForm.phone.trim());

        if (response && response.code === undefined && response.sent) {
          this.setState({ message: { code: 0, sentSMSCode: true }, loading: false, step2: true });
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
    } else if (fieldName === 'email') {
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
          onChange={value => {
            if (value !== registerForm.phone) {
              this.setState({ registerForm: { ...registerForm, phone: value, phoneValid: 0 } }, () => this._verifyPhoneEmail('phone'));
            }
          }}
        />
        <Button className="jn-btn__yellow continue-btn" label={this.t('TIẾP TỤC')} onClick={this._getSMSCode} />
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
              onClick={() => {
                this.setState({ step2: false, phoneValid: 0 });
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

  _renderSignIn = () => {
    const { step2 } = this.state;

    return step2 ? this._renderSignUpStep2() : this._renderSignUpStep1();
  }

  _onBackClick = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="register-container">
        <div className="modal-body">
          <Button className="back-button" onClick={this._onBackClick}>
            <div className="back-button-text icon-arrow-left">{this.t(' QUAY LẠI')}</div>
          </Button>
          <div className="header">{this.t('Tạo tài khoản')}</div>
          {this._renderSignIn()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    redirectPath: state.auth.redirectPath,
  };
};

export default createPage(
  connect(
    mapStateToProps,
    { login, loginSuccess }
  )(RegisterPage), true, false
);
