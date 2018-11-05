/*
 * File: components/MenuBar
 * Desc: generate main menu bar for employer site
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-06 15:29:07
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import ApiConfig from '../../constants/server-config';
import { homeApi } from '../../services';
import { updateLocation } from '../../actions/auth';
import Base from '../Base';
import SearchInput from '../SearchInput';
import Button from '../Button';
import AdvanceSearchPopup from '../AdvanceSearchPopup';
import RightMenu from './RightMenu';
import './style.scss';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

class MenuBar extends Base {
  constructor(props) {
    super(props);

    const { search } = props.location;
    const keywordMatches = /keyword=([^&?]*)/.exec(search);
    const provinceMatches = /province=([^&?]*)/.exec(search);
    this.state = {
      mobileMode: window.innerWidth < 768,
      showAdvanceSearch: false,
      currentAddress: undefined,
      keyword: (keywordMatches && decodeURIComponent(keywordMatches[1])) || '',
      province: (provinceMatches && decodeURIComponent(provinceMatches[1])) || null
    };
  }

  componentDidMount() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(location => {
        if (location && location.coords) {
          const { latitude, longitude } = location.coords;
          this.props.updateLocation({ latitude, longitude });
        }
      });
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        if (!this.state.mobileMode) {
          this.setState({ mobileMode: true });
        }
      } else if (this.state.mobileMode) {
        this.setState({ mobileMode: false });
      }
    });
    if (this.props.firstToken) {
      this._getCurrentAddress();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.firstToken && nextProps.currentLocation && this.state.currentAddress === undefined) {
      this._getCurrentAddress(nextProps.currentLocation);
    }
  }

  _getCurrentAddress = async location => {
    const { currentLocation } = this.props;
    const fetchLoc = location || currentLocation;

    if (fetchLoc && !this._loadingAddress) {
      this._loadingAddress = true;
      const response = await homeApi.fetchClientAddress(fetchLoc.latitude, fetchLoc.longitude);
      if (response && response.code === undefined && response.result === undefined && response.address !== undefined) {
        this.setState({ currentAddress: response.address });
      }
    }
  };

  _showAdvanceSearch = () => {
    this.setState({
      showAdvanceSearch: true
    });
  };

  _search = () => {
    const { keyword, province } = this.state;
    let queries = [];
    if (keyword) {
      queries.push(`keyword=${keyword}`);
    }

    if (province) {
      const text = (typeof province === 'string' && province) || province.title;
      queries.push(`province=${text}`);
    }
    this.props.history.push({
      pathname: '/search',
      search: `?${queries.join('&')}`
    });
  };

  _handleEnterKey = event => {
    if (event) {
      const key = event.keyCode || event.which;
      if (key === 13) {
        event.preventDefault();
        this._search();
      }
    }
  };

  render() {
    return (
      <header id="app_topnavbar-wrapper">
        <nav className="navbar topnavbar">
          <div className="nav-wrapper">
            <div className="logo-wrapper">
              <a href="/">
                <span className="icon-jn-main-logo" />
                <span className="icon-jn-logo-text" />
              </a>
            </div>
            <div className="search-wrapper">
              <div className="el-wrapper">
                <SearchInput
                  placeholder={this.t('Vị trí công việc …')}
                  value={this.state.keyword}
                  onChange={value => {
                    this.setState({ keyword: value });
                  }}
                  onKeyDown={this._handleEnterKey}
                />
                {this.state.currentAddress && (
                  <div className="current-address">
                    <span className="icon-jn-map-marker" />
                    {this.state.currentAddress || this.t('TP/Tỉnh')}
                  </div>
                )}
                <Button className="jn-btn__normal search-btn" onClick={this._search}>
                  <span className="icon-jn-search" />
                </Button>
                <Button className="jn-btn__normal adv-search-btn" onClick={this._showAdvanceSearch}>
                  {this.t('Tìm kiếm nâng cao')}
                </Button>
              </div>
            </div>
            <RightMenu
              onMobileSearchClick={() => {
                setTimeout(() => {
                  this.setState({ showAdvanceSearch: true });
                });
              }}
              onMobileMenuClick={() => {}}
            />
          </div>
        </nav>
        <AdvanceSearchPopup
          show={this.state.showAdvanceSearch}
          hidePopup={() => {
            this.setState({ showAdvanceSearch: false });
          }}
        />
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    firstToken: state.firstToken,
    currentLocation: state.auth.currentLocation
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { updateLocation }
  )(MenuBar)
);
