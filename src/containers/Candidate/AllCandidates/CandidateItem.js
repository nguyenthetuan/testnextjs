/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-10 01:18:20
 */
import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import { Base } from '../../../components';

class CandidateItem extends Base {
  render() {
    const {
      title,
      name,
      level,
      salary,
      year_experience,
      worklocation,
      createdAt,
      have_filecv,
      constants,
      _id
    } = this.props;

    return (
      <a className="candidate-item" href={`/candidate/${_id}`}>
        <div className="col main-info">
          <div className="job-title">{title}</div>
          <div className="name">{name}</div>
        </div>
        <div className="col other-info">
          <div className="exp">
            <i className="icon-list" />
            {constants.experience && constants.experience[`${year_experience}`]}
          </div>
          <div className="edu">
            <i className="icon-layers" />
            {level}
          </div>
        </div>
        <div className="col other-info">
          <div className="salary">
            <i className="icon-jn-signal" />
            {constants.salary && constants.salary[`${salary}`]}
          </div>
          {worklocation
            && worklocation[0] && (
              <div className="location">
                <i className="icon-location-pin" />
                {worklocation[0].district} - {worklocation[0].province}
              </div>
          )}
        </div>
        <div className="col other-info">
          <div className="cv-date">
            <i className="icon-calendar" />
            {Moment(createdAt).format('dd/MM/YYYY')}
          </div>
          {have_filecv && (
            <div className="cv-file">
              <i className="icon-paper-clip" />
              <span>{this.t('Hồ sơ đính kèm')}</span>
            </div>
          )}
        </div>
      </a>
    );
  }
}

const mapStateToProps = state => {
  return {
    constants: state.constants.data.resumes || {}
  };
};

export default connect(mapStateToProps)(CandidateItem);
