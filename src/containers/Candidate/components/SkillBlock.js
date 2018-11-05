/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 16:36:00
 */
import React from 'react';
import { Base } from '../../../components';

export default class ExperienceBlock extends Base {
  render() {
    const { skills } = this.props;

    if (skills && skills.length) {
      return (
        <div className="block-container other-info skill-info">
          <div className="block-header">
            <div className="title">
              <i className="icon-paper-plane" />
              {this.t('Kỹ năng')}
            </div>
          </div>
          <div className="block-body info-wrapper">
            {skills.map(skill => {
              return (
                <div className="skill-wrapper" key={`skill-item-${skill._id}`}>
                  <span className="icon-arrow-right" />
                  <span className="field-label">{skill.title}</span>
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
