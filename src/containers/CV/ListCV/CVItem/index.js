import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { withRouter } from 'react-router-dom';
import { userApi, authApi } from '../../../../services';
import { deleteResumeSuccess, changeResumeSearchingStatus } from '../../../../actions/auth';
import { CheckBox, Button, Base, Popup } from '../../../../components';
import './style.scss';

class CVItem extends Base {
  constructor(props) {
    super(props);
    this.state = {
      allow: false,
      showDeletePopup: false,
      refreshMessage: null,
      isCruitmentDay: false,
    };
    this._deleting = false;
  }

  _deleteResume = async () => {
    if (!this._deleting) {
      this._deleting = true;
      const { _id } = this.props.data || {};
      const response = await userApi.deleteResume(_id);

      if (response && response.result) {
        this.setState({ showDeletePopup: false }, () => {
          this.props.deleteResumeSuccess(this.props.index);
        });
      } else {
        this.setState({ message: { code: 1, message: this.t('Xoá hồ sơ không thành công.') } });
      }
      this._deleting = false;
    }
  };

  _refreshResume = async id => {
    const response = await authApi.refreshResume(id);
    if (response && response.result) {
      this.setState({ refreshMessage: { code: 0, message: 'Hồ sơ của bạn vừa được làm mới.' } }, () => {
        setTimeout(() => {
          this.setState({ refreshMessage: null });
        }, 5000);
      });
    } else {
      this.setState({ showDeletePopup: true, refreshMessage: { code: 0, message: 'Hồ sơ của bạn vừa được làm mới không thành công.' } });
    }
  };

  _recruitmentResumes = async(checked, id) => {
    const formData = new FormData();
    formData.append('resume', id);
    if (checked) {
      const res = await authApi.recruitmentResumes(formData);
      if (res && res.result === true) {
        this.setState({ isCruitmentDay: checked });
      }
    } else {
      const res = await authApi.deleteRecruitment(formData);
      if (res && res.result === true) {
        this.setState({ isCruitmentDay: checked });
      }
    }
  }

  async componentDidMount() {
    if (this.props.data && this.props.data._id) {
      const formData = new FormData();
      formData.append('resume', this.props.data._id);
      const res = await authApi.isRecruitmentResume(formData);
      if (res && res.result === true) {
        this.setState({ isCruitmentDay: true });
      }
    }
  }

  render() {
    const { showDeletePopup, refreshMessage, isCruitmentDay } = this.state;
    const { data, constants, index } = this.props;
    const { createdAt, status, title, type, view_counts, _id, allow_search } = data;
    return (
      <div className="cv-info-item">
        <div className="title">
          {this.t('Hồ sơ')}:{` ${title}`}
        </div>
        <div className="info-container">
          <div className="left-column">
            <div>
              <span>{this.t('Ngày tạo')}:</span>
              <strong>{` ${Moment(createdAt).format('DD/MM/YYYY')}`}</strong>
            </div>
            <div>
              <span className="resume-type-label">{this.t('Loại hồ sơ')}:</span>
              <strong>{constants && constants.type[type]}</strong>
            </div>
          </div>
          <div className="right-column">
            <div>
              <span>{this.t('Tình trạng')}: </span>
              <span>{` ${status}`}</span>
            </div>
            <div>
              <span>{this.t('Lượt xem')}: </span>
              <span>{` ${view_counts}`}</span>
            </div>
          </div>
        </div>

        <div>
          <CheckBox
            label={this.t('Cho phép nhà tuyển dụng tìm kiếm thông tin và chủ động liên hệ phỏng vấn.')}
            checked={allow_search}
            onChange={value => {
              this.props.changeResumeSearchingStatus({ id: _id, status: value, index });
            }}
          />
          <CheckBox
            label={this.t('Tham gia ngày hội tuyển dụng online.')}
            checked={isCruitmentDay}
            onChange={value => {
              this._recruitmentResumes(value, _id);
            }}
          />
        </div>

        <div className="btn-container">
          <div className="line">
            <Button className="btn-edit" onClick={this.props.onDownload}>
              <span className="icon-star" />
              {this.t('Download CV')}
            </Button>
            <Button
              className="btn-edit"
              onClick={() => {
                this._refreshResume(_id);
              }}
            >
              <span className="icon-star" />
              {this.t('Làm mới')}
            </Button>
          </div>
          <div className="line">
            <Button
              className="btn-edit"
              onClick={() => {
                this.props.history.push(`/cv/edit/${_id}`);
              }}
            >
              <span className="icon-note" />
              {this.t('Sửa')}
            </Button>
            <Button
              className="btn-edit"
              onClick={() => {
                this.setState({ showDeletePopup: true });
              }}
            >
              <span className="icon-trash" />
              {this.t('Xoá')}
            </Button>
          </div>
        </div>
        {refreshMessage && <div className="refresh-msg">{refreshMessage.message}</div>}

        <Popup show={showDeletePopup} showBox className={`delete-resume-popup${(refreshMessage && refreshMessage.code && ' refresh-failed') || ''}`}>
          <div className="delete-msg">
            <span className="icon-close" />
            {this.t(refreshMessage && refreshMessage.code ? refreshMessage.message : 'Bạn chắc chắn xoá hồ sơ này ?')}
          </div>
          {!refreshMessage && <div className="cv-title">{title}</div>}
          <div className="btn-wrapper">
            <Button
              className="jn-btn__normal btn-cancel"
              onClick={() => {
                this.setState({ showDeletePopup: false });
              }}
            >
              {this.t('Trở lại')}
            </Button>
            {!refreshMessage && (
              <Button className="jn-btn__yellow btn-delete" onClick={this._deleteResume}>
                {this.t('Xoá')}
              </Button>
            )}
          </div>
        </Popup>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ constants: state.constants.data.resumes }),
    { deleteResumeSuccess, changeResumeSearchingStatus }
  )(CVItem)
);
