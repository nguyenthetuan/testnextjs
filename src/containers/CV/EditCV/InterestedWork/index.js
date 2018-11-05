/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-07 09:30:56
 */
import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Base, Button } from '../../../../components';
import HobbyWithCV from '../../CreateCV/HobbyWithCV';
import './style.scss';

class InterestedWork extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      data: props.data
    };
  }

  _renderViewBlock = () => {
    const { constants } = this.props;
    const { title, salary, worklocation, categories, rank, resume_type, year_experience } = this.state.data || {};

    return (
      <div className="block-body">
        <div className="title-wrapper">
          <div className="info-line">
            <div className="info-title">{this.t('Vị trí/Chức danh/Tiêu đề hồ sơ')}:</div>
            <div className="info-value">{title}</div>
          </div>
        </div>

        <div className="main-info-wrapper">
          <div className="col">
            <div className="info-line">
              <div className="info-title">{this.t('Nơi làm việc')}:</div>
              <div className="info-value">
                {worklocation.map(location => `${(location.district && location.district !== 'undefined' && `${location.district} - `) || ''}${location.province}`).join(', ')}
              </div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('Ngành nghề')}:</div>
              <div className="info-value">{categories.map(cat => cat.title).join(', ')}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('Mức lương tối thiểu')}:</div>
              <div className="info-value">{salary && constants && constants.salary && constants.salary[salary]}</div>
            </div>
          </div>
          <div className="col">
            <div className="info-line">
              <div className="info-title">{this.t('Cấp bậc mong muốn')}:</div>
              <div className="info-value">{constants && constants.rank && constants.rank[rank]}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('Hình thức làm việc')}:</div>
              <div className="info-value">{constants && constants.resume_type && constants.resume_type[resume_type]}</div>
            </div>
            <div className="info-line">
              <div className="info-title">{this.t('Số năm kinh nghiệm')}:</div>
              <div className="info-value">{constants && constants.experience && constants.experience[year_experience]}</div>
            </div>
          </div>
          <div className="actions-wrapper">
            <Button
              onClick={() => {
                this.setState({ isEditing: true });
              }}
            >
              <span className="icon-pencil" />
              <span className="btn-title">{this.t('Sửa')}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  _onEditDone = data => {
    if (data) {
      this.setState({ data: { ...data } });
    }
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <div className="interest-info">
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">{this.t('CÔNG VIỆC MONG MUỐN')}</div>
          </div>
          {(this.state.isEditing && <HobbyWithCV data={this.state.data} editMode onEditDone={this._onEditDone} resumeID={this.props.resumeID} />) || this._renderViewBlock()}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  constants: state.constants.data.resumes
}))(InterestedWork);
