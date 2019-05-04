/*
 * File: JobItem/index.js
 * Desc: generate job item in home page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-27 14:18:23
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Base from '../Base';
import Button from '../Button';
import CompanyLogo from './CompanyLogo';
import './style.scss';

class JobItem extends Base {
  static propsType = {
    type: PropTypes.string,
    data: PropTypes.object.isRequired,
    showJobInfoOnly: PropTypes.bool,
    linkWrapper: PropTypes.bool
  };

  static defaultProps = {
    type: 'list',
    showJobInfoOnly: false,
    linkWrapper: false
  };

  render() {
    const { data, type, salaryOpts, showJobInfoOnly, linkWrapper, style, className, flashJob } = this.props;
    const { company, km, salary, title, _id, worklocation, slug, quantity } = data || {};
    const wrapperClasses = ['job-item-wrapper', `${type}-item`];
    if (className) wrapperClasses.push(className);
    const logo = (company && company.logo) || '/assets/img/logo-full.png';
    const salaryLevel = (salary && salaryOpts && salaryOpts[salary]) || this.t('Thương lượng');
    const location = km ? `${km}km` : worklocation && worklocation[0] && worklocation[0].province;

    if (data && data.featured) {
      wrapperClasses.push('featured-job');
    }

    if (linkWrapper) {
      return (
        <a className={wrapperClasses.join(' ')} href={`/viec-lam/${slug || _id}`} style={style}>
          {!showJobInfoOnly && <div className="company-logo">{data && <CompanyLogo src={logo} displayFull={flashJob} />}</div>}
          <div className="info-wrapper">
            <div className="job-info">
              <div className="job-title">{title}</div>
              <div className="company-name">
                <span>{company && company.name}</span>
              </div>
            </div>
            {data && !showJobInfoOnly && (
              <div className={`extra-info${(flashJob && ' has-slot-number') || ''}`}>
                {location && (
                  <div className="location">
                    <span className="icon-jn-map-marker" />
                    <span className="distance">{location}</span>
                  </div>
                )}
                <div className="salary">
                  <span className="icon-jn-dollar" />
                  <span className="salary-level">{salaryLevel.replace(/^(Từ\s?)/g, '')}</span>
                </div>

                {flashJob && (
                  <div className="slot-number-wrapper">
                    <span className="jn-awesome-user-o" />
                    <span className="text">{this.t('còn tuyển')}</span>
                    <span className="number">{quantity || 0}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </a>
      );
    }

    if (flashJob) wrapperClasses.push('flashjob-item');

    return (
      <div className={wrapperClasses.join(' ')} style={style}>
        {!showJobInfoOnly && <div className="company-logo">{data && <img src={logo} alt="" />}</div>}
        <div className="info-wrapper">
          <div className="job-info">
            <a href={`/viec-lam/${slug || _id}`}>
              <div className="job-title">{title}</div>
              <div className="company-name">
                <span>{company && company.name}</span>
              </div>
            </a>
          </div>
          {data && !showJobInfoOnly && (
            <div className="extra-info">
              {!flashJob && location && (
                <div className="location">
                  <span className="icon-jn-map-marker" />
                  <span className="distance">{location}</span>
                </div>
              )}
              {!flashJob && (
                <div className="salary">
                  <span className="icon-jn-dollar" />
                  <span className="salary-level">{salaryLevel.replace(/^(Từ\s?)/g, '')}</span>
                </div>
              )}
              {flashJob && (
                <div className="ex-info-wrapper">
                  <div className="location">
                    <span className="icon-jn-map-marker" />
                    <span className="distance">{location}</span>
                  </div>
                  <div className="salary">
                    <span className="icon-jn-dollar" />
                    <span className="salary-level">{salaryLevel.replace(/^(Từ\s?)/g, '')}</span>
                  </div>
                  <div className="slot-number-wrapper">
                    <span className="jn-awesome-user-o" />
                    <span className="text">{this.t('còn tuyển')}</span>
                    <span className="number">{quantity || 0}</span>
                  </div>
                </div>
              )}
              {flashJob && (
                <div className="button-wrapper">
                  <div className="jn-btn jn-btn__yellow">
                    <a href={`/viec-lam/${slug || _id}`}>
                      {this.t('Xem ngay')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const jobs = state.constants.data.jobs;
  return {
    salaryOpts: jobs && jobs.salary
  };
})(JobItem);
