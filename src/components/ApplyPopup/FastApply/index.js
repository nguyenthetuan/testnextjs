/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-02 08:46:15
 */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showAuthPopup } from '../../../actions/auth';
import { jobApi } from '../../../services';
import Base from '../../Base';
import Button from '../../Button';
import Input from '../../Input';
import CVUploader from './CVUploader';
import './style.scss';

const _$ = window.jQuery;

class FastApply extends Base {
  constructor(props) {
    super(props);

    const { user } = props;
    this.state = {
      step: 1,
      loading: false,
      message: null,
      formValues: {
        fullname: (user && user.fullname) || '',
        email: (user && user.email) || '',
        phone: (user && user.phone) || '',
        filecv: null
      }
    };
  }

  validationRules = () => {
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
        email: {
          required: true,
          email: true
        },
        fullname: {
          required: true
        }
      },
      messages: {
        fullname: {
          required: `${this.t('components').AdvancedSearch.FastApply.index.requiredFullname}`
        },
        email: {
          required: `${this.t('components').AdvancedSearch.FastApply.index.requiredEmail}`,
          email: `${this.t('components').AdvancedSearch.FastApply.index.errorEmail}`
        },
        phone: {
          required: `${this.t('components').AdvancedSearch.FastApply.index.requiredPhone}`,
          phoneVN: `${this.t('components').AdvancedSearch.FastApply.index.errorPhone}`
        }
      }
    };
  };

  componentDidMount() {
    if (this.state.step === 2) {
      this._validator = _$('#apply-form').validate(this.validationRules());
    }
  }

  componentDidUpdate() {
    if (this.state.step === 2) {
      this._validator = _$('#apply-form').validate(this.validationRules());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.step === 2 && nextProps.popupStatus === false) {
      this.setState({
        step: 1,
        formValues: {
          fullname: (nextProps.user && nextProps.user.fullname) || '',
          email: (nextProps.user && nextProps.user.email) || '',
          phone: (nextProps.user && nextProps.user.phone) || '',
          filecv: null
        }
      });
    }
  }

  _handleApplyClick = () => {
    if (this.state.loading) return;

    _$('#apply-form').on('submit', event => {
      event.preventDefault();
    });
    const hasFile = this._uploader.checkValue();
    _$('#apply-form').submit();

    if (this._validator.errorList.length === 0 && hasFile) {
      const { phone, email, fullname, filecv } = this.state.formValues;
      const { _id } = this.props.job;
      const applyInfo = { phone, email, fullname, filecv, job: _id };
      this.setState({ loading: true }, async () => {
        const response = await jobApi.applyJob(applyInfo);
        if (response && response.result) {
          this.setState({ step: 3, loading: false });
        } else {
          this.setState({ message: { code: 1 }, loading: false });
        }
      });
    }
  };

  _renderStep2 = () => {
    const { formValues, message } = this.state;
    const { phone, email, fullname } = formValues;
    const { isLoggedIn } = this.props;

    return (
      <div className="step2-wrapper">
        {message &&
          message.code && (
            <div className="error-msg">{this.t('components').AdvancedSearch.FastApply.index.message}</div>
          )}
        <form className="fast-apply-form" id="apply-form">
          {!isLoggedIn && (
            <Input
              name="fullname"
              placeholder={this.t('components').AdvancedSearch.FastApply.index.fullname}
              required
              value={fullname}
              floatingLabel
              onChange={value => {
                this.setState({ formValues: { ...formValues, fullname: value } });
              }}
            />
          )}
          {!isLoggedIn && (
            <Input
              name="email"
              placeholder={this.t('components').AdvancedSearch.FastApply.index.email}
              required
              value={email}
              floatingLabel
              onChange={value => {
                this.setState({ formValues: { ...formValues, email: value } });
              }}
            />
          )}
          {!isLoggedIn && (
            <Input
              name="phone"
              placeholder={this.t('components').AdvancedSearch.FastApply.index.phone}
              required
              value={phone}
              floatingLabel
              onChange={value => {
                this.setState({ formValues: { ...formValues, phone: value } });
              }}
            />
          )}
          <CVUploader
            ref={r => {
              this._uploader = r;
            }}
            onChange={file => {
              this.setState({ formValues: { ...formValues, filecv: file } });
            }}
          />

          <Button
            className="jn-btn__yellow"
            label={this.t('components').AdvancedSearch.FastApply.index.handleApplyClick}
            onClick={this._handleApplyClick}
          />
        </form>
      </div>
    );
  };

  _renderStep1 = () => {
    const { isLoggedIn } = this.props;

    return (
      <div className="step1-wrapper">
        {!isLoggedIn && (
          <Button
            className="jn-btn__yellow login-register-btn"
            onClick={() => {
              this.props.showAuthPopup('login');
            }}
          >
            {this.t('components').AdvancedSearch.FastApply.index.login}
          </Button>
        )}

        {isLoggedIn && (
          <div className="creating-cv-wrapper">
            <div className="field-title">{this.t('components').AdvancedSearch.FastApply.index.fieldTitle}</div>
            <Button
              className="jn-btn__yellow creating-cv-btn"
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              {this.t('components').AdvancedSearch.FastApply.index.creatingCV}
            </Button>
          </div>
        )}

        <div className="fast-apply-btn-wrapper">
          <div className="btn-title">{this.t('components').AdvancedSearch.FastApply.index.btnTitle}</div>
          <Button
            className="jn-btn__normal fast-apply-btn"
            onClick={() => {
              setTimeout(() => {
                this.setState({ step: 2 });
              }, 0);
            }}
          >
            {this.t('components').AdvancedSearch.FastApply.index.fastApply}
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { step } = this.state;
    const { title, company } = this.props.job || {};
    return (
      <div className={`fast-apply-wrapper step-${step}`}>
        {step === 3 && <div className="success-msg">{this.t('components').AdvancedSearch.FastApply.index.successMsg}</div>}
        {step !== 3 && (
          <div className="job-info">
            <div className="job-title">{title}</div>
            <div className="company-name">{company && company.name}</div>
          </div>
        )}
        {step === 1 && this._renderStep1()}
        {step === 2 && this._renderStep2()}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: state.auth.info,
      isLoggedIn: state.auth.isLoggedIn
    }),
    { showAuthPopup }
  )(FastApply)
);
