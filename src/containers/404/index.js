/*
 * File: containers/404
 * Desc: generate page not found
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-06 16:00:19
 */
import React from 'react';
import { Base } from '../../components';
import './style.scss';

export default class NotFoundPage extends Base {
  static wrapperClasses = 'page-404';

  render() {
    return (
      <div className="page-404-wrapper">
        <div className="content-wrapper">
          <div className="logo-wrapper">
            <img src="/assets/img/logo-full.png" alt="" />
          </div>
          <div className="message-wrapper">
            <h2>{this.t('404 ! Oops...')}</h2>
            <div className="message">{this.t('Rất tiếc trang này không tồn tại.')}</div>
            <div className="home-link">
              <a href="/">{this.t('Quay lại trang chủ')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
