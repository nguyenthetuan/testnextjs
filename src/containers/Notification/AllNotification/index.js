import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Base, Button } from '../../../components';
import List from '../../Candidate/components/List';
import createPage from '../../createPage';
import { markReadNotifications, markReadAllNotification, fetchNotifications } from '../../../actions/notification';

import './styles.scss';

class AllNotification extends Base {
  static wrapperClasses = 'notification-list-page';

  constructor(props) {
    super(props);
    this.state = {
      data: props.notifications || [],
      page: 1
    };
  }

  markAllAsRead = () => {
    this.props.markReadAllNotification(this.props.notifications);
  };

  markAsRead = (item, idx) => {
    if (!item.read) {
      this.props.markReadNotifications(item, idx, this.props.notifications);
    }
    this.props.history.push(item.link);
  };

  _changeState = state => {
    this.setState(state, () => {
      this.props.fetchNotifications(`page=${this.state.page}`);
    });
  };

  _renderNotificationItem = (item, idx) => {
    // console.log('item:::, ite', item);
    const { logo, title, description, read } = item;
    return (
      <div className="job-suitable-item">
        <div className="col col-avatar">
          <img src={logo || '/assets/img/logo-full.png'} alt="" />
        </div>

        <div className="col col-title">
          <div className="title">{title}</div>
          <div>{description}</div>
        </div>

        <div className="col col-status">
          <Button onClick={() => this.markAsRead(item, idx)} label={this.t('containers').Notification.AllNotification.view} className={`jn-btn__yellow jn-detail${!read ? '' : ' read'} `} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="notification-list-container">
        <div className="header-page">
          <div className="header-content">
            <span className="page-label">
              <div className="main-label">
                <div className="label-text">{this.t('containers').Notification.AllNotification.notification}</div>
              </div>
            </span>
            <div className="right-button">
              <Button onClick={this.markAllAsRead} label={this.t('containers').Notification.AllNotification.markAll} className="jn-btn__normal" />
            </div>
          </div>
        </div>
        <div className="body-page">
          <List
            totalEntries={this.props.totalEntries}
            pageSize={20}
            page={this.state.page}
            onPageChange={page => this._changeState({ page })}
            data={this.props.data}
            renderItem={(item, idx) => this._renderNotificationItem(item, idx)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.notifications.data || [],
    notifications: state.notifications,
    totalEntries: state.notifications.totalEntries || 0,
    totalUnread: state.notifications.totalEntries || 0
  };
};

export default createPage(
  connect(
    mapStateToProps,
    { markReadNotifications, markReadAllNotification, fetchNotifications }
  )(withRouter(AllNotification))
);
