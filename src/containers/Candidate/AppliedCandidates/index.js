/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-09 23:46:54
 */
import React from 'react';
import { connect } from 'react-redux';
import { fetchAppliedCandidates } from '../../../actions/candidates';
import { jobApi } from '../../../services';
import { Base, Select } from '../../../components';
import createPage from '../../createPage';
import CandidateItem from './CandidateItem';
import List from '../components/List';
import './style.scss';

class AppliedCandidatePage extends Base {
  static wrapperClasses = 'applied-candidates-page';

  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      page: 1,
      job: undefined,
      listJobs: []
    };
  }

  componentDidMount() {
    this.props.fetchAppliedCandidates();
    this._fetchJobs();
  }

  _fetchJobs = async () => {
    const response = await jobApi.fetchJobsByUsers();
    if (response && response.jobs) {
      this.setState({ listJobs: response.jobs });
    }
  };

  _generateQueryString = () => {
    const { page, status, job } = this.state;
    let queries = [];
    if (page !== 1) {
      queries.push(`page=${page}`);
    }

    if (status && status[0].value) {
      queries.push(`status=${status[0].value}`);
    }

    if (job && job[0].value) {
      queries.push(`job=${job[0].value}`);
    }

    return queries.join('&');
  };

  _changeState = state => {
    this.setState(state, () => {
      this.props.fetchAppliedCandidates(this._generateQueryString());
    });
  };

  _renderHeaderList = () => {
    return (
      <div className="list-header-wrapper">
        <div className="col-candidate">{this.t('Ứng viên')}</div>
        <div className="col-position">{this.t('Vị trí ứng tuyển')}</div>
        <div className="col-date">{this.t('Ngày ứng tuyển')}</div>
        <div className="col-status">{this.t('Trạng thái')}</div>
      </div>
    );
  };

  render() {
    let selectOpts = Object.keys(this.props.statusOpts).map(optKey => ({
      value: optKey,
      label: this.t(this.props.statusOpts[optKey])
    }));
    selectOpts.unshift({ value: undefined, label: this.t('Tất cả trạng thái') });

    let jobOpts = this.state.listJobs.map(job => ({ value: job._id, label: job.title }));
    jobOpts.unshift({ value: undefined, label: this.t('Tất cả công việc') });

    return (
      <div className="candidates-container">
        <div className="header-page">
          <div className="page-label">
            <div className="main-label">
              <span className="icon-equalizer" />
              <div className="label-text">{this.t('Bộ lọc hồ sơ')}</div>
            </div>
            <div className="desc-label">
              <div className="cv-text">
                {this.t('Tìm thấy')}
                <span className="cv-number">{this.props.totalEntries}</span>
                {this.t('hồ sơ')}
              </div>
            </div>
          </div>
          <div className="filters-wrapper">
            <div className="position-applied">
              <span>{this.t('Hồ sơ ứng tuyển vị trí')}</span>
              <Select
                options={jobOpts}
                value={this.state.job}
                onChange={job => {
                  this._changeState({ job });
                }}
              />
            </div>
            <div className="status">
              <Select
                placeholder={this.t('Trạng thái')}
                options={selectOpts}
                value={this.state.status}
                onChange={selected => this._changeState({ status: selected })}
              />
            </div>
          </div>
        </div>
        <List
          header={this._renderHeaderList()}
          data={this.props.data}
          pageSize={20}
          renderItem={item => <CandidateItem {...item} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.candidates,
    statusOpts: state.constants.data.employer_save_profiles || {}
  };
};

export default createPage(
  connect(
    mapStateToProps,
    {
      fetchAppliedCandidates
    }
  )(AppliedCandidatePage)
);
