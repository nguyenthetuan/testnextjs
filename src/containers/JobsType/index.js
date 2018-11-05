/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-31 08:16:25
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Base, Countdown, JobItem, Loading, Input } from '../../components';
import { jobApi } from '../../services';
import createPage from '../createPage';
import './style.scss';

class JobsTypePage extends Base {
  static wrapperClasses = 'jobs-by-filter';

  constructor(props) {
    super(props);
    this._filter = props.match.params.type;
    this.state = {
      loading: true,
      data: null,
      message: null,
      filterText: ''
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
    let response;

    switch (this._filter) {
      case 'apply-now':
        response = await jobApi.fetchMaketingJobs();
        if (response && response.code === undefined && response.result === undefined) {
          this.setState({ data: response, loading: false });
        } else {
          this.setState({ loading: false, message: { code: 1 } });
        }
        break;

      case 'by-provinces':
        response = await jobApi.fetchJobsByLocation();
        if (response && response.code === undefined && response.result === undefined) {
          this.setState({ data: response.cities, loading: false });
        } else {
          this.setState({ loading: false, message: { code: 1 } });
        }
        break;

      case 'by-categories':
        response = await jobApi.fetchJobsByCategory();
        if (response && response.code === undefined && response.result === undefined) {
          this.setState({ data: response.categories, loading: false });
        } else {
          this.setState({ loading: false, message: { code: 1 } });
        }
        break;

      default:
        break;
    }
  };

  _renderMaketingJobs = () => {
    const { data } = this.state;
    const jobs = (data && data.marketing_jobs) || [];
    const countdown = (data && data.countDown) || {};
    const banner =
      (data && data.banner) ||
      'https://jobnow-data.s3.amazonaws.com/events/5bb1da8e6dc9fc7556fc403e/NiyfkDgCDom1MNSCTPBcRbPM1t58amoXK0rwEDpZKquRSbapvUYiZr2rXkFD8OCcFLASH-02-02-02-02.jpg?AWSAccessKeyId=AKIAI4KHS3W3CLBRJEUQ&Expires=1539049671&Signature=PkoLHOiYteqnbWmGqjgdH4cFTAY%3D';

    return (
      <div className="main-content block-wrapper marketing-jobs">
        <div className="title">
          <div className="main-title">
            <span className="jn-awesome-bolt" />
            <span className="title-text">{this.t('FLASH JOBS')}</span>
          </div>
          <div className="countdown-wrapper">
            <span className="sub-title">{this.t('Kết thúc sau')}</span>
            <Countdown date={countdown && countdown.end} />
          </div>
        </div>
        {banner && (
          <div className="flash-jobs-banner">
            <img src={banner} alt="" />
          </div>
        )}
        <div className="block-content">
          {jobs.map((job, index) => {
            return <JobItem data={job} flashJob key={`marketing-job-${index}`} />;
          })}
        </div>
      </div>
    );
  };

  _formatItemData = item => {
    if (this._filter === 'by-provinces') {
      return item;
    }

    return {};
  };

  _renderPageContent = () => {
    const { loading, data, filterText } = this.state;
    if (loading) return null;

    if (this._filter === 'apply-now') return this._renderMaketingJobs();

    // render page with list style
    let blockTitle;
    switch (this._filter) {
      case 'by-provinces':
        blockTitle = 'Việc làm theo tỉnh thành';
        break;

      case 'by-categories':
        blockTitle = 'Việc làm theo ngành nghề';

        break;

      default:
        break;
    }

    let renderData = [...data];
    if (filterText) {
      renderData = renderData.filter(item => item.title.indexOf(filterText) > -1);
    }

    return (
      <div className="main-content list-style">
        <div className="block-header">
          <div className="title">{this.t(blockTitle)}</div>
          <div className="filter-wrapper">
            <span className="icon-magnifier" />
            <Input
              placeholder={this.t('Tìm nhanh...')}
              floatingLabel
              value={filterText}
              onChange={value => {
                this.setState({ filterText: value });
              }}
            />
          </div>
        </div>
        <div className="block-content">
          {renderData.map((item, index) => {
            const queryString = (this._filter === 'by-categories' && `categories[]=${item._id}`) || `province=${item.title}`;
            return (
              <a href={`/search?${queryString}`} className={`list-item${item.highlight ? ' hot-item' : ''}`} key={`list-job-item-${index}`}>
                <span className="item-title">{item.title}</span>
                <span className="item-count">({item.count})</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    if (['apply-now', 'by-provinces', 'by-categories'].indexOf(this._filter.trim()) === -1) {
      return <Redirect to="/404" />;
    }
    const { loading } = this.state;
    let wrapperClasses = ['page-wrapper', this._filter.trim()];
    if (loading) wrapperClasses.push('loading');
    return (
      <div className={wrapperClasses.join(' ')}>
        {loading && <Loading />}
        {this._renderPageContent()}
      </div>
    );
  }
}

export default createPage(connect(state => ({ firstToken: state.firstToken, isLoggedIn: state.auth.isLoggedIn }))(JobsTypePage));
