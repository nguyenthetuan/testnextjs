/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-31 08:16:25
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Base, Countdown, JobItem, Loading, Input } from '../../components';
import SEOConfig from '../../constants/SEOConfig';
import { jobApi } from '../../services';
import { convertViCharToEngChar } from '../../utils/commonFunctions';
import createPage from '../createPage';
import './style.scss';

class JobsTypePage extends Base {
  static wrapperClasses = 'jobs-by-filter';

  constructor(props) {
    super(props);
    this._filter = props.match.params.id;
    this.state = {
      loading: true,
      data: {},
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
      case 'flash-jobs':
        response = await jobApi.fetchMaketingJobs();
        if (response && response.code === undefined && response.result === undefined) {
          this.setState({ data: response, loading: false });
        } else {
          this.setState({ loading: false, message: { code: 1 } });
        }
        break;

      case 'tim-viec-lam-theo-dia-diem':
        response = await jobApi.fetchJobsByLocation();
        if (response && response.code === undefined && response.result === undefined) {
          this.setState({ data: response.cities, loading: false });
        } else {
          this.setState({ loading: false, message: { code: 1 } });
        }
        break;

      case 'tim-viec-lam':
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

  _renderMaketingJobs = seoContent => {
    const { data } = this.state;
    const jobs = (data && data.marketing_jobs) || [];
    const countdown = (data && data.countDown) || {};
    const banner = (data && data.banner) || false;

    return (
      <div className="main-content block-wrapper marketing-jobs">
        {seoContent}
        <div className="title">
          <div className="main-title">
            <span className="jn-awesome-bolt" />
            <span className="title-text">{this.t('containers').JobsType.flashJob}</span>
          </div>
          <div className="countdown-wrapper">
            <span className="sub-title">{this.t('containers').JobsType.end}</span>
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
    if (this._filter === 'tim-viec-lam-theo-dia-diem') {
      return item;
    }

    return {};
  };

  _renderPageContent = () => {
    const { loading, data, filterText } = this.state;

    // return null if is loading
    if (loading) return null;

    const { pathname } = this.props.location;
    const otherSEOMap = {};
    SEOConfig.creatSEO().others.map(item => {
      otherSEOMap[item.url] = item;
    });
    const pageSEOConf = otherSEOMap[pathname.trim().replace('/viec-lam/', '')];
    const seoContent = (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageSEOConf.title}</title>
        <meta name="description" content={pageSEOConf.description} />
      </Helmet>
    );

    if (this._filter === 'flash-jobs') return this._renderMaketingJobs(seoContent);

    let renderData = [...data];
    if (filterText) {
      renderData = renderData.filter(item => item.title.indexOf(filterText) > -1);
    }

    const categoriesSEOData = {};
    SEOConfig.creatSEO().categories.map(cat => {
      categoriesSEOData[cat.id] = cat;
    });

    return (
      <div className="main-content list-style">
        {seoContent}
        <div className="block-header">
          {this._filter !== 'flash-jobs' && <div className="title">{this.t(pageSEOConf.heading)}</div>}
          <div className="filter-wrapper">
            <span className="icon-magnifier" />
            <Input
              placeholder={this.t('containers').JobsType.filterText}
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
            const queryString = (this._filter === 'tim-viec-lam' && `categories[]=${item._id}`) || `province=${item.title}`;
            if (this._filter === 'tim-viec-lam') {
              return (
                <a
                  href={(categoriesSEOData[item._id] && categoriesSEOData[item._id].url && `/${categoriesSEOData[item._id].url}`) || `/tim-kiem?${queryString}`}
                  className={`list-item${item.highlight ? ' hot-item' : ''}`}
                  key={`list-job-item-${index}`}
                >
                  <span className="item-title">{item.title}</span>
                  <span className="item-count">({item.count})</span>
                </a>
              );
            }

            return (
              <a href={`/viec-lam-tai-${convertViCharToEngChar(item.title)}`} className={`list-item${item.highlight ? ' hot-item' : ''}`} key={`list-job-item-${index}`}>
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
    if (['flash-jobs', 'tim-viec-lam-theo-dia-diem', 'tim-viec-lam'].indexOf(this._filter.trim()) === -1) {
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
