/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 16:08:24
 */
import React from 'react';
import Moment from 'moment';
import { Base } from '../../../components';

export default class EducationInfoBlock extends Base {
  render() {
    const { educations } = this.props;

    if (educations && educations.length) {
      return (
        <div className="block-container education-info other-info">
          <div className="block-header">
            <div className="title">
              <i className="icon-graduation" />
              {this.t('Học vấn')}
            </div>
          </div>
          <div className="block-body info-wrapper">
            {educations.map(edu => {
              const startTime = Moment(edu.time_start).format('MM/YYYY');
              const endTime = edu.time_end
                ? Moment(edu.time_end).format('MM/YYYY')
                : this.t('hiện tại');
              let school = edu.school.replace(/trường /i, '');
              school = `${school[0].toUpperCase()}${school.slice(1)}`;

              return (
                <div className="education-wrapper" key={`edu-item-${edu._id}`}>
                  <div className="field-time">
                    {this.t('Từ tháng')} {startTime} {this.t('đến tháng')} {endTime}
                  </div>
                  {edu.certificate && (
                    <div className="edu-certificate">
                      <span className="field-label">{this.t('Bằng cấp')}:</span>
                      <span className="field-value">{edu.certificate}</span>
                    </div>
                  )}
                  <div className="edu-school">
                    <span className="field-label">{this.t('Trường')}:</span>
                    <span className="field-value">{school}</span>
                  </div>

                  {edu.major && (
                    <div className="edu-major">
                      <span className="field-label">{this.t('Chuyên ngành')}:</span>
                      <span className="field-value">{edu.major}</span>
                    </div>
                  )}

                  <div className="edu-desc">
                    <span className="field-value">{edu.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }
}
