/*
 * @Author: CuongHx 
 * @Date: 2018-07-08 17:43:28 
 * @Last Modified by: 
 * @Last Modified time: 2018-09-11 23:44:48
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  NotFoundPage,
  HomePage,
  JobsTypePage,
  JobPage,
  JobDetailPage,
  NotificationPage,
  SettingNotification,
  ChangePassPage,
  InformationPage,
  DashboardPage,
  CVPage,
  EditCVPage,
  SearchPage,
  PrintPage,
  CreateCVPage,
  ZaloRedirectPage
} from '../containers';

export default {
  notfound: { path: '/404', component: NotFoundPage },
  homePage: {
    path: '/',
    component: HomePage,
    exact: true,
    title: 'Trang chủ'
  },
  jobsType: {
    path: '/jobs/:type',
    component: JobsTypePage,
    title: 'Việc làm'
  },
  jobDetail: {
    path: '/job/:id',
    component: JobDetailPage,
    exact: true
  },
  jobs: {
    title: 'Việc làm phù hợp',
    path: '/suitable-jobs',
    component: JobPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },
  notification: {
    title: 'Thông báo',
    path: '/notification',
    component: NotificationPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },

  settingNoti: {
    title: 'Cài đặt thông báo',
    path: '/setting-notification',
    component: SettingNotification,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },

  accountInfo: {
    title: 'Thông tin cá nhân',
    path: '/change-information',
    component: InformationPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },

  changePassword: {
    title: 'Thay đổi mật khẩu',
    path: '/change-password',
    component: ChangePassPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },

  dashboard: {
    title: 'Dashboard',
    path: '/dashboard',
    component: DashboardPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },
  createCV: {
    title: 'Hồ sơ của tôi',
    path: '/cv/create',
    component: CreateCVPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },
  listCV: {
    title: 'Hồ sơ của tôi',
    path: '/cv',
    component: CVPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },
  editCV: {
    title: 'Sửa hồ sơ',
    path: '/cv/edit/:id',
    component: EditCVPage,
    exact: true,
    showSidebar: true,
    requiredAuth: true
  },
  forgotPassword: {
    title: 'Quên mật khẩu',
    path: '/forgot_password',
    component: HomePage,
    exact: true
  },
  search: {
    title: 'Tìm kiếm công việc',
    path: '/search',
    component: SearchPage,
    exact: true
  },
  printCVPage: {
    title: 'Tìm kiếm công việc',
    path: '/print',
    component: PrintPage,
    exact: true
  },
  zaloRedirect: {
    path: '/zalo-redirect',
    component: ZaloRedirectPage,
    exact: true
  },
  others: { component: () => <Redirect to="/404" /> }
};
