/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-26 12:12:07
 */
import React from 'react';
import Moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Base, Loading, Countdown, JobItem, Button } from '../../components';
import { homeApi, authApi } from '../../services';
import { updateLocation, showAuthPopup } from '../../actions/auth';
import createPage from '../createPage';
import TopBlock from './TopBlock';
import JobSlider from './JobSlider';
import './style.scss';

class HomePage extends Base {
  static wrapperClasses = 'home-page';

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      loading: true,
      data: null,
      isMobileMode: window.innerWidth < 768
    };

    const { match } = props;
    if (match.path.indexOf('/forgot_password') > -1) {
      const matches = /code=([A-Za-z0-9]+)&email=(.*)$&?/.exec(props.location.search);
      if (matches && matches[1] && matches[2]) {
        this._changingPassword = {
          email: matches[2],
          code: matches[1]
        };
      }
    }
  }

  componentDidMount() {
    const { firstToken, isLoggedIn } = this.props;
    if (firstToken || isLoggedIn) {
      this._fetchData(this.props.location);

      if (this._changingPassword && !this._checking) {
        this._checkResetPwdToken();
      }
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        if (!this.state.isMobileMode) {
          this.setState({ isMobileMode: true });
        }
      } else if (this.state.isMobileMode) {
        this.setState({ isMobileMode: false });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { firstToken, isLoggedIn } = nextProps;

    if ((nextProps.firstToken && !this.props.firstToken) || ((firstToken || isLoggedIn) && !_.isEqual(nextProps.location, this.props.location))) {
      this._fetchData(nextProps.location);
      if (this._changingPassword && !this._checking) {
        this._checkResetPwdToken();
      }
    }
  }

  _checkResetPwdToken = async () => {
    this._checking = true;
    const response = await authApi.checkResetPwdToken(this._changingPassword);
    let data = { ...this._changingPassword, step: 3 };
    data.validCode = response && response.code === undefined && response.result;
    this.props.showAuthPopup('forgot', data);
  };

  _fetchData = async location => {
    this._fetchingLocation = location;
    const response = await homeApi.fetchHomeData(location);
    if (response && response.result === undefined && response.code === undefined) {
      this.setState({ data: response, loading: false });
    } else {
      this.setState({ message: { code: 1 }, loading: false });
    }
  };

  _fetchClientAddress = async location => {
    const { latitude, longtitude } = location;
    const addressResponse = await homeApi.fetchClientAddress(latitude, longtitude);

    if (addressResponse && addressResponse.code === undefined && addressResponse.result === undefined) {
      this.setState({ currentAddress: addressResponse.address });
    }
  };

  _renderListSliderBlock = (data, name) => {
    const { loading } = this.state;
    if (loading || data.jobs.length === 0) return null;
    let itemStyle;
    if (data.fixedWidth) {
      itemStyle = { width: window.innerWidth / (data.showItems || 1) };
    }
    let jobs = this.state.isMobileMode ? [...data.jobs.slice(0, 30)] : data.jobs;

    return (
      <div className={`${name}-jobs list-slider block-wrapper`}>
        <div className="title">{data.title}</div>

        <div className="block-content">
          {(data && data.top) || null}
          <JobSlider
            data={jobs}
            groupSize={data.groupSize}
            itemsPerLine={data.itemsPerLine}
            loading={loading}
            showItems={data.showItems || 1}
            scrollItems={data.scrollItems || 1}
            showdots={data.showdots}
            fixedWidth={data.fixedWidth}
            responsive={data.responsive}
            autoplay={data.autoplay || false}
            name={name}
            afterChange={data.afterChange}
            renderItem={item => <JobItem data={item} showJobInfoOnly={data.showJobInfoOnly} style={itemStyle} linkWrapper={data.linkWrapper} flashJob={data.flashJob} />}
          />

          {(data.message || data.redirectURL) && (
            <div className="detail-link-wrapper">
              {/* {data.message && <span className="similar-msg" dangerouslySetInnerHTML={{ __html: data.message }} />} */}
              {data.redirectURL && <a href={data.redirectURL}>{this.t(data.message)}</a>}
            </div>
          )}
        </div>
      </div>
    );
  };

  _renderMarketingJobs = () => {
    const { data, loading, isMobileMode } = this.state;
    const jobs = (data && data.marketing_jobs.jobs) || [];
    const countdown = (data && data.marketing_jobs.countDown) || {};

    if (loading || jobs.length === 0) return null;

    const title = (
      <div className="maketing-jobs-title">
        <span>
          <span className="jn-awesome-bolt" />
          <span className="title-text">{this.t('FLASH JOBS')}</span>
        </span>
        <div className="countdown-wrapper">
          <span className="icon-jn-clock" />
          <Countdown date={countdown && countdown.end} />
        </div>
      </div>
    );
    if (jobs.length <= 6) {
      return (
        <div className="marketing-jobs list-slider block-wrapper">
          <div className="title">{title}</div>
          <div className="block-content">
            <div className="view-all-marketing-jobs">
              <a href="/jobs/apply-now">
                <span>{this.t('Xem tất cả')}</span>
                <span className="icon-arrow-right" />
              </a>
            </div>
            <div className="slide-item-wrapper no-slider">
              {jobs.map((job, index) => {
                return <JobItem data={job} linkWrapper key={`marketing-job-${index}`} flashJob />;
              })}
            </div>
          </div>
        </div>
      );
    }

    const marketingJobs = {
      jobs: (data && data.marketing_jobs.jobs) || [],
      title,
      flashJob: true,
      top: (
        <div className="view-all-marketing-jobs">
          <a href="/jobs/apply-now">
            <span>{this.t('Xem tất cả')}</span>
            <span className="icon-arrow-right" />
          </a>
        </div>
      ),
      showItems: 6,
      scrollItems: 1,
      autoplay: true,
      showdots: false,
      afterChange: () => {
        const activeItem = document.querySelector('.marketing-jobs .slick-slide a.last-active');
        if (activeItem) {
          activeItem.classList.remove('last-active');
          activeItem.classList.remove('first-active');
        }
        const actives = document.querySelectorAll('.marketing-jobs .slick-active a.job-item-wrapper');
        const beforeActive = document.querySelector('a.disable-right-border');
        if (beforeActive) {
          beforeActive.classList.remove('disable-right-border');
        }
        if (actives.length) {
          actives[actives.length - 1].classList.add('last-active');
          actives[0].classList.add('first-active');
          actives[0].parentElement.parentElement.parentElement.previousSibling.querySelector('a.job-item-wrapper').classList.add('disable-right-border');
        }
      },
      // fixedWidth: true,
      linkWrapper: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 860,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    return this._renderListSliderBlock(marketingJobs, 'marketing');
  };

  render() {
    const { data, loading, message } = this.state;
    if (loading) {
      return (
        <div className="page-wrapper loading-data">
          <Loading />
        </div>
      );
    }

    if (message && message.code) {
      return (
        <div className="page-wrapper loading-data">
          <div className="error-connect">
            {this.t('Có lỗi kết nối với máy chủ. Vui lòng ')}
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              {this.t('thử lại')}
            </Button>
          </div>
        </div>
      );
    }

    const attractiveJobs = {
      message: data && data.attractiveJobs.count !== undefined && this.t('XEM THÊM CÁC VIỆC LÀM HẤP DẪN'),
      jobs: (data && data.attractiveJobs.jobs) || [],
      redirectURL: '/search?salary=3',
      title: this.t('Việc làm hấp dẫn'),
      groupSize: this.state.isMobileMode ? 6 : 12,
      itemsPerLine: this.state.isMobileMode ? 1 : 2
    };

    const fastJobs = {
      message: data && data.featuredJobs.count !== undefined && this.t('XEM THÊM CÁC VIỆC LÀM TUYỂN GẤP'),
      jobs: (data && data.featuredJobs.jobs) || [],
      redirectURL: '/search?sort=featured',
      title: this.t('Việc làm tuyển gấp'),
      groupSize: this.state.isMobileMode ? 6 : 18,
      itemsPerLine: this.state.isMobileMode ? 1 : 3
    };

    const latestJob = {
      message: data && data.latestJobs.count !== undefined && this.t('XEM THÊM CÁC VIỆC LÀM MỚI NGÀY %date.'.replace('%number', data.latestJobs.count).replace('%date', Moment().format('DD/MM/YY'))),
      jobs: (data && data.latestJobs.jobs) || [],
      redirectURL: '/search?sort=latest',
      title: this.t('Việc làm mới nhất'),
      groupSize: this.state.isMobileMode ? 6 : 18,
      itemsPerLine: this.state.isMobileMode ? 1 : 3,
      showJobInfoOnly: true
    };

    return (
      <div className="page-wrapper">
        <TopBlock events={data && data.events} />
        <div className="main-content-wrapper">
          {this._renderMarketingJobs()}
          {this._renderListSliderBlock(fastJobs, 'fast')}
          {this._renderListSliderBlock(attractiveJobs, 'attractive')}
          {this._renderListSliderBlock(latestJob, 'latest')}
        </div>
      </div>
    );
  }
}

export default createPage(
  connect(
    state => ({ location: state.auth.currentLocation }),
    { updateLocation, showAuthPopup }
  )(HomePage)
);
