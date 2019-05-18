import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Base, Button, Input, FileUploader, DatePicker, Radio, Select, Popup } from '../../../../components';
import WorkLocation from '../../components/WorkLocation';
import { userApi } from '../../../../services';
import './styles.scss';

const _$ = window.jQuery;

class HobbyWithCV extends Base {
  static propsType = {
    data: PropTypes.shape({})
  };

  static defaultProps = {
    data: {}
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
      title: {
        required: true
      },
      address: {
        required: true
      }
    },
    messages: {
      title: this.t('containers').CV.CreateCV.HobbyWithCV.title,
      address: this.t('containers').CV.CreateCV.HobbyWithCV.address
    }
  };

  constructor(props) {
    super(props);
    const { worklocation, title, rank, salary, categories, resume_type, year_experience } = props.data || {};

    this.state = {
      message: null,
      worklocation: worklocation || [],
      title: title || '',
      categories: (categories || []).map(cat => ({ value: cat._id, label: cat.title })),
      rank: (rank && [{ value: rank, label: props.constants.resumes.rank[rank] }]) || null,
      salary: (salary && [{ value: salary, label: props.constants.resumes.salary[salary] }]) || null,
      resume_type: (resume_type && [{ value: resume_type, label: props.constants.resumes.resume_type[resume_type] }]) || null,
      year_experience: (year_experience && [{ value: year_experience, label: props.constants.resumes.experience[year_experience] }]) || null
    };
  }

  _getFormData = () => {
    const { worklocation, title, rank, salary, categories, resume_type, year_experience } = this.state;
    const formData = new FormData();

    categories.map(item => {
      formData.append('categories[]', item.value);
    });
    worklocation.map((loc, index) => {
      Object.keys(loc).map(key => {
        if (key !== '_id' && loc[key] !== -1) {
          formData.append(`worklocation[${index}][${key}]`, loc[key]);
        }
      });
    });

    formData.append('title', title);
    formData.append('salary', salary[0].value);
    formData.append('rank', rank[0].value);
    formData.append('resume_type', resume_type[0].value);
    formData.append('year_experience', year_experience[0].value);

    return formData;
  };

  _getNewData = response => {
    const { worklocation, title, categories, salary, resume_type } = response;
    return { worklocation, title, categories, salary, resume_type };
  };

  _save = () => {
    if (this.state.updating) return;
    this._validator = _$('#hobby-cv-form').validate(this.validationRules);
    _$('#hobby-cv-form').on('submit', event => {
      event.preventDefault();
    });
    const { worklocation, rank, salary, categories, resume_type, year_experience, cities } = this.state;

    let hasError = !this._workLocationRef.validate();
    if (!worklocation) {
      this._workLocationRef.showError(this.t('containers').CV.CreateCV.HobbyWithCV.workLocation);
      hasError = true;
    }
    if (!year_experience) {
      this._year_experienceRef.showError(this.t('containers').CV.CreateCV.HobbyWithCV.yearExperience);
      hasError = true;
    }
    if (!categories) {
      this._categoriesRef.showError(this.t('containers').CV.CreateCV.HobbyWithCV.categoriesError);
      hasError = true;
    }
    if (!resume_type) {
      this._resume_typeRef.showError(this.t('containers').CV.CreateCV.HobbyWithCV.resumeType);
      hasError = true;
    }
    if (!salary) {
      this._salaryRef.showError(this.t('containers').CV.CreateCV.HobbyWithCV.salaryError);
      hasError = true;
    }
    if (!rank) {
      this._rankRef.showError(this.t('containers').CV.CreateCV.HobbyWithCV.rankError);
      hasError = true;
    }

    this._validator.form();

    if (this._validator.errorList.length === 0 && !hasError) {
      // TODO: handle update api...
      // Return data return to hobby form

      this.setState({ updating: true }, async () => {
        const formData = this._getFormData();
        let response;
        if (this.props.editMode) {
          response = await userApi.updateResume(this.props.resumeID, formData);

          if (response && response.code === undefined) {
            this.props.onEditDone(response.info.job_need);
          } else {
            this.setState({ message: { code: 1, message: this.t('containers').CV.CreateCV.HobbyWithCV.message } });
          }
        } else {
          response = await userApi.createResumeByFill(formData);
          if (response && response.result) {
            this.setState({ updating: false }, () => {
              this.props.onSuccess(this.state, response.data.resume_id);
            });
          } else {
            this.setState({ updating: false }, () => {
              // this.props.onSuccess();
            });
          }
        }
      });
    }
  };

  _generateSelectableOpts = () => {
    const genderOpts = [{ value: 'male', label: this.t('containers').CV.CreateCV.HobbyWithCV.male }, { value: 'female', label: this.t('containers').CV.CreateCV.HobbyWithCV.female }];
    const { rank, marital_status } = this.props.constants.user || {};
    const matialOptions = Object.keys(marital_status || {}).map(key => ({
      value: key,
      label: marital_status[key]
    }));
    const rankOptions = Object.keys(rank || {}).map(key => ({
      value: key,
      label: rank[key]
    }));

    const catOpts = this.props.categories.map(opt => ({
      label: opt.title,
      value: opt._id
    }));
    const { salary, experience } = this.props.constants.jobs || {};

    const salaryOpts = Object.keys(salary || {}).map(opt => ({
      label: salary[opt],
      value: opt
    }));

    const rankOpts = Object.keys(this.props.constants.jobs.rank || {}).map(opt => ({
      label: this.props.constants.jobs.rank[opt],
      value: opt
    }));

    const { resume_type } = this.props.constants.resumes || {};
    const typeOptions = Object.keys(resume_type || {}).map(opt => ({
      label: resume_type[opt],
      value: opt
    }));
    const expOptions = Object.keys(experience || {}).map(opt => ({
      label: experience[opt],
      value: opt
    }));

    // const { cities } = this.props.constants.locations || {};
    let cityOpts = [];
    cityOpts = this.props.locations.map(opt => ({
      label: opt.city,
      value: opt._id
    }));

    return {
      expOptions,
      typeOptions,
      rankOptions,
      matialOptions,
      genderOpts,
      salaryOpts,
      catOpts,
      rankOpts,
      cityOpts
    };
  };

  _renderContent = () => {
    const { worklocation, title, rank, salary, categories, resume_type, year_experience, message } = this.state;
    const { catOpts, salaryOpts, expOptions, typeOptions, rankOpts } = this._generateSelectableOpts();
    const { editMode } = this.props;

    return (
      <div className="body-page">
        <div className="hobby-content-wrapper">
          {message && message.code > 0 && <div className="error-message-wrapper">* {message.message}</div>}
          <div className="input-section">
            <form id="hobby-cv-form" className="hobby-cv-form">
              <Input resume_type="text" name="title" placeholder={this.t('containers').CV.CreateCV.HobbyWithCV.title2} value={title} required onChange={value => this.setState({ title: value, nameError: '' })} />

              <WorkLocation
                values={worklocation}
                locations={this.props.locations || []}
                label={this.t('containers').CV.CreateCV.HobbyWithCV.locations}
                addMoreLabel={this.t('containers').CV.CreateCV.HobbyWithCV.addLocations}
                required
                errorMessage={this.t('containers').CV.CreateCV.HobbyWithCV.worklocation}
                onChange={values => {
                  // this._workLocationRef.hideError();
                  this.setState({ worklocation: values });
                }}
                ref={r => {
                  this._workLocationRef = r;
                }}
              />

              <Select
                label={this.t('containers').CV.CreateCV.HobbyWithCV.categories}
                placeholder={this.t('containers').CV.CreateCV.HobbyWithCV.catOpts}
                value={categories}
                options={catOpts}
                required
                multiple
                onChange={selected => {
                  this._categoriesRef.hideError();
                  this.setState({ categories: selected });
                }}
                ref={r => {
                  this._categoriesRef = r;
                }}
              />

              <Select
                label={this.t('containers').CV.CreateCV.HobbyWithCV.salary}
                placeholder={this.t('containers').CV.CreateCV.HobbyWithCV.salaryOpts}
                required
                options={salaryOpts}
                value={salary}
                onChange={value => {
                  this._salaryRef.hideError();
                  this.setState({ salary: value });
                }}
                ref={r => {
                  this._salaryRef = r;
                }}
              />

              <Select
                label={this.t('containers').CV.CreateCV.HobbyWithCV.rank}
                placeholder={this.t('containers').CV.CreateCV.HobbyWithCV.rankOpts}
                required
                value={rank}
                options={rankOpts}
                onChange={value => {
                  this._rankRef.hideError();
                  this.setState({ rank: value });
                }}
                ref={r => {
                  this._rankRef = r;
                }}
              />
              <Select
                label={this.t('containers').CV.CreateCV.HobbyWithCV.type}
                placeholder={this.t('containers').CV.CreateCV.HobbyWithCV.typeOptions}
                required
                options={typeOptions}
                value={resume_type}
                onChange={value => {
                  this._resume_typeRef.hideError();
                  this.setState({ resume_type: value });
                }}
                ref={r => {
                  this._resume_typeRef = r;
                }}
              />
              <Select
                label={this.t('containers').CV.CreateCV.HobbyWithCV.exp}
                placeholder={this.t('containers').CV.CreateCV.HobbyWithCV.expOptions}
                required
                options={expOptions}
                value={year_experience}
                onChange={value => {
                  this._year_experienceRef.hideError();
                  this.setState({ year_experience: value });
                }}
                ref={r => {
                  this._year_experienceRef = r;
                }}
              />
            </form>
          </div>
          {editMode && !this.props.updateForFileMode && this._renderEditFooter()}
        </div>
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
          label={this.t('containers').CV.CreateCV.HobbyWithCV.back}
          className="jn-btn__normal"
        />
        <Button
          onClick={() => {
            this._save();
          }}
          label={this.t(this.props.updateForFileMode ? this.t('containers').CV.CreateCV.HobbyWithCV.updateForfile : this.t('containers').CV.CreateCV.HobbyWithCV.continue)}
          className="jn-btn__yellow"
        />
      </div>
    );
  };

  _renderEditFooter = () => {
    return (
      <div className="edit-footer-wrapper">
        <Button onClick={this._save} label={this.t('containers').CV.CreateCV.HobbyWithCV.save} className="jn-btn__yellow" />
        <Button
          onClick={() => {
            this.props.onEditDone(false);
          }}
          label={this.t('containers').CV.CreateCV.HobbyWithCV.cancel}
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
        </div>
        {showFooter && this._renderFooter()}
      </div>
    );
  }
}

export default connect(state => ({
  info: state.auth.info,
  constants: state.constants.data,
  locations: state.locations.cities || [],
  categories: state.categories.data || []
}))(HobbyWithCV);
