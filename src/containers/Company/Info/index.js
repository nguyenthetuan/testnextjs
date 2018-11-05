/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-21 20:44:54
 */
import React from 'react';
import { connect } from 'react-redux';
import createPage from '../../createPage';
import { login } from '../../../actions/auth';
import { Base, Input, Button, Select, AddressInput, Popup, ImagePicker } from '../../../components';
import { companyApi } from '../../../services';
import './style.scss';

const _$ = window.jQuery;

class CompanyInfoPage extends Base {
  static wrapperClasses = 'company-info-page';

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: null,
      size: undefined,
      description: '',
      phone: '',
      contact: '',
      tax_id: '',
      video: '',
      website: '',
      cover: {},
      images: [],
      logo: {},
      fanpage: '',
      reason_join: '',
      working_time: '',
      message: null
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
      phone: {
        required: true,
        phoneVN: true
      },
      companyName: {
        required: true
      },
      contact: {
        required: true
      }
    },
    messages: {
      companyName: this.t('Nhập tên công ty.'),
      contact: this.t('Nhập tên người liên hệ.'),
      phone: {
        required: this.t('Nhập số điện thoại.'),
        phoneVN: this.t('Không đúng định dạng số điện thoại')
      }
    }
  };

  componentDidMount() {
    _$('#company-info-form').on('submit', event => {
      event.preventDefault();
    });
    this._validator = _$('#company-info-form').validate(this.validationRules);
  }

  componentWillReceiveProps(nextProps) {
    if (
      Object.keys(nextProps.companyOpts).length !== Object.keys(this.props.companyOpts).length
      && !this.state.size
    ) {
      this.setState(
        {
          size: [
            {
              value: Object.keys(nextProps.companyOpts)[0],
              label: nextProps.companyOpts[Object.keys(nextProps.companyOpts)[0]]
            }
          ]
        },
        this._fetchCompanyInfo
      );
    }
  }

  _fetchCompanyInfo = () => {
    companyApi
      .fetchCompanyInfo()
      .then(response => {
        if (response && response.company) {
          let newState = { ...response.company };
          newState.size = [
            { value: response.company.size, label: this.props.companyOpts[response.company.size] }
          ];
          this.setState(newState);
        }
      })
      .catch(error => {
        console.log('get company info error', error);
        this.setState({
          message: {
            code: 1,
            message: this.t('Kết nối đến server không thành công.')
          }
        });
      });
  };

  _handleFormrSubmit = async () => {
    _$('#company-info-form').submit();
    const { street, province, district } = this._companyAddrRef.getValue();
    if (street && district && province) {
      // disable error for address field
      this._companyAddrRef.showError(false);
      if (this._validator.errorList.length === 0) {
        let info = { ...this.state };
        info.size = info.size[0].value;
        delete info._id;
        delete info.images;

        const sentForm = new FormData();
        Object.keys(info).map(key => {
          sentForm.append(key, info[key]);
        });
        this.state.images.map((img, index) => {
          if (img && img.url) {
            Object.keys(img).map(key => {
              sentForm.append(`images[${index}][${key}]`, img[key]);
            });
          } else {
            sentForm.append('images', img);
          }
        });

        const response = await companyApi.updateCompanyInfo(this.state._id, sentForm);

        if (response && !response.code && response.company) {
          this.setState({
            message: {
              code: 0,
              message: this.t('Cập nhật thông tin thành công.')
            }
          });
          this._fetchCompanyInfo();
        } else {
          this.setState({
            message: {
              code: 1,
              message: this.t('Cập nhật thông tin không thành công.')
            }
          });
        }

        console.log('update company info response', response);
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

  _renderContent() {
    let sizeOpts = Object.keys(this.props.companyOpts).map(key => ({
      value: key,
      label: this.props.companyOpts[key]
    }));

    const {
      name,
      address,
      size,
      description,
      phone,
      contact,
      tax_id,
      video,
      website,
      cover,
      images,
      logo,
      fanpage,
      reason_join,
      working_time
    } = this.state;

    return (
      <div className="content-wrapper">
        <form id="company-info-form">
          <Input
            type="text"
            name="companyName"
            placeholder={this.t('Tên công ty')}
            required
            value={name}
            onChange={value => this.setState({ name: value })}
          />
          <AddressInput
            ref={r => {
              this._companyAddrRef = r;
            }}
            label={this.t('Địa chỉ')}
            locations={this.props.locations}
            value={address}
          />

          <div className="field-wrapper form-group company-size">
            <label>
              {this.t('Quy mô')}
              <span className="required">*</span>
            </label>
            <Select
              value={size}
              options={sizeOpts}
              onChange={selected => {
                this.setState({ size: selected });
              }}
            />
          </div>
          <Input
            type="text"
            name="introduction"
            placeholder={this.t('Giới thiệu')}
            value={description}
            onChange={value => this.setState({ description: value })}
          />
          <Input
            type="text"
            name="contact"
            value={contact}
            placeholder={this.t('Họ tên người liên hệ')}
            required
            onChange={value => this.setState({ contact: value })}
          />
          <Input
            type="text"
            name="phone"
            value={phone}
            placeholder={this.t('Số điện thoại')}
            required
            onChange={value => this.setState({ phone: value })}
          />
          <Input
            type="text"
            name="taxNumber"
            placeholder={this.t('Mã số thuế')}
            value={tax_id}
            onChange={value => this.setState({ tax_id: value })}
          />
          <Input
            type="text"
            name="workingTime"
            placeholder={this.t('Thời gian làm việc')}
            value={working_time}
            onChange={value => this.setState({ working_time: value })}
          />
          <Input
            type="text"
            name="website"
            value={website}
            placeholder={this.t('Website')}
            onChange={value => this.setState({ website: value })}
          />
          <Input
            type="text"
            name="fanpage"
            value={fanpage}
            placeholder={this.t('Fanpage')}
            onChange={value => this.setState({ fanpage: value })}
          />
          <Input
            type="text"
            name="introductionVideoLink"
            placeholder={this.t('Link video giới thiệu')}
            value={video}
            onChange={value => this.setState({ video: value })}
          />
          <Input
            type="text"
            name="joinedReason"
            value={reason_join}
            placeholder={this.t('Lý do gia nhập')}
            onChange={value => this.setState({ reason_join: value })}
          />
          <div className="field-wrapper form-group form-submit-wrapper">
            <label />
            <div className="submit-wrapper">
              <div className="submit-button-wrapper">
                <Button
                  label={this.t('Lưu')}
                  onClick={this._handleFormrSubmit}
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
        <div className="right-col">
          <ImagePicker
            placeholder={this.t('Thêm logo')}
            label={this.t('Logo công ty')}
            images={logo && (logo.url || logo.data) ? [logo] : []}
            onChange={imgs => {
              this.setState({ logo: imgs && imgs[0] });
            }}
          />
          <ImagePicker
            placeholder={this.t('Thêm ảnh')}
            label={this.t('Ảnh bìa tại trang việc làm')}
            onChange={imgs => {
              this.setState({ cover: imgs && imgs[0] });
            }}
            images={cover && (cover.url || cover.data) ? [cover] : []}
          />
          <ImagePicker
            multiple
            placeholder={this.t('Thêm ảnh')}
            label={this.t('Hình ảnh về công ty')}
            onChange={imgs => {
              this.setState({ images: imgs });
            }}
            images={images}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="company-info-wrapper">
        <div className="form-header">
          <h2>{this.t('Thông tin công ty')}</h2>
          <div className="legend">
            {this.t(
              'Điền đầy đủ thông tin để thu hút các ứng viên nộp hồ sơ ứng tuyển vào công ty bạn'
            )}
          </div>
        </div>
        {this._renderContent()}
        {this.state.message && (
          <Popup show showBox>
            <div className="message">
              <span className={['msg-icon', this.state.message.code === 0 ? 'icon-jn-checked' : 'icon-close'].join(' ')} />
              <div className="msg">{this.state.message.message}</div>
            </div>
            <div className="button-wrap"><Button className="jn-btn__normal" onClick={() => this.setState({ message: null })}>{this.t('Trở lại')}</Button></div>
          </Popup>
        )}
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
  )(CompanyInfoPage)
);
