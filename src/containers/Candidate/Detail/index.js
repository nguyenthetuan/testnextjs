/*
 * File: Candidate/Detail
 * Desc: show detail info of candidate
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-15 22:39:40
 */

import React from 'react';
import { connect } from 'react-redux';
import JsPdf from 'jspdf';

import { Base, Button } from '../../../components';
import createPage from '../../createPage';
import { candidateApi } from '../../../services';
import ConfirmViewInfo from './ConfirmViewInfo';
import ConfirmSavedInfo from './ConfirmSavedInfo';
import {
  CVBlock,
  EducationInfoBlock,
  ExperienceBlock,
  GeneralInfoBlock,
  MainInfoBlock,
  SkillBlock
} from '../components';
import './style.scss';

class CandidateDetailPage extends Base {
  static wrapperClasses = 'candidate-page';

  constructor(props) {
    super(props);
    const { state } = props.location;
    const info = (state && state.info) || null;
    this.state = {
      info,
      message: null,
      loading: info === null,
      showConfirmPopup: false,
      showSavedPopup: false
    };
  }

  componentDidMount() {
    if (this.state.info === null) {
      this._fetchCandidateInfo();
    }
    window.addEventListener('afterprint', this._handlePrintingDialogClose);
    window.addEventListener('beforeprint', this._handlePrintingDialogOpen);
  }

  componentWillUnmount() {
    window.removeEventListener('afterprint', this._handlePrintingDialogClose);
    window.removeEventListener('beforeprint', this._handlePrintingDialogOpen);
  }

  _handlePrintingDialogOpen = event => {
    if (!this.state.printingMode) {
      event.preventDefault();
      this._printCv();
    }
  };

  _handlePrintingDialogClose = () => {
    this.setState({ printingMode: false });
  };

  _fetchCandidateInfo = async () => {
    const { match, location } = this.props;
    if (match.params && match.params.id) {
      const response = await candidateApi.fetchCandidateInfo(
        match.params.id,
        location.search && location.search.indexOf('ja_candidate=true') > -1
      );
      if (!response.code) {
        const { job_application, resume } = response;
        this.setState({
          loading: false,
          info: resume || job_application,
          message: null
        });
      } else {
        this.setState({
          loading: false,
          info: null,
          message: {
            code: response.code
          }
        });
      }
    }
  };

  _renderPrintingHeader = () => {
    const { printingMode } = this.state;
    if (printingMode) {
      return (
        <div className="printing-header-wrapper">
          <div className="logo-wrapper">
            <img src="/assets/img/printing-logo.png" alt="" />
          </div>
          <div className="contact-info">{this.t('Hotline hỗ trợ nhà tuyển dụng')}: 0986822046</div>
        </div>
      );
    }

    return null;
  };

  _downloadCV = () => {
    document.body.style = 'width: 1190px; margin: 0 auto';
    window.html2canvas(this._wrapper, { width: 1190, scale: 778 / 1190 }).then(canvas => {
      const pdf = new JsPdf('p', 'pt', 'a4');
      for (let i = 0; i <= canvas.height / 980; i++) {
        const srcImg = canvas;
        const sX = 0;
        const sY = 1120 * i;
        const sWidth = 778;
        const sHeight = 1120;
        const dX = 0;
        const dY = 0;
        const dWidth = 778;
        const dHeight = 1120;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.setAttribute('width', 778);
        pageCanvas.setAttribute('height', 1120);

        let ctx = pageCanvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        let canvasDataURL = pageCanvas.toDataURL('image/png', 1.0);
        let width = pageCanvas.width;
        let height = pageCanvas.clientHeight;

        // add another page
        if (i > 0) {
          pdf.addPage(595, 842);
        }
        pdf.setPage(i + 1);
        pdf.addImage(canvasDataURL, 'PNG', 15, 10, width * 0.72, height * 0.72);
      }

      pdf.save('Test3.pdf');
    });
  };

  _printCv = () => {
    this.setState({ printingMode: true }, () => {
      setTimeout(() => {
        window.print();
      }, 300);
    });
  };

  render() {
    const { info, loading, printingMode } = this.state;
    if (loading) {
      return <div className="loading-container">Loading...</div>;
    }

    if (!info) {
      return (
        <div className="candidate-not-found">
          {this.t('Ứng viên không tồn tại hoặc đã xoá khỏi hệ thống.')}
        </div>
      );
    }
    const {
      work_experience,
      worklocation,
      view_information,
      name,
      _id,
      education,
      have_filecv,
      skills,
      employer_save_profile,
      filecv, // fast applied candidates
      fullname // fast applied candidates
    } = info;
    const showCvBlock = (have_filecv && view_information.filecv) || filecv;

    if (printingMode) {
      document.body.classList.add('printing-mode');
    } else {
      document.body.classList.remove('printing-mode');
    }

    return (
      <div
        className="page-container"
        ref={r => {
          this._wrapper = r;
        }}
      >
        {this._renderPrintingHeader()}
        {employer_save_profile !== undefined && (
          <ConfirmViewInfo
            viewInformation={view_information}
            name={name}
            resumeID={_id}
            show={this.state.showConfirmPopup}
            onViewInfoDone={result => {
              if (result) {
                this._fetchCandidateInfo();
              }
              this.setState({ showConfirmPopup: false });
            }}
          />
        )}
        {employer_save_profile !== undefined && (
          <ConfirmSavedInfo
            resumeID={_id}
            show={true || this.state.showSavedPopup}
            saved={employer_save_profile.saved}
            onSavedInfoDone={result => {
              if (result) {
                this._fetchCandidateInfo();
              }
              this.setState({ showSavedPopup: false });
            }}
          />
        )}
        <MainInfoBlock
          info={this.state.info}
          showViewInfoConfirm={() => {
            this.setState({ showConfirmPopup: true });
          }}
        />
        <div className="actions-wrapper">
          {fullname === undefined && (
            <Button
              onClick={() => this.setState({ showSavedPopup: true })}
              className="jn-btn__normal"
            >
              <i className="icon-heart" />
              {this.t('Lưu hồ sơ')}
            </Button>
          )}
          <Button onClick={this._printCv} className="jn-btn__normal">
            <i className="icon-jn-print" />
            {this.t('In hồ sơ')}
          </Button>
        </div>
        {worklocation && (
          <GeneralInfoBlock info={this.state.info} constants={this.props.constants} />
        )}
        {work_experience && <ExperienceBlock experiences={work_experience} />}
        {education && <EducationInfoBlock educations={education} />}
        {skills && <SkillBlock skills={skills} />}
        {showCvBlock && (
          <CVBlock
            hasCv={have_filecv}
            filecv={filecv || view_information.filecv}
            name={fullname || name}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    constants: state.constants.data.resumes || {}
  };
};

export default createPage(connect(mapStateToProps)(CandidateDetailPage));
