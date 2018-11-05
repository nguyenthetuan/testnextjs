/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-22 23:57:24
 */
import React from 'react';
import { connect } from 'react-redux';
import createPage from '../../createPage';
import { Base, FileUploader, Button } from '../../../components';
import { companyApi } from '../../../services';
import './style.scss';

class BusinessCertificatePage extends Base {
  static wrapperClasses = 'business-cert-page';

  constructor(props) {
    super(props);
    this.state = { info: null, loading: true, changingCert: false };
  }

  componentDidMount() {
    this._fetchCompanyInfo();
  }

  _updateCert = async () => {
    let info = { ...this.state.info };
    delete info._id;
    delete info.images;

    const sentForm = new FormData();
    Object.keys(info).map(key => {
      sentForm.append(key, info[key]);
    });
    this.state.info.images.map((img, index) => {
      if (img && img.url) {
        Object.keys(img).map(key => {
          sentForm.append(`images[${index}][${key}]`, img[key]);
        });
      }
    });

    const response = await companyApi.updateCompanyInfo(this.state.info._id, sentForm);

    if (response && !response.code && response.company) {
      this._fetchCompanyInfo();
    }
  };

  _fetchCompanyInfo = () => {
    companyApi
      .fetchCompanyInfo()
      .then(response => {
        if (response && response.company) {
          this.setState({ info: { ...response.company }, loading: false });
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

  _handleCertChange = file => {
    if (file) {
      const info = this.state.info;
      this.setState(
        { info: { ...info, business_certificate: file, loading: true } },
        this._updateCert
      );
    }
  };

  render() {
    const { info, changingCert } = this.state;
    return (
      <div className="business-cert-wrapper">
        <div className="form-header">
          <h2>{this.t('Giấy phép kinh doanh')}</h2>
          <div className="legend">
            {this.t('Upload file giấy phép kinh doanh để sử dụng đầy đủ tính tăng trên JobNow')}
          </div>
        </div>
        {!changingCert && info && info.business_certificate && info.business_certificate.url ? (
          <div className="uploaded-cert-wrapper">
            <div className="cert-info">
              <span className="field-label">{this.t('Giấy phép kinh doanh')}:</span>
              <a href={info.business_certificate.url} className="cert-link">
                {info.business_certificate.file_name || info.business_certificate.url}
              </a>
            </div>
            <div className="button-wrapper">
              <Button
                className="jn-btn__yellow"
                onClick={() => {
                  this.setState({ changingCert: true });
                }}
              >
                {this.t('Thay đổi')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="upload-wrapper">
            <FileUploader
              accept=".doc, .pdf, .png, .jpg, .jpeg"
              label={this.t('Chọn hoặc kéo file giấy phép kinh doanh vào đây')}
              annotation="(.doc, .pdf, .png, .jpg)"
              onChange={this._handleCertChange}
            />
            {changingCert && (
              <div className="button-wrapper">
                <Button
                  className="jn-btn__normal"
                  onClick={() => {
                    this.setState({ changingCert: false });
                  }}
                >
                  {this.t('Trở lại')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default createPage(connect()(BusinessCertificatePage));
