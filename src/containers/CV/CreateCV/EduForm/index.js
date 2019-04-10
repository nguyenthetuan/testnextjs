import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Base, Button, Popup } from '../../../../components';
import { userApi } from '../../../../services';
import validate from '../../../../utils/validate';
import EduItem from './EduItem';
import './styles.scss';

const _$ = window.jQuery;

export default class CreateEduForm extends Base {
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
      fullname: {
        required: true
      },
      address: {
        required: true
      }
    },
    messages: {
      fullname: this.t('containers').CV.CreateCV.EduForm.index.fullname,
      address: this.t('containers').CV.CreateCV.EduForm.index.address
    }
  };

  constructor(props) {
    super(props);
    const data = (props.data || []).map(item => ({ ...item, classification: { value: item.classification, label: props.constants.classification[item.classification] } }));
    this.state = {
      educations: (data.length && data) || (!props.updateMode ? [this.initNewWork()] : []),
      message: {
        code: 1,
        message: 1
      },
      showPopup: false
    };
  }

  getFormData = data => {
    const { educations } = this.state;
    const formData = new FormData();

    (data || educations).map((item, index) => {
      let time_start = Moment(item.time_start).format('YYYY/MM');
      let time_end = Moment(item.time_end).format('YYYY/MM');
      const classification = typeof item.classification === 'object' ? item.classification.value : item.classification;

      formData.append(`education[${index}][time_start]`, time_start);
      formData.append(`education[${index}][time_end]`, time_end);
      formData.append(`education[${index}][school]`, item.school);
      formData.append(`education[${index}][certificate]`, item.certificate);
      formData.append(`education[${index}][classification]`, classification);
      if (item._id) {
        formData.append(`education[${index}][_id]`, item._id);
      }
    });

    return formData;
  };

  _save = () => {
    if (this.state.updating) return;
    // this._validator = _$('#experience-cv-form').validate(this.validationRules);
    // _$('#experience-cv-form').on('submit', event => {
    //   event.preventDefault();
    // });
    // this._validator.form();

    if (!this.validateWorkExp()) {
      this.setState({
        showPopup: true,
        message: { code: 1, message: this.t('containers').CV.CreateCV.EduForm.index.message }
      });
    } else {
      this.setState({ updating: true }, async () => {
        // Todo: lấy resume id để vào đây
        const response = await userApi.updateResume(this.props.resume_id, this.getFormData());
        if (response && response.code === undefined) {
          if (this.props.showFooter === false) {
            this.setState({ updating: false, educations: [] }, () => {
              this.props.onSuccess(response.education);
            });
          } else {
            this.setState({ updating: false }, () => {
              this.props.onSuccess(this.state, response._id);
            });
          }
        } else {
          this.setState(
            {
              updating: false,
              showPopup: true,
              message: {
                code: 1,
                message: this.t('containers').CV.CreateCV.EduForm.index.messageError
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

  initNewWork = () => {
    const initObj = {
      time_start: new Date(),
      time_end: new Date(),
      school: '',
      classification: '',
      certificate: ''
    };
    return initObj;
  };

  validateWorkExp = () => {
    let flag = true;
    const { educations } = this.state;
    if (educations.length > 0) {
      educations.map(item => {
        if (validate.isEmpty(item.time_start) || validate.isEmpty(item.time_end) || validate.isEmpty(item.school) || validate.isEmpty(item.classification) || validate.isEmpty(item.certificate)) {
          flag = false;
        }
      });
    } else {
      flag = false;
    }

    return flag;
  };

  addNewEducation = () => {
    // TODO: validate previous work

    // if (!this.validateWorkExp()) {
    //   this.setState({
    //     showPopup: true,
    //     message: { code: 1, message: 'Vui lòng nhập đầy đủ thông tin.' }
    //   });
    // } else {
    const initObj = this.initNewWork();
    const newEducations = [...this.state.educations, initObj];
    this.setState({ educations: newEducations });
    // }
  };

  _generateSelectableOpts = () => {
    const genderOpts = [{ value: 'male', label: this.t('containers').CV.CreateCV.EduForm.index.male }, { value: 'female', label: this.t('containers').CV.CreateCV.EduForm.index.female }];
    const { classification, marital_status } = this.props.constants || {};
    const matialOptions = Object.keys(marital_status || {}).map(key => ({
      value: key,
      label: marital_status[key]
    }));
    const classificationOpts = Object.keys(classification || {}).map(key => ({
      value: key,
      label: classification[key]
    }));

    return { classificationOpts, matialOptions, genderOpts };
  };

  handleChangeEducation = (idx, newData) => {
    const { educations } = this.state;
    const newEducations = [...educations.slice(0, idx), newData, ...educations.slice(idx + 1)];
    this.setState({ educations: newEducations });
  };

  removeEducation = idx => {
    const { educations } = this.state;
    const newEducations = [...educations.slice(0, idx), ...educations.slice(idx + 1)];
    this.setState({ educations: newEducations });
  };

  _renderDynamicEducationForm = () => {
    const { educations } = this.state;
    const { classificationOpts } = this._generateSelectableOpts();

    return educations.map((item, idx) => {
      if (item.noChange) return null;
      return (
        <EduItem
          classificationOpts={classificationOpts}
          key={idx}
          onDelete={() => this.removeEducation(idx)}
          isShowDelete={educations.length > 1}
          data={item}
          resume_id={this.props.resume_id}
          onChange={newData => this.handleChangeEducation(idx, newData)}
        />
      );
    });
  };

  _renderContent = () => {
    const wrapperClass = ['education-body-page'];
    const editData = this.state.educations.filter(item => !item.noChange);
    if (editData.length === 0) {
      wrapperClass.push('empty-list');
    }

    if (this.props.updateMode) {
      wrapperClass.push('update-form');
    }

    return (
      <div className={wrapperClass.join(' ')}>
        <div className="education-content-wrapper">{this._renderDynamicEducationForm()} </div>
        {this._renderEditFooter()}
        {!this.props.editFormItem && (
          <div className="add-btn-wrapper">
            <Button className="jn-btn__normal" onClick={this.addNewEducation}>
              <span className="icon-jn-plus" />
              <span className="btn-title">{this.t('containers').CV.CreateCV.EduForm.index.addNewEducation}</span>
            </Button>
          </div>
        )}
      </div>
    );
  };

  _renderFooter = () => {
    if (this.props.showFooter === false) return null;
    return (
      <div className="footer">
        <Button
          onClick={() => {
            this.props.onBack();
          }}
          label={this.t('containers').CV.CreateCV.EduForm.index.back}
          className="jn-btn__normal"
        />
        <Button
          onClick={() => {
            this._save();
          }}
          label={this.t('containers').CV.CreateCV.EduForm.index.continue}
          className="jn-btn__yellow"
        />
      </div>
    );
  };

  _renderEditFooter = () => {
    const editData = this.state.educations.filter(item => !item.noChange);
    if (this.props.showFooter === false && editData.length > 0) {
      return (
        <div className="edit-footer-wrapper">
          <Button onClick={this._save} label={this.t('containers').CV.CreateCV.EduForm.index.save} className="jn-btn__yellow" />
          <Button
            onClick={() => {
              if (this.props.showFooter === false) {
                this.setState({ educations: [] });
              }
              this.props.onSuccess(false);
            }}
            label={this.t('containers').CV.CreateCV.EduForm.index.cancel}
            className="jn-btn__normal"
          />
        </div>
      );
    }

    return null;
  };

  render() {
    const { header } = this.props;
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
                className="jn-btn__normal"
                onClick={() => {
                  this.setState({ message: null, showPopup: false });
                }}
              >
                {this.t('containers').CV.CreateCV.EduForm.index.back2}
              </Button>
            </div>
          </Popup>
        </div>
        {this._renderFooter()}
      </div>
    );
  }
}

//  connect(state => ({
//   info: state.auth.info,
//   constants: state.constants.data.resumes
// }))(CreateEduForm);
