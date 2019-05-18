import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TabBar, Base, Loading } from '../../../components';
import List from '../../Candidate/components/List';
import { jobApi } from '../../../services';
import language from '../../../config/language/index';

const SUITABLE_JOBS = 'SUITABLE_JOBS';
const APPLIED_JOBS = 'APPLIED_JOBS';
const SAVED_JOBS = 'SAVED_JOBS';

const getStatus = status => {
  if (!status) {
    return language.containers.Jobs.Highlights;
  }
  if (status) {
    return language.containers.Jobs.Urgent;
  }
  return '';
};

class JobListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: SUITABLE_JOBS,
      data: [],
      loading: true,
      page: 1,
      perPage: 20,
      totalEntries: 0,
      mobileMode: window.innerWidth < 480
    };
  }

  componentDidMount() {
    jobApi.fetctSuitableJob().then(res => {
      if (res) {
        this.setState({ data: res.jobs || [], totalEntries: res.totalEntries, perPage: res.perPage, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });

    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  _onResize = () => {
    if (window.innerWidth < 480) {
      this.setState({ mobileMode: true });
    } else {
      this.setState({ mobileMode: false });
    }
  };

  _onChangeTab = key => {
    this.setState({ currentTab: key });
    if (key !== this.state.currentTab) {
      // this.fetchDataWithKey(key);
      this.choosenList = [];
      this.setState(
        {
          data: [],
          loading: true,
          page: 1,
          perPage: 20,
          totalEntries: 0
        },
        () => {
          this.fetchData(key);
        }
      );
    }
  };

  _changeState = state => {
    this.setState(state, () => {
      this.fetchData(this.state.currentTab, true);
    });
  };

  fetchData = (key, fetchMore = false) => {
    let query = null;
    if (fetchMore) {
      query = `page=${this.state.page}`;
    }
    switch (key) {
      case SUITABLE_JOBS:
        jobApi.fetctSuitableJob(query).then(res => {
          this.setState({ data: res.jobs || [], totalEntries: res.totalEntries, perPage: res.perPage, loading: false });
        });

        break;
      case APPLIED_JOBS:
        jobApi.fetctAppliedJob(query).then(res => {
          this.setState({ data: res.apply_jobs || [], totalEntries: res.totalEntries, perPage: res.perPage, loading: false });
        });

        break;
      case SAVED_JOBS:
        jobApi.fetctSavedJob(query).then(res => {
          this.setState({ data: res.candidate_sv_jobs || [], totalEntries: res.totalEntries, perPage: res.perPage, loading: false });
        });
        break;
      default:
        break;
    }
  };

  _renderSuitableJob = item => {
    if (!item) {
      return null;
    }
    const { title, company, worklocation, salary, km, feature } = item;
    let location = '';
    if (worklocation && worklocation.length > 0) {
      location = `${worklocation[0].province}`;
    }
    location = km ? `${km} km` : location;

    return (
      <Link to={`/viec-lam/${item.slug || item._id}`} className="job-suitable-item">
        <div className="col col-avatar">
          <img src={(company && company.logo) || '/assets/img/logo-full.png'} alt="" />
        </div>

        <div className="col col-title">
          <div className="title">{title}</div>
          <div>{(company && company.name) || ''}</div>
        </div>

        <div className="col col-distance">
          <div className="distance">
            <i className="icon-location-pin" /> {location}
          </div>
          <div className="money">
            <i className="icon-jn-dollar" /> {this.props.constants.salary[salary] || ''}
          </div>
          {this.state.mobileMode && <div className={feature ? 'job-critical' : 'job-hot'}>{this.t(getStatus(feature))}</div>}
        </div>

        {!this.state.mobileMode && (
          <div className="col col-status">
            <div className={feature ? 'critical' : 'hot'}>{this.t(getStatus(feature))}</div>
          </div>
        )}
      </Link>
    );
  };

  _renderAppliedJob = item => {
    if (!item.job) {
      return null;
    }
    const { title, company, km, salary, worklocation } = item.job;
    let location = '';
    if (worklocation && worklocation.length > 0) {
      location = `${worklocation[0].province}`;
    }
    location = km ? `${km} km` : location;
    return (
      <Link to={`/viec-lam/${item.slug || item._id}`} className="job-suitable-item">
        <div className="col col-avatar">
          <img src={(company && company.logo) || '/assets/img/logo-full.png'} alt="" />
        </div>

        <div className="col col-title">
          <div className="title">{title || ''}</div>
          <div>{company && company.name}</div>
        </div>

        <div className="col col-distance">
          <div className="distance">
            <i className="icon-location-pin" /> {location}
          </div>
          <div className="money">
            <i className="icon-jn-dollar" /> {this.props.constants.salary[salary] || ''}
          </div>
        </div>
        <div className="col col-apply-status">
          <div className="money">
            <i className="icon-calendar" /> {language.containers.Jobs.status}
          </div>
          <div className="important"> {Moment(item.createdAt).format('DD/MM/YYYY')}</div>
        </div>

        <div className="col col-reply">
          <div className="distance">{language.containers.Jobs.reply}</div>
          <div className="important">{item.ep_note}</div>
        </div>
      </Link>
    );
  };

  _renderSavedJob = item => {
    if (!item) {
      return null;
    }
    const { title, company, km, salary, worklocation } = item;
    let location = '';
    if (worklocation && worklocation.length > 0) {
      location = `${worklocation[0].province}`;
    }
    location = km ? `${km} km` : location;
    return (
      <Link to={`/viec-lam/${item.slug || item._id}`} className="job-suitable-item">
        <div className="col col-avatar">
          <img src={(company && company.logo) || '/assets/img/logo-full.png'} alt="" />
        </div>

        <div className="col col-title">
          <div className="title">{title}</div>
          <div>{company && company.name}</div>
        </div>

        <div className="col col-distance">
          <div className="distance">
            <i className="icon-location-pin" /> {location}
          </div>
          <div className="money">
            <i className="icon-jn-dollar" /> {this.props.constants.salary[salary] || ''}
          </div>
        </div>
        <div className="col col-apply-status">
          <div className="money">
            <i className="icon-calendar" /> {language.containers.Jobs.applyStatus}
          </div>
          <div className="important"> {Moment(item.createdAt).format('DD/MM/YYYY')}</div>
        </div>
      </Link>
    );
  };

  _renderItem = item => {
    const { currentTab } = this.state;

    switch (currentTab) {
      case SUITABLE_JOBS:
        return this._renderSuitableJob(item);
      case APPLIED_JOBS:
        return this._renderAppliedJob(item);
      case SAVED_JOBS:
        return this._renderSavedJob(item);

      default:
        return <div />;
    }
  };

  t = text => {
    if (typeof this.props.t === 'function') {
      return this.props.t(text);
    }
    return text;
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="job-list-container">
        <div className="header-page">
          <div className="header-content">
            <div className="tabs-wrapper">
              <div>
                <TabBar
                  data={[{ key: SUITABLE_JOBS, label: language.containers.Jobs.suitableJobs }, { key: APPLIED_JOBS, label: language.containers.Jobs.appliedJobs }, { key: SAVED_JOBS, label: language.containers.Jobs.savedJobs }]}
                  onChange={this._onChangeTab}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="body-page">
          {loading && <Loading />}
          {!loading && (
            <List
              totalEntries={this.state.totalEntries}
              pageSize={20}
              page={this.state.page}
              onPageChange={page => this._changeState({ page })}
              data={this.state.data}
              renderItem={item => this._renderItem(item)}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  constants: state.constants.data.jobs
});

export default connect(mapStateToProps)(JobListContainer);
