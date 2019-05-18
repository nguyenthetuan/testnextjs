/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-07 10:49:00
 */
import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { userApi } from '../../../../services';
import { Base, Button, Popup } from '../../../../components';
import CreateEduForm from '../../CreateCV/EduForm';
import './style.scss';

class EducationInfo extends Base {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || []
    };
  }

  _renderExpLine = (item, index) => {
    if (item.editing) {
      const editData = this.state.data.map((edu, idx) => (idx !== index && { ...edu, noChange: true }) || edu);
      return (
        <CreateEduForm
          data={editData}
          key={`exp-line-item-${index}`}
          showFooter={false}
          info={this.props.info}
          constants={this.props.constants}
          updateMode
          editFormItem
          resume_id={this.props.resumeID}
          onSuccess={response => {
            const newItemData = response === false ? { ...item, editing: false } : { ...response[index] };
            const { data } = this.state;
            this.setState({ data: [...data.slice(0, index), newItemData, ...data.slice(index + 1)] });
          }}
        />
      );
    }

    const { time_start, time_end, school, certificate, classification } = item;
    const { constants } = this.props;
    return (
      <div className="line-item" key={`exp-line-item-${index}`}>
        <div className="info-wrapper">
          <div className="time-wrapper">
            <span className="from-time">
              {this.t('containers').CV.EditCV.EducationInfo.timeStart}
              {Moment(time_start).format('MM/YYYY')}
            </span>
            <span className="end-time">
              {this.t('containers').CV.EditCV.EducationInfo.timeEnd}
              {Moment(time_end).format('MM/YYYY')}
            </span>
          </div>
          <div className="education-info">
            <span className="job-title">{certificate}</span>
            <span className="text-separator">{this.t('containers').CV.EditCV.EducationInfo.at}</span>
            <span className="job-title">{school}</span>
          </div>
          <div className="edu-classification">
            <div className="content">{this.t('containers').CV.EditCV.EducationInfo.classification}:</div>
            <div className="title">{constants && constants.classification && constants.classification[classification]}</div>
          </div>
        </div>
        <div className="actions-wrapper">
          <Button
            className="btn-delete"
            onClick={() => {
              this._deletingItem = index;
              this.setState({ showDeletePopup: true });
            }}
          >
            <span className="icon-trash" />
            {this.t('containers').CV.EditCV.EducationInfo.delete}
          </Button>
          <Button
            className="btn-edit"
            onClick={() => {
              const { data } = this.state;
              this.setState({ data: [...data.slice(0, index), { ...item, editing: true }, ...data.slice(index + 1)] });
            }}
          >
            <span className="icon-pencil" />
            {this.t('containers').CV.EditCV.EducationInfo.edit}
          </Button>
        </div>
      </div>
    );
  };

  _deleteEducationItem = async () => {
    const { data } = this.state;
    const newData = [...data.slice(0, this._deletingItem), ...data.slice(this._deletingItem + 1)];
    const formData = this._educationFormRef.getFormData(newData);
    const responseDetele = await userApi.updateResume(this.props.resumeID, formData);
    if (responseDetele && responseDetele.code === undefined) {
      this.setState({ data: responseDetele.education, showDeletePopup: false });
    }
  };

  render() {
    const { data, showDeletePopup } = this.state;
    const editData = (data || []).map(item => ({ ...item, noChange: true }));

    return (
      <div className="experience-info">
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">{this.t('containers').CV.EditCV.EducationInfo.edu}</div>
          </div>

          <div className="block-body">
            {(data || []).map((item, index) => this._renderExpLine(item, index))}

            <CreateEduForm
              data={editData}
              resume_id={this.props.resumeID}
              showFooter={false}
              updateMode
              info={this.props.info}
              constants={this.props.constants}
              onSuccess={response => {
                this.setState({ data: response });
              }}
              ref={r => {
                this._educationFormRef = r;
              }}
            />
          </div>
        </div>
        <Popup className="delete-popup" showBox show={showDeletePopup}>
          <div className="message">{this.t('containers').CV.EditCV.EducationInfo.messageDelete}</div>
          <div className="buttons-wrapper">
            <Button
              className="jn-btn__normal btn-cancel"
              onClick={() => {
                this._deletingItem = -1;
                this.setState({ showDeletePopup: false });
              }}
            >
              {this.t('containers').CV.EditCV.EducationInfo.back}
            </Button>
            <Button className="jn-btn__yellow btn-delete" onClick={this._deleteEducationItem}>
              {this.t('containers').CV.EditCV.EducationInfo.delete}
            </Button>
          </div>
        </Popup>
      </div>
    );
  }
}

export default connect(state => ({ constants: state.constants.data.resumes, info: state.auth.info }))(EducationInfo);
