/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-06 15:26:08
 */
import React from 'react';
import Base from '../Base';
import './style.scss';
import Menu from './Menu';

export default class SideBar extends Base {
  menuItems = [
    {
      link: '/dashboard',
      title: this.t('Dashboard'),
      icon: { name: 'icon-screen-desktop', bgColor: '#fc5830' }
    },
    {
      link: '/cv',
      title: this.t('Hồ sơ của tôi'),
      icon: { name: 'icon-briefcase', bgColor: '#f5a623' }
    },
    {
      link: '/suitable-jobs',
      title: this.t('Việc làm'),
      icon: { name: 'icon-people', bgColor: '' },
      children: []
    },
    {
      link: '/notification',
      title: this.t('Thông báo'),
      icon: { name: 'icon-bell', bgColor: '#400f62' }
    },
    {
      link: '/setting-notification',
      title: this.t('Cài đặt thông báo'),
      icon: { name: 'icon-notebook', bgColor: '#6450e3' }
    },

    {
      link: '#',
      title: this.t('Tài khoản'),
      icon: { name: 'icon-settings', bgColor: '#5f2393' },
      children: [
        {
          link: ['/change-information', '/'],
          title: this.t('Thông tin cá nhân')
        },
        {
          link: '/change-password',
          title: this.t('Thay đổi mật khẩu')
        }
      ]
    }
  ];

  componentDidMount() {
    this._wrapper.addEventListener('click', event => {
      const appWrapper = document.querySelector('#app_wrapper');
      if (appWrapper.classList.contains('show-mobile-sidebar') && !this._wrapper.querySelector('.sidebar-menu').contains(event.target)) {
        appWrapper.classList.remove('show-mobile-sidebar');
      }
    });
  }

  render() {
    return (
      <div
        className="sidebar-wrapper"
        ref={r => {
          this._wrapper = r;
        }}
      >
        <Menu items={this.menuItems} />
      </div>
    );
  }
}
