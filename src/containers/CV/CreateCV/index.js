import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Base, Button, Popup, FileUploader, DatePicker, Radio, Select } from '../../../components';
import './styles.scss';

import HobbyWithCV from './HobbyWithCV';
import InitCreation from './InitCreation';
import ExpForm from './ExpForm';
import EduForm from './EduForm';
import SkillInfo from '../components/SkillInfo';
import ForeignLanguage from '../components/ForeignLanguage';
import CreateSuccessfull from './CreateSuccessfull';
import UpdateAccountMessage from '../components/UpdateAccountMessage';
import language from '../../../config/language/index';
import createPage from '../../createPage';
// apis
import { userApi } from '../../../services';

// component
import WizardTabs from '../components/WizardTabs';
import ReferenceUser from '../components/ReferenceUser';

// Step none cv
const INIT_STATE = 0;
const UPLOAD_CV_STEP = 1;
const ADD_HOBBY_JOB_STEP = 2;
const ADD_EXPERIENCE_STEP = 3;
const ADD_EDUCATION_STEP = 4;
const ADD_SKILL_STEP = 5;

// Step with cv
const ADD_HOBBY_WITH_CV = 6;
const CREATE_SUCCESSFUL = 7;

class CreateCV extends Base {
  static wrapperClasses = 'create-resume-page';

  constructor(props) {
    super(props);

    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let params = {};
    let match;
    const loopCondition = true;
    while (loopCondition) {
      match = regex.exec(props.location.search);
      if (!match) break;
      params[match[1]] = decodeURI(match[2]);
    }

    const mapKeyToValueHeader = {
      [INIT_STATE]: language.containers.CV.CreateCV.index.createCV,
      [UPLOAD_CV_STEP]: language.containers.CV.CreateCV.index.createCV,
      [ADD_HOBBY_JOB_STEP]: language.containers.CV.CreateCV.index.addHobby,
      [ADD_EXPERIENCE_STEP]: language.containers.CV.CreateCV.index.addExp,
      [ADD_EDUCATION_STEP]: language.containers.CV.CreateCV.index.edu,
      [ADD_SKILL_STEP]: language.containers.CV.CreateCV.index.addSkill
    };

    const TAB_LIST = [
      { id: ADD_HOBBY_JOB_STEP, value: mapKeyToValueHeader[ADD_HOBBY_JOB_STEP], icon: 'icon-briefcase' },
      { id: ADD_EXPERIENCE_STEP, value: mapKeyToValueHeader[ADD_EXPERIENCE_STEP], icon: 'icon-badge' },
      { id: ADD_EDUCATION_STEP, value: mapKeyToValueHeader[ADD_EDUCATION_STEP], icon: 'icon-graduation' },
      { id: ADD_SKILL_STEP, value: mapKeyToValueHeader[ADD_SKILL_STEP], icon: 'icon-bulb' }
    ];

    this.state = {
      resume_id: params.id || null,
      hobbyState: null,
      currentStep: (params.step && params.step < 7 && params.step >= 0 && parseInt(params.step, 10)) || INIT_STATE,
      cvFile: null,
      currentTextHeader: this.t('containers').CV.CreateCV.index.createCV,
      skills: [],
      languages: [],
      showPopup: false,
      message: null,
      referenced: {}
    };
    global.TAB_LIST = TAB_LIST;
    global.mapKeyToValueHeader = mapKeyToValueHeader;
  }

  onChangeWizardTab = item => {
    this.setState({ currentStep: item.id, currentTextHeader: item.value });
  };

  _nexStep = (key, title) => {
    this.setState({ currentStep: key, currentTextHeader: title || this.state.title });
  };

  _handleUploadCv = (file, title) => {
    // TODO: handle upload file...
    if (file) {
      this.setState({ cvFile: file });
    }
  };

  // Bắt đầu tạo CV
  _renderInitState = () => {
    const { cvFile, currentTextHeader } = this.state;

    return (
      <InitCreation
        createByFill={() => {
          this._nexStep(ADD_HOBBY_JOB_STEP, this.t('containers').CV.CreateCV.index.addHobbyJob);
        }}
        createByCV={() => {
          this._nexStep(UPLOAD_CV_STEP);
        }}
        header={currentTextHeader}
      />
    );
  };

  _createResumeWithFile = async () => {
    const response = await userApi.createResumeByFile({ filecv: this.state.cvFile });
    if (response && response.result) {
      this.setState({ currentStep: ADD_HOBBY_WITH_CV, resume_id: response.data.resume_id });
    } else {
      this.setState({ message: { code: 1, message: this.t('containers').CV.CreateCV.index.message } });
    }
  };

  _renderUploadCv = () => {
    const { cvFile, currentTextHeader } = this.state;
    return (
      <div className="create-cv-container">
        {/* Special tab at here... */}
        <div className="header-page">
          <div className="header-content">
            <div className="label-text">{currentTextHeader}</div>
          </div>
        </div>
        <div className="body-page">
          {!cvFile && (
            <FileUploader
              onChange={this._handleUploadCv}
              accept=".doc, .pdf, .png, .jpg, .jpeg"
              label={this.t('containers').CV.CreateCV.index.handleUploadCv}
              annotation={this.t('containers').CV.CreateCV.index.annotation}
            />
          )}

          {cvFile && (
            <div className="upload-file-box">
              <div>
                <img src="/assets/img/upload-icon.png" alt="" />
              </div>
              <div className="cv-info">
                <div className="title">{this.t('containers').CV.CreateCV.index.title}</div>
                <div className="file-name">{cvFile.name}</div>

                <Button
                  onClick={() => {
                    this.inputRef.click();
                  }}
                  label={this.t('containers').CV.CreateCV.index.click}
                  className="jn-btn__normal"
                />

                <input
                  ref={c => {
                    this.inputRef = c;
                  }}
                  type="file"
                  name="file[]"
                  id="coverInput"
                  style={{ display: 'none' }}
                  accept=".doc, .pdf, .png, .jpg, .jpeg"
                  onChange={e => {
                    e.preventDefault();
                    this._handleUploadCv(e.target.files[0]);
                  }}
                />

                <Button onClick={this._createResumeWithFile} label={this.t('containers').CV.CreateCV.index.continue} className="jn-btn__yellow" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  _renderAddHobby = () => {
    const { currentStep } = this.state;
    return (
      <div>
        {/* Test Wizard Tab */}
        {currentStep >= 2 &&
          currentStep < 6 && (
            <div className="create-wizard-tab">
              <WizardTabs onChange={this.onChangeWizardTab} tabList={global.TAB_LIST} selected={currentStep} />
            </div>
          )}
        <HobbyWithCV
          showFooter
          header={this.t(this.state.currentTextHeader)}
          onSuccess={(hobbyState, resume_id) => {
            this.setState({
              currentStep: ADD_EXPERIENCE_STEP,
              currentTextHeader: global.mapKeyToValueHeader[ADD_EXPERIENCE_STEP],
              resume_id: resume_id,
              hobbyState: hobbyState
            });
          }}
          onBack={() => {
            this.updateNewStep(INIT_STATE);
          }}
        />
      </div>
    );
  };

  updateNewStep = id => {
    this.setState({ currentStep: id, currentTextHeader: global.mapKeyToValueHeader[id] });
  };

  _renderAddExperience = () => {
    const { currentStep } = this.state;
    return (
      <div>
        {/* Test Wizard Tab */}
        {currentStep >= 2 &&
          currentStep < 6 && (
            <div className="create-wizard-tab">
              <WizardTabs onChange={this.onChangeWizardTab} tabList={global.TAB_LIST} selected={currentStep} />
            </div>
          )}
        <ExpForm
          resume_id={this.state.resume_id}
          header={this.t(this.state.currentTextHeader)}
          info={this.props.info}
          constants={this.props.constants}
          createForm
          onSuccess={() => {
            this.updateNewStep(ADD_EDUCATION_STEP);
          }}
          onBack={() => {
            this.updateNewStep(ADD_HOBBY_JOB_STEP);
          }}
        />
      </div>
    );
  };

  _renderAddEducation = () => {
    const { currentStep } = this.state;
    return (
      <div>
        {/* Test Wizard Tab */}
        {currentStep >= 2 &&
          currentStep < 6 && (
            <div className="create-wizard-tab">
              <WizardTabs onChange={this.onChangeWizardTab} tabList={global.TAB_LIST} selected={currentStep} />
            </div>
          )}
        <EduForm
          resume_id={this.state.resume_id}
          header={this.t(this.state.currentTextHeader)}
          info={this.props.info}
          constants={this.props.resumesConst}
          onSuccess={() => {
            this.updateNewStep(ADD_SKILL_STEP);
          }}
          onBack={() => {
            this.updateNewStep(ADD_EXPERIENCE_STEP);
          }}
        />
      </div>
    );
  };

  _getPublishData = () => {
    const { skills, languages, referenced } = this.state;
    const formData = new FormData();

    if (skills && skills.length > 0) {
      skills.map((item, index) => {
        if (item.id) {
          formData.append(`skills[${index}][id]`, item.id);
        }
        formData.append(`skills[${index}][title]`, item.title);
      });
    }

    if (languages && languages.length > 0) {
      languages.map((lang, index) => {
        Object.keys(lang).map(key => {
          formData.append(`language[${index}][${key}]`, lang[key]);
        });
      });
    }

    if (referenced.name && referenced.title && referenced.company && referenced.phone && referenced.email) {
      formData.append('referenced[name]', referenced.name);
      formData.append('referenced[title]', referenced.title);
      formData.append('referenced[company]', referenced.company);
      formData.append('referenced[phone]', referenced.phone);
      formData.append('referenced[email]', referenced.email);
    }

    return formData;
  };

  _onPublish = () => {
    if (!this.state.skills || this.state.skills.length === 0) {
      this.setState({
        showPopup: true,
        message: { code: 1, message: this.t('containers').CV.CreateCV.index.message2 }
      });
    } else {
      this.setState({ updating: true }, async () => {
        // Todo: lấy resume id để vào đây
        const formData = this._getPublishData();
        const response = await userApi.updateResume(this.state.resume_id, formData);
        if (response && response.code === undefined) {
          this.setState({ updating: false }, () => {
            this.setState({ currentStep: CREATE_SUCCESSFUL });
            // this.props.onSuccess(this.state, response.data.resume_id);
          });
        } else {
          this.setState(
            {
              updating: false,
              showPopup: true,
              message: {
                code: 1,
                message: this.t('containers').CV.CreateCV.index.messageError
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

  _renderAddSkill = () => {
    const { currentStep } = this.state;
    return (
      <div>
        {/* Test Wizard Tab */}
        {currentStep >= 2 &&
          currentStep < 6 && (
            <div className="create-wizard-tab">
              <WizardTabs onChange={this.onChangeWizardTab} tabList={global.TAB_LIST} selected={currentStep} />
            </div>
          )}
        <div className="page-wrapper">
          <SkillInfo
            onChange={skills => {
              this.setState({ skills: skills });
            }}
          />
          <ForeignLanguage
            onChange={languages => {
              this.setState({ languages: languages });
            }}
          />
          <ReferenceUser
            onSuccess={this._onPublish}
            onBack={() => {
              this.updateNewStep(ADD_SKILL_STEP);
            }}
            header={this.t('containers').CV.CreateCV.index.referenceUser}
            onChange={data => {
              this.setState({ referenced: { ...data } });
            }}
          />
        </div>
      </div>
    );
  };

  addHobbyWithCV = async () => {
    // Todo: update data at here...
    this.setState({ currentStep: ADD_EXPERIENCE_STEP });
  };

  _renderAddHobbyWithCv = () => {
    return (
      <HobbyWithCV
        header={this.t('containers').CV.CreateCV.index.addHobby}
        showFooter
        onSuccess={this.addHobbyWithCV}
        updateForFileMode
        resumeID={this.state.resume_id}
        editMode
        onEditDone={() => {
          this.setState({ currentStep: CREATE_SUCCESSFUL });
        }}
        onBack={() => {
          this.setState({ currentStep: INIT_STATE });
        }}
      />
    );
  };

  _renderContent = () => {
    const { currentStep } = this.state;

    switch (currentStep) {
      case INIT_STATE:
        return this._renderInitState();
      case UPLOAD_CV_STEP:
        return this._renderUploadCv();
      case ADD_HOBBY_JOB_STEP:
        return this._renderAddHobby();
      case ADD_EXPERIENCE_STEP:
        return this._renderAddExperience();
      case ADD_EDUCATION_STEP:
        return this._renderAddEducation();
      case ADD_SKILL_STEP:
        return this._renderAddSkill();
      case ADD_HOBBY_WITH_CV:
        return this._renderAddHobbyWithCv();
      case CREATE_SUCCESSFUL:
        return <CreateSuccessfull onSuccess={this.props.onSuccess} />;
      default:
        return null;
    }
  };

  render() {
    const { cvList } = this.props;
    if (cvList && cvList.length >= 3) {
      return (
        <div className="parent-cv-container full-resumes">
          <div className="maximum-msg">{this.t('containers').CV.CreateCV.index.maximumMsg}</div>
          <div className="button-wrapper">
            <Button
              className="jn-btn__yellow"
              onClick={() => {
                this.props.history.replace('/cv');
              }}
            >
              {this.t('containers').CV.CreateCV.index.cv}
            </Button>
          </div>
        </div>
      );
    }
    const { fullname, address, level } = this.props.info;
    if (!fullname || !address || !level) {
      return (
        <div className="parent-cv-container required-update">
          <UpdateAccountMessage redirect="/cv/create" />
        </div>
      );
    }

    return (
      <div className="parent-cv-container">
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
              {this.t('containers').CV.CreateCV.index.back}
            </Button>
          </div>
        </Popup>
      </div>
    );
  }
}

export default connect(state => ({
  info: state.auth.info,
  cvList: state.auth.cvList,
  constants: state.constants.data.users,
  resumesConst: state.constants.data.resumes
}))(createPage(withRouter(CreateCV)));
