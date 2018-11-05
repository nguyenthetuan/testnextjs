/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-11 09:27:24
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import JsPdf from 'jspdf';
import Moment from 'moment';
import { Base } from '../../../components';
import './style.scss';

const CVHeader = props => {
  const { infomation, job_need } = props.data;
  return (
    <div className="cv-header">
      <div className="candidate-info">
        <div className="candidate-name">{infomation.fullname}</div>
        <div className="job-title">{job_need.title}</div>
        <div className="contact-info">
          <div className="contact-wrapper">
            <div>
              <span className="icon-phone" />
              <span>{infomation.phone}</span>
            </div>
            <div>
              <span className="icon-envelope" />
              <span>{infomation.email}</span>
            </div>
          </div>
          <div className="address-info">
            <span className="icon-location-pin" />
            <span>{infomation.address}</span>
          </div>
        </div>
      </div>
      {infomation.avatar && (
        <div className="avatar-wrapper">
          <img src={infomation.avatar} alt="" onLoad={props.onAvatarLoaded} />
        </div>
      )}
    </div>
  );
};

const GeneralInfo = props => {
  const { infomation, job_need } = props.data;
  const { t } = props;
  return (
    <div className="cv-section general-section">
      <div className="section-label">{t('Thông tin cơ bản')}</div>
      <div className="section-content">
        <div className="col">
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Giới tính')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{props.constants.gender[infomation.gender]}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Ngày sinh')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{Moment(infomation.dateofbirth).format('DD/MM/YYYY')}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Hôn nhân')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{props.constants.marital_status[infomation.marital_status]}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Trình độ')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{props.constants.level[infomation.level]}</div>
          </div>
        </div>

        <div className="col">
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Kinh nghiệm làm việc')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{props.constants.experience[job_need.year_experience]}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Mức lương mong muốn')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{props.constants.salary[job_need.salary]}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Nơi làm việc mong muốn')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{job_need.worklocation.map(wp => wp.province).join(', ')}</div>
          </div>
          <div className="info-line">
            <div className="info-title">
              <span className="title">{t('Hình thức làm việc')}</span>
              <span>:</span>
            </div>
            <div className="info-value">{props.constants.resume_type[job_need.resume_type]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationInfo = props => {
  const { t, constants } = props;
  return (
    <div className="cv-section edu-section">
      <div className="section-label">{t('Học vấn - Chứng chỉ')}</div>
      <div className="section-content">
        {props.data.map((edu, index) => {
          return (
            <div className="time-line" key={`edu-line-${index}`}>
              <div className="main-info">
                <div className="time-title">{edu.school}</div>
                <div className="time">
                  {Moment(edu.time_start).format('MM/YYYY')} - {Moment(edu.time_end).format('MM/YYYY')}
                </div>
              </div>
              <div className="detail-info">
                <div className="major-info">
                  <div className="bold-dot" />
                  <div className="major-name">{`${t('Chuyên ngành')}: ${edu.certificate}`}</div>
                </div>
                <div className="details">
                  <div className="line">{`${t('Bằng cấp')}: ${edu.certificate}`}</div>
                  <div className="line">{`${t('Tốt nghiệp loại')} ${constants.classification[edu.classification]}`}}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExperienceInfo = props => {
  const { t, data } = props;
  return (
    <div className="cv-section edu-section">
      <div className="section-label">{t('Kinh nghiệm làm việc')}</div>
      <div className="section-content">
        {data.map((exp, index) => {
          return (
            <div className="time-line" key={`exp-line-${index}`}>
              <div className="main-info">
                <div className="time-title">{exp.company}</div>
                <div className="time">
                  {Moment(exp.time_start).format('MM/YYYY')} - {exp.current ? t('Hiện tại') : Moment(exp.time_end).format('MM/YYYY')}
                </div>
              </div>
              <div className="detail-info">
                <div className="major-info">
                  <div className="bold-dot" />
                  <div className="major-name">{exp.title}</div>
                </div>
                <div className="details" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\r?\n/g, '<br />') }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ForeignLanguagesInfo = props => {
  const { constants, t, data } = props;
  return (
    <div className="cv-section foreign-langs">
      <div className="section-label">{t('Ngoại ngữ')}</div>
      <div className="section-content">
        {data.map((lang, index) => {
          return (
            <div className="lang-line" key={`lang-item-${index}`}>
              <div className="lang-name">{t(constants.languages[lang.title])}</div>
              <div className="skills-wrapper">
                <div className="skill-item">
                  <div className="skill-title">{t('Nghe')}</div>
                  <div className="skill-level">
                    <div className="skill-level-value" style={{ width: `${100 / lang.listen}%` }} />
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-title">{t('Đọc')}</div>
                  <div className="skill-level">
                    <div className="skill-level-value" style={{ width: `${100 / lang.read}%` }} />
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-title">{t('Nói')}</div>
                  <div className="skill-level">
                    <div className="skill-level-value" style={{ width: `${100 / lang.talk}%` }} />
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-title">{t('Viết')}</div>
                  <div className="skill-level">
                    <div className="skill-level-value" style={{ width: `${100 / lang.write}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExtraInfo = props => {
  return (
    <div className="cv-section extra-info">
      <div className="section-label">{props.label}</div>
      <div className="section-content">{props.children}</div>
    </div>
  );
};

class PrintPage extends Base {
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

  componentDidMount() {
    // this._saveCV('annhien');
    const { data, onAvatarLoaded } = this.props;
    if (typeof onAvatarLoaded === 'function' && data && data.info && data.info.infomation && !data.info.infomation.avatar) {
      onAvatarLoaded();
    }
  }

  _saveCV = name => {
    window.html2canvas(this._wrapper, { width: 787, scale: 1, proxy: 'https://jobby.vn/api/pdfImage' }).then(canvas => {
      const pdf = new JsPdf('p', 'pt', 'a4');
      for (let i = 0; i < Math.round(canvas.height / 1120); i++) {
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

      // create pdf file with canidate name
      pdf.save(`${PrintPage.generateFileName(this.props.data.info.infomation.fullname)}.pdf`);
    });
  };

  _generateReferencerInfo = () => {
    const { name, title, company, phone, email } = this.props.data.referenced;
    return `${name}<br />${title}<br/>${company}<br />${this.t('Điện thoại')}: ${phone}<br />${this.t('Email')}: ${email}`;
  };

  _renderResumeContent() {
    const { education, info, language, skills, referenced, work_experience } = this.props.data;

    return (
      <div
        className="print-page-wrapper"
        ref={r => {
          this._wrapper = r;
        }}
      >
        <div className="cv-wrapper">
          <CVHeader data={info} constants={this.props.constants} t={this.t} onAvatarLoaded={this.props.onAvatarLoaded} />
          <GeneralInfo data={info} constants={this.props.constants} t={this.t} />
          <EducationInfo data={education} constants={this.props.constants} t={this.t} />
          <ExperienceInfo data={work_experience} constants={this.props.constants} t={this.t} />
          {language.length > 0 && <ForeignLanguagesInfo data={language} constants={this.props.constants} t={this.t} />}
          {skills.length > 0 && (
            <ExtraInfo label={this.t('Kỹ năng')}>
              <div className="skills-info" dangerouslySetInnerHTML={{ __html: skills.map(skill => `- ${skill.title}<br />`).join(' ') }} />
            </ExtraInfo>
          )}
          {Object.keys(referenced).length > 0 && (
            <ExtraInfo label={this.t('Người tham chiếu')}>
              <div className="referenced-info" dangerouslySetInnerHTML={{ __html: this._generateReferencerInfo() }} />
            </ExtraInfo>
          )}
        </div>
        <div className="cp-right">© jobnow.com.vn</div>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(this._renderResumeContent(), document.body);
  }
}

export default connect(state => ({ constants: state.constants.data.resumes }))(PrintPage);
