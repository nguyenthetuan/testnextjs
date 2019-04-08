/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-08 14:18:23
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Base from '../Base';
import Loading from '../Loading';
import Popup from '../Popup';
import MobileMenu from './MobileMenu';
import { fetchNotifications } from '../../actions/notification';
import { signOut, showAuthPopup, showLanguage } from '../../actions/auth';
import { getLanguage } from '../../utils/localData';
import language from '../../config/language/index';

class RightMenu extends Base {
  constructor(props) {
    super(props);
    this.state = {
      mobileMode: window.innerWidth < 768,
      showNotificationPopup: false,
      showMobileMenu: false
    };
  }

  applicationMenu = [
    {
      link: '/dashboard',
      title: this.t('components').menubar.RightMenu.dashboard,
      icon: { name: 'icon-screen-desktop', bgColor: '#f5a623' }
    },
    {
      link: '/cv',
      title: this.t('components').menubar.RightMenu.cv,
      icon: { name: 'icon-people', bgColor: '#ea5e1e' }
    },
    {
      link: '/suitable-jobs',
      title: this.t('components').menubar.RightMenu.suitableJobs,
      icon: { name: 'icon-briefcase', bgColor: '#0d89bb' }
    },
    {
      link: '/notification',
      title: this.t('components').menubar.RightMenu.notification,
      icon: { name: 'icon-bell', bgColor: '#6450e3' }
    },
    {
      link: '/setting-notification',
      title: this.t('components').menubar.RightMenu.settingNotification,
      icon: { name: 'icon-notebook', bgColor: '#400f62' }
    },
    {
      link: '/change-information',
      title: this.t('components').menubar.RightMenu.changeInformation,
      icon: { name: 'icon-settings', bgColor: '#5f2393' }
    }
  ];

  candidateMenu = [
    {
      link: '#register',
      title: this.t('components').menubar.RightMenu.register,
      icon: 'signin-icon',
      linkAttributes: {
        className: 'candidate-signin',
        onClick: event => {
          event.preventDefault();
          this.props.showAuthPopup(); // show login form
          this._toggleDropdownMenu(event, 'candidate-menu');
        }
      }
    },
    {
      link: 'https://hr.jobnow.com.vn/ ',
      title: this.t('components').menubar.RightMenu.handbook,
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    },
    {
      link: 'http://hr.jobnow.com.vn/info/ ',
      title: this.t('components').menubar.RightMenu.support,
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    }
  ];

  employerMenu = [
    {
      link: 'https://employer.joby.vn/login',
      title: this.t('components').menubar.RightMenu.login,
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    },
    {
      link: 'https://hr.jobnow.com.vn/info/bao-gia-dich-vu/',
      title: this.t('components').menubar.RightMenu.priceQuote,
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    },
    {
      link: ' https://hr.jobnow.com.vn/info/',
      title: this.t('components').menubar.RightMenu.supportEmployers,
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    },
    {
      link: 'https://hr.jobnow.com.vn/',
      title: this.t('components').menubar.RightMenu.recruitmentHandbook,
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    }
  ];

  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick);
    const { isLoggedIn, notifications } = this.props;
    if (isLoggedIn && notifications.data && !notifications.loading) {
      this.props.fetchNotifications();
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
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick);
  }

  _handleDocumentClick = event => {
    const activeMenus = this._wrapper.querySelectorAll('.dropdown.open');
    if (activeMenus.length) {
      activeMenus.forEach(activeMenu => {
        if (!activeMenu.contains(event.target)) {
          activeMenu.classList.remove('open');
        }
      });
    }
  };

  _renderCandidateMenu = () => {
    return (
      <li className="dropdown candidate-menu">
        <a
          href="#"
          onClick={event => {
            event.preventDefault();
            this.props.showAuthPopup();
          }}
        >
          <span className="main-text">{this.t('components').menubar.RightMenu.candidate}</span>
          <span className="desc-text">{this.t('components').menubar.RightMenu.createProfiles}</span>
        </a>
        {/* <ul className="dropdown-menu dropdown-menu-right">
          {this.candidateMenu.map((item, index) => (
            <li key={`application-item-${index}`}>
              <a href={item.link} {...item.linkAttributes}>
                <div className="link-icon">
                  <img src={`/assets/img/${item.icon}.png`} alt="" />
                </div>
                <div>{this.t(item.title)}</div>
              </a>
            </li>
          ))}
        </ul> */}
      </li>
    );
  };

  _renderFlag = () => {
    let src = '';
    let l = _.isEmpty(getLanguage()) ? language._language : getLanguage().language;
    switch (l) {
      case 'en': {
        src = '/assets/img/flagEnglish.png';
        break;
      }
      case 'vi': {
        src = '/assets/img/vietnam.png';
        break;
      }
      case 'jp': {
        src = '/assets/img/flagJapan.jpg';
        break;
      }
      default:
        break;
    }
    return src;
  };

  _renderLanguageMenu = () => {
    return (
      <li className="dropdown candidate-menu">
        <a
          href="#"
          onClick={event => {
            event.preventDefault();
            this.props.showLanguage();
          }}
        >
          <div className="flag">
            <img src={this._renderFlag()} alt="" />
          </div>
        </a>
      </li>
    );
  };

  _renderEmployerMenu = () => {
    const { hostname, protocol } = window.location;
    return (
      <li className="dropdown employer-menu">
        <a href={`${protocol}//employer.${hostname}`} target="_blank" rel="noopener noreferrer">
          <span className="main-text">{this.t('components').menubar.RightMenu.employer}</span>
          <span className="desc-text">{this.t('components').menubar.RightMenu.postNews}</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-right">
          {this.employerMenu.map((item, index) => (
            <li key={`application-item-${index}`}>
              <a href={item.link}>
                <div className="link-icon">
                  <img src={`/assets/img/${item.icon}.png`} alt="" />
                </div>
                <div>{this.t(item.title)}</div>
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  _renderApplicationMenu = () => {
    return (
      <li className="dropdown application-menu">
        <a
          href="#"
          onClick={event => {
            this._toggleDropdownMenu(event, 'application-menu');
          }}
        >
          <span className="meta">
            <span className="avatar">
              <i className="icon-jn-application" />
            </span>
          </span>
        </a>
        <ul className="dropdown-menu dropdown-menu-right">
          {this.applicationMenu.map((item, index) => (
            <li key={`application-item-${index}`}>
              <a href={item.link}>
                <div className="application-icon" style={{ backgroundColor: item.icon.bgColor }}>
                  <i className={item.icon.name} />
                </div>
                <div>{this.t(item.title)}</div>
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  _renderNotificationMenu = () => {
    const { data, loading, totalUnread } = this.props.notifications;

    if (this.state.mobileMode) {
      return (
        <li className="dropdown notification-menu">
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              if (!this.state.mobileMode) {
                this._toggleDropdownMenu(event, 'notification-menu');
              } else {
                this.setState({ showNotificationPopup: true });
              }
            }}
          >
            <span className="meta">
              <span className="avatar">
                <i className="icon-bell" />
                {totalUnread > 0 && <span className="unread-number">9+</span>}
              </span>
            </span>
          </a>
          {loading && (
            <div className="dropdown-menu dropdown-menu-right">
              <Loading className="small" />
            </div>
          )}
          <Popup
            showBox
            show={this.state.showNotificationPopup}
            clickOutToClose
            toggleButton=".notification-menu a"
            onClose={() => {
              this.setState({ showNotificationPopup: false });
            }}
          >
            {!loading && (
              <div className="notifcations">
                <a
                  href="#"
                  className="close-btn"
                  onClick={event => {
                    event.preventDefault();
                    this.setState({ showNotificationPopup: false });
                  }}
                >
                  <span className="icon-jn-close" />
                </a>
                <div className="noti-box-title">{this.t('components').menubar.RightMenu.notiBox}</div>
                <div className="notis-wrapper">
                  {(data || []).slice(0, 4).map((noti, index) => {
                    const { description, link, logo, read, title, _id } = noti;
                    return (
                      <div className={`noti-item${read ? '' : ' unread'}`} key={`noti-menubar-item-${index}`}>
                        <a className="content-wrapp" href={link}>
                          {
                            <div className="noti-image">
                              <img src={logo || '/assets/img/logo-full.png'} alt="" />
                            </div>
                          }
                          <div className="noti-content">
                            <div className="noti-title">{title}</div>
                            <div className="noti-desc">{description}</div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
                <div className="noti-view-all">
                  <a href="/notification">{this.t('components').menubar.RightMenu.notiView}</a>
                </div>
              </div>
            )}
          </Popup>
        </li>
      );
    }

    return (
      <li className="dropdown notification-menu">
        <a
          href="#"
          onClick={event => {
            this._toggleDropdownMenu(event, 'notification-menu');
          }}
        >
          <span className="meta">
            <span className="avatar">
              <i className="icon-bell" />
              {totalUnread > 0 && <span className="unread-number">9+</span>}
            </span>
          </span>
        </a>
        {loading && (
          <div className="dropdown-menu dropdown-menu-right">
            <Loading className="small" />
          </div>
        )}
        {!loading && (
          <ul className="dropdown-menu dropdown-menu-right">
            <li className="noti-box-title">{this.t('components').menubar.RightMenu.notiBox}</li>
            {(data || []).slice(0, 4).map((noti, index) => {
              const { description, link, logo, read, title, _id } = noti;
              return (
                <li className={`noti-item${read ? '' : ' unread'}`} key={`noti-menubar-item-${index}`}>
                  <a className="content-wrapp" href={link}>
                    {
                      <div className="noti-image">
                        <img src={logo || '/assets/img/logo-full.png'} alt="" />
                      </div>
                    }
                    <div className="noti-content">
                      <div className="noti-title">{title}</div>
                      <div className="noti-desc">{description}</div>
                    </div>
                  </a>
                </li>
              );
            })}
            <li className="noti-view-all">
              <a href="/notification">{this.t('components').menubar.RightMenu.notiView}</a>
            </li>
          </ul>
        )}
      </li>
    );
  };

  _renderAccountMenu = () => {
    const { email, fullname } = this.props.user;
    return (
      <li className="dropdown avatar-menu">
        <a
          href="#"
          onClick={event => {
            this._toggleDropdownMenu(event, 'avatar-menu');
          }}
        >
          <span className="meta">
            <span className="avatar">
              <i className="icon-jn-user-circle-o" />
            </span>
            <span className="name">{(email && email.replace(/@.*/g, '')) || fullname}</span>
          </span>
        </a>
        <ul className="dropdown-menu dropdown-menu-right">
          <li>
            <a href="/change-information">{this.t('components').menubar.RightMenu.information}</a>
          </li>
          <li>
            <a href="/change-password">{this.t('components').menubar.RightMenu.changePassword}</a>
          </li>
          <li>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this.props.signOut();
                this.props.history.replace('/');
              }}
            >
              {this.t('components').menubar.RightMenu.signOut}
            </a>
          </li>
        </ul>
      </li>
    );
  };

  _toggleDropdownMenu = (event, menu) => {
    if (event) event.preventDefault();
    const menuLi = document.querySelector(`header li.${menu}`);
    if (menuLi.classList.contains('open')) {
      menuLi.classList.remove('open');
    } else {
      menuLi.classList.add('open');
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    const { mobileMode, showMobileMenu } = this.state;

    return (
      <div className={`right-wrapper${isLoggedIn ? ' logged-in' : ''}`}>
        <ul
          className="right-menu"
          ref={r => {
            this._wrapper = r;
          }}
        >
          {mobileMode && (
            <li className="mobile-search-btn">
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  this.props.onMobileSearchClick();
                }}
              >
                <span className="icon-magnifier" />
              </a>
            </li>
          )}
          {!isLoggedIn && !mobileMode && this._renderCandidateMenu()}
          {!isLoggedIn && !mobileMode && this._renderEmployerMenu()}
          {isLoggedIn && this._renderNotificationMenu()}
          {isLoggedIn && !mobileMode && this._renderApplicationMenu()}
          {isLoggedIn && !mobileMode && this._renderAccountMenu()}
          {this._renderLanguageMenu()}
          {mobileMode &&
            !isLoggedIn && (
              <li className="candidate-mobile-menu">
                <a
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    this.props.showAuthPopup();
                  }}
                >
                  <i className="icon-jn-user-circle-o" />
                </a>
              </li>
            )}
          {mobileMode && (
            <li className="mobile-menu">
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ showMobileMenu: true });
                }}
              >
                <i className="icon-menu" />
              </a>
            </li>
          )}
        </ul>
        {mobileMode && (
          <MobileMenu
            employerMenu={this.employerMenu}
            candidateMenu={this.candidateMenu}
            applicationMenu={this.applicationMenu}
            isLoggedIn={isLoggedIn}
            show={showMobileMenu}
            onClose={() => {
              this.setState({ showMobileMenu: false });
            }}
            onSignoutClick={() => {
              this.props.signOut();
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.info,
    isLoggedIn: state.auth.isLoggedIn,
    notifications: state.notifications
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signOut, showAuthPopup, fetchNotifications, showLanguage }
  )(RightMenu)
);
