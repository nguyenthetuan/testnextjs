import React from 'react';
import Moment from 'moment';
import { Base, Button, Popup } from '../../../../components';
import validate from '../../../../utils/validate';
import { userApi } from '../../../../services';
import ExpItem from './ExpItem';

import './styles.scss';

const _$ = window.jQuery;

export default class CreateExpForm extends Base {
  static initNewWork = () => {
    const initObj = {
      time_start: new Date(),
      time_end: new Date(),
      company: '',
      title: '',
      description: '',
      current: false
    };

    return initObj;
  };

  validationRules = {
    highlight: element => {
      _$(element)
        .closest('.form-group')
        .addClass('has-error');
    },
    unhighlight: element => {
      _$(element)
        .closest('.form-group')
        .removeClass('has-error');
    },
    errorElement: 'div',
    errorClass: 'help-block',
    errorPlacement: (element, e) => {
      _$(e)
        .parents('.form-group:first > .input-wrapper')
        .append(element);
    },
    rules: {
      company: {
        required: true
      },
      title: {
        required: true
      },
      description: {
        required: true
      }
    },
    messages: {
      company: this.t('containers').CV.CreateCV.ExpForm.index.company,
      title: this.t('containers').CV.CreateCV.ExpForm.index.title,
      description: this.t('containers').CV.CreateCV.ExpForm.index.description
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      work_experience: props.data || [CreateExpForm.initNewWork()]
    };
  }

  getFormData = data => {
    const { work_experience } = this.state;
    const indexOffset = this.props.indexOffset || 0;
    const formData = new FormData();

    (data || work_experience).map((item, index) => {
      let time_start = Moment(item.time_start, ['YYYY/MM', 'YYYY-MM-DD']).format('YYYY/MM');
      formData.append(`work_experience[${index + indexOffset}][time_start]`, time_start);

      let time_end = Moment().format('YYYY/MM');
      if (!item.current) {
        time_end = Moment(item.time_end, ['YYYY/MM', 'YYYY-MM-DD']).format('YYYY/MM');
      }

      const { title, company, description, current, _id } = item;
      if (!title || !title.trim() || !company || !company.trim() || !description || !description.trim()) {
        return;
      }
      formData.append(`work_experience[${index + indexOffset}][time_end]`, time_end);
      formData.append(`work_experience[${index + indexOffset}][current]`, current);
      formData.append(`work_experience[${index + indexOffset}][title]`, title);
      formData.append(`work_experience[${index + indexOffset}][company]`, company);
      formData.append(`work_experience[${index + indexOffset}][description]`, description);
      if (_id) {
        formData.append(`work_experience[${index + indexOffset}][_id]`, _id);
      }
    });

    return formData;
  };

  _save = () => {
    if (this.state.updating) return;
    if (!this.props.createForm && !this.validateWorkExp()) {
      this.setState({
        showPopup: true,
        message: { code: 1, message: this.t('containers').CV.CreateCV.ExpForm.index.message }
      });
    } else {
      this.setState({ updating: true }, async () => {
        // Todo: lấy resume id để vào đây
        const response = await userApi.updateResume(this.props.resume_id, this.getFormData());
        if (response && response.code === undefined) {
          this.setState({ updating: false }, () => {
            // if (this.props.updateMode) {
            this.setState({ work_experience: [] }, () => {
              this.props.onSuccess(response.work_experience);
            });
            // } else {
            //   this.props.onSuccess(response.work_experience, response._id);
            // }
          });
        } else {
          this.setState(
            {
              updating: false,
              showPopup: true,
              message: {
                code: 1,
                message: this.t('containers').CV.CreateCV.ExpForm.index.messageError
              }
            },
            () => {
              // this.props.onSuccess();
            }
          );
        }
      });
    }
  };

  validateWorkExp = () => {
    let flag = true;
    const { work_experience } = this.state;
    if (work_experience.length > 0) {
      work_experience.map(item => {
        if (
          validate.isEmpty(item.time_start) ||
          (item.current && validate.isEmpty(item.time_end)) ||
          validate.isEmpty(item.company) ||
          validate.isEmpty(item.title) ||
          validate.isEmpty(item.description)
        ) {
          flag = false;
        }
      });
    }

    return flag;
  };

  addNewWork = () => {
    const initObj = CreateExpForm.initNewWork();
    const newWorkExperiences = [...this.state.work_experience, initObj];
    this.setState({ work_experience: newWorkExperiences });
  };

  handleChangeWork = (idx, newData) => {
    const { work_experience } = this.state;
    const newWorkExperiences = [...work_experience.slice(0, idx), newData, ...work_experience.slice(idx + 1)];
    this.setState({ work_experience: newWorkExperiences });
  };

  removeWork = idx => {
    const { work_experience } = this.state;
    const newWorkExperiences = [...work_experience.slice(0, idx), ...work_experience.slice(idx + 1)];
    this.setState({ work_experience: newWorkExperiences });
  };

  _renderDynamicWorkForm = () => {
    const { work_experience } = this.state;
    return work_experience.map((item, idx) => {
      if (!item.noChange) {
        return <ExpItem key={idx} onDelete={() => this.removeWork(idx)} isShowDelete={work_experience.length > 1} data={item} onChange={newData => this.handleChangeWork(idx, newData)} />;
      }

      return null;
    });
  };

  _renderContent = () => {
    const { showFooter, editFormItem, updateMode } = this.props;
    const changeWorkExp = this.state.work_experience.filter(item => !item.noChange);

    const wrapperClasses = ['experience-content-wrapper'];
    if (changeWorkExp.length === 0) {
      wrapperClasses.push('empty-list');
    }
    if (showFooter === false && updateMode) {
      wrapperClasses.push('show-update-btn');
    }

    return (
      <div className="experience-body-page">
        <div className={wrapperClasses.join(' ')}>{this._renderDynamicWorkForm()}</div>
        {showFooter === false && (updateMode || changeWorkExp.length > 0) && this._renderUpdateFooter()}

        {!editFormItem && (
          <div className="add-btn-wrapper">
            <Button className="jn-btn__normal" onClick={this.addNewWork}>
              <span className="icon-jn-plus" />
              <span className="btn-title">{this.t('containers').CV.CreateCV.ExpForm.index.addNewWork}</span>
            </Button>
          </div>
        )}
      </div>
    );
  };

  _renderFooter = () => {
    return (
      <div className="footer">
        <Button
          onClick={() => {
            this.props.onBack();
          }}
          label={this.t('containers').CV.CreateCV.ExpForm.index.back}
          className="jn-btn__normal"
        />
        <Button
          onClick={() => {
            this._save();
          }}
          label={this.t('containers').CV.CreateCV.ExpForm.index.continue}
          className="jn-btn__yellow"
        />
      </div>
    );
  };

  _renderUpdateFooter = () => {
    return (
      <div className="edit-footer-wrapper">
        <Button
          onClick={() => {
            this._save();
          }}
          label={this.t('containers').CV.CreateCV.ExpForm.index.save}
          className="jn-btn__yellow"
        />
        <Button
          onClick={() => {
            this.setState({ work_experience: [] }, () => {
              if (typeof this.props.onSuccess === 'function') this.props.onSuccess(false);
            });
          }}
          label={this.t('containers').CV.CreateCV.ExpForm.index.cancel}
          className="jn-btn__normal"
        />
      </div>
    );
  };

  render() {
    const { header, showFooter } = this.props;
    return (
      <div>
        <div className="create-cv-container">
          {/* Special tab at here... */}
          <div className="header-page">
            <div className="header-content">
              <div className="label-text">{header}</div>
            </div>
          </div>
          {this._renderContent()}

          <Popup show={this.state.showPopup} showBox={this.state.showPopup}>
            <div className="message">
              <span className={['msg-icon', this.state.message && this.state.message.code === 0 ? 'icon-jn-checked' : 'icon-close'].join(' ')} />
              <div className="msg">{this.state.message && this.state.message.message}</div>
            </div>
            <div className={['button-wrap'].join(' ')}>
              <Button
                className="jn-btn__yellow"
                onClick={() => {
                  this.setState({ message: null, showPopup: false });
                }}
              >
                {this.t('containers').CV.CreateCV.ExpForm.index.back2}
              </Button>
            </div>
          </Popup>
        </div>
        {showFooter !== false && this._renderFooter()}
      </div>
    );
  }
}
