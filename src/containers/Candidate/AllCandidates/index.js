/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-09 23:46:54
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Select, Input, Button } from '../../../components';
import createPage from '../../createPage';
import CandidateItem from './CandidateItem';
import List from '../components/List';
import YearFilter from './YearFilter';
import { convertConstantsToArray } from '../../../utils/commonFunctions';
import { fetchCandidates } from '../../../actions/candidates';
import './style.scss';

class AllCandidateListPage extends Base {
  static wrapperClasses = 'candidate-list-page';

  constructor(props) {
    super(props);

    this.state = {
      categories: undefined,
      level: undefined,
      salary: undefined,
      location: undefined,
      gender: undefined,
      startYear: undefined,
      endYear: undefined,
      resume_type: undefined,
      experience: undefined,
      keyword: undefined,
      page: 1
    };
    this._resetPage = false;
  }

  componentDidMount() {
    this.props.fetchCandidates();
  }

  _generateQuerystring = () => {
    const {
      keyword,
      location,
      categories,
      level,
      gender,
      resume_type,
      experience,
      startYear,
      endYear,
      salary
    } = this.state;
    let queryString = [];
    if (keyword) queryString.push(`keyword=${keyword}`);
    if (location && location.length) {
      if (location[0]) queryString.push(`province=${location[0].value}`);
      if (location[1]) queryString.push(`district=${location[1].value}`);
    }
    if (categories) {
      queryString.push(`categories[]=${categories[0].value}`);
    }
    if (level) {
      queryString.push(`level=${level[0].value}`);
    }
    if (gender) {
      queryString.push(`gender=${gender[0].value}`);
    }
    if (resume_type) {
      queryString.push(`resume_type=${resume_type[0].value}`);
    }
    if (experience) {
      queryString.push(`experience=${experience[0].value}`);
    }
    if (startYear) {
      queryString.push(`startYear=${startYear}`);
    }
    if (endYear) {
      queryString.push(`endYear=${endYear}`);
    }
    if (salary) {
      queryString.push(`salary=${salary[0].value}`);
    }

    return (queryString.length && queryString.join('&')) || '';
  };

  _filterCandidates = () => {
    const queryString = this._generateQuerystring();
    if (queryString) {
      this.props.fetchCandidates(queryString);
      if (this._resetPage) {
        this.setState(
          {
            page: 1
          },
          () => {
            this._resetPage = false;
          }
        );
      }
    }
  };

  render() {
    const {
      loadConstantsFailed,
      constants,
      loadCategoriesFailed,
      categories,
      locations,
      candidates
    } = this.props;
    if (loadConstantsFailed || loadCategoriesFailed) {
      return (
        <div className="connect-server-failed">
          {this.t('Kết nối đến server không thành công.')}
        </div>
      );
    }

    const genDefault = {
      value: 'male_female',
      label: 'Tất cả giới tính'
    };
    const genderOpts = constants && convertConstantsToArray(constants.gender, genDefault);
    const salaryDefault = {
      value: undefined,
      label: 'Tất cả mức lương'
    };
    const salaryOpts = constants && convertConstantsToArray(constants.salary, salaryDefault);
    const levelOpts = constants
      && convertConstantsToArray(constants.level, { value: undefined, label: 'Tất cả trình độ' });
    const resumeTypes = constants
      && convertConstantsToArray(constants.resume_type, {
        value: undefined,
        label: 'Tất cả thời gian'
      });
    const expOpts = constants
      && convertConstantsToArray(constants.experience, {
        value: undefined,
        label: 'Tất cả kinh nghiệm'
      });
    const yearOpts = constants && convertConstantsToArray(constants.years, { value: undefined, label: 'Tất cả' });

    let categoriesOpts = categories.map(cat => ({ label: cat.title, value: cat.title }));
    categoriesOpts.unshift({ value: undefined, label: 'Tất cả ngành nghề' });

    let locationOpts = locations.map(({ city, district }) => {
      let output = { value: city, label: city };

      if (district && district.length) {
        output.children = district.map(({ name }) => ({ value: name, label: name }));

        output.children.unshift({
          value: city,
          label: 'Tất cả',
          backToParent: true
        });
      }
      return output;
    });
    locationOpts.unshift({
      value: undefined,
      label: 'Tất cả địa điểm'
    });

    return (
      <div className="candidate-list-container">
        <div className="filter-container">
          <div className="filters-wrapper">
            <div className="filter-row">
              <Select
                icon="icon-briefcase"
                options={categoriesOpts}
                value={this.state.categories}
                onChange={selected => {
                  this.setState({ categories: selected });
                  this._resetPage = true;
                }}
              />
              <Select
                icon="icon-location-pin"
                options={locationOpts}
                value={this.state.location}
                onChange={selected => {
                  this.setState({ location: selected });
                  this._resetPage = true;
                }}
              />
              <Select
                icon="icon-list"
                options={expOpts}
                value={this.state.experience}
                onChange={selected => {
                  this.setState({ experience: selected });
                  this._resetPage = true;
                }}
              />
              <Select
                icon="icon-layers"
                options={levelOpts}
                value={this.state.level}
                onChange={selected => {
                  this.setState({ level: selected });
                  this._resetPage = true;
                }}
              />
              <Select
                icon="icon-jn-signal"
                options={salaryOpts}
                value={this.state.salary}
                onChange={selected => {
                  this.setState({ salary: selected });
                  this._resetPage = true;
                }}
              />
              <Select
                icon="icon-jn-transgender"
                options={genderOpts}
                value={this.state.gender}
                onChange={selected => {
                  this.setState({ gender: selected });
                  this._resetPage = true;
                }}
              />
              <YearFilter
                icon="icon-equalizer"
                options={yearOpts}
                onChange={(startYear, endYear) => {
                  this.setState({ startYear, endYear });
                  this._resetPage = true;
                }}
              />
              <Select
                icon="icon-calendar"
                options={resumeTypes}
                value={this.state.resume_type}
                onChange={selected => {
                  this.setState({ resume_type: selected });
                  this._resetPage = true;
                }}
              />
            </div>
          </div>
          <div className="search-wrapper">
            <Input
              floatingLabel
              placeholder={`${this.t('Nhập từ khoá tìm kiếm. VD: Nhân viên kinh doanh')} ...`}
              value={this.state.keyword}
              onChange={value => {
                this.setState({ keyword: value.trim() });
                this._resetPage = true;
              }}
            />
            <Button onClick={this._filterCandidates} className="jn-btn__yellow">
              <span>
                <i className="icon-magnifier" />
                {this.t('Tìm ứng viên')}
              </span>
            </Button>
          </div>
        </div>
        <div className="candidates-container">
          <List
            header={`Có tổng số ${candidates.totalEntries} ứng viên`}
            data={candidates.data}
            renderItem={item => <CandidateItem {...item} />}
            pageSize={20}
            page={this.state.page}
            onPageChange={page => this.setState({ page })}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { data, message } = state.constants;
  return {
    constants: (data && data.resumes) || [],
    loadConstantsFailed: message && message.code,
    categories: state.categories.data || [],
    loadCategoriesFailed: state.categories.message && state.categories.message.code,
    locations: state.locations.cities || [],
    candidates: state.candidates
  };
};

export default createPage(
  connect(
    mapStateToProps,
    { fetchCandidates }
  )(AllCandidateListPage)
);
