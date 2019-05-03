import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Base, Countdown, JobItem, Loading } from '../../components';
import RJobs from './Job';
import RResumes from './Resume';
import { jobApi } from '../../services';
import createPage from '../createPage';
import './style.scss';

class RecruitmentDay extends Base {
  static wrapperClasses = 'jobs-by-filter';

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      countDown: null,
      message: null,
      recruitmentId: null,
    };
  }

  componentDidMount() {
    const { firstToken, isLoggedIn } = this.props;
    if (firstToken || isLoggedIn) {
      this._fetchPageData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firstToken, isLoggedIn } = nextProps;
    if (firstToken || isLoggedIn) {
      this._fetchPageData();
    }
  }

  _fetchPageData = async () => {
    const response = await jobApi.fetchRecruitmentDays();
    if (response && response.code === undefined && response.result === undefined) {
      this.setState({ countDown: response.countDown, loading: false, recruitmentId: response.recruitmentId });
    } else {
      this.setState({ loading: false, message: { code: 1 } });
    }
  }

  render() {
    const { loading, recruitmentId, countDown } = this.state;
    let wrapperClasses = ['page-wrapper'];
    if (loading) wrapperClasses.push('loading');
    if (countDown === null || countDown === 'null') return null; 
    return (
      <div className={wrapperClasses.join(' ')}>
        {loading && <Loading />}
        <div className="main-content block-wrapper marketing-jobs recruitment-days">
          <div className="title">
            <div className="main-title">
              <span className="title-text">{this.t('NGÀY HỘI TUYỂN DỤNG ONLINE')}</span>
            </div>
            <div className="countdown-wrapper">
              <span className="sub-title">{this.t('Kết thúc sau')}</span>
              <Countdown date={countDown && countDown.end} />
            </div>
          </div>
          <div className="flash-jobs-banner">
            <img src="https://jobnow-data.s3.ap-southeast-1.amazonaws.com/marketings/5bac7f136b8e2325772953e1/AibuQl4iyHIyHT0kzhtGCGEVBjQL1e7JkqlDFdaypdYVB77QzbjkK1TewwxoB6Pkbanner-flash-jobs.jpg" alt="" />
          </div>
          {recruitmentId && (
            <RJobs recruitmentId={recruitmentId} />
          )}
          <div className="flash-jobs-banner" style={{ marginTop: 20 }}>
            <img src="https://jobnow-data.s3.ap-southeast-1.amazonaws.com/marketings/5bac7f136b8e2325772953e1/AibuQl4iyHIyHT0kzhtGCGEVBjQL1e7JkqlDFdaypdYVB77QzbjkK1TewwxoB6Pkbanner-flash-jobs.jpg" alt="" />
          </div>
          {recruitmentId && (
            <RResumes recruitmentId={recruitmentId} />
          )}
        </div>
      </div>
    );
  }
}
export default createPage(connect(state => ({ firstToken: state.firstToken, isLoggedIn: state.auth.isLoggedIn }))(RecruitmentDay));
