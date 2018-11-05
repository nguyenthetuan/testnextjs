/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 14:45:04
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Popup, Button, Select } from '../../../components';
import { candidateApi } from '../../../services';

class ConfirmSavedInfo extends Base {
  constructor(props) {
    super(props);
    const firstOpt = Object.keys(props.options).map(key => ({
      value: key,
      label: props.options[key]
    }))[0];

    this.state = {
      showConfirmPopup: props.show,
      status: (firstOpt && [firstOpt]) || undefined,
      message: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.showConfirmPopup) {
      const { status } = this.state;
      const newOptsLen = Object.keys(nextProps.options).length;
      const currentOptsLen = Object.keys(this.props.options).length;
      let newStatus = status;
      if (status === undefined && currentOptsLen !== newOptsLen) {
        newStatus = Object.keys(nextProps.options)
          .map(key => ({
            value: key,
            label: nextProps.options[key]
          }))
          .slice(0, 1);
      }
      this.setState({ showConfirmPopup: nextProps.show, status: newStatus });
    }
  }

  _saveCandidateInfo = async () => {
    this.setState({ showConfirmPopup: false, message: null });
    if (typeof this.props.onSavedInfoDone === 'function') {
      console.log('do saved callbacl');
      this.props.onSavedInfoDone(true);
    }
    // const status = this.state.status[0].value;
    // const response = await candidateApi.saveCandidateInfo(this.props.resumeID, status);
    // if (response && response.result === undefined) {
    //   this.setState({ showConfirmPopup: false, message: null });
    //   if (typeof this.props.onSavedInfoDone === 'function') {
    //     this.props.onSavedInfoDone(true);
    //   }
    // } else {
    //   this.setState({
    //     message: { code: 1, message: this.t('Lưu hồ sơ không thành công.') }
    //   });
    // }
  };

  render() {
    const { saved, options } = this.props;
    const selectOpts = Object.keys(options).map(key => ({ value: key, label: options[key] }));
    const { message } = this.state;
    console.log('save opts', selectOpts);

    return (
      <Popup show={this.state.showConfirmPopup} className="save-candidate-popup">
        <div className="popup-msg">{this.t('Lưu hồ sơ ứng viên')}</div>
        {saved ? (
          <div className="saved-msg">{this.t('Đã lưu hồ sơ ứng viên')}</div>
        ) : (
          <Select
            options={selectOpts}
            value={this.state.status}
            onChange={selected => {
              this.setState({ status: selected });
            }}
          />
        )}
        {message && message.code && <div className="error-message">{message.message}</div>}
        <div className="buttons-wrapper">
          <Button
            className="jn-btn__normal cancel-btn"
            label={this.t('Trở lại')}
            onClick={() => {
              this.setState({ showConfirmPopup: false, message: null });
              if (typeof this.props.onSavedInfoDone === 'function') {
                this.props.onSavedInfoDone(false);
              }
            }}
          />
          {!saved && (
            <Button
              className="jn-btn__yellow view-btn"
              label={this.t('Lưu hồ sơ')}
              onClick={this._saveCandidateInfo}
            />
          )}
        </div>
      </Popup>
    );
  }
}

export default connect(state => ({ options: state.constants.data.employer_save_profiles || {} }))(
  ConfirmSavedInfo
);
