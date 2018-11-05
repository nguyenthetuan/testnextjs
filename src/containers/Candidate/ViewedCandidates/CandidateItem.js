/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-10 01:18:20
 */
import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';

import { Base } from '../../../components';

class CandidateItem extends Base {
  render() {
    const { resume, createdAt, statusOpts, status } = this.props;
    if (!resume) {
      return null;
    }

    return (
      <a href={`/candidate/${resume._id}`} className="candidate-item">
        <div className="col col-candidate main-info">
          <div className="job-title">{resume.title}</div>
          <div className="name">{resume.name}</div>
        </div>

        <div className="col col-date other-info">
          <div className="saved-date">
            <i className="icon-calendar" />
            {Moment(createdAt).format('DD/MM/YYYY')}
          </div>
        </div>
        <div className="col col-status other-info">{statusOpts[status] || ''}</div>
      </a>
    );
  }
}

export default connect(state => ({
  statusOpts: state.constants.data.employer_save_profiles || {}
}))(CandidateItem);
