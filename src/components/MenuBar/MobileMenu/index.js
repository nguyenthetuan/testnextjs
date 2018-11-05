/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-09 09:35:58
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import ApiConfig from '../../../constants/server-config';
import { homeApi } from '../../../services';
import { updateLocation } from '../../../actions/auth';
import Base from '../../Base';
import Button from '../../Button';
import './style.scss';

export default class MobileMenu extends Base {
  componentDidMount() {
    const menuLinks = this._wrapper.querySelectorAll('li > a');
    Array.from(menuLinks).map(link => {
      link.addEventListener('click', this.props.onClose);
    });
  }

  render() {
    const { candidateMenu, employerMenu, applicationMenu, isLoggedIn, show } = this.props;

    return (
      <div
        className={`mobile-menu-wrapper${show ? ' open' : ''}`}
        ref={r => {
          this._wrapper = r;
        }}
      >
        <a
          href="#"
          className="close-btn"
          onClick={event => {
            event.preventDefault();
            this.props.onClose();
          }}
        >
          <span className="icon-jn-close" />
        </a>
        <ul className="mobile-menu">
          {!isLoggedIn && (
            <li className="candidate-menu">
              <div className="menu-label">{this.t('Ứng viên')}</div>
              <ul>
                {candidateMenu.map((item, index) => (
                  <li key={`mobile-menu-candidate-item-${index}`}>
                    <a href={item.link} {...item.linkAttributes}>
                      {this.t(item.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {!isLoggedIn && (
            <li className="employer-menu">
              <div className="menu-label">{this.t('Nhà tuyển dụng')}</div>
              <ul>
                {employerMenu.map((item, index) => (
                  <li key={`mobile-menu-employer-item-${index}`}>
                    <a href={item.link} {...item.linkAttributes}>
                      {this.t(item.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {isLoggedIn && (
            <li className="application-menu">
              <div className="menu-label">{this.t('Lựa chọn chức năng')}</div>
              <ul>
                {applicationMenu.map((item, index) => (
                  <li key={`mobile-menu-app-item-${index}`}>
                    <a href={item.link} {...item.linkAttributes}>
                      {this.t(item.title)}
                    </a>
                  </li>
                ))}

                <li>
                  <a href="#" onClick={this.props.onSignoutClick}>
                    {this.t('Đăng xuất')}
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
