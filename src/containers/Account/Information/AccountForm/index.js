/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-06 14:16:45
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Button, Input, ImagePicker, DatePicker, Radio, Select } from '../../../../components';
import { updateUserInfo } from '../../../../actions/auth';
import { userApi, authApi } from '../../../../services';
import './style.scss';

const _$ = window.jQuery;

class AccountForm extends Base {
  constructor(props) {
    super(props);

    const { info, constants } = props;
    this.state = {
      message: null,
      updating: false,
      fullname: info.fullname || '',
      dateofbirth: info.dateofbirth || null,
      address: info.address || '',
      gender: info.gender || null,
      marital_status: info.marital_status || null,
      level: { value: info.level, label: (constants && constants.level[info.level]) || '' } || null,
      avatar: info.avatar ? [{ url: info.avatar }] : [],
      phone: info.phone || '',
      email: info.email || ''
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
      fullname: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phoneVN: true
      }
    },
    messages: {
      fullname: this.t('containers').Account.Information.AccountForm.fullname,
      address: this.t('containers').Account.Information.AccountForm.address,
      email: {
        required: this.t('containers').Account.Information.AccountForm.email,
        email: this.t('containers').Account.Information.AccountForm.errorEmail
      },
      phone: {
        required: this.t('containers').Account.Information.AccountForm.phoneVN,
        phoneVN: this.t('containers').Account.Information.AccountForm.errorPhone
      }
    }
  };

  componentDidMount() {
    this._validator = _$('#account-form').validate(this.validationRules);
  }

  componentWillReceiveProps(nextProps) {
    const { level } = this.state;
    if (nextProps.constants && !this.props.constants && level) {
      this.setState({ level: { ...level, label: nextProps.constants.level[level.value] } });
    }
  }

  _save = () => {
    if (this.state.updating) return;
    _$('#account-form').on('submit', event => {
      event.preventDefault();
    });

    const { fullname, dateofbirth, gender, marital_status, address, level, avatar, phone, email } = this.state;
    let hasError = false;
    if (!gender) {
      this._genderRadio.showError(this.t('containers').Account.Information.AccountForm.genderRadio);
      hasError = true;
    }

    if (!dateofbirth) {
      this._dateRef.showError(this.t('containers').Account.Information.AccountForm.dateofbirth);
      hasError = true;
    }

    if (!level) {
      this._levelRef.showError(this.t('containers').Account.Information.AccountForm.levelError);
      hasError = true;
    }
    this._validator.form();
    if (this._validator.errorList.length === 0 && !hasError) {
      let avatarInfo = (avatar[0] && avatar[0]) || null;
      let info = {
        address,
        fullname,
        dateofbirth,
        gender,
        marital_status,
        phone,
        email,
        level: level.value
      };

      if (avatarInfo && !avatarInfo.url) {
        info.avatar = avatarInfo;
      }

      this.setState({ updating: true }, async () => {
        const response = await userApi.updateInfo(info);
        if (response && response.result) {
          this.setState({ updating: false }, () => {
            this._submitDone({ code: 0 });
          });
          this.props.updateUserInfo(response.data.user);
        } else {
          this.setState({ updating: false }, () => {
            this._submitDone({ code: 1 });
          });
        }
      });
    }
  };

  _generateSelectableOpts = () => {
    const genderOpts = [{ value: 'male', label: this.t('containers').Account.Information.AccountForm.male }, { value: 'female', label: this.t('containers').Account.Information.AccountForm.female }];
    const { level, marital_status } = this.props.constants || {};
    const matialOptions = Object.keys(marital_status || {}).map(key => ({
      value: key,
      label: marital_status[key]
    }));
    const levelOptions = Object.keys(level || {}).map(key => ({
      value: key,
      label: level[key]
    }));

    return { levelOptions, matialOptions, genderOpts };
  };

  _submitDone = message => {
    if (typeof this.props.onSubmitDone === 'function') {
      this.props.onSubmitDone(message);
    }
  };

  _verifyEmailPhone = async fieldName => {
    if (this._validator.element(`#${fieldName}`)) {
      const fieldValue = this.state[fieldName];
      const { info } = this.props;
      if (fieldValue !== info[fieldName]) {
        const response = await authApi.verifyPhoneEmail(fieldValue);
        if (response && !response.unique) {
          this[`_${fieldName}Ref`].showError(
            fieldName === 'phone' ? `${this.t('containers').Account.Information.AccountForm.showErrorPhone}` : `${this.t('containers').Account.Information.AccountForm.showErrorEmail}`
          );
        }
      }
    }
  };

  render() {
    const { showCancelBtn, onCancelClick } = this.props;
    const { fullname, dateofbirth, gender, marital_status, address, level, avatar, email, phone } = this.state;
    const { levelOptions, matialOptions, genderOpts } = this._generateSelectableOpts();

    return (
      <div className="account-form input-section">
        <div className="left-section">
          <form id="account-form">
            <Input
              type="text"
              name="fullname"
              placeholder={this.t('containers').Account.Information.AccountForm.inputFullname}
              value={fullname}
              required
              onChange={value => this.setState({ fullname: value, nameError: '' })}
            />
            <Input
              type="text"
              name="email"
              placeholder={this.t('containers').Account.Information.AccountForm.inputEmail}
              value={email}
              required
              onChange={value =>
                this.setState({ email: value }, () => {
                  this._verifyEmailPhone('email');
                })
              }
              ref={r => {
                this._emailRef = r;
              }}
            />
            <Input
              type="text"
              name="phone"
              placeholder={this.t('containers').Account.Information.AccountForm.inputPhone}
              value={phone}
              required
              onChange={value =>
                this.setState({ phone: value }, () => {
                  this._verifyEmailPhone('phone');
                })
              }
              ref={r => {
                this._phoneRef = r;
              }}
            />
            <DatePicker
              showHour={false}
              label={this.t('containers').Account.Information.AccountForm.inputDate}
              required
              format="YYYY/MM/DD"
              defaultCreatedAt={dateofbirth}
              retrieveValue={value => {
                this._dateRef.hideError();
                this.setState({ dateofbirth: value });
              }}
              ref={r => {
                this._dateRef = r;
              }}
            />

            <Radio
              label={this.t('containers').Account.Information.AccountForm.genderOpts}
              required
              options={genderOpts}
              value={gender}
              onChange={value => {
                this._genderRadio.hideErrorMessage();
                this.setState({ gender: value });
              }}
              ref={r => {
                this._genderRadio = r;
              }}
            />

            <Radio
              label={this.t('containers').Account.Information.AccountForm.matialOptions}
              options={matialOptions}
              value={`${marital_status}`}
              onChange={value => {
                this._maritalRadio.hideErrorMessage();
                this.setState({ marital_status: value });
              }}
              ref={r => {
                this._maritalRadio = r;
              }}
            />
            <Input type="text" name="address" placeholder={this.t('containers').Account.Information.AccountForm.inputAddress} value={address} required onChange={value => this.setState({ address: value })} />
            <Select
              label={this.t('containers').Account.Information.AccountForm.level}
              placeholder={this.t('containers').Account.Information.AccountForm.levelOptions}
              required
              options={levelOptions}
              value={[level]}
              onChange={value => {
                this._levelRef.hideError();
                this.setState({ level: value[0] });
              }}
              ref={r => {
                this._levelRef = r;
              }}
            />

            <div className={`buttons-wrapper${showCancelBtn ? ' has-cancel' : ''}`}>
              <Button label={this.t('containers').Account.Information.AccountForm.save} className="jn-btn__yellow" onClick={this._save} />
              {showCancelBtn && <Button label={this.t('containers').Account.Information.AccountForm.cancel} className="jn-btn__normal btn-cancel" onClick={onCancelClick} />}
            </div>
          </form>
        </div>

        <div className="right-section">
          <ImagePicker
            images={avatar}
            label={this.t('containers').Account.Information.AccountForm.avatar}
            onChange={images => {
              this.setState({ avatar: images });
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    info: state.auth.info,
    constants: state.constants.data.users
  }),
  { updateUserInfo }
)(AccountForm);
