/*
 * File: undefined
 * Desc:
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-26 22:54:55
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Slider from 'react-slick';
import { showAuthPopup } from '../../../actions/auth';
import { Base } from '../../../components';
import './style.scss';

const _$ = window.jQuery;

class TopBlock extends Base {
  _handleCreateCVClick = event => {
    if (!this.props.isLoggedIn) {
      event.preventDefault();
      this.props.showAuthPopup('login', { redirect: '/cv/create' });
    }
  };

  render() {
    const { events, isLoggedIn } = this.props;
    const responsive = [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 800,
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
    ];

    const settings = {
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1,
      autoplay: true,
      // responsive,
      centerMode: true,
      variableWidth: true,
      centerPadding: 0,
      dots: true,
      afterChange: () => {
        _$('.banner-wrapper .slick-active').removeClass('last-active');
        _$('.banner-wrapper .slick-active')
          .last()
          .addClass('last-active');
      }
    };

    return (
      <div className={`home-top-block${isLoggedIn ? ' loggedin' : ''}`}>
        {/* <div className="actions-menu block-wrapper">
          <div className="items-wrapper">
            <a href="/">{this.t('Cẩm nang nghề nghiệp')}</a>
            <a href="/cv/create" onClick={this._handleCreateCVClick} className="make-cv">
              {this.t('Tạo CV ')}
            </a>
            <a href="/">{this.t('Nhận thông báo việc làm')}</a>
            {!isLoggedIn && (
              <a
                className="register-toggle"
                href="#"
                onClick={event => {
                  event.preventDefault();
                  this.props.showAuthPopup('register'); // show register form
                }}
              >
                {this.t('Đăng ký tài khoản')}
              </a>
            )}
          </div>
        </div> */}
        <div className="block-wrapper main-block">
          {_.isArray(events) && (
            <div className="banner-wrapper">
              <Slider {...settings}>
                {events.map((event, index) => (
                  <div className="banner-img-wrapper" key={`event-banner-${index}`}>
                    <a href={event.link} className="banner-img" target="_blank" rel="noopener noreferrer">
                      <img src={event.image} alt="" onLoad={this._onImgLoad} />
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {/* <div className="job-types">
            <div className="col cat-jobs">
              <a className="item-wrapper" href="/viec-lam/tim-viec-lam" title={this.t('Việc làm theo ngành nghề')}>
                <div className="icon-wrapper">
                  <i className="icon-briefcase" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.job}</div>
              </a>
            </div>
            <div className="col loc-jobs">
              <a className="item-wrapper" href="/viec-lam/tim-viec-lam-theo-dia-diem" title={this.t('Việc làm theo địa điểm')}>
                <div className="icon-wrapper">
                  <i className="icon-location-pin" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.address}</div>
              </a>
            </div>
            <div className="col nearest-jobs">
              <a className="item-wrapper" href="/viec-lam/tim-viec-gan-nha">
                <div className="icon-wrapper">
                  <i className="icon-map" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.nearJob}</div>
              </a>
            </div>
            <div className="col hot-jobs">
              <a className="item-wrapper" href="/viec-lam/viec-lam-hap-dan">
                <div className="icon-wrapper">
                  <i className="icon-fire" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.hotJob}</div>
              </a>
            </div>
            <div className="col fast-jobs">
              <a className="item-wrapper" href="/viec-lam/viec-lam-tuyen-gap" title={this.t('Việc làm tuyển gấp')}>
                <div className="icon-wrapper">
                  <i className="icon-rocket" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.fastJob}</div>
              </a>
            </div>
            <div className="col new-jobs">
              <a className="item-wrapper" href="/viec-lam/viec-lam-moi-nhat">
                <div className="icon-wrapper">
                  <i className="icon-tag" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.newJob}</div>
              </a>
            </div>
            <div className="col note-job">
              <div className="item-wrapper">
                <div className="icon-wrapper">
                  <i className="icon-compass" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.noteJob}</div>
              </div>
            </div>
            <div className="col video-job">
              <div className="item-wrapper">
                <div className="icon-wrapper">
                  <i className="icon-social-youtube" />
                </div>
                <div className="title">{this.t('containers').Home.TopBlock.videoJob}</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  }),
  { showAuthPopup }
)(TopBlock);
