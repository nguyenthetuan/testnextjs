/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-09 23:46:54
 */
import React from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { Base, Select } from '../../../components';
import createPage from '../../createPage';
import CandidateItem from './CandidateItem';
import List from '../components/List';
import DateFilter from '../components/DateFilter';
import { fetchViewedCandidates } from '../../../actions/candidates';
import './style.scss';

class ViewedCandidatePage extends Base {
  static wrapperClasses = 'viewed-candidates-page';

  constructor(props) {
    super(props);

    this.state = {
      startDate: undefined,
      endDate: undefined,
      selectedStatus: undefined,
      page: 1
    };
  }

  componentDidMount() {
    this.props.fetchViewedCandidates();
  }

  _generateQueryString = () => {
    const { startDate, endDate, selectedStatus, page } = this.state;
    let queries = [];

    if (startDate) {
      queries.push(`startDate=${startDate}`);
    }
    if (endDate) {
      queries.push(`endDate=${endDate}`);
    }
    if (selectedStatus && selectedStatus[0].value) {
      queries.push(`status=${selectedStatus[0].value}`);
    }
    if (page !== 1) {
      queries.push(`page=${page}`);
    }

    return queries.join('&');
  };

  _changeState = state => {
    this.setState(state, () => {
      this.props.fetchViewedCandidates(this._generateQueryString());
    });
  };

  _renderListHeader = () => (
    <div className="list-header-wrapper">
      <div className="col-candidate">{this.t('Ứng viên')}</div>
      <div className="col-date">{this.t('Ngày xem')}</div>
      <div className="col-status">{this.t('Trạng thái')}</div>
    </div>
  );

  render() {
    let selectOpts = Object.keys(this.props.statusOpts).map(optKey => ({
      value: optKey,
      label: this.t(this.props.statusOpts[optKey])
    }));
    selectOpts.unshift({ value: undefined, label: this.t('Tất cả trạng thái') });

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
              <DateFilter
                onChange={(startDate, endDate) => {
                  this._changeState({ startDate, endDate });
                }}
              />
            </div>
            <div className="status">
              <Select
                value={this.state.selectedStatus}
                options={selectOpts}
                onChange={selected => {
                  this._changeState({ selectedStatus: selected });
                }}
              />
            </div>
          </div>
        </div>
        <List
          header={this._renderListHeader()}
          data={this.props.data}
          renderItem={item => (item.resume && <CandidateItem {...item} />) || null}
          page={this.state.page}
          // showFooter
          pageSize={20}
          onPageChange={page => {
            this._changeState({ page });
          }}
        />
        {/* <div className="jn-btn excel-export-btn">
          <CSVLink
            data={[
              ['firstname', 'lastname', 'email'],
              ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
              ['Raed', 'Labes', 'rl@smthing.co.com'],
              ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
            ]}
            filename="saved-candidates.csv"
          >
            <i className="icon-cloud-download" />
            <span className="btn-label">{this.t('Xuất file Excel')}</span>
          </CSVLink>
        </div> */}
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
    { fetchViewedCandidates }
  )(ViewedCandidatePage)
);
