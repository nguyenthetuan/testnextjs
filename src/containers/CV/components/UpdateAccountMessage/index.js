/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-23 22:46:38
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Base, Button } from '../../../../components';
import './style.scss';

class UpdateAccountMessage extends Base {
  render() {
    return (
      <div className="update-message-wrapper">
        <div className="message">{this.t('containers').CV.components.UpdateAccountMessage.messageUpdate}</div>
        <div className="button-wrapper">
          <Button
            className="jn-btn__yellow"
            onClick={() => {
              const { redirect } = this.props;
              this.props.history.replace('/change-information', { redirect });
            }}
          >
            {this.t('containers').CV.components.UpdateAccountMessage.changeInformation}
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateAccountMessage);
