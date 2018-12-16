import React from 'react';
import { Base, Select } from '../../components';

export default class Filter extends Base {
  _onSelectChange = (name, value) => {
    this.props.onChange({ [name]: (value[0].value !== null && value) || [] });
  };

  _addDefaultOpt = opts => {
    return [{ value: null, label: this.t('Tất cả') }, ...opts];
  };

  _updateLabel = (value, opts) => {
    if (value[0] && !value[0].label) {
      let itemLabel = '';
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === value[0].value) {
          itemLabel = opts[i].label;
          break;
        }
      }

      return [{ value: value[0].value, label: itemLabel }];
    }

    return value;
  };

  render() {
    const { categories, salary, experience, level, type, constants, sort, sortOpts, categoryOpts, provinces, selectedProvince } = this.props;
    const catOpts = categoryOpts.map(cat => ({ value: cat._id, label: cat.title }));
    const salaryOpts = Object.keys(constants.salary || {}).map(key => ({
      value: key,
      label: constants.salary[key]
    }));
    const levelOpts = Object.keys(constants.level || {}).map(key => ({
      value: key,
      label: constants.level[key]
    }));

    const expOpts = Object.keys(constants.experience || {}).map(key => ({
      value: key,
      label: constants.experience[key]
    }));

    const typeOpts = Object.keys(constants.type || {}).map(key => ({
      value: key,
      label: constants.type[key]
    }));
    const provinceOpts = provinces.map(province => ({ label: province.city, value: province.city }));

    return (
      <div className="filters-wrapper">
        <Select
          placeholder={this.t('Chọn ngành nghề')}
          options={this._addDefaultOpt(catOpts)}
          value={categories}
          onChange={value => {
            this._onSelectChange('categories', value);
          }}
        />
        <Select
          placeholder={this.t('Chọn địa điểm')}
          options={this._addDefaultOpt(provinceOpts)}
          value={selectedProvince}
          onChange={value => {
            this._onSelectChange('province', value);
          }}
        />
        <Select
          placeholder={this.t('Chọn mức lương')}
          options={this._addDefaultOpt(salaryOpts)}
          value={this._updateLabel(salary, salaryOpts)}
          onChange={value => {
            this._onSelectChange('salary', value);
          }}
        />
        <Select
          placeholder={this.t('Chọn cấp bậc')}
          options={this._addDefaultOpt(levelOpts)}
          value={this._updateLabel(level, levelOpts)}
          onChange={value => {
            this._onSelectChange('level', value);
          }}
        />
        <Select
          placeholder={this.t('Chọn kinh nghiệm')}
          options={this._addDefaultOpt(expOpts)}
          value={this._updateLabel(experience, expOpts)}
          onChange={value => {
            this._onSelectChange('experience', value);
          }}
        />
        <Select
          placeholder={this.t('Chọn hình thức làm việc')}
          options={this._addDefaultOpt(typeOpts)}
          value={this._updateLabel(type, typeOpts)}
          onChange={value => {
            this._onSelectChange('type', value);
          }}
        />
        <Select
          placeholder={this.t('Sắp xếp kết quả')}
          options={this._addDefaultOpt(sortOpts)}
          value={this._updateLabel(sort, sortOpts)}
          onChange={value => {
            this._onSelectChange('sort', value);
          }}
        />
        <div className="clear-filters">
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              this.props.onChange(
                {
                  currentPage: 1,
                  categories: [],
                  salary: [],
                  level: [],
                  experience: [],
                  type: [],
                  sort: [],
                  province: []
                },
                true
              );
            }}
          >
            {this.t('Xoá các lựa chọn')}
          </a>
        </div>
      </div>
    );
  }
}
