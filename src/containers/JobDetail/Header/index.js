/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-31 18:10:16
 */
import React from 'react';
import { connect } from 'react-redux';
import { FacebookShareButton, TwitterShareButton, TwitterIcon, GooglePlusIcon, GooglePlusShareButton, EmailShareButton, EmailIcon, FacebookIcon, LinkedinIcon, LinkedinShareButton } from 'react-share';
import { jobApi } from '../../../services';
import { Base, Button } from '../../../components';
import './style.scss';

class Header extends Base {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      mobileMode: window.innerWidth < 768
    };
  }

  componentDidMount() {
    this._wrapperHeight = this._wrapper.offsetHeight;
    this._offsetTop = this._wrapper.offsetTop;
    document.addEventListener('scroll', this._onScroll);
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onResize);
  }

  _onScroll = event => {
    if (window.scrollY >= this._offsetTop + this._wrapperHeight / 2) {
      if (!this.state.fixed) {
        this.setState({ fixed: true });
      }
    } else if (window.scrollY <= this._offsetTop + this._wrapperHeight / 2) {
      this.setState({ fixed: false });
    }
  };

  _onResize = () => {
    this._wrapper.removeAttribute('style');
    if (window.innerWidth < 768) {
      if (!this.state.mobileMode) {
        this._wrapperHeight = this._wrapper.offsetHeight;
        setTimeout(() => {
          this.setState({ mobileMode: true });
        }, 0);
      }
    } else if (this.state.mobileMode) {
      this._wrapperHeight = this._wrapper.offsetHeight;
      setTimeout(() => {
        this.setState({ mobileMode: false });
      }, 0);
    }
  };

  _renderJobInfo = () => {
    const { info, constants } = this.props;
    const { worklocation, salary, level, experience, gender } = info;

    const workLocations = worklocation.map(loc => loc.province);
    const salaryText = (constants.salary && constants.salary[salary]) || '';
    const levelText = (constants.level && constants.level[level]) || '';
    const expText = (constants.experience && constants.experience[experience]) || '';
    const genderText = (constants.gender && constants.gender[gender]) || '';

    return (
      <div className="job-info">
        <div className="info-line">
          <span>
            <span className="title">{this.t('containers').JobDetail.Header.salary}:</span>
            <span className="value">{salaryText}</span>
          </span>

          <span className="separator">|</span>
          <span>
            <span className="title">{this.t('containers').JobDetail.Header.worklocation}:</span>
            <span className="value worklocations">{workLocations.join(', ')}</span>
          </span>
        </div>
        <div className="info-line">
          <span>
            <span className="title">{this.t('containers').JobDetail.Header.level}:</span>
            <span className="value">{levelText}</span>
          </span>
          <span className="separator">|</span>
          <span>
            <span className="title">{this.t('containers').JobDetail.Header.exp}:</span>
            <span className="value">{expText}</span>
          </span>
          <span className="separator">|</span>
          <span>
            <span className="title">{this.t('containers').JobDetail.Header.gender}:</span>
            <span className="value">{genderText}</span>
          </span>
        </div>
      </div>
    );
  };

  _saveJob = async () => {
    const { candidate_saved_job, _id } = this.props.info;
    if (!candidate_saved_job.saved) {
      const response = await jobApi.saveJob(_id);
      if (response && response.result) {
        this.props.onSaveJobSuccess();
      }
    }
  };

  _renderShareButtons = () => {
    const url = window.location.href;

    return (
      <div className="jn-btn__normal jn-share-job">
        <div className="wrapper">
          <span className="icon-share-alt" />
          <span className="btn-title">{this.t('containers').JobDetail.Header.share}</span>
        </div>
        <div className="share-btn-wrapper">
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} />
          </FacebookShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} />
          </LinkedinShareButton>
          <GooglePlusShareButton url={url}>
            <GooglePlusIcon size={40} />
          </GooglePlusShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={40} />
          </TwitterShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={40} />
          </EmailShareButton>
        </div>
      </div>
    );
  };

  render() {
    const { info } = this.props;
    const { title, company, view_type, candidate_saved_job, km } = info || {};

    return (
      <div
        className={`job-header-wrapper ${view_type}-style${this.state.fixed ? ' fixed-top' : ''}`}
        ref={r => {
          this._wrapper = r;
        }}
        style={{ height: this._wrapperHeight }}
      >
        {view_type === 'full' &&
          company.cover && (
            <div className="cover-wrapper">
              <img src={company.cover} alt="" />
            </div>
          )}
        <div className="job-info-wrapper">
          <div className="main-info">
            {view_type === 'full' && (
              <div className="company-logo">
                <img src={company.logo} alt="" />
              </div>
            )}
            <div className="detail-info-wrapper">
              <h3 className="job-title">{title}</h3>
              <div className="company-info">
                <div className="company-name">{company && company.name}</div>
                <div className="company-addr">
                  <span className="icon-jn-map-marker" />
                  {(km && `${km} km`) || (company && company.address.province)}
                </div>
              </div>
              {view_type === 'full' && this._renderJobInfo()}
              {view_type !== 'full' &&
                !this.state.mobileMode && (
                  <div className="other-actions">
                    <Button requiredAuth className={`jn-btn__normal jn-saved-job${candidate_saved_job && candidate_saved_job.saved ? ' saved' : ''}`} onClick={this._saveJob}>
                      <span className="icon-heart" />
                      <span className="btn-title">{this.t(candidate_saved_job && candidate_saved_job.saved ? this.t('containers').JobDetail.Header.save : this.t('containers').JobDetail.Header.savedJobs)}</span>
                    </Button>
                    {this._renderShareButtons()}
                  </div>
                )}
            </div>
          </div>
          <div className="actions-wrapper">
            <Button className="jn-btn__yellow jn-apply-btn" onClick={this.props.onApplyClick}>
              <span className="icon-paper-plane" />
              {this.t('containers').JobDetail.Header.applyCV}
            </Button>
            {(view_type === 'full' || this.state.mobileMode) && (
              <div className="other-actions">
                <Button className={`jn-btn__normal jn-saved-job${candidate_saved_job && candidate_saved_job.saved ? ' saved' : ''}`} requiredAuth onClick={this._saveJob}>
                  <span className="icon-heart" />
                  <span className="btn-title">{this.t(candidate_saved_job && candidate_saved_job.saved ? this.t('containers').JobDetail.Header.save : this.t('containers').JobDetail.Header.savedJobs)}</span>
                </Button>
                {this._renderShareButtons()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  constants: state.constants.data.jobs || {}
}))(Header);
