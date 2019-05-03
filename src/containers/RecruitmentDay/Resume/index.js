import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Base, Countdown, JobItem, Loading, Pagination } from '../../../components';
import { jobApi } from '../../../services';
import createPage from '../../createPage';
import './style.scss';

class RResumes extends Base {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      resumes: [],
      totalEntries: 1,
      perPage: 16,
    };
  }

  componentDidMount() {
    const { recruitmentId } = this.props;
    if (recruitmentId) {
      this._fetchPageData();
    }
  }

  _generateQueryString = () => {
    const { currentPage, perPage } = this.state;
    const id = this.props.recruitmentId || null;
    let queries = [];
    if (currentPage !== 1) {
      queries.push(`page=${currentPage}`);
    }

    if (perPage) {
      queries.push(`perPage=${perPage}`);
    }

    if (id) {
      queries.push(`id=${id}`);
    }

    return queries.join('&');
  };

  _fetchPageData = async() => {
    const response = await jobApi.fetchRecruitmentResumes(this._generateQueryString());
    if (response && response.recruitment_resumes) {
      this.setState({ resumes: response.recruitment_resumes, totalEntries: response.totalEntries });
    }
  }

  _changeState = state => {
    this.setState(state, () => {
      this._fetchPageData();
    });
  };

  render() {
    const { resumes, totalEntries, currentPage, perPage } = this.state;
    const { constants } = this.props;
    if (resumes.length <= 0) {
      return null;
    }

    return (
      <div className="recruiment-resumes-wrapper">
        <h2 style={{ fontSize: 30, color: '#fc5830' }}>ỨNG VIÊN THAM GIA</h2>
        <div className="block-content">
          {resumes.map((resume, index) => {
            if (!resume) return null;
            const workLocations = (resume.worklocation || []).map(loc => loc.province);
            const salaryText = (constants.resumes && constants.resumes.salary[resume.salary]) || '';
            const expText = (constants.resumes && constants.resumes.experience[resume.year_experience]) || '';
            const level = (constants.users && constants.users.level[resume.user && resume.user.level]) || '';
            const logo = (resume.user && resume.user.avatar) || '/assets/img/logo-full.png';
            return (
              <div className="resume-item-wrapper" key={`recruiment-resume-${index}`}>
                <div className="information">
                  <div className="title">{resume.title}</div>
                  <div className="fullname">{resume.user && resume.user.fullname}</div>
                  <div className="meta">
                    <div className="left">
                      <span><i aria-hidden="true" className="icon-chart" />{expText}</span>
                      <span><i aria-hidden="true" className="icon-jn-dollar" />{salaryText} triệu</span>
                    </div>
                    <div className="right">
                      <span> <i aria-hidden="true" className="icon-location-pin" />{workLocations.join(', ')}</span>
                      <span> <i aria-hidden="true" className="icon-home" />{level}</span>
                    </div>
                  </div>
                </div>
                <div className="img">
                  <img src={logo} alt={resume.title} />
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage - 1}
          total={totalEntries}
          numberPerPage={perPage}
          onChangePage={page => {
            this._changeState({ currentPage: page + 1 });
          }}
        />
      </div>
    );
  }
}
export default connect(state => ({ constants: state.constants.data || {} }))(RResumes);
