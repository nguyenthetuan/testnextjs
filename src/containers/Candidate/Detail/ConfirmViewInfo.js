/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 14:45:04
 */
import React from 'react';
import { Base, Popup, Button } from '../../../components';
import { candidateApi } from '../../../services';

export default class ConfirmViewInfo extends Base {
  constructor(props) {
    super(props);

    this.state = { showConfirmPopup: props.show };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.showConfirmPopup) {
      this.setState({ showConfirmPopup: nextProps.show });
    }
  }

  _submitViewCandidateInfo = async () => {
    const response = await candidateApi.submitViewCandidateInfo(this.props.resumeID);
    if (response && response.result === undefined) {
      this.setState({ showConfirmPopup: false });
      if (typeof this.props.onViewInfoDone === 'function') {
        this.props.onViewInfoDone(true);
      }
    }
  };

  render() {
    const { point, pointSubtract } = this.props.viewInformation;
    return (
      <Popup show={this.state.showConfirmPopup}>
        <div className="popup-msg">
          {this.t('Xem thông tin liên hệ của ứng viên')} {this.props.name}
        </div>
        <div className="point-wrapper">
          <div className="rest-point">
            {this.t('Điểm còn lại')}: {point}
          </div>
          <div className="subtract-point">
            {this.t('Số điểm bị trừ')}: {pointSubtract > 0 && '-'}
            {pointSubtract > 0 && pointSubtract < 10 && '0'}
            {pointSubtract} {this.t('điểm')}
          </div>
        </div>
        <div className="buttons-wrapper">
          <Button
            className="jn-btn__normal cancel-btn"
            label={this.t('Trở lại')}
            onClick={() => {
              this.setState({ showConfirmPopup: false });
              if (typeof this.props.onViewInfoSuccess === 'function') {
                this.props.onViewInfoDone(false);
              }
            }}
          />
          <Button
            className="jn-btn__yellow view-btn"
            label={this.t('Xem thông tin')}
            onClick={this._submitViewCandidateInfo}
          />
        </div>
      </Popup>
    );
  }
}
