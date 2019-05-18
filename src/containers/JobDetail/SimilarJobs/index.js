/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-01 16:07:41
 */
import React from 'react';
import { Base, JobItem } from '../../../components';
import './style.scss';

export default class SimilarJobs extends Base {
  render() {
    const { data, similarCategory } = this.props;
    const { categories, jobs, count } = data;
    return (
      <div className="similar-jobs-wrapper">
        <div className="title">{this.t('containers').JobDetail.SimilarJobs.job}</div>
        <div className="block-wrapper content">
          <div className="slide-group-items">
            {(jobs || []).map((item, index) => (
              <div className="slide-item-wrapper" key={`similar-job-${index}`}>
                <JobItem data={item} />
              </div>
            ))}
          </div>
          <div className="detail-link-wrapper">
            <span
              className="similar-msg"
              dangerouslySetInnerHTML={{
                __html: this.t(this.t('containers').JobDetail.SimilarJobs.have + this.t('<span class="highlight-number">') + this.t(`${'%number '.replace('%number', count)}`) + this.t('</span>') + this.t('containers').JobDetail.SimilarJobs.newJob + this.t(`${'%category'.replace('%category', (similarCategory && similarCategory.title) || '')}`))
              }}
            />
            <a href={`/tim-kiem${similarCategory && `?categories[]=${similarCategory._id}`}`}>{this.t('containers').JobDetail.SimilarJobs.view}</a>
          </div>
        </div>
      </div>
    );
  }
}
