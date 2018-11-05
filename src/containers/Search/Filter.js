import React from 'react';
import { Base, Select } from '../../components';

export default class Filter extends Base {
  render() {
    const { categories, salary, experience, level, type, constants, sort, sortOpts, categoryOpts } = this.props;
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

    return (
      <div className="filters-wrapper">
        <Select
          placeholder={this.t('Chọn ngành nghề')}
          options={catOpts}
          value={categories}
          onChange={value => {
            this.props.onChange({ categories: value });
          }}
        />
        <Select
          placeholder={this.t('Chọn mức lương')}
          options={salaryOpts}
          value={salary}
          onChange={value => {
            this.props.onChange({ salary: value });
          }}
        />
        <Select
          placeholder={this.t('Chọn cấp bậc')}
          options={levelOpts}
          value={level}
          onChange={value => {
            this.props.onChange({ level: value });
          }}
        />
        <Select
          placeholder={this.t('Chọn kinh nghiệm')}
          options={expOpts}
          value={experience}
          onChange={value => {
            this.props.onChange({ experience: value });
          }}
        />
        <Select
          placeholder={this.t('Chọn hình thức làm việc')}
          options={typeOpts}
          value={type}
          onChange={value => {
            this.props.onChange({ type: value });
          }}
        />
        <Select
          placeholder={this.t('Sắp xếp kết quả')}
          options={sortOpts}
          value={sort}
          onChange={value => {
            this.props.onChange({ sort: value });
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
                  sort: []
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
