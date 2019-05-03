import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Base, Countdown, JobItem, Loading, Pagination } from '../../../components';
import { jobApi } from '../../../services';
import createPage from '../../createPage';
import './style.scss';

class RJobs extends Base {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      jobs: [],
      totalEntries: 1,
      perPage: 16,
    };
  }

  componentDidMount() {
    const { recruitmentId } = this.props;
    if (recruitmentId) {
      this._fetchPageData();
    }
  }

  _generateQueryString = () => {
    const { currentPage, perPage } = this.state;
    const id = this.props.recruitmentId || null;
    let queries = [];
    if (currentPage !== 1) {
      queries.push(`page=${currentPage}`);
    }

    if (perPage) {
      queries.push(`perPage=${perPage}`);
    }

    if (id) {
      queries.push(`id=${id}`);
    }

    return queries.join('&');
  };

  _fetchPageData = async() => {
    const response = await jobApi.fetchRecruitmentJobs(this._generateQueryString());
    if (response && response.recruitment_jobs) {
      this.setState({ jobs: response.recruitment_jobs, totalEntries: response.totalEntries });
    }
  }

  _changeState = state => {
    this.setState(state, () => {
      this._fetchPageData();
    });
  };

  render() {
    const { jobs, totalEntries, currentPage, perPage } = this.state;
    return (
      <div className="recruiment-jobs-wrapper">
        <h2 style={{ fontSize: 30, color: '#fc5830', marginLeft: 10 }}>NHÀ TUYỂN DỤNG THAM GIA</h2>
        <div className="block-content">
          {jobs.map((job, index) => {
            return <JobItem data={job} flashJob key={`marketing-job-${index}`} />;
          })}
        </div>
        <Pagination
          currentPage={currentPage - 1}
          total={totalEntries}
          numberPerPage={perPage}
          onChangePage={page => {
            this._changeState({ currentPage: page + 1 });
          }}
        />
      </div>
    );
  }
}
export default RJobs;
