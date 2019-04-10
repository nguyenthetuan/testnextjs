import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Base, Button, Loading } from '../../../components';
import { userApi } from '../../../services';
import createPage from '../../createPage';
import PrintPage from '../PrintPage';
import CVItem from './CVItem';
import UpdateAccountMessage from '../components/UpdateAccountMessage';
import './styles.scss';

class ListCV extends Base {
  static wrapperClasses = 'list-cv-page';

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

  state = {
    downloadingResume: null
  };

  componentDidMount() {
    window.addEventListener('afterprint', this._handlePrintingDialogClose);
    window.addEventListener('beforeprint', this._handlePrintingDialogOpen);
  }

  componentWillUnmount() {
    window.removeEventListener('afterprint', this._handlePrintingDialogClose);
    window.removeEventListener('beforeprint', this._handlePrintingDialogOpen);
  }

  _handlePrintingDialogOpen = event => {
    event.preventDefault();
  };

  _handlePrintingDialogClose = () => {
    document.body.classList.remove('printing-mode');
    this._printing = true;
    this.setState({ downloadingResume: null });
  };

  _onDownloadClick = async item => {
    const resumeData = await userApi.fetchResumeDetail(item._id);
    if (resumeData && resumeData.code === undefined) {
      if (item.type === 0) {
        document.body.classList.add('printing-mode');
        this.setState({ downloadingResume: resumeData }, () => {
          setTimeout(() => {
            if (!this._printing) {
              this._printing = true;
              window.print();
            }
          }, 1000);
        });
      } else if (item.type === 1) {
        window.open(item.filecv.url);
      }
    }
  };

  _renderCVItem = () => {
    const { cvList } = this.props;
    let content = [];
    if (cvList.length > 0) {
      cvList.map((item, idx) => {
        if (idx < 3) {
          content.push(<CVItem data={item} key={`cv-item-${idx}`} onDownload={() => this._onDownloadClick(item)} index={idx} />);
        }
      });
    } else {
      content = (
        <div className="empty-resume-wrapper">
          <div className="message">{this.t('containers').CV.ListCV.index.message}</div>
          <div className="btn-wrapper">
            <Button
              className="jn-btn__yellow"
              onClick={() => {
                this.props.history.push('/cv/create');
              }}
            >
              {this.t('containers').CV.ListCV.index.createCV}
            </Button>
          </div>
        </div>
      );
    }
    return <div className="content-wrapper">{content}</div>;
  };

  render() {
    const { userInfo, cvList } = this.props;
    const { fullname, address, level } = userInfo;
    const { downloadingResume } = this.state;

    if (!fullname || !address || !level) {
      return (
        <div className="list-cv-container required-update">
          <UpdateAccountMessage redirect="/cv" />
        </div>
      );
    }

    return (
      <div className={`list-cv-container${(cvList.length === 0 && ' required-update') || ''}`}>
        <div className="header-page">
          <div className="header-content">
            <span className="page-label">
              <div className="main-label">
                <div className="label-text">{this.t('containers').CV.ListCV.index.cv}</div>
              </div>
            </span>
            {cvList &&
              cvList.length < 3 && (
                <div className="right-button">
                  <Button
                    onClick={() => {
                      this.props.history.push('/cv/create');
                    }}
                    className="jn-btn__yellow customize"
                  >
                    <div>{this.t('containers').CV.ListCV.index.addCV}</div>
                    <div>{this.t('containers').CV.ListCV.index.maxCV}</div>
                  </Button>
                </div>
              )}
          </div>
        </div>
        {this._renderCVItem()}
        {downloadingResume && (
          <PrintPage
            data={downloadingResume}
            onAvatarLoaded={() => {
              if (!this._printing) {
                this._printing = true;
                window.print();
              }
            }}
          />
        )}
      </div>
    );
  }
}

export default withRouter(createPage(connect(state => ({ userInfo: state.auth.info, cvList: state.auth.cvList }))(ListCV)));
