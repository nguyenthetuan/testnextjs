/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-29 22:25:09
 */
import React from 'react';
import './style.scss';

export default class Loading extends React.PureComponent {
  render() {
    const { className } = this.props;
    const wrapperClasses = ['jn-loading sk-circle'];
    if (className) wrapperClasses.push(className);
    return (
      <div className={wrapperClasses.join(' ')}>
        <div className="sk-circle1 sk-child" />
        <div className="sk-circle2 sk-child" />
        <div className="sk-circle3 sk-child" />
        <div className="sk-circle4 sk-child" />
        <div className="sk-circle5 sk-child" />
        <div className="sk-circle6 sk-child" />
        <div className="sk-circle7 sk-child" />
        <div className="sk-circle8 sk-child" />
        <div className="sk-circle9 sk-child" />
        <div className="sk-circle10 sk-child" />
        <div className="sk-circle11 sk-child" />
        <div className="sk-circle12 sk-child" />
      </div>
    );
  }
}
