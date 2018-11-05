import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { Base, ImgInput, Loading } from '../../components';
import createPage from '../createPage';
import JobListContainer from '../Jobs/JobListContainer';
import { userApi } from '../../services';
import { updateUserInfo } from '../../actions/auth';
import './styles.scss';

class Dashboard extends Base {
  static wrapperClasses = 'dashboard-page';

  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      cvList: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    userApi.getResumeList().then(res => {
      if (res) {
        this.setState({ cvList: res.resumes || [], loading: false });
      }
    });
  };

  updateImage = (data, fileKey) => {
    this.setState({ updating: true, avatar: data[fileKey] }, async () => {
      let info = Object.assign(this.props.info);
      delete info._id;
      delete info.role;
      delete info.email;
      // delete info.phone;
      delete info.notification_work;
      delete info.notification_handbook;
      info.avatar = data[fileKey];
      const response = await userApi.updateInfo(info);
      if (response && response.result) {
        this.setState({ updating: false });
        this.props.updateUserInfo(response.data.user);
      } else {
        this.setState({ updating: false });
      }
    });
  };

  renderImageOnUpload = () => {};

  handleUploadSuccess = (url, fileKey) => {
    this.setState({ avatar: url });
  };

  _handleAvatarChange = file => {};

  _renderNotiItem = () => {
    const { notifications } = this.props;

    if (!notifications || notifications.length === 0) return null;

    return notifications.data.map((item, idx) => {
      if (idx < 2) {
        return (
          <a href={item.link}>
            <p>
              <strong>{item.title}</strong>
            </p>
            <p className="noti-item">{item.description}</p>
          </a>
        );
      }
      return null;
    });
  };

  render() {
    const { cvList, loading, avatar } = this.state;
    const countCV = cvList && cvList.length > 3 ? 3 : cvList.length;
    const firstCV = cvList && cvList.length > 0 ? cvList[0] : null;
    const { info, notifications } = this.props;
    if (loading) {
      return (
        <div className="dashboard-container">
          <Loading />
        </div>
      );
    }
    if (!info) return null;

    return (
      <div className="dashboard-container">
        <div className="information-box-container">
          <div className="col-item ">
            <div className="col-item-1">
              <div className="img-info">
                <img src={avatar || info.avatar || '/assets/img/default-avatar.png'} alt="" />
                <a
                  href="#"
                  onClick={() => {
                    this.imageRef.openFileBrowser();
                  }}
                >
                  Đổi ảnh đại diện
                </a>
                {/* Hidden input */}
                <ImgInput
                  ref={c => {
                    this.imageRef = c;
                  }}
                  getImageBase64={this.updateImage}
                  onUpload={this.handleUploadSuccess}
                  onImageProgress={this.handleUploadImageLoading}
                />
              </div>
              <div className="detail-info">
                <p>
                  <strong>{info.fullname || 'NO NAME'}</strong>
                </p>
                <p>{info.phone || ''}</p>
                <p>{info.email || ''}</p>
                <p>
                  <Link to="/change-information">{this.t('Sửa thông tin')}</Link>
                </p>
                <p>
                  <Link to="/change-password">{this.t('Thay đổi mật khẩu')}</Link>
                </p>
                <p>
                  <Link to="/setting-notification">{this.t('Cài đặt thông báo')}</Link>
                </p>
              </div>
            </div>
          </div>
          {firstCV && (
            <div className="col-item col-item-2">
              <div>
                <p>
                  <Link to="/cv">
                    <strong>
                      {this.t('HỒ SƠ ĐÃ TẠO ')}({countCV})
                    </strong>
                  </Link>
                </p>
                <p>
                  <strong>
                    {this.t('Hồ sơ')}: {firstCV.title}
                  </strong>
                </p>
                <p>
                  {this.t('Ngày tạo')}: <strong>{Moment(firstCV.createdAt).format('DD/MM/YYYY')}</strong>
                </p>
                <p>
                  {this.t('Loại hồ sơ')}: <strong>{this.props.type[firstCV.type]}</strong>
                </p>

                <p>
                  {this.t('Tình trạng')}: <strong>{firstCV.status}</strong>
                </p>
                <p>
                  {this.t('Lượt xem')}: <strong>{firstCV.view_counts}</strong>
                </p>
              </div>
            </div>
          )}

          {notifications &&
            notifications.totalUnread > 0 && (
              <div className="col-item col-item-3">
                <p>
                  <Link to="/notification">
                    <strong>THÔNG BÁO ({notifications.totalUnread})</strong>
                  </Link>
                </p>
                {this._renderNotiItem()}
              </div>
            )}
        </div>
        <JobListContainer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    info: state.auth.info,
    notifications: state.notifications,
    type: (state.constants.data.resumes && state.constants.data.resumes.type) || null
  };
};
export default connect(
  mapStateToProps,
  { updateUserInfo }
)(createPage(Dashboard));
