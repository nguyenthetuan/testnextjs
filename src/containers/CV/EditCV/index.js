/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-06 09:56:45
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resumeApi } from '../../../services';
import { Base, Loading } from '../../../components';
import createPage from '../../createPage';
import GeneralInfo from './GeneralInfo';
import InterestedWork from './InterestedWork';
import ExperienceInfo from './ExperienceInfo';
import EducationInfo from './EducationInfo';
import SkillInfo from '../components/SkillInfo';
import ForeignLanguage from '../components/ForeignLanguage';
import ReferenceUser from '../components/ReferenceUser';
import CVFileLoader from '../components/CVFileLoader';
import UpdateAccountMessage from '../components/UpdateAccountMessage';

import './style.scss';

class EditCVPage extends Base {
  static wrapperClasses = 'edit-cv-page';

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.id) {
      this._fetchResumeData(match.params.id);
    }
  }

  _fetchResumeData = async id => {
    const response = await resumeApi.fetchResumeDetail(id);
    if (response && response.code === undefined && response.result === undefined) {
      this.setState({ data: response, loading: false });
    } else {
      this.setState({ message: { code: 1 } });
    }
  };

  render() {
    const { fullname, address, level } = this.props.userInfo;
    if (!fullname || !address || !level) {
      return (
        <div className="list-cv-container required-update">
          <UpdateAccountMessage redirect="/cv" />
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="page-wrapper">
          <Loading />
        </div>
      );
    }

    const { info, work_experience, education, skills, language, referenced, filecv } = this.state.data;
    const { id } = this.props.match.params;
    let cvInfo = {};
    this.props.cvList.map(cv => {
      cvInfo[cv._id] = cv;
    });

    if (filecv) {
      return (
        <div className="page-wrapper">
          <GeneralInfo info={info.infomation} />
          <InterestedWork data={info && info.job_need} resumeID={id} />
          <CVFileLoader file={filecv} info={info.infomation} resumeID={id} listInfo={cvInfo[id]} />
        </div>
      );
    }

    return (
      <div className="page-wrapper">
        <GeneralInfo info={info.infomation} />
        <InterestedWork data={info && info.job_need} resumeID={id} />
        <ExperienceInfo data={work_experience} resumeID={id} />
        <EducationInfo data={education} resumeID={id} />
        <SkillInfo updateMode data={skills} resumeID={id} />
        <ForeignLanguage updateMode data={language || []} resumeID={id} />
        <ReferenceUser updateMode data={referenced} header={this.t('containers').CV.EditCV.index.referenced} resumeID={id} />
      </div>
    );
  }
}

export default withRouter(createPage(connect(state => ({ userInfo: state.auth.info, cvList: state.auth.cvList }))(EditCVPage)));
