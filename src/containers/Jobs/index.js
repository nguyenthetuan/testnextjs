import React, { Component } from 'react';
import { Base } from '../../components';

import createPage from '../createPage';

import './styles.scss';

import JobListContainer from './JobListContainer';

class Jobs extends Base {
  static wrapperClasses = 'job-list-page';

  render() {
    return <JobListContainer />;
  }
}

export default createPage(Jobs);
