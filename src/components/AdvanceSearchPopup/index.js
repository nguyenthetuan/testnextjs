/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-29 13:51:38
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

import Base from '../Base';
import Popup from '../Popup';
import Button from '../Button';
import Select from '../Select';
import SearchInput from '../SearchInput';
import ApiConfig from '../../constants/server-config';
import './style.scss';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

class AdvanceSearchPopup extends Base {
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

    const { salary, level, experience, type } = props.constants;

    this.state = {
      categories: [],
      salary:
        (params.salary && {
          value: params.salary,
          label: salary && salary[params.salary]
        }) ||
        null,
      level:
        (params.level && {
          value: params.level,
          label: level && level[params.level]
        }) ||
        null,
      experience:
        (params.experience && {
          value: params.experience,
          label: experience && experience[params.experience]
        }) ||
        null,
      type: (params.type && { value: params.type, label: type && type[params.type] }) || null,
      province: params.province || null,
      keyword: params.keyword || ''
    };
  }

  _clearFilters = event => {
    event.preventDefault();
    this.setState({
      categories: [],
      salary: null,
      level: null,
      experience: null,
      type: null,
      province: null,
      keyword: ''
    });
  };

  _search = () => {
    const { categories, salary, level, experience, type, keyword, province } = this.state;

    let queries = [];
    if (categories) {
      categories.map(cat => {
        if (cat.value) queries.push(`categories[]=${cat.value}`);
      });
    }
    if (salary && salary.value) {
      queries.push(`salary=${salary.value}`);
    }
    if (level && level.value) {
      queries.push(`level=${level.value}`);
    }
    if (experience && experience.value) {
      queries.push(`experience=${experience.value}`);
    }
    if (type && type.value) {
      queries.push(`type=${type.value}`);
    }

    if (province) {
      queries.push(`province=${province}`);
    }
    if (keyword.trim()) {
      queries.push(`keyword=${keyword.trim()}`);
    }

    this.props.history.push({
      pathname: '/tim-kiem',
      search: queries.length ? `?${queries.join('&')}` : '',
      state: { resetQueryURL: queries.length === 0 }
    });
    this.props.hidePopup();
  };

  render() {
    const { constants, catOpts } = this.props;
    const salaryOptions = Object.keys(constants.salary || {}).map(key => ({
      value: key,
      label: constants.salary[key]
    }));

    const categoryOpts = catOpts.map(cat => ({ value: cat._id, label: cat.title }));
    categoryOpts.unshift({ value: undefined, label: this.t('Tất cả') });
    const levelOpts = Object.keys(constants.level || {}).map(key => ({
      value: key,
      label: constants.level[key]
    }));
    levelOpts.unshift({ value: undefined, label: this.t('Tất cả') });
    const expOpts = Object.keys(constants.experience || {}).map(key => ({
      value: key,
      label: constants.experience[key]
    }));
    expOpts.unshift({ value: undefined, label: this.t('Tất cả') });
    const typeOpts = Object.keys(constants.type || {}).map(key => ({
      value: key,
      label: constants.type[key]
    }));
    typeOpts.unshift({ value: undefined, label: this.t('Tất cả') });
    const { categories, salary, level, experience, type, keyword, province } = this.state;

    return (
      <Popup
        className="advance-search-wrapper"
        show={this.props.show}
        showBox
        clickOutToClose
        onClose={() => {
          this.props.hidePopup();
        }}
        toggleButton=".search-wrapper .adv-search-btn a"
      >
        <div className="close-btn">
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              this.props.hidePopup();
            }}
          >
            <i className="icon-jn-close" />
          </a>
        </div>
        <div className="header">{this.t('Tìm kiếm nâng cao')}</div>
        <div className="form-wrapper">
          <div>
            <SearchInput
              icon="icon-jn-search"
              placeholder={this.t('Vị trí công việc …')}
              value={keyword}
              onChange={value => {
                this.setState({ keyword: value });
              }}
            />
            <SearchInput
              icon="icon-jn-map-marker"
              placeholder={this.t('Quận/Huyện, TP/Tỉnh...')}
              searchURL={`${host}/client/locations/byCounts`}
              value={province}
              formatResponseData={response => {
                if (response.cities && _.isArray(response.cities)) {
                  return response.cities.map(city => ({
                    value: city
                  }));
                }

                return [];
              }}
              renderListItem={item => {
                return (
                  <span className="location-item">
                    <i className="icon-location-pin" />
                    {item.value.title}
                  </span>
                );
              }}
              renderSelectedValue={value => {
                return (typeof value === 'string' && value) || (value ? value.title : '');
              }}
              onSuggestionSelect={value => {
                this.setState({ province: value.value.title });
              }}
              onChange={value => {
                this.setState({ province: value });
              }}
            />
            <Select
              placeholder={this.t('Chọn ngành nghề')}
              value={categories}
              options={categoryOpts}
              onChange={value => {
                this.setState({ categories: value });
              }}
            />
            <Select
              placeholder={this.t('Chọn mức lương')}
              options={salaryOptions}
              value={[salary]}
              onChange={value => {
                this.setState({ salary: value[0] });
              }}
            />
            <Select
              placeholder={this.t('Chọn trình độ')}
              options={levelOpts}
              value={[level]}
              onChange={value => {
                this.setState({ level: value[0] });
              }}
            />
            <Select
              className="experience-filter"
              placeholder={this.t('Chọn kinh nghiệm')}
              options={expOpts}
              value={[experience]}
              onChange={value => {
                this.setState({ experience: value[0] });
              }}
            />
            <Select
              placeholder={this.t('Chọn hình thức làm việc')}
              options={typeOpts}
              value={[type]}
              onChange={value => {
                this.setState({ type: value[0] });
              }}
            />
          </div>
        </div>
        <div className="clear-filters">
          <a href="#" onClick={this._clearFilters}>
            {this.t('Xoá tất cả các lựa chọn tìm kiếm')}
          </a>
        </div>
        <Button className="jn-btn__yellow" onClick={this._search}>
          {this.t('Tìm kiếm')}
        </Button>
      </Popup>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations.cities || [],
    constants: state.constants.data.jobs || {},
    catOpts: state.categories.data || []
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(AdvanceSearchPopup)
);
