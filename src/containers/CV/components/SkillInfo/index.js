/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-07 10:49:00
 */
import React from 'react';
import _ from 'lodash';
import { Base, Button, SearchInput } from '../../../../components';
import { userApi } from '../../../../services';
import ApiConfig from '../../../../constants/server-config';
import './style.scss';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

export default class SkillInfo extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: !props.updateMode,
      data: props.data || [],
      currentSkill: null
    };
  }

  getValues = () => {
    return JSON.parse(JSON.stringify(this.state.data));
  };

  _onChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.data);
    }
  };

  _updateSkills = async () => {
    const { data } = this.state;
    if (data.length === 0) {
      this.state({ message: { code: 1, message: 'Bạn phải chọn ít nhất 01 kỹ năng.' } });
    } else {
      const response = await userApi.updateResume(this.props.resumeID, { skills: data });
      if (response && response.code === undefined) {
        this.setState({ data: response.skills, isEditing: false });
      }
    }
  };

  _renderBlockView = () => {
    const { data, isEditing } = this.state;

    return (
      <div className={`items-wrapper${data.length > 0 ? ' not-empty' : ''}`}>
        {data.length === 0 && <div className="empty-msg">{this.t('Chưa có thông tin kỹ năng.')}</div>}
        {data.map((skill, index) => (
          <div className="skill-item" key={`skill-item-${index}`}>
            <div className="title">{skill.title}</div>
            {isEditing && (
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ data: [...data.slice(0, index), ...data.slice(index + 1)] }, this._onChange);
                }}
              >
                <span className="icon-jn-close" />
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };

  _addSkill = () => {
    const { data, currentSkill } = this.state;
    if (currentSkill) {
      this.setState(
        {
          currentSkill: null,
          data: [...data, { ...currentSkill, title: currentSkill.title.trim() }]
        },
        this._onChange
      );
    }
  };

  _renderMessage = () => {
    const { message } = this.state;
    if (!message) return null;

    return <div className={`message-wrapper ${message.code ? 'success' : 'error'}`} />;
  };

  render() {
    const { currentSkill, isEditing } = this.state;
    const { updateMode } = this.props;

    return (
      <div className={`skill-info${isEditing ? ' editing' : ''}`}>
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">{this.t('KỸ NĂNG')}</div>
          </div>

          <div className="block-body">
            {this._renderMessage()}
            {this._renderBlockView()}
            {isEditing ? (
              <div className="add-wrapper">
                <SearchInput
                  placeholder={this.t('Nhập kỹ năng về lĩnh vực chuyên môn của bạn…')}
                  value={currentSkill && currentSkill.title}
                  maxlength={50}
                  searchURL={`${host}/candidate/skills`}
                  formatResponseData={response => {
                    if (response.skills && _.isArray(response.skills)) {
                      return response.skills.map(skill => ({
                        value: skill._id,
                        label: skill.title
                      }));
                    }

                    return [];
                  }}
                  renderListItem={item => {
                    return item.label;
                  }}
                  onChange={value => {
                    this.setState({ currentSkill: { title: value } });
                  }}
                  onSuggestionSelect={item => {
                    this.setState({ currentSkill: { title: item.label, _id: item.value } });
                  }}
                />
                <Button className="jn-btn__normal" onClick={this._addSkill}>
                  <span className="icon-jn-plus" />
                  {this.t('Thêm')}
                </Button>
              </div>
            ) : (
              <div className="actions-wrapper">
                <Button
                  onClick={() => {
                    this.setState({ isEditing: true });
                  }}
                >
                  <span className="icon-pencil" />
                  <span className="btn-title">{this.t('Sửa')}</span>
                </Button>
              </div>
            )}

            {updateMode &&
              isEditing && (
                <div className="update-actions-wrapper">
                  <Button className="jn-btn__yellow" onClick={this._updateSkills}>
                    {this.t('Lưu')}
                  </Button>
                  <Button
                    className="jn-btn__normal"
                    onClick={() => {
                      this.setState({ isEditing: false });
                    }}
                  >
                    {this.t('Huỷ')}
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
