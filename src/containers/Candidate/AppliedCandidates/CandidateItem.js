/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-10 01:18:20
 */
import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Base } from '../../../components';

class CandidateItem extends Base {
  render() {
    const { job, fullname, createdAt, status, statusOpts, _id, resume } = this.props;
    const isFastApplied = resume === undefined;
    let candidateLinkInfo = { pathname: `/candidate/${isFastApplied ? _id : resume._id}` };
    if (isFastApplied) {
      candidateLinkInfo.pathname = `${candidateLinkInfo.pathname}?ja_candidate=true`;
    }

    return (
      <div className="candidate-item">
        <div className="col main-info">
          <div className={`job-title${isFastApplied ? ' fast-applied' : ''}`}>{(!isFastApplied && resume.title) || this.t('Nộp hồ sơ nhanh')}</div>
          <div className="name">
            <span className="candidate-name">{(resume && resume.name) || fullname}</span>
            {<Link to={candidateLinkInfo}>{this.t('Xem')}</Link>}
          </div>
        </div>
        <div className="col other-info">
          <span className="job-info">
            <div className="job-title">{job.title}</div>
            <Link to={`/job/${job.slug || job._id}`}>{this.t('Xem tin')}</Link>
          </span>
        </div>
        <div className="col other-info">
          <div className="cv-date">
            <i className="icon-calendar" />
            {Moment(createdAt).format('DD/MM/YYYY')}
          </div>
        </div>
        <div className="col col-status other-info">{this.t(statusOpts[status] || '')}</div>
      </div>
    );
  }
}

export default connect(state => ({
  statusOpts: state.constants.data.employer_save_profiles || {}
}))(CandidateItem);
