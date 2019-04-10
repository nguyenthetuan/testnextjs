import React from 'react';
import { connect } from 'react-redux';
import { Base, Popup } from '../../../components';
import { updateUserInfo } from '../../../actions/auth';
import createPage from '../../createPage';
import AccountForm from './AccountForm';
import './styles.scss';

class InformationPage extends Base {
  static wrapperClasses = 'user-information-page';

  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  render() {
    const { message } = this.state;
    return (
      <div className="user-information-container">
        <div className="header-page">
          <div className="label-text">{this.t('containers').Account.Information.index.labelText}</div>
        </div>
        <div className="body-page">
          <div className="content-wrapper">
            <AccountForm
              onSubmitDone={msg => {
                this.setState({ message: msg }, () => {
                  const { location, history } = this.props;
                  if (msg.code === 0 && location.state && location.state.redirect) {
                    history.replace(location.state.redirect);
                  }
                });
              }}
            />
          </div>
        </div>
        <Popup
          showBox
          clickOutToClose
          show={message !== null}
          onClose={() => {
            this.setState({ message: null });
          }}
        >
          {message && (
            <div className={message.code ? 'error-msg' : 'success-msg'}>{this.t(message.code ? this.t('containers').Account.Information.index.errorMsg : this.t('containers').Account.Information.index.successMsg)}</div>
          )}
        </Popup>
      </div>
    );
  }
}

export default createPage(
  connect(
    state => ({
      info: state.auth.info,
      constants: state.constants.data.users
    }),
    { updateUserInfo }
  )(InformationPage)
);
