/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-21 15:31:00
 */
import React from 'react';
import { Base, Button } from '../../../../components';
import { userApi } from '../../../../services';
import './style.scss';

export default class CVFileLoader extends Base {
  static generateFileName = alias => {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '_');
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      filecv: props.file,
      message: null
    };
  }

  _updateFilecv = async () => {
    if (!this._updating) {
      this._updating = true;
      const { selectedFile } = this.state;
      const response = await userApi.updateResume(this.props.resumeID, { filecv: selectedFile });

      if (response && response.code === undefined) {
        this.setState({ filecv: response.filecv, selectedFile: null });
      } else {
        this.setState({ message: { code: 1, message: this.t('Cập nhật filecv không thành công.') } });
      }

      this._updating = false;
    }
  };

  render() {
    const { info, listInfo } = this.props;
    const { selectedFile, filecv, message } = this.state;
    const selectedFileName = selectedFile ? selectedFile.name.match(/(.*)\.(.*)$/) : [];
    const uploadedFileExt = listInfo.filecv.file_cv_content_type.match(/.*\/(.*)$/)[1];

    console.log('dasdasd', uploadedFileExt);

    return (
      <div className="filecv-info">
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">{this.t('CV ĐÍNH KÈM')}</div>
          </div>
          {message && message.code !== 0 && <div className="error-message">* {message.message}</div>}
          <div className="block-body">
            <div className="file-preview">
              <img src="/assets/img/upload-icon.png" alt="" />
            </div>
            <div className="file-info-wrapper">
              {this.state.selectedFile ? (
                <div className="selected-file">
                  <span className="name">{selectedFileName[1]}</span>
                  <span className="extension">.{selectedFileName[2]}</span>
                </div>
              ) : (
                <a
                  className="filename"
                  href="#"
                  download={`Cv${CVFileLoader.generateFileName(info.fullname)}.${uploadedFileExt}`}
                  onClick={event => {
                    event.preventDefault();
                    window.open(filecv, '_seft');
                  }}
                >
                  {CVFileLoader.generateFileName(info.fullname)}.{uploadedFileExt}
                </a>
              )}
              <div className="change-file-wrapper">
                <Button
                  className="jn-btn__normal change-file-btn"
                  onClick={() => {
                    this.inputRef.click();
                  }}
                >
                  {this.t('Đổi file CV')}
                </Button>
                <input
                  ref={c => {
                    this.inputRef = c;
                  }}
                  type="file"
                  name="file[]"
                  id="coverInput"
                  style={{ display: 'none' }}
                  accept=".doc, .docx, .pdf, .png, .jpg, .jpeg"
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ selectedFile: e.target.files[0] });
                  }}
                />
              </div>

              {this.state.selectedFile !== null && (
                <div className="update-actions-wrapper">
                  <Button className="jn-btn__yellow" onClick={this._updateFilecv}>
                    {this.t('Lưu')}
                  </Button>
                  <Button
                    className="jn-btn__normal"
                    onClick={() => {
                      this.setState({ selectedFile: null });
                    }}
                  >
                    {this.t('Huỷ')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
