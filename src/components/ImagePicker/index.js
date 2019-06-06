/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-21 23:18:05
 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Base from '../Base';
import './style.scss';

const readFile = file => {
  return new Promise((resolve, reject) => {
    try {
      const fRead = new FileReader();
      fRead.onload = event => {
        resolve(fRead.result);
      };

      fRead.readAsDataURL(file);
    } catch (error) {
      reject();
    }
  });
};

export default class ImagePicker extends Base {
  static numberID = 0;

  static propsType = {
    multiple: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    images: PropTypes.array
  };

  static defaultProps = {
    multiple: false,
    images: []
  };

  constructor(props) {
    ImagePicker.numberID++;
    super(props);
    this.state = {
      selectedFiles: props.images || []
    };

    this._id = ImagePicker.numberID;
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.images, this.state.selectedFiles)) {
      this.setState({ selectedFiles: nextProps.images });
    }
  }

  _onChange = event => {
    const files = Array.from(event.target.files);

    Promise.all(files.map(file => readFile(file))).then(values => {
      let selectedFiles = files.map((file, index) => {
        file.data = values[index];

        return file;
      });

      this.setState(
        {
          selectedFiles
        },
        () => {
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.selectedFiles);
          }
        }
      );
    });
  };

  _removeImage = (event, index) => {
    event.preventDefault();
    const { selectedFiles } = this.state;
    this.setState(
      {
        selectedFiles: [...selectedFiles.slice(0, index), ...selectedFiles.slice(index + 1)]
      },
      () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedFiles);
        }
      }
    );
  };

  _renderFiles = () => {
    const { selectedFiles } = this.state;

    if (selectedFiles.length === 0 || this.props.multiple) {
      return (
        <div className="placeholder">
          <img src="/assets/img/add-file.png" alt="" />
          <div className="text">{this.props.placeholder}</div>
          <div className="annotation">{this.t('components').imgpicker.annotation}</div>
        </div>
      );
    }

    return (
      <div className="selected-files-wrapper">
        {selectedFiles.map((file, index) => {
          return file ? (
            <div className="selected-file" key={`selected-img-${this._id}-${index}`}>
              <div className="img-wrap">
                <img src={file.url || file.data} alt="" />
              </div>

              {this.props.multiple && (
                <a href="#" onClick={event => this._removeImage(event, index)}>
                  <i className="icon-close" />
                </a>
              )}
            </div>
          ) : null;
        })}
        {this.props.multiple && (
          <div className="placeholder">
            <img src="/assets/img/add-file.png" alt="" />
            <div className="text">{this.props.placeholder}</div>
            <div className="annotation">{this.t('components').imgpicker.annotation}</div>
          </div>
        )}
      </div>
    );
  };

  _updateSelectedFile = (event, index) => {
    const file = event.target.files[0];
    readFile(file).then(fileData => {
      file.data = fileData;
      const { selectedFiles } = this.state;
      const newSelectedFiles = [
        ...selectedFiles.slice(0, index),
        file,
        ...selectedFiles.slice(index + 1)
      ];

      this.setState(
        {
          selectedFiles: newSelectedFiles
        },
        () => {
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.selectedFiles);
          }
        }
      );
    });
  };

  _renderSelectedFilesMultiple = () => {
    const { selectedFiles } = this.state;
    if (!this.props.multiple || selectedFiles.length === 0) {
      return null;
    }

    return (
      <div className="selected-files-wrapper">
        {selectedFiles.map((file, index) => {
          return file ? (
            <label key={`selected-img-${this._id}-${index}`}>
              <div className="selected-file">
                <div className="img-wrap">
                  <img src={file.url || file.data} alt="" />
                </div>

                {this.props.multiple && (
                  <a href="#" onClick={event => this._removeImage(event, index)}>
                    <i className="icon-close" />
                  </a>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={event => this._updateSelectedFile(event, index)}
              />
            </label>
          ) : null;
        })}
      </div>
    );
  };

  render() {
    return (
      <div
        className={['jn-image-picker', this.props.multiple ? 'multi-select' : 'single-select'].join(
          ' '
        )}
      >
        <div className="field-label">{this.props.label}</div>
        {this._renderSelectedFilesMultiple()}
        <label>
          <div className="picker-wrapper">{this._renderFiles()}</div>
          <input
            type="file"
            accept="image/*"
            multiple={this.props.multiple}
            onChange={this._onChange}
          />
        </label>
      </div>
    );
  }
}
