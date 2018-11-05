/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-23 15:11:53
 */
import React from 'react';
import Base from '../Base';
import './style.scss';

export default class FileUploader extends Base {
  constructor(props) {
    super(props);
    this.state = {
      dragOver: false
    };
  }

  componentDidMount() {
    this._wrapper.addEventListener('drop', this._handleDrop);
    this._wrapper.addEventListener('dragover', this._handleDragOver);
    this._wrapper.addEventListener('dragleave', this._handleDragLeave);
  }

  componentWillUnmount() {
    this._wrapper.removeEventListener('drop', this._handleDrop);
    this._wrapper.removeEventListener('dragover', this._handleDragOver);
    this._wrapper.removeEventListener('dragleave', this._handleDragLeave);
  }

  _handleDragLeave = event => {
    event.preventDefault();
    this.setState({
      dragOver: false
    });
  };

  _handleDrop = event => {
    event.preventDefault();
    if (event.dataTransfer.items.length) {
      const droppedItem = event.dataTransfer.items[0];
      if (droppedItem.kind === 'file') {
        const fileType = droppedItem.type.split('/').pop();
        const { accept } = this.props;
        if (!accept || accept.indexOf(fileType) > -1) {
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(droppedItem.getAsFile());
          }
        }
      }
    }
  };

  _handleDragOver = event => {
    event.preventDefault();
    this.setState({
      dragOver: true
    });
  };

  _handleFileSelected = event => {
    if (typeof this.props.onChange === 'function') {
      const file = event.target.files[0];
      this.props.onChange(file);
    }
  };

  render() {
    const { annotation, label, accept } = this.props;
    const { dragOver } = this.state;
    return (
      <div
        className={['jn-file-uploader', dragOver ? 'drag-over' : ''].join(' ')}
        ref={r => {
          this._wrapper = r;
        }}
      >
        <label>
          <div className="placeholder-wrapper">
            <div className="icon-wrapper">
              <img src="/assets/img/upload-icon.png" alt="" />
            </div>
            {label && <div className="text">{label}</div>}
            {annotation && <div className="annotation">{annotation}</div>}
          </div>
          <input type="file" accept={accept} onChange={this._handleFileSelected} />
        </label>
      </div>
    );
  }
}
