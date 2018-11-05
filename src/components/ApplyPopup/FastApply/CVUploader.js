/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-02 14:21:20
 */
import React from 'react';
import Base from '../../Base';

export default class CVUploader extends Base {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      showError: false
    };
  }

  checkValue = () => {
    const { selectedFile, showError } = this.state;
    if (selectedFile === null) {
      if (!showError) {
        this.setState({ showError: true });
      }
      return false;
    }
    return true;
  };

  _handleFileSelected = event => {
    if (event.target.files.length) {
      this.setState({ selectedFile: event.target.files[0], showError: false }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedFile);
        }
      });
    }
  };

  render() {
    const { selectedFile } = this.state;
    const filename = (selectedFile && selectedFile.name) || '';
    const matches = (filename && /(.*)\.(doc|docx|pdf)$/g.exec(filename)) || null;

    return (
      <div className="cv-upload-wrapper">
        <div className="field-wrapper">
          <div className="label">
            <span className="text">{this.t('Đình kèm file CV')}</span>
            <span className="required">*</span>
          </div>
          <div className={`upload-wrapper${matches ? ' selected-file' : ''}`}>
            <label>
              {matches ? (
                <div className="filename-wrapper">
                  <div className="file-name">{matches[1]}</div>
                  <div className="file-extension">{matches[2]}</div>
                </div>
              ) : (
                this.t('Chọn file CV')
              )}
              <input type="file" accept=".doc, .docx, .pdf" onChange={this._handleFileSelected} />
            </label>
          </div>
        </div>
        {this.state.showError && (
          <div className="help-block" style={{ display: 'block' }}>
            {this.t('Chọn file CV để gửi tới nhà tuyển dụng.')}
          </div>
        )}
      </div>
    );
  }
}
