/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-26 19:43:54
 */
import React from 'react';
import Base from '../Base';
import './style.scss';

export default class Footer extends Base {
  render() {
    return (
      <footer>
        <div className="col-wrapper">
          <div className="col">
            <div className="col-title">{this.t('components').footer.colTitle}</div>
            <div className="col-content">
              <a href="https://hr.jobnow.com.vn/info/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.support}
              </a>
              <a href="https://hr.jobnow.com.vn/info/huong-dan-dang-tin/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.employers}
              </a>
              <a href="https://hr.jobnow.com.vn/info/bao-gia-dich-vu/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.service}
              </a>
              <a href="https://hr.jobnow.com.vn/info/huong-dan-tao-ho-so/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.candidates}
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('components').footer.jobnow}</div>
            <div className="col-content">
              <a href="https://hr.jobnow.com.vn/info/gioi-thieu/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.introduce}
              </a>
              <a href="https://hr.jobnow.com.vn/info/quy-che-hoat-dong/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.operation}
              </a>
              <a href="https://hr.jobnow.com.vn/info/giai-quyet-tranh-chap/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.dispute}
              </a>
              <a href="https://hr.jobnow.com.vn/info/thoa-thuan-su-dung/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.agreement}
              </a>
              <a href="https://hr.jobnow.com.vn/info/quy-dinh-bao-mat/" target="_blank" rel="noopener noreferrer">
                {this.t('components').footer.privacyPolicy}
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('components').footer.quickContact}</div>
            <div className="col-content">
              <a href="tel:+842462627729">
                <span>
                  <img src="/assets/img/home-phone.png" alt="" />
                </span>
                02462627729
              </a>
              <a href="tel:+84986822046">
                <span>
                  <img src="/assets/img/phone.png" alt="" />
                </span>
                0986822046
              </a>
              <a href="tel:+84986953948">
                <span>
                  <img src="/assets/img/phone.png" alt="" />
                </span>
                0986953948
              </a>
              <a href="tel:+84986950621">
                <span>
                  <img src="/assets/img/phone.png" alt="" />
                </span>
                0986950621
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('components').footer.follow}</div>
            <div className="col-content socials">
              <a href="https://www.facebook.com/JobNow.com.vn/" target="_blank" rel="noopener noreferrer">
                <span className="icon-jn-facebook" />
                {this.t('components').footer.fanpage}
              </a>
              <a href="https://www.facebook.com/groups/ADTJOB/" target="_blank" rel="noopener noreferrer">
                <span className="icon-jn-facebook-official" />
                {this.t('components').footer.group}
              </a>
              <a href="https://www.youtube.com/channel/UC6sg0bre7xHqL5UyyrwzRFw" target="_blank" rel="noopener noreferrer">
                <span className="icon-jn-youtube-square" />
                {this.t('components').footer.youtube}
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('components').footer.dowload}</div>
            <a className="col-content apps" href="https://hr.jobnow.com.vn/app" target="_blank" rel="noopener noreferrer">
              <div className="qr-img">
                <img src="/assets/img/qr-code.png" alt="" />
              </div>
              <div className="app-links">
                <span>
                  <img src="/assets/img/google-play.png" alt="" />
                </span>
                <span>
                  <img src="/assets/img/app-store.png" alt="" />
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="company-info">
          <div className="name">
            <img src="/assets/img/registered-logo.jpg" alt="" />
            <h3>{this.t('components').footer.company}</h3>
          </div>
          <div className="addr-info">
            <span className="addr">{this.t('components').footer.addr}</span>
            <span className="contact">{this.t('components').footer.contact}</span>
          </div>
          <div className="company-no">{this.t('components').footer.companyNo1} &amp; {this.t('components').footer.companyNo2}</div>
          <div className="cp-right">{this.t('components').footer.cpright}</div>
        </div>
      </footer>
    );
  }
}
