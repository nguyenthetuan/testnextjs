import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Base, Button, Input, FileUploader, DatePicker, Radio, Select, Popup } from '../../../../components';

import { userApi } from '../../../../services';

import './style.scss';

const _$ = window.jQuery;

class ReferenceUser extends Base {
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
      name: {
        required: true
      },
      title: {
        required: true
      },
      company: {
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
      name: this.t('Bạn cần nhập tên người tham chiếu'),
      title: this.t('Bạn cần nhập chức danh người tham chiếu'),
      company: this.t('Bạn cần nhập tên công ty'),
      email: {
        required: this.t('Nhập địa chỉ email.'),
        email: this.t('Không đúng định dạng email.')
      },
      phone: {
        required: this.t('Bạn cần nhập số điện thoại người tham chiếu.'),
        phoneVN: this.t('Định dạng số điện thoại không đúng')
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      data: props.data || {
        name: '',
        title: '',
        company: '',
        phone: '',
        email: ''
      }
    };
  }

  _updateReferenceInfo = async () => {
    _$('#reference-form').on('submit', event => {
      event.preventDefault();
    });
    const { name, title, company, phone, email } = this.state.data;
    let validator = _$('#reference-form').data().validator;
    // if (!name && !title && !company && !phone && !email) {
    //   if (validator) validator.destroy();
    //   validator = undefined;
    // } else {
    if (!validator) {
      validator = _$('#reference-form').validate(this.validationRules);
    }
    _$('#reference-form').submit();
    // }

    if (validator.errorList.length === 0) {
      const response = await userApi.updateResume(this.props.resumeID, { referenced: this.state.data });
      if (response && response.code === undefined && response.error === undefined) {
        this.setState({ data: response.referenced, editing: false });
      }
    }
  };

  _updateValue = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.data);
    }
  };

  _renderContentForm = () => {
    const { data } = this.state;
    const { name, title, company, phone, email } = this.state.data;

    return (
      <div className="body-page">
        <div className="hobby-content-wrapper">
          <div className="input-section">
            <form id="reference-form" className="hobby-cv-form">
              <Input type="text" name="name" placeholder={this.t('Họ tên')} value={name} onChange={value => this.setState({ data: { ...data, name: value } }, this._updateValue)} />
              <Input type="text" name="title" placeholder={this.t('Chức danh')} value={title} onChange={value => this.setState({ data: { ...data, title: value } }, this._updateValue)} />
              <Input type="text" name="company" placeholder={this.t('Công ty')} value={company} onChange={value => this.setState({ data: { ...data, company: value } }, this._updateValue)} />
              <Input type="text" name="phone" placeholder={this.t('Số điện thoại')} value={phone} onChange={value => this.setState({ data: { ...data, phone: value } }, this._updateValue)} />
              <Input type="text" name="email" placeholder={this.t('Email')} value={email} onChange={value => this.setState({ data: { ...data, email: value } }, this._updateValue)} />
            </form>

            {this.props.updateMode && (
              <div className="update-actions-wrapper">
                <Button className="jn-btn__yellow" onClick={this._updateReferenceInfo}>
                  {this.t('Lưu')}
                </Button>
                <Button
                  className="jn-btn__normal"
                  onClick={() => {
                    this.setState({
                      editing: false,
                      data: this.props.data || {
                        name: '',
                        title: '',
                        company: '',
                        phone: '',
                        email: ''
                      }
                    });
                  }}
                >
                  {this.t('Huỷ')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  _renderContentView = () => {
    const { title, company, phone, email, name } = this.state.data;
    let content = <div className="ref-info-container">{this.t('Chưa có thông tin người tham chiếu.')}</div>;

    if (name && (email || phone)) {
      content = (
        <div className="ref-info-container">
          <div className="ref-name">{name}</div>
          <div className="ref-position">
            <span className="field-label">{this.t('Chức vụ')}:</span>
            <span className="field-value">{title}</span>
            <span className="separator-text">{this.t('tại')}</span>
            <span className="field-value">{company}</span>
          </div>
          <div className="ref-contact">
            <span className="field-label">{this.t('Số điện thoại')}:</span>
            <span className="field-value">{phone}</span>
          </div>
          <div className="ref-contact">
            <span className="field-label">{this.t('Email')}:</span>
            <span className="field-value">{email}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="reference-info-wrapper">
        {content}
        <div className="actions-wrapper">
          <Button
            onClick={() => {
              this.setState({ editing: true });
            }}
          >
            <span className="icon-pencil" />
            <span className="btn-title">{this.t('Sửa')}</span>
          </Button>
        </div>
      </div>
    );
  };

  _renderFooter = () => {
    return (
      <div className="footer">
        <Button
          onClick={() => {
            this.props.onBack();
          }}
          label={this.t('QUAY LẠI')}
          className="jn-btn__normal"
        />
        <Button
          onClick={() => {
            this.props.onSuccess(this.state);
          }}
          label={this.t('ĐĂNG HỒ SƠ')}
          className="jn-btn__yellow"
        />
      </div>
    );
  };

  render() {
    const { header, updateMode } = this.props;
    return (
      <div>
        <div className="create-cv-container reference">
          <div className="header-page">
            <div className="header-content">
              <div className="label-text">{header}</div>
              <div className="optional">({this.t('Không bắt buộc')})</div>
            </div>
          </div>
          {(updateMode && this.state.editing) || !updateMode ? this._renderContentForm() : this._renderContentView()}
        </div>
        {!updateMode && this._renderFooter()}
      </div>
    );
  }
}

export default ReferenceUser;
