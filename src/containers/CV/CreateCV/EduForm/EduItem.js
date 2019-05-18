import React from 'react';
import { Base, Input, Select, Button } from '../../../../components';

import TimeDistance from '../../components/TimeDistance';

class EduItem extends Base {
  constructor(props) {
    super(props);
    const { classification, school, certificate, time_start, time_end } = props.data;
    this.state = {
      time_start: time_start || new Date(),
      time_end: time_end || new Date(),
      school: school || '',
      classification: classification || '',
      certificate: certificate || ''
    };
  }

  handleChangeInput = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  render() {
    const { classification, school, certificate, time_start, time_end } = this.state;
    const { classificationOpts } = this.props;
    return (
      <div className="input-section">
        <form id="education-cv-form" className="education-cv-form">
          <TimeDistance
            onChange={data => {
              this.setState({ ...data }, () => {
                this.props.onChange(this.state);
              });
            }}
            label={this.t('containers').CV.CreateCV.EduForm.EduItem.time}
            data={{ time_start, time_end }}
            required
          />

          <Input
            type="text"
            name="school"
            placeholder={this.t('containers').CV.CreateCV.EduForm.EduItem.school}
            value={school}
            required
            onChange={value =>
              this.setState({ school: value }, () => {
                this.props.onChange(this.state);
              })
            }
          />
          <Input
            name="certificate"
            required
            placeholder={this.t('containers').CV.CreateCV.EduForm.EduItem.certificate}
            value={certificate}
            onChange={value => {
              this.setState({ certificate: value }, () => {
                this.props.onChange(this.state);
              });
            }}
          />

          <Select
            label={this.t('containers').CV.CreateCV.EduForm.EduItem.classification}
            placeholder={this.t('containers').CV.CreateCV.EduForm.EduItem.classificationOpts}
            required
            options={classificationOpts}
            value={[classification]}
            onChange={value => {
              this._levelRef.hideError();
              this.setState({ classification: value[0] }, () => {
                this.props.onChange(this.state);
              });
            }}
            ref={r => {
              this._levelRef = r;
            }}
          />
        </form>
        <div className="delete-btn-wrapper">
          <Button className="delete-btn" onClick={this.props.onDelete}>
            <span className="icon-trash" />
            {this.t('containers').CV.CreateCV.EduForm.EduItem.delete}
          </Button>
        </div>
      </div>
    );
  }
}

export default EduItem;
