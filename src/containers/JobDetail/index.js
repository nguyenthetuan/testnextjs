/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-31 18:10:16
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Loading, ApplyPopup, Button, Popup } from '../../components';
import createPage from '../createPage';
import { jobApi } from '../../services';
import Header from './Header';
import Body from './Body';
import SimilarJobs from './SimilarJobs';
import './style.scss';

class JobDetailPage extends Base {
  static wrapperClasses = 'job-detail-page';

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      message: null,
      showApplyPopup: false
    };
  }

  componentDidMount() {
    const { firstToken, isLoggedIn } = this.props;
    if (isLoggedIn || firstToken) {
      this._fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firstToken, isLoggedIn } = nextProps;
    if ((isLoggedIn || firstToken) && !this._fetchingData) {
      this._fetchData();
    }
  }

  _fetchData = async () => {
    this._fetchingData = true;
    const { id } = this.props.match.params;
    const matches = /(.*)\.(.*)/g.exec(id);
    const jobID = (matches && matches[2]) || id;
    const response = await jobApi.fetchJobDetail(jobID);
    if (response && response.code === undefined && response.result === undefined) {
      this.setState({ data: response.job, loading: false });
    } else {
      this.setState({ message: { code: 1 }, loading: false });
    }
    this._fetchingData = false;
  };

  render() {
    const { loading, data, showApplyPopup, message } = this.state;
    return (
      <div className={`page-wrapper${loading ? ' loading' : ''}`}>
        {loading && <Loading />}
        {!loading &&
          (!message || message.code === 0) && (
            <div className="main-content">
              <Header
                info={data}
                onApplyClick={() => {
                  this.setState({ showApplyPopup: true });
                }}
                onSaveJobSuccess={() => {
                  this.setState({ message: { code: 0, message: this.t('containers').JobDetail.index.message } });
                  this._fetchData();
                }}
              />
              <Body info={data} />
              <SimilarJobs data={data && data.similarJobs} similarCategory={data && data.categories && data.categories[0]} />
              <ApplyPopup
                show={showApplyPopup}
                hidePopup={() => {
                  this.setState({ showApplyPopup: false });
                }}
                job={data}
              />
            </div>
          )}
        {message &&
          message.code === 1 && (
            <div className="error-message-wrapper">
              <div className="message">{this.t('containers').JobDetail.index.messageError}</div>
              <div className="btn-wrapper">
                <Button
                  className="jn-btn__yellow"
                  onClick={() => {
                    this.props.history.replace('/');
                  }}
                >
                  {this.t('containers').JobDetail.index.backHome}
                </Button>
              </div>
            </div>
          )}

        {message &&
          message.code === 0 && (
            <Popup show showBox className="saved-success">
              <div className="message">{this.t(message.message)}</div>
              <div className="btn-wrapper">
                <Button
                  className="jn-btn__normal"
                  onClick={() => {
                    this.setState({ message: null });
                  }}
                >
                  {this.t('containers').JobDetail.index.back}
                </Button>
              </div>
            </Popup>
          )}
      </div>
    );
  }
}

export default createPage(connect()(JobDetailPage));
