/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-31 18:10:16
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Button } from '../../../components';
import RightCol from './RightCol';
import LeftCol from './LeftCol';
import './style.scss';

export default class Body extends Base {
  render() {
    const { info } = this.props;

    return (
      <div className="job-body-wrapper">
        <LeftCol info={info} />
        <RightCol info={info} />
      </div>
    );
  }
}
