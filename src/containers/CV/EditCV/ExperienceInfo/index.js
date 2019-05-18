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
import CreateExpForm from '../../CreateCV/ExpForm';
import './style.scss';

class ExperienceInfo extends Base {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || [],
      showDeletePopup: false
    };
  }

  _renderExpLine = (item, index) => {
    if (item.editing) {
      const { data } = this.state;
      const editingData = (data || []).map(i => {
        if (item._id !== i._id) {
          return { ...i, noChange: true };
        }

        let editingItem = { ...item };
        delete editingItem.editing;
        return editingItem;
      });
      return (
        <CreateExpForm
          data={editingData}
          key={`exp-line-item-${index}`}
          updateMode
          editFormItem
          showFooter={false}
          resume_id={this.props.resumeID}
          onSuccess={response => {
            if (response) {
              this.setState({ data: [...data.slice(0, index), { ...response[index], editing: false }, ...data.slice(index + 1)] });
            }
          }}
        />
      );
    }

    return (
      <div className="line-item" key={`exp-line-item-${index}`}>
        <div className="info-wrapper">
          <div className="time-wrapper">
            <span className="from-time">
              {this.t('containers').CV.EditCV.ExperienceInfo.timeStart}
              {Moment(item.time_start).format('MM/YYYY')}
            </span>
            <span className="end-time">
              {this.t('containers').CV.EditCV.ExperienceInfo.timeEnd}
              {item.current ? this.t('containers').CV.EditCV.ExperienceInfo.current : Moment(item.time_end).format('MM/YYYY')}
            </span>
          </div>
          <div className="job-info">
            <span className="job-title">{item.title}</span>
            <span className="separator-text">{this.t('containers').CV.EditCV.ExperienceInfo.at}</span>
            <span className="job-title">{item.company}</span>
          </div>
          <div className="job-desc">
            <div className="title">{this.t('containers').CV.EditCV.ExperienceInfo.job}:</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: (item.description || '').replace(/\r?\n/g, '<br />')
              }}
            />
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
            {this.t('containers').CV.EditCV.ExperienceInfo.delete}
          </Button>
          <Button
            className="btn-edit"
            onClick={() => {
              const { data } = this.state;
              this.setState({ data: [...data.slice(0, index), { ...item, editing: true }, ...data.slice(index + 1)] });
            }}
          >
            <span className="icon-pencil" />
            {this.t('containers').CV.EditCV.ExperienceInfo.edit}
          </Button>
        </div>
      </div>
    );
  };

  _deteleWorkExp = async () => {
    const { data } = this.state;
    const newData = [...data.slice(0, this._deletingItem), ...data.slice(this._deletingItem + 1)];
    const formData = this._expFormRef.getFormData(newData);
    const responseDetele = await userApi.updateResume(this.props.resumeID, formData);
    if (responseDetele && responseDetele.code === undefined) {
      this.setState({ data: responseDetele.work_experience, showDeletePopup: false });
    }
  };

  render() {
    const { data } = this.state;
    const createFormData = (data || []).map(item => ({ ...item, noChange: true }));
    const wrapperClasses = ['experience-info'];
    return (
      <div className={wrapperClasses.join(' ')}>
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">{this.t('containers').CV.EditCV.ExperienceInfo.exp}</div>
          </div>

          <div className="block-body">
            {(data || []).map((item, index) => this._renderExpLine(item, index))}
            <CreateExpForm
              showFooter={false}
              resume_id={this.props.resumeID}
              info={this.props.info}
              constants={this.props.constants}
              data={createFormData}
              // updateMode
              onSuccess={response => {
                console.log('new exp info', response);
                this.setState({ data: response });
              }}
              ref={r => {
                this._expFormRef = r;
              }}
            />
          </div>
        </div>
        <Popup className="delete-popup" showBox show={this.state.showDeletePopup}>
          <div className="message">{this.t('containers').CV.EditCV.ExperienceInfo.messageDelete}</div>
          <div className="buttons-wrapper">
            <Button
              className="jn-btn__normal btn-cancel"
              onClick={() => {
                this._deletingItem = -1;
                this.setState({ showDeletePopup: false });
              }}
            >
              {this.t('containers').CV.EditCV.ExperienceInfo.back}
            </Button>
            <Button className="jn-btn__yellow btn-delete" onClick={this._deteleWorkExp}>
              {this.t('containers').CV.EditCV.ExperienceInfo.delete}
            </Button>
          </div>
        </Popup>
      </div>
    );
  }
}

export default connect(state => ({ info: state.auth.info, constants: state.constants.data.users }))(ExperienceInfo);
