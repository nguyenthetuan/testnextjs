import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Base, Loading } from '../../components';
import { authApi } from '../../services';
import { loginSuccess } from '../../actions/auth';

class ZaloRedirectPage extends Base {
  componentDidMount() {
    const { search } = window.location;
    const params = (search || '').match(/[^&?]*?=[^&?]*/g);
    let queryObj = {};
    (params || []).map(param => {
      const paramArr = param.split('=');
      queryObj[paramArr[0]] = paramArr[1];
    });

    if (queryObj.code) {
      this._loginWithZalo(queryObj.code);
    }
  }

  _loginWithZalo = async token => {
    const response = await authApi.socialLogin('zalo', token);
    if (response && response.token && response.user) {
      this.props.loginSuccess({ token: response.token, info: response.user });
      this.props.history.replace('/dashboard');
    } else {
      this.props.history.replace('/?zalo-signin-error=true');
    }
  };

  render() {
    return <Loading />;
  }
}

export default withRouter(
  connect(
    undefined,
    { loginSuccess }
  )(ZaloRedirectPage)
);
