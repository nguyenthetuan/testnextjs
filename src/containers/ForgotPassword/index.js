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
      forgotPwd: {
        email: '',
        password: '',
        passwordConfirm: '',
        step: 1,
        code: '',
        validCode: false
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

  _renderForgotPwd1 = () => {
    const { forgotPwd } = this.state;
    const { phone } = forgotPwd;
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
        <Button className="jn-btn__yellow" label={this.t('TIẾP TỤC')} onClick={this._submitForm} />
      </div>
    );
  }

  render() {
    return (
      <div className="register-container">
        <div className="modal-body">
          <Button className="back-button">
            <div className="back-button-text icon-arrow-left">{this.t(' QUAY LẠI')}</div>
          </Button>
          <div className="header">{this.t('Lấy lại mật khẩu')}</div>
          {this._renderForgotPwd2()}
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
