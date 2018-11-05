/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-17 19:20:10
 */
import React from 'react';
import { Document, Page } from 'react-pdf';
import { Base } from '../../../components';

const _$ = window.jQuery.noConflict();

export default class CVBlock extends Base {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: null
    };
  }

  _pdfLoaded = ({ numPages }) => {
    this.setState({ totalPages: numPages });
  };

  _renderPdfFile = url => {
    const pages = [1];
    if (this.state.totalPages) {
      for (let i = 2; i <= this.state.totalPages; i++) {
        pages.push(i);
      }
    }
    let width;
    if (this._wrapper) {
      width = this._wrapper.offsetWidth;
    }
    return (
      <Document file={url} onLoadSuccess={this._pdfLoaded} style={{ width: '100%' }}>
        {pages.map(pageNumber => (
          <Page pageNumber={pageNumber} key={`pdf-page-${pageNumber}`} width={width} />
        ))}
      </Document>
    );
  };

  _renderFile = () => {
    const { filecv, name } = this.props;
    if (filecv.url) {
      const { file_cv_file_name } = filecv;
      const fileType = file_cv_file_name.match(/\.([0-9a-z]+$)/i)[1];

      if (fileType === 'pdf') {
        return this._renderPdfFile(filecv.url);
      }
      return (
        <a href={filecv.url}>
          {name}
          _cv.
          {fileType}
        </a>
      );
    }

    return (
      <div className="hidden-cv-message">
        <span className="field-label">
          {this.t('Ứng viên %name có hồ sơ đình kèm đầy đủ thông tin trình độ').replace(
            '%name',
            name
          )}
          ,{' '}
        </span>
        <span className="field-value">
          {this.t('Nhà tuyển dụng vui lòng click Xem thông tin liên hệ để xem hồ sơ.')}
        </span>
      </div>
    );
  };

  render() {
    const { hasCv } = this.props;

    if (hasCv) {
      return (
        <div className="block-container other-info file-cv">
          <div className="block-header">
            <div className="title">
              <i className="icon-paper-clip" />
              {this.t('Hồ sơ đính kèm')}
            </div>
          </div>
          <div
            className="block-body"
            ref={r => {
              this._wrapper = r;
            }}
          >
            {this._renderFile()}
          </div>
        </div>
      );
    }

    return null;
  }
}
