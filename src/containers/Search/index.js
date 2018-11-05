/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-03 12:31:49
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Base, Pagination, GMap, Footer, JobItem, Input } from '../../components';
import createPage from '../createPage';
import { searchJob } from '../../actions/search';
import './style.scss';
import Filter from './Filter';

class SearchPage extends Base {
  static wrapperClasses = 'search-page';

  sortOptions = [{ label: this.t('Gần bạn nhất'), value: 'distance' }, { label: this.t('Tuyển gấp'), value: 'featured' }, { label: this.t('Mới nhất'), value: 'latest' }];

  constructor(props) {
    super(props);

    const { search } = props.location;
    const sortMatches = /.*sort=([a-z]+).*/g.exec(search);
    this._updatedSearchToState = false;
    this.state = {
      data: null,
      firstLoad: true,
      sort: (sortMatches && [sortMatches[1]]) || [], // sort by [distance|latest|featured]
      currentPage: 1,
      categories: [],
      salary: [],
      level: [],
      experience: [],
      type: []
    };
  }

  componentDidMount() {
    if (this.props.firstToken) {
      this._fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.firstToken && !this.props.firstToken) || nextProps.location.search !== this.props.location.search) {
      this._fetchData(nextProps.location.search, nextProps.location.state && nextProps.location.state.resetQueryURL);
    }

    const { constants, categories } = nextProps;
    if (categories.length && Object.keys(constants).length && (!this._updatedSearchToState || nextProps.location.search !== this.props.location.search)) {
      this._updatedSearchToState = true;
      this.setState(this._udpateQueryParamsToState(nextProps));
    }
    if (_.isArray(nextProps.jobs) && this.props.jobs === null) {
      this.setState({ firstLoad: false });
    }
  }

  _udpateQueryParamsToState = nextProps => {
    let newState = {};
    const params = nextProps.location.search.match(/[^&?]*?=[^&?]*/g);
    if (params) {
      const { constants, categories } = nextProps;
      let catOpts = {};
      categories.map(cat => {
        catOpts[cat._id] = cat.title;
      });
      params.map(param => {
        const matches = /([a-z]+).*=(.*)$/.exec(param);

        if (matches) {
          if (matches[1] === 'categories') {
            newState.categories = [{ value: matches[2], label: catOpts[matches[2]] }];
          } else if (this.state[matches[1]]) {
            if (Array.isArray(this.state[matches[1]])) {
              if (matches[1] === 'sort') {
                newState[matches[1]] = [{ value: matches[2], label: this.sortOptions[matches[1]][matches[2]] }];
              } else {
                newState[matches[1]] = [{ value: matches[2], label: constants[matches[1]][matches[2]] }];
              }
            } else {
              newState[matches[1]] = matches[2];
            }
          }
        }
      });
    }
    return newState;
  };

  _fetchData = (searchURL, resetQueryURL) => {
    const queryStr = this._generateQueryString(searchURL, resetQueryURL);
    this.props.searchJob(queryStr);
  };

  _generateQueryString = (searchURL, resetQueryURL = false) => {
    const { currentPage, categories, salary, experience, level, type, sort } = this.state;
    let queryObj = {};
    const { currentLocation, location } = this.props;
    let searchStr;
    if (location.pathname === '/viec-lam/tim-viec-gan-nha') {
      searchStr = `?sort=distance&page=${currentPage}&latitude=${currentLocation.lat}&longitude=${currentLocation.lon}`;
    }
    const params = ((!resetQueryURL && (searchStr || searchURL || location.search)) || '').match(/[^&?]*?=[^&?]*/g);

    if (params) {
      params.map(param => {
        const matches = /([a-z[\]]+)=(.*)$/.exec(param);

        if (matches) {
          queryObj[matches[1]] = matches[2];
        }
      });
    }
    queryObj.page = currentPage;

    if (currentLocation) {
      queryObj = { ...queryObj, ...currentLocation };
    }

    if (salary.length) {
      queryObj.salary = salary[0].value;
    }
    if (categories.length) {
      queryObj['categories[]'] = categories[0].value;
    }
    if (experience.length) {
      queryObj.experience = experience[0].value;
    }
    if (level.length) {
      queryObj.level = level[0].value;
    }
    if (type.length) {
      queryObj.type = type[0].value;
    }
    if (sort.length) {
      queryObj.sort = sort[0].value;
    }

    const queryString = Object.keys(queryObj)
      .map(key => `${key}=${queryObj[key]}`)
      .join('&');

    window.history.replaceState(null, '', `/search?${queryString}`);

    return queryString;
  };

  _changeState = (state, resetQueryURL = false) => {
    this.setState(state, () => {
      if (resetQueryURL) {
        this.props.history.replace({
          pathname: '/search',
          state: { resetQueryURL: true }
        });
      }
      this._fetchData(undefined, resetQueryURL);
    });
  };

  _renderJobInfoBox = index => {
    const { jobs } = this.props;
    return <JobItem data={jobs[index]} className="info-box" />;
  };

  render() {
    const { jobs, count, constants, perPage, currentLocation } = this.props;
    const wrapperClasses = ['page-wrapper'];
    const { firstLoad, categories, salary, experience, level, type, sort, currentPage } = this.state;
    if (firstLoad) wrapperClasses.push('loading');
    const positions = (jobs || []).map(job => job.worklocation[0] && job.worklocation[0].coord);
    return (
      <div className={wrapperClasses.join(' ')}>
        {!firstLoad && <Filter {...{ constants, categories, salary, experience, level, type, sort }} sortOpts={this.sortOptions} categoryOpts={this.props.categories} onChange={this._changeState} />}

        {!firstLoad && (
          <div className="main-content">
            <div className="page-content">
              <div className="jobs-list-wrapper">
                <div className="jobs-list">
                  <div className="list-header">
                    <div
                      className="result-number"
                      dangerouslySetInnerHTML={{
                        __html: this.t('Tìm thấy <span class="number">%d</span> kết quả'.replace('%d', count))
                      }}
                    />
                  </div>
                  <div className="list-body">
                    {(jobs || []).map((item, index) => (
                      <JobItem data={item} key={`jon-item-${index}`} />
                    ))}
                  </div>
                </div>
                <Pagination
                  currentPage={currentPage - 1}
                  total={count}
                  numberPerPage={perPage}
                  onChangePage={page => {
                    this._changeState({ currentPage: page + 1 });
                  }}
                />
              </div>
              <Footer />
            </div>
            <div className="map-wrapper">
              <GMap myLocation={currentLocation} positions={positions} renderInfoBox={this._renderJobInfoBox} customMarker showMyLocationControl showZoomControl />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default createPage(
  connect(
    state => ({
      ...state.search,
      constants: state.constants.data.jobs || {},
      categories: state.categories.data || [],
      currentLocation: state.auth.currentLocation
    }),
    { searchJob }
  )(SearchPage),
  true
);
