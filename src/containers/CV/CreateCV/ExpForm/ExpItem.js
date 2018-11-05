import React from 'react';
import { Base, Button, Input } from '../../../../components';
import TimeDistance from '../../components/TimeDistance';

class ExpItem extends Base {
  constructor(props) {
    super(props);
    const { current, title, company, description, time_start, time_end, _id } = props.data || {};
    this.state = {
      time_start: time_start || new Date(),
      time_end: time_end || new Date(),
      company: company || '',
      title: title || '',
      description: description || '',
      current: current || false,
      _id
    };
  }

  _onRemove = () => {
    this.setState(
      {
        time_start: new Date(),
        time_end: new Date(),
        company: '',
        title: '',
        description: '',
        current: false
      },
      this.props.onChange(this.state)
    );
    this.props.remove();
  };

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
    const { title, company, description, time_start, time_end, current, _id } = this.state;

    return (
      <div className="input-section">
        <form id="experience-cv-form" className="experience-cv-form">
          <TimeDistance
            onChange={data => {
              this.setState({ ...data }, () => {
                this.props.onChange(this.state);
              });
            }}
            showCurrentWorking
            label={this.t('Thời gian')}
            data={{ time_start, time_end, current }}
            required={_id !== undefined}
          />

          <Input
            type="text"
            name="title"
            placeholder={this.t('Vị trí/ chức danh')}
            value={title}
            required={_id !== undefined}
            onChange={value =>
              this.setState({ title: value }, () => {
                this.props.onChange(this.state);
              })
            }
          />
          <Input
            type="text"
            name="company"
            placeholder={this.t('Công ty')}
            value={company}
            required={_id !== undefined}
            onChange={value =>
              this.setState({ company: value }, () => {
                this.props.onChange(this.state);
              })
            }
          />
          <Input
            name="description"
            required={_id !== undefined}
            multiline
            placeholder={this.t('Mô tả công việc')}
            value={description}
            onChange={value => {
              this.setState({ description: value }, () => {
                this.props.onChange(this.state);
              });
            }}
          />
        </form>
        <div className="delete-btn-wrapper">
          <Button className="delete-btn" onClick={this.props.onDelete}>
            <span className="icon-trash" />
            {this.t('Xoá')}
          </Button>
        </div>
      </div>
    );
  }
}

export default ExpItem;
