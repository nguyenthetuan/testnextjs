import React, { Component } from 'react';
import { FileUploader, Base, Button } from '../../components';

import createPage from '../createPage';
// import './styles.scss';

// Sub Container
import CreateCV from './CreateCV';
import ListCV from './ListCV';

// apis
import { userApi } from '../../services';

class CVPage extends Base {
  static wrapperClasses = 'new-cv-page';

  constructor(props) {
    super(props);
    this.state = {
      cvList: []
    };
  }

  componentDidMount() {
    // FETCH DATA
    this.fetchData();
  }

  fetchData = () => {
    userApi.getResumeList().then(res => {
      if (res) {
        this.setState({ cvList: res.resumes || [] });
        // this.setState({ data: res.products || [] });
      }
    });
  };

  render() {
    const { cvList } = this.state;
    if (cvList.length === 0) {
      return <CreateCV onSuccess={this.fetchData} />;
    }
    return <ListCV />;
  }
}

export default createPage(CVPage);
