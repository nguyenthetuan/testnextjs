/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-28 10:40:48
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Base from '../Base';
import Popup from '../Popup';
import Button from '../Button';
import { showLanguage, hideLanguage } from '../../actions/auth';
import { saveLanguage, getLanguage } from '../../utils/localData';
import './style.scss';

class LangPopup extends Base {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: null
    };
  }

  onClick = (l) => {
    switch (l) {
      case 'en': {
        saveLanguage({ language: 'en' });
        this.props.hideLanguage();
        window.location.reload();
        break;
      }
      case 'vi': {
        saveLanguage({ language: 'vi' });
        this.props.hideLanguage();
        window.location.reload();
        break;
      }
      case 'jp': {
        saveLanguage({ language: 'jp' });
        this.props.hideLanguage();
        window.location.reload();
        break;
      }
      default:
        break;
    }
  }

  _renderLangForm = () => {
    return (
      <div className="login-form-container">
        <div className="header">{this.t('Language')}</div>
        <div className="socials-wrapper">
          <Button className="jn-btn__normal flag" onClick={() => this.onClick('vi')}>
            <div className="icon-image icon">
              <img src="/assets/img/vietnam.png" alt="" />
            </div>
            <div className="text">{this.t('Tiếng việt')}</div>
          </Button>
          <Button className="jn-btn__normal flag" onClick={() => this.onClick('en')}>
            <div className="icon-image icon">
              <img src="/assets/img/flagEnglish.png" alt="" />
            </div>
            <div className="text">{this.t('Tiếng Anh')}</div>
          </Button>
          {/* <Button className="jn-btn__normal flag" onClick={() => this.onClick('jp')}>
            <div className="icon-image icon">
              <img src="/assets/img/flagJapan.jpg" alt="" />
            </div>
            <div className="text">{this.t('Tiếng nhật')}</div>
          </Button> */}
        </div>
      </div>
    );
  };


  render() {
    const { message, loading } = this.state;

    return (
      <Popup
        className="language-pop-wrapper"
        show={this.props.showlanguage}
        showBox
        showLoading={loading}
        clickOutToClose={!message || message.code !== 0}
        onClose={() => {
          if (this.props.showForgotPwdForm && (this.state.forgotPwd.step === 4 || this.state.forgotPwd.step === 3)) {
            this.props.history.replace('/');
          }
          this.props.hideLanguage();
        }}
        toggleButton=".candidate-mobile-menu a, .job-header-wrapper .jn-saved-job a, .actions-menu a.make-cv, .candidate-menu .make-cv, .candidate-menu > a"
      >
        {(!message || message.code !== 0) && (
          <div className="close-btn">
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this.props.hideLanguage();
              }}
            >
              <i className="icon-jn-close" />
            </a>
          </div>
        )}
        {this._renderLangForm()}
      </Popup>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      message: state.auth.message,
      showlanguage: state.auth.showLanguage,
    }),
    { showLanguage, hideLanguage }
  )(LangPopup)
);
