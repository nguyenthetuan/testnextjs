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
  static wrapperClasses = 'forgot-page';

  constructor(props) {
    super(props);
    this.state = {
      forgotPwd: {
        email: '',
        password: '',
        passwordConfirm: '',
        code: '',
        validCode: false
      },
      loading: false,
      step2: false,
      message: null,
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
        email: {
          required: true,
          email: showRegisterForm || showForgotPwdForm
        },
      },
      messages: {
        email: {
          required: this.t(showRegisterForm || showForgotPwdForm ? 'Nhập địa chỉ email.' : 'Nhập địa chỉ email/số điện thoại.'),
          email: this.t('Không đúng định dạng email.')
        },
      }
    };
  };

  _changePassword = () => {
    if (this._validator.errorList.length === 0 && !this.state.loading) {
      this.setState({ loading: true }, async () => {
        if (!this.state.step2) {
          const response = await authApi.sendForgotPasswordEmail(this.state.forgotPwd.email.trim());
          if (response && response.code === undefined && (response.result || response.result === undefined)) {
            this.setState({ step2: true, loading: false, message: null });
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
      this._changePassword();
    }
  };

  _renderForgotPwd1 = () => {
    const { forgotPwd, message } = this.state;
    const { email } = forgotPwd;
    return (
      <form
        id="auth-form"
        ref={r => {
          this._authForm = r;
        }}
      >
        {message && message.code && <div className="error-message">{this.t('Không tìm thấy email trong hệ thống. Vui lòng kiểm tra lại.')}</div>}
        <Input
          name="email"
          value={email}
          required
          placeholder={this.t('Email của bạn')}
          floatingLabel
          onChange={value => {
            this.setState({ forgotPwd: { ...forgotPwd, email: value } });
          }}
        />
        <Button className="jn-btn__yellow" label={this.t('TIẾP TỤC')} onClick={this._submitForm} />
      </form>
    );
  }

  _renderForgotPwd2 = () => {
    return (
      <div>
        <div className="register-legend">
          <span className="legend">{this.t('Mã xác minh vừa được gửi về số điện thoại 0982503355.')}
            <a
              href="#"
              className="register-link"
              onClick={event => {
                event.preventDefault();
                this.setState({ step2: false });
              }}
            >
              {this.t('Click vào đây')}
            </a>
            {this.t('nếu chưa nhận được mã')}
          </span>
        </div>
        <Button className="jn-btn__yellow" label={this.t('TIẾP TỤC')} onClick={this._submitForm} />
      </div>
    );
  }

  _renderForgot = () => {
    const { step2 } = this.state;
    return step2 ? this._renderForgotPwd2() : this._renderForgotPwd1();
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
          <div className="header">{this.t('Lấy lại mật khẩu')}</div>
          {this._renderForgot()}
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
