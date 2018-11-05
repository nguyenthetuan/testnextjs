/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 14:35:27
 */
import React from 'react';
import { Base } from '../../../components';
import FieldInfo from './FieldInfo';

export default class GeneralInfoBlock extends Base {
  render() {
    const {
      level,
      year_experience,
      marital_status,
      worklocation,
      categories,
      salary,
      resume_type,
      rank
    } = this.props.info;
    const { constants } = this.props;
    const exp = constants.experience && constants.experience[`${year_experience}`];
    const salaryLevel = constants.salary && constants.salary[`${salary}`];
    const workType = constants.resume_type && constants.resume_type[`${resume_type}`];
    const workPlaces = worklocation.map(place => place.province);
    const maritalStatus = constants.marital_status && constants.marital_status[`${marital_status}`];
    const wannaRank = rank && constants.rank && constants.rank[rank];

    return (
      <div className="block-container other-info general-info">
        <div className="block-header">
          <div className="title">
            <i className="icon-info" />
            {this.t('Thông tin cơ bản')}
          </div>
        </div>
        <div className="block-body">
          <div className="info-col">
            <FieldInfo
              icon="icon-layers"
              label={this.t('Trình độ')}
              value={level}
              hasWrapper
              className="level-info"
            />
            <FieldInfo
              icon="icon-list"
              label={this.t('Kinh nghiệm làm việc')}
              value={exp}
              hasWrapper
              className="exp-info"
            />
            <FieldInfo
              icon="icon-list"
              label={this.t('Cấp bậc mong muốn')}
              value={wannaRank || 'N/A'}
              hasWrapper
              className="position-info"
            />
            <FieldInfo
              icon="icon-list"
              label={this.t('Hôn nhân')}
              value={maritalStatus}
              hasWrapper
              className="marital-info"
            />
          </div>
          <div className="info-col">
            <FieldInfo
              icon="icon-location-pin"
              label={this.t('Địa điểm mong muốn')}
              value={workPlaces.join(', ')}
              hasWrapper
              className=""
            />
            <FieldInfo
              icon="icon-briefcase"
              label={this.t('Ngành nghề mong muốn')}
              value={categories.join(', ')}
              hasWrapper
              className=""
            />
            <FieldInfo
              icon="icon-jn-signal"
              label={this.t('Mức lương mong muốn tối thiểu')}
              value={salaryLevel}
              hasWrapper
              className=""
            />
            <FieldInfo
              icon="icon-calendar"
              label={this.t('Hình thức làm việc')}
              value={workType}
              hasWrapper
              className=""
            />
          </div>
        </div>
      </div>
    );
  }
}
