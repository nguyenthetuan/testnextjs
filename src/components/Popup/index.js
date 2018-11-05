/*
 * File: Popup/index.js
 * Desc: generate popup component
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-22 11:43:41
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';
import './style.scss';
import Loading from '../Loading';

export default class Popup extends Base {
  static propsType = {
    title: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    footer: PropTypes.Component || PropTypes.func,
    clickOutToClose: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show || false,
      showBox: props.showBox || false
    };
  }

  componentDidMount() {
    if (this.props.clickOutToClose) {
      document.addEventListener('click', this._handleDocumentClick);
    }
  }

  componentWillUnmount() {
    if (this.props.clickOutToClose) {
      document.removeEventListener('click', this._handleDocumentClick);
    }
  }

  componentWillReceiveProps(nextProps) {
    let isMatched = false;
    if (this.state.show !== nextProps.show) {
      isMatched = true;
    }
    if (isMatched || this.state.showBox !== nextProps.showBox) {
      const newState = Object.assign({}, { show: nextProps.show, showBox: nextProps.showBox });
      this.setState(newState);
    }
  }

  close = event => {
    if (event) event.preventDefault();
    this.setState({ show: false, showBox: false });
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  };

  _handleDocumentClick = event => {
    let clickedToToggle = false;
    this._toggleBtn = [];
    let selectors = (this.props.toggleButton || '').split(',');
    selectors.map(selector => {
      if (selector.trim()) {
        const nodes = Array.from(document.querySelectorAll(selector.trim()));
        this._toggleBtn = [...this._toggleBtn, ...nodes];
      }
    });
    (this._toggleBtn || []).map(btn => {
      if (btn.contains(event.target)) clickedToToggle = true;
    });

    if (this.state.show && !this._modalWrapper.contains(event.target) && (!this._toggleBtn || !clickedToToggle)) {
      setTimeout(() => {
        this.close();
      }, 0);
    }
  };

  render() {
    const { title, footer, customStyle, className, showLoading } = this.props;
    if (this.state.show) {
      document.body.classList.add('popup-show');
    } else {
      document.body.classList.remove('popup-show');
    }
    return (
      <div
        className={['popup-wrapper', className, this.state.showBox ? 'show-lightbox' : ''].join(' ')}
        style={{ display: this.state.show ? 'block' : 'none' }}
        ref={r => {
          this._wrapper = r;
        }}
      >
        <div className={this.state.showBox ? 'light-box' : ''} />
        <div className="modal fade in" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document" style={customStyle}>
            <div
              className="modal-content"
              ref={r => {
                this._modalWrapper = r;
              }}
            >
              {title && (
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel-2">
                    {this.t(title)}
                  </h4>
                  <ul className="card-actions icons right-top">
                    <li>
                      <a href="#" data-dismiss="modal" className="text-white" aria-label="Close" onClick={this.close}>
                        <i className="zmdi zmdi-close" />
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              <div className="modal-body">{this.props.children}</div>
              {footer && <div className="modal-footer">{typeof footer === 'function' ? footer() : footer}</div>}
            </div>
            {showLoading && (
              <div className="loading-wrapper">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
