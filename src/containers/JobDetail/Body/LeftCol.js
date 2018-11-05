/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-01 10:52:56
 */
import React from 'react';
import { Base, GMap } from '../../../components';

export default class LeftCol extends Base {
  render() {
    const { info } = this.props;
    const { job_right, job_description, job_require, worklocation } = info || {};
    return (
      <div className="col">
        <div className="block-wrapper">
          <div className="block-title">{this.t('Các phúc lợi dành cho bạn')}</div>
          <div
            className="block-content"
            dangerouslySetInnerHTML={{
              __html: (job_right && job_right.replace(/\r?\n/g, '<br />')) || ''
            }}
          />
        </div>
        <div className="block-wrapper">
          <div className="block-title">{this.t('Mô tả công việc')}</div>
          <div
            className="block-content"
            dangerouslySetInnerHTML={{
              __html: (job_description && job_description.replace(/\r?\n/g, '<br />')) || ''
            }}
          />
        </div>
        <div className="block-wrapper">
          <div className="block-title">{this.t('Yêu cầu công việc')}</div>
          <div
            className="block-content"
            dangerouslySetInnerHTML={{
              __html: (job_require && job_require.replace(/\r?\n/g, '<br />')) || ''
            }}
          />
        </div>
        <div className="block-wrapper">
          <div className="block-title">{this.t('Địa điểm làm việc')}</div>
          <div className="block-content">
            <GMap center={worklocation && worklocation[0] && worklocation[0].coord} positions={(worklocation || []).map(pos => pos.coord)} height={290} />
          </div>
        </div>
      </div>
    );
  }
}
