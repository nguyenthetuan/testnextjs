/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-01 10:50:05
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Image, Popup } from '../../../components';
import Video from '../Video';

class RightCol extends Base {
  state = {
    showImagePopup: ''
  };

  _renderStandardJobInfo = () => {
    const { info, constants } = this.props;
    const { salary, worklocation, level, experience, gender, rank, categories } = info || {};

    const workLocations = (worklocation || []).map(loc => loc.province);
    const salaryText = (constants.salary && constants.salary[salary]) || '';
    const levelText = (constants.level && constants.level[level]) || '';
    const expText = (constants.experience && constants.experience[experience]) || '';
    const genderText = (constants.gender && constants.gender[gender]) || '';
    const rankText = (constants.rank && constants.rank[rank]) || '';
    const catText = (categories || []).map(cat => cat.title);

    return (
      <div className="block-wrapper job-info">
        <div className="block-content">
          <div className="info-line">
            <div className="info-title">
              <span className="icon-wallet" />
              <span className="title">{this.t('Mức lương')}:</span>
            </div>
            <div className="info-value">{salaryText}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="icon-location-pin" />
              <span className="title">{this.t('Nơi làm việc')}:</span>
            </div>
            <div className="info-value">{workLocations.join(', ')}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="icon-direction" />
              <span className="title">{this.t('Yêu cầu trình độ')}:</span>
            </div>
            <div className="info-value">{levelText}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="icon-layers" />
              <span className="title">{this.t('Yêu cầu kinh nghiệm')}:</span>
            </div>
            <div className="info-value">{expText}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="icon-symbol-female" />
              <span className="title"> {this.t('Yêu cầu giới tính')}:</span>
            </div>
            <div className="info-value">{genderText}</div>
          </div>
          {/* <div className="info-line">
            <div className="info-title">
              <span className="icon-chart" />
              <span className="title">{this.t('Cấp bậc')}:</span>
            </div>
            <div className="info-value">{rankText}</div>
          </div> */}
          <div className="info-line">
            <div className="info-title">
              <span className="icon-briefcase" />
              <span className="title">{this.t('Ngành nghề')}:</span>
            </div>
            <div className="info-value">{catText.join(', ')}</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { info, constants } = this.props;
    const { view_type, company } = info || {};
    const { tax_id, size, address, website, fanpage, working_time, video, images, description, reason_join } = company || {};
    const { street, district, province } = address || {};
    const sizeText = (constants.size && constants.size[size]) || '';

    const wrapperClasses = ['col', 'right-col', `${view_type}-page`];

    return (
      <div className={wrapperClasses.join(' ')}>
        {view_type !== 'full' && this._renderStandardJobInfo()}

        <div className="block-wrapper">
          <div className="jn-section company-introduction">
            <div className="section-title">{this.t('Giới thiệu về công ty')}</div>
            <div className="section-row">
              <div className="section-col">
                {tax_id && (
                  <div className="info-line">
                    <div className="info-title">{this.t('Mã số thuế')}:</div>
                    <div className="info-value">{tax_id}</div>
                  </div>
                )}
                {sizeText && (
                  <div className="info-line">
                    <div className="info-title">{this.t('Quy mô')}:</div>
                    <div className="info-value">{sizeText}</div>
                  </div>
                )}
                {street &&
                  district &&
                  province && (
                    <div className="info-line">
                      <div className="info-title">{this.t('Địa chỉ')}:</div>
                      <div className="info-value">{`${street}, ${district}, ${province}`}</div>
                    </div>
                  )}
              </div>
              <div className="section-col">
                {website && (
                  <div className="info-line">
                    <div className="info-title">{this.t('Website')}:</div>
                    <a href={website} className="info-value" target="_blank" rel="noopener noreferrer nofollow">
                      {website}
                    </a>
                  </div>
                )}
                {fanpage && (
                  <div className="info-line">
                    <div className="info-title">{this.t('Facebook')}:</div>
                    <a href={fanpage} className="info-value" target="_blank" rel="noopener noreferrer nofollow">
                      {fanpage}
                    </a>
                  </div>
                )}
                {working_time && (
                  <div className="info-line">
                    <div className="info-title">{this.t('Thời gian làm việc')}:</div>
                    <div className="info-value">{working_time}</div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="section-row company-intro"
              dangerouslySetInnerHTML={{
                __html: (description && description.replace(/\r?\n/g, '<br />')) || ''
              }}
            />

            {view_type === 'full' && (
              <div className="section-row galery">
                {video && (
                  <div className="intro-video">
                    <Video url={video} />
                  </div>
                )}
                {(images || []).length > 0 && (
                  <div className="images">
                    {images.slice(0, 5).map((image, index) => (
                      <a
                        className="img-wrapper"
                        key={`galery-img-${index}`}
                        onClick={event => {
                          event.preventDefault();
                          this.setState({ showImagePopup: image.url });
                        }}
                        href="#"
                      >
                        <Image src={image.url} ratio={114 / 80} scaleToFit />
                      </a>
                    ))}
                    <Popup show={this.state.showImagePopup} showBox className="company-image-view" clickOutToClose toggleButton=".job-detail-page .company-introduction .images > a">
                      <img src={this.state.showImagePopup} alt="" />
                      <a
                        href="#"
                        onClick={event => {
                          event.preventDefault();
                          this.setState({ showImagePopup: '' });
                        }}
                      >
                        <span className="icon-jn-close" />
                      </a>
                    </Popup>
                  </div>
                )}
              </div>
            )}
          </div>
          {reason_join && (
            <div className="jn-section company-joined-reason">
              <div className="section-title">{this.t('Lí do gia nhập công ty chúng tôi')}</div>
              <div
                className="section-content"
                dangerouslySetInnerHTML={{
                  __html: (reason_join && reason_join.replace(/\r?\n/g, '<br />')) || ''
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ constants: state.constants.data.jobs || {} }))(RightCol);
