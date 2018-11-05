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
            <div className="col-title">{this.t('Chăm sóc khách hàng')}</div>
            <div className="col-content">
              <a href="https://hr.jobnow.com.vn/info/" target="_blank" rel="noopener noreferrer">
                {this.t('Trung tâm trợ giúp')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/huong-dan-dang-tin/" target="_blank" rel="noopener noreferrer">
                {this.t('Hướng dẫn nhà tuyển dụng')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/bao-gia-dich-vu/" target="_blank" rel="noopener noreferrer">
                {this.t('Báo giá dịch vụ')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/huong-dan-tao-ho-so/" target="_blank" rel="noopener noreferrer">
                {this.t('Hướng dẫn ứng viên')}
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('Về JOBNOW')}</div>
            <div className="col-content">
              <a href="https://hr.jobnow.com.vn/info/gioi-thieu/" target="_blank" rel="noopener noreferrer">
                {this.t('Giới thiệu')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/quy-che-hoat-dong/" target="_blank" rel="noopener noreferrer">
                {this.t('Quy chế hoạt động')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/giai-quyet-tranh-chap/" target="_blank" rel="noopener noreferrer">
                {this.t('Giải quyết tranh chấp')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/thoa-thuan-su-dung/" target="_blank" rel="noopener noreferrer">
                {this.t('Thoả thuận sử dụng')}
              </a>
              <a href="https://hr.jobnow.com.vn/info/quy-dinh-bao-mat/" target="_blank" rel="noopener noreferrer">
                {this.t('Quy định bảo mật')}
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('Liên hệ nhanh với JOBNOW')}</div>
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
            <div className="col-title">{this.t('Theo dõi chúng tôi trên')}</div>
            <div className="col-content socials">
              <a href="https://www.facebook.com/JobNow.com.vn/" target="_blank" rel="noopener noreferrer">
                <span className="icon-jn-facebook" />
                Facebook Fanpage
              </a>
              <a href="https://www.facebook.com/groups/ADTJOB/" target="_blank" rel="noopener noreferrer">
                <span className="icon-jn-facebook-official" />
                Facebook Group
              </a>
              <a href="https://www.youtube.com/channel/UC6sg0bre7xHqL5UyyrwzRFw" target="_blank" rel="noopener noreferrer">
                <span className="icon-jn-youtube-square" />
                Youtube
              </a>
            </div>
          </div>
          <div className="col">
            <div className="col-title">{this.t('Tải ứng dụng')}</div>
            <a className="col-content apps" href="https://hr.jobnow.com.vn/info/ung-dung-mobile/" target="_blank" rel="noopener noreferrer">
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
            <h3>Công ty cổ phần ADT Quốc Tế</h3>
          </div>
          <div className="addr-info">
            <span className="addr">Địa chỉ: Số 7, ngách 6, ngõ 121 Trần Phú, Phường Văn Quán, quận Hà Đông, TP. Hà Nội.</span>
            <span className="contact"> Email: support@jobnow.com.vn</span>
          </div>
          <div className="company-no">MST: 0107272126 do Sở Kế hoạch &amp; Đầu tư TP Hà Nội cấp lần đầu ngày 29-12-2015</div>
          <div className="cp-right">© 2018 - Bản quyền thuộc về Công ty cổ phần ADT Quốc Tế</div>
        </div>
      </footer>
    );
  }
}
