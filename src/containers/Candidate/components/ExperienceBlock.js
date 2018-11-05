/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 14:30:22
 */
import React from 'react';
import Moment from 'moment';
import { Base } from '../../../components';

export default class ExperienceBlock extends Base {
  render() {
    const { experiences } = this.props;

    if (experiences && experiences.length) {
      return (
        <div className="block-container other-info exp-info">
          <div className="block-header">
            <div className="title"><i className="icon-briefcase" />{this.t('Kinh nghiệm làm việc')}</div>
          </div>
          <div className="block-body info-wrapper">
            {experiences.map(exp => {
              const startTime = Moment(exp.time_start).format('MM/YYYY');
              const endTime = exp.time_end
                ? Moment(exp.time_end).format('MM/YYYY')
                : this.t('hiện tại');
              return (
                <div className="work-exp-wrapper" key={`exp-item-${exp._id}`}>
                  <div className="field-time">
                    {this.t('Từ tháng')} {startTime} {this.t('đến tháng')} {endTime}
                  </div>
                  <div className="work-position">
                    <span className="field-label">{this.t('Vị trí')}:</span>
                    <span className="field-value">{exp.position}</span>
                  </div>
                  <div className="work-company">
                    <span className="field-label">{this.t('Công ty')}:</span>
                    <span className="field-value">{exp.company}</span>
                  </div>
                  <div className="work-desc">
                    <span className="field-label">{this.t('Mô tả công việc')}:</span>
                    <span className="field-value">{exp.description}</span>
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
