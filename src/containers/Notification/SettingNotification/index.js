import React from 'react';
import { connect } from 'react-redux';
import { Base, CheckBox } from '../../../components';

import createPage from '../../createPage';
import './styles.scss';
import { userApi } from '../../../services';

import { updateUserInfo } from '../../../actions/auth';

class SettingNotification extends Base {
  static wrapperClasses = 'notification-setting-page';

  constructor(props) {
    super(props);
    this.state = {
      isNewJobNoti: false,
      isJobDocNoti: false
    };
  }

  componentDidMount() {
    // TODO: FETCH INFO NOTIFICATION SETTING
    this.setState({ isNewJobNoti: this.props.info.notification_work || false, isJobDocNoti: this.props.info.notification_handbook || false });
  }

  _onChange = data => {
    // TODO: UPDATE INFO NOTIFICATION SETTING
    this.setState(data, async () => {
      const response = await userApi.settingNotification(this.props.info._id, { notification_work: this.state.isNewJobNoti, notification_handbook: this.state.isJobDocNoti });
      if (response && response.result) {
        this.setState({ updating: false });
        this.props.updateUserInfo(response.data.user);
      } else {
        this.setState({ updating: false });
      }
    });
  };

  render() {
    const { isNewJobNoti, isJobDocNoti } = this.state;
    console.log('mapStateToProps:', this.props.info);
    return (
      <div className="notification-setting-container">
        <div className="header-page">
          <div className="header-content">
            <span className="page-label">
              <div className="main-label">
                <div className="label-text">{this.t('Cài đặt thông báo')}</div>
              </div>
            </span>
          </div>
        </div>
        <div className="body-page">
          <CheckBox
            label="Gửi thông tin về việc làm cho tôi"
            checked={isNewJobNoti}
            onChange={value => {
              this._onChange({ isNewJobNoti: value });
            }}
          />
          <CheckBox
            label="Gửi cho tôi các thông tin về cẩm nang nghề nghiệp"
            checked={isJobDocNoti}
            onChange={value => {
              this._onChange({ isJobDocNoti: value });
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  info: state.auth.info
});
export default connect(
  mapStateToProps,
  { updateUserInfo }
)(createPage(SettingNotification));
