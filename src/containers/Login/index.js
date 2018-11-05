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
import { Base, CheckBox, Input, Button } from '../../components';
import './style.scss';

const _$ = window.jQuery.noConflict();
const validationRules = {
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
  errorElement: 'span',
  errorClass: 'help-block',
  errorPlacement: (element, e) => {
    _$(e)
      .parents('.form-group:first')
      .append(element);
  },
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    }
  }
};

class LoginPage extends Base {
  static wrapperClasses = 'login-page';

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberPassword: false
    };
  }

  componentDidMount() {
    _$('#login-form').on('submit', event => {
      event.preventDefault();
    });
  }

  _handleLogin = () => {
    const validator = _$('#login-form').validate(validationRules);
    _$('#login-form').submit();
    if (validator.errorList.length === 0) {
      const { email, password, rememberPassword } = this.state;
      this.props.login(email, password, rememberPassword);
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-container">
        <form className="form-horizontal" id="login-form">
          <h3>{this.t('Nhà tuyển dụng đăng nhập')}</h3>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            floatingLabel
            value={this.state.email}
            onChange={value => this.setState({ email: value })}
          />
          <Input
            type="password"
            name="password"
            placeholder={this.t('Mật khẩu')}
            floatingLabel
            value={this.state.password}
            onChange={value => this.setState({ password: value })}
          />
          <div className="form-group">
            <div className="extra-options">
              <div className="remember-password">
                <CheckBox
                  label={this.t('Nhớ mật khẩu')}
                  checked={this.state.rememberPassword}
                  onChange={value => {
                    this.setState({
                      rememberPassword: value
                    });
                  }}
                />
              </div>
              <div className="forgot-password">
                <a href="#">{this.t('Quên mật khẩu')}</a>
              </div>
            </div>
            <Button
              label={this.t('Đăng nhập')}
              onClick={this._handleLogin}
              className="jn-btn__yellow"
            />
          </div>

          <div className="register-legend">
            <span>{this.t('Bạn chưa có tài khoản ?')}</span>
            <a href="/register">{this.t('Đăng ký tài khoản')}</a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isLoggedIn: state.auth.isLoggedIn });

export default createPage(
  connect(
    mapStateToProps,
    { login }
  )(LoginPage)
);
