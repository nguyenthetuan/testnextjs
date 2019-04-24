/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-03 12:31:49
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import SEOConfig from '../../constants/SEOConfig';
import { Base, Pagination, GMap, Footer, JobItem, Input } from '../../components';
import { searchJob } from '../../actions/search';
import { convertViCharToEngChar } from '../../utils/commonFunctions';
import createPage from '../createPage';
import Filter from './Filter';
import './style.scss';

const queryMap = {
  page: 'p',
  salary: 'sa',
  experience: 'ex',
  type: 't',
  level: 'l',
  sort: 'so'
};

class SearchPage extends Base {
  static wrapperClasses = 'search-page';

  sortOptions = [{ label: this.t('containers').Search.index.distance, value: 'distance' }, { label: this.t('containers').Search.index.featured, value: 'featured' }, { label: this.t('containers').Search.index.latest, value: 'latest' }];

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
      type: [],
      province: [],
      path: props.location.pathname
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

    const { constants, categories, provinces } = nextProps;
    if (categories.length && Object.keys(constants).length && provinces.length && (!this._updatedSearchToState || nextProps.location.search !== this.props.location.search)) {
      this._updatedSearchToState = true;
      this.setState(this._udpateQueryParamsToState(nextProps), this._fetchData);
    }
    if (_.isArray(nextProps.jobs) && this.props.jobs === null) {
      this.setState({ firstLoad: false });
    }
  }

  _udpateQueryParamsToState = nextProps => {
    const { constants, categories, matchCategory, matchProvince, othersMatch, provinces } = nextProps;
    let catOpts = {};
    categories.map(cat => {
      catOpts[cat._id] = cat.title;
    });
    let newState = {};

    const params = nextProps.location.search.match(/[^&?]*?=[^&?]*/g);
    if (params) {
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

    if (othersMatch) {
      Object.keys(queryMap).map(key => {
        const reg = new RegExp(`${queryMap[key]}(\\d+)`);
        const matches = othersMatch.match(reg);
        if (matches) {
          newState[key] = [{ value: matches[1] }];
        }
      });
      const sortMatches = othersMatch.match(/so(featured|distance|latest)/);
      if (sortMatches) {
        newState.sort = [{ value: sortMatches[1] }];
      }
    }

    // process handle category and provice in pathname
    const SEOMap = {};
    SEOConfig.creatSEO().categories.map(cate => {
      SEOMap[cate.url] = cate;
    });
    const provinceMap = {};
    (provinces || []).map(item => {
      provinceMap[convertViCharToEngChar(item.city)] = item;
    });

    if (matchCategory && SEOMap[`viec-lam${matchCategory}`]) {
      const matchCatID = SEOMap[`viec-lam${matchCategory}`].id;
      newState.categories = [{ value: matchCatID, label: catOpts[matchCatID] }];
    }

    if (matchProvince && provinceMap[matchProvince]) {
      newState.province = [{ label: provinceMap[matchProvince].city, value: provinceMap[matchProvince].city }];
    }

    return newState;
  };

  _fetchData = (searchURL, resetQueryURL) => {
    const queryStr = this._generateQueryString(searchURL, resetQueryURL);
    this.props.searchJob(queryStr);
  };

  _generateQueryString = (searchURL, resetQueryURL = false) => {
    const { currentPage, categories, salary, experience, level, type, sort, province } = this.state;
    let queryObj = {};
    const { currentLocation, location } = this.props;
    let searchStr;
    let catPath;
    let provincePath;

    switch (location.pathname) {
      case '/viec-lam/tim-viec-gan-nha':
        searchStr = `?sort=distance&page=${currentPage}`;
        if (currentLocation) searchStr = `${searchStr}&latitude=${currentLocation.lat}&longitude=${currentLocation.lon}`;
        break;

      case '/viec-lam/viec-lam-hap-dan':
        queryObj.salary = 4;
        break;

      case '/viec-lam/viec-lam-tuyen-gap':
        searchStr = '?sort=featured';
        break;

      case '/viec-lam/viec-lam-moi-nhat':
        searchStr = '?sort=latest';
        break;

      default:
        searchStr = '';
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

    if (currentPage > 1) queryObj.page = currentPage;

    if (currentLocation) {
      queryObj = { ...queryObj, ...currentLocation };
    }

    if (salary.length) {
      queryObj.salary = salary[0].value;
    }
    if (categories.length) {
      queryObj['categories[]'] = categories[0].value;
      const SEOMap = {};
      SEOConfig.creatSEO().categories.map(cate => {
        SEOMap[cate.id] = cate;
      });
      catPath = SEOMap[categories[0].value].url;
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

    if (province.length) {
      queryObj.province = province[0].value;
      provincePath = `-tai-${convertViCharToEngChar(province[0].label)}`;
    }

    let pathname = catPath || provincePath ? `${catPath || 'viec-lam'}${provincePath || ''}` : 'search';

    const queryString = [];
    Object.keys(queryObj).map(key => {
      if (key !== 'categories[]' && key !== 'province' && queryMap[key]) {
        queryString.push(`${queryMap[key]}${queryObj[key]}`);
      }
    });

    if (!this.state.firstLoad && location.pathname.indexOf('/viec-lam/') === -1) {
      window.history.replaceState(null, '', `/${pathname}${queryString.length ? `--${queryString.join('')}` : ''}`);
    }

    return Object.keys(queryObj)
      .map(key => `${key}=${queryObj[key]}`)
      .join('&');
  };

  _changeState = state => {
    const { categories, province, path } = { ...this.state, ...state };
    let catPath;
    let provincePath;
    if (categories.length) {
      const SEOMap = {};
      SEOConfig.creatSEO().categories.map(cate => {
        SEOMap[cate.id] = cate;
      });
      catPath = SEOMap[categories[0].value].url;
    }
    if (province.length) {
      provincePath = `-tai-${convertViCharToEngChar(province[0].label)}`;
    }

    let newPath = catPath || provincePath ? `/${catPath || 'viec-lam'}${provincePath || ''}` : '/search';
    this.setState({ ...state, path: (path.match(/^\/viec-lam\//) && path) || newPath }, () => {
      this._fetchData();
    });
  };

  _renderJobInfoBox = index => {
    const { jobs } = this.props;
    return <JobItem data={jobs[index]} className="info-box" />;
  };

  _renderPageTitle = () => {
    const { path, province, categories } = this.state;

    if (path.match(/^\/viec-lam/)) {
      let seoDescs = [];
      let seoTitle;
      let pageTitle;

      if (path.match(/^\/viec-lam-/)) {
        let catSEOMap = {};
        SEOConfig.creatSEO().categories.map(cate => {
          catSEOMap[cate.id] = cate;
        });
        let provinceSEOMap = {};
        [...SEOConfig.creatSEO().provinces, ...SEOConfig.creatSEO().others].map(prov => {
          provinceSEOMap[prov.url] = prov;
        });

        const seoCatConfig = categories[0] && catSEOMap[categories[0].value];
        const provinceSEOConf = province[0] && provinceSEOMap[`viec-lam-tai-${convertViCharToEngChar(province[0].value)}`];
        pageTitle = (seoCatConfig && seoCatConfig.heading) || (provinceSEOConf && provinceSEOConf.heading);
        seoTitle = (seoCatConfig && seoCatConfig.title) || (provinceSEOConf && provinceSEOConf.title);
        if (seoCatConfig && provinceSEOConf) {
          pageTitle = `${seoCatConfig.heading} tại ${province[0].label}`;
          seoTitle = seoCatConfig.title.trim().replace(/\|\s?JOBNOW$/, `tại ${province[0].label} | JOBNOW`);
        }
        if (seoCatConfig) seoDescs.push(seoCatConfig.description.trim());
        if (provinceSEOConf) seoDescs.push(provinceSEOConf.description.trim());
      } else {
        const secondPath = path.replace('/viec-lam/', '');
        let otherSEOMap = {};
        SEOConfig.creatSEO().others.map(item => {
          otherSEOMap[item.url] = item;
        });

        pageTitle = otherSEOMap[secondPath] && otherSEOMap[secondPath].heading;
        seoTitle = otherSEOMap[secondPath] && otherSEOMap[secondPath].title;
        if (otherSEOMap[secondPath]) seoDescs.push(otherSEOMap[secondPath].description);
      }

      return (
        <div className="page-title-wrapper">
          <h1 className="page-title">{pageTitle}</h1>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescs.join(', ')} />
          </Helmet>
        </div>
      );
    }
    return null;
  };

  render() {
    const { jobs, count, constants, perPage, currentLocation, provinces, matchProvince, matchCategory, match } = this.props;
    const positions = (jobs || []).map(job => job.worklocation[0] && job.worklocation[0].coord);
    const wrapperClasses = ['page-wrapper'];
    const { firstLoad, categories, salary, experience, level, type, sort, currentPage, province, path } = this.state;
    const SEOMap = {};
    SEOConfig.creatSEO().categories.map(cate => {
      SEOMap[cate.url] = cate;
    });
    const provinceMap = {};
    (provinces || []).map(item => {
      provinceMap[convertViCharToEngChar(item.city)] = item;
    });

    if (match.path === '/viec-lam:slug' && (!matchCategory || !SEOMap[`viec-lam${matchCategory}`]) && (!matchProvince || (provinces && provinces.length && !provinceMap[matchProvince]))) {
      return <Redirect to="/404" />;
    }

    if (firstLoad) wrapperClasses.push('loading');

    return (
      <div className={wrapperClasses.join(' ')}>
        {!firstLoad && (
          <Filter
            {...{ constants, categories, salary, experience, level, type, sort, provinces }}
            sortOpts={this.sortOptions}
            categoryOpts={this.props.categories}
            selectedProvince={province}
            onChange={this._changeState}
          />
        )}

        {!firstLoad && (
          <div className="main-content">
            <div className="page-content">
              {this._renderPageTitle()}
              <div className="jobs-list-wrapper">
                <div className="jobs-list">
                  {!path.match(/^\/viec-lam/) && (
                    <div className="list-header">
                      <div
                        className="result-number"
                        dangerouslySetInnerHTML={{
                          __html: this.t(this.t('containers').Search.index.find + this.t('<span class="number">') + this.t(`${'%d'.replace('%d', count)}`) + this.t('</span>') + this.t('containers').Search.index.result)
                        }}
                      />
                    </div>
                  )}
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
      currentLocation: state.auth.currentLocation,
      provinces: state.locations.cities || []
    }),
    { searchJob }
  )(SearchPage),
  true
);
