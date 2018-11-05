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
      email: '',
      password: '',
      phone: '',
      companyName: '',
      size: undefined,
      contact: '',
      condition: false
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
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phoneVN: true
      },
      password: {
        required: true,
        minlength: 6
      },
      confirmPassword: {
        required: true,
        equalTo: '#password'
      },
      companyName: {
        required: true
      },
      contact: {
        required: true
      },
      verify_code: { required: true }
    },
    messages: {
      companyName: this.t('Nhập tên công ty.'),
      contact: this.t('Nhập tên người liên hệ.'),
      verify_code: this.t('Nhập mã xác minh.'),
      password: {
        required: this.t('Nhập mật khẩu có độ dài tối thiểu 6 ký tự.'),
        minlength: this.t('Nhập tối thiểu 6 ký tự.')
      },
      confirmPassword: {
        required: this.t('Nhập lại mật khẩu.'),
        equalTo: this.t('Nhập mật khẩu không khớp.')
      },
      email: {
        required: this.t('Nhập địa chỉ email.'),
        email: this.t('Không đúng định dạng email.')
      },
      phone: {
        required: this.t('Nhập số điện thoại.'),
        phoneVN: this.t('Không đúng định dạng số điện thoại')
      }
    }
  };

  componentDidMount() {
    _$('#register-form').on('submit', event => {
      event.preventDefault();
    });
    this._validator = _$('#register-form').validate(this.validationRules);
  }

  componentWillReceiveProps(nextProps) {
    if (
      Object.keys(nextProps.companyOpts).length !== Object.keys(this.props.companyOpts).length
      && !this.state.size
    ) {
      this.setState({
        size: [
          {
            value: Object.keys(nextProps.companyOpts)[0],
            label: nextProps.companyOpts[Object.keys(nextProps.companyOpts)[0]]
          }
        ]
      });
    }
  }

  _getSMSCode = async () => {
    const { phone } = this.state;
    if (phone.match(/((\+?84|0)9|(\+?84|0)1[2|6|8|9])+([0-9]{8})\b/)) {
      const response = await authApi.getSMSCode(phone.trim());
      // console.log('sms get code response', response);
      if (response.result === false || !response.sent) {
        this._validator.showErrors({
          phone: this.t('Mã xác minh gửi không thành công. Vui lòng kiểm tra lại số điện thoại.')
        });
      }
    }
  };

  _handleRegisterSubmit = async () => {
    _$('#register-form').submit();
    const { street, province, district } = this._companyAddrRef.getValue();
    if (street && district && province) {
      // disable error for address field
      this._companyAddrRef.showError(false);
      if (this._validator.errorList.length === 0) {
        // check condition checkbox
        if (!this.state.condition) {
          this.setState({ showConditionCheckError: true });
          return;
        }

        const { phone, verifyCode } = this.state;

        // call api to virify code
        const verifyCodeResponse = await authApi.verifyCode(phone, verifyCode.trim());
        if (verifyCodeResponse.result === false || verifyCodeResponse.verify === false) {
          this._validator.showErrors({
            verify_code: this.t('Mã xác minh không đúng hoặc đã hết hạn.')
          });
          return;
        }

        // send register form
        const info = {
          user: {
            phone: this.state.phone.replace(/^(\+84|0)/, '84'),
            email: this.state.email.trim(),
            password: this.state.password
          },
          company: {
            name: this.state.companyName.trim(),
            contact: this.state.contact.trim(),
            size: this.state.size[0].value,
            address: { street, province, district }
          }
        };
        const registerResponse = await authApi.register(info);
        if (registerResponse.result === false || registerResponse.code) {
          this.setState({
            message: {
              code: 1,
              message: this.t('Đăng ký không thành công.')
            }
          });
        } else {
          this.setState(
            {
              message: {
                code: 1,
                message: this.t('Đăng ký không thành công.')
              }
            },
            () => {
              setTimeout(() => {
                this.props.history.replace('/login');
              }, 3000);
            }
          );
        }
      }
      return;
    }

    // show error for address field
    this._companyAddrRef.showError(true);
  };

  _onConditionChange = checked => {
    let newState = {
      condition: checked
    };
    if (this.state.showConditionCheckError && checked) {
      newState.showConditionCheckError = false;
    }
    this.setState(newState);
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    if (this.state.message && this.state.message.code === 0) {
      return (
        <div className="register-container">
          <form className="form-horizontal" id="register-form">
            <span className="verified-icon">
              <i className="icon-jn-checked" />
            </span>
            {this.t('Đăng ký thành công.')}
          </form>
        </div>
      );
    }

    const { phone } = this.state;
    let sizeOpts = Object.keys(this.props.companyOpts).map(key => ({
      value: key,
      label: this.props.companyOpts[key]
    }));

    return (
      <div className="register-container">
        <form className="form-horizontal" id="register-form">
          <h3>{this.t('Đăng ký tài khoản Nhà tuyển dụng')}</h3>
          <div className="field-wrapper phone-wrapper">
            <label>
              {this.t('Số di động')}
              <span className="required">*</span>
            </label>
            <div className="inputs-wrapper">
              <div className="phone-input-wrapper">
                <Input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={value => this.setState({ phone: value })}
                />
              </div>
              <Button
                label={this.t('Gửi mã xác minh')}
                className={[
                  'jn-btn__yellow',
                  phone.match(/((\+?84|0)9|(\+?84|0)1[2|6|8|9])+([0-9]{8})\b/) ? 'active' : ''
                ].join(' ')}
                onClick={this._getSMSCode}
              />
            </div>
          </div>
          <Input
            className="field-wrapper"
            type="text"
            name="verify_code"
            placeholder={this.t('Mã xác minh')}
            required
            value={this.state.verifyCode}
            onChange={value => this.setState({ verifyCode: value })}
          />
          <Input
            className="field-wrapper"
            type="text"
            name="email"
            placeholder={this.t('Email')}
            required
            value={this.state.email}
            onChange={value => this.setState({ email: value })}
          />
          <Input
            className="field-wrapper"
            type="password"
            name="password"
            placeholder={this.t('Mật khẩu')}
            required
            value={this.state.password}
            onChange={value => this.setState({ password: value })}
          />
          <Input
            className="field-wrapper"
            type="password"
            name="confirmPassword"
            placeholder={this.t('Nhắc lại mật khẩu')}
            value={this.state.confirmPassword}
            required
            onChange={value => {
              this.setState({ confirmPassword: value });
            }}
          />
          <Input
            className="field-wrapper"
            type="text"
            name="companyName"
            placeholder="Tên công ty"
            required
            value={this.state.companyName}
            onChange={value => this.setState({ companyName: value })}
          />
          <AddressInput
            ref={r => {
              this._companyAddrRef = r;
            }}
            locations={this.props.locations}
            label={this.t('Địa chỉ')}
          />
          <div className="field-wrapper form-group employee-number">
            <label>
              {this.t('Quy mô')}
              <span className="required">*</span>
            </label>
            <Select
              value={this.state.size}
              options={sizeOpts}
              onChange={selected => {
                this.setState({ size: selected });
              }}
            />
          </div>
          <Input
            className="field-wrapper"
            type="text"
            name="contact"
            placeholder="Họ tên người liên hệ"
            required
            value={this.state.contact}
            onChange={value => this.setState({ contact: value })}
          />
          <div className="field-wrapper form-group">
            <label />
            <div className="submit-wrapper">
              <div className="policy-wrapper`">
                <div className="policy">
                  <CheckBox
                    label={this.t('Tôi đã đọc và đồng ý với JobNow')}
                    onChange={this._onConditionChange}
                  />
                  <a href="#">{this.t('Điều khoản và điều kiện')}</a>
                </div>
                {this.state.showConditionCheckError && (
                  <div id="condition-error" className="help-block" style={{ display: 'block' }}>
                    {this.t('Bạn cần đồng ý với các điều khoản của chúng tôi.')}
                  </div>
                )}
              </div>
              <div className="submit-button-wrapper">
                <Button
                  label={this.t('Đăng ký')}
                  onClick={this._handleRegisterSubmit}
                  className="jn-btn__yellow"
                />
                {this.state.message
                  && this.state.message.code && (
                    <div className="error-msg">* {this.state.message.message}</div>
                )}
              </div>
            </div>
          </div>
        </form>
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
  )(RegisterPage)
);
