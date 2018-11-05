/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-07 10:49:00
 */
import React from 'react';
import { connect } from 'react-redux';
import { userApi } from '../../../../services';
import { Base, Button } from '../../../../components';
import Languague from './Languague';
import './style.scss';

class ForeignLanguage extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: !props.updateMode,
      data: (props.data && JSON.parse(JSON.stringify(props.data)).map(lang => ({ ...lang, noChange: true }))) || [
        {
          title: '',
          write: 4,
          talk: 4,
          listen: 4,
          read: 4,
          editMode: true
        }
      ]
    };
    this._laguageRefs = [];
  }

  getValues = () => {
    const data = JSON.parse(JSON.stringify(this.state.data));
    return data.map(lang => {
      delete lang.editMode;
      delete lang._id;
      delete lang.noChange;

      lang.title = parseInt(lang.title, 10);

      return lang;
    });
  };

  _saveLanguages = async () => {
    const { data } = this.state;
    let hasError = false;
    const updateData = data.map((lang, index) => {
      if (lang.title === '') {
        this._laguageRefs[index].showError();
        hasError = true;
      }

      const updateLang = { ...lang };
      // delete updateLang._id;
      delete updateLang.noChange;

      return updateLang;
    });

    if (!hasError) {
      const response = await userApi.updateResume(this.props.resumeID, { language: updateData });
      if (response && response.code === undefined) {
        this.setState({ data: response.language.map(lang => ({ ...lang, noChange: true })) });
      }
    }
  };

  _addLanguage = () => {
    const { data } = this.state;
    this.setState({
      data: [
        ...data,
        {
          title: '',
          write: 4,
          talk: 4,
          listen: 4,
          read: 4,
          editMode: true
        }
      ]
    });
  };

  _renderMessage = () => {
    const { message } = this.state;
    if (!message) return null;

    return <div className={`message-wrapper ${message.code ? 'success' : 'error'}`} />;
  };

  _updateData = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.getValues());
    }
  };

  render() {
    const { isEditing, data } = this.state;
    const { updateMode } = this.props;
    const wrapperClasses = ['foreign-language-info'];
    if (data.length === 0) {
      wrapperClasses.push('empty-list');
    }
    if (isEditing) {
      wrapperClasses.push('editing');
    }
    const editData = data.filter(item => !item.noChange);

    return (
      <div className={wrapperClasses.join(' ')}>
        <div className="block-container">
          <div className="block-header">
            <div className="header-text">
              <span>{this.t('NGOẠI NGỮ')}</span>
              <span className="optional">({this.t('Không bắt buộc')})</span>
            </div>
          </div>

          <div className="block-body">
            {this._renderMessage()}
            <div className="language-list">
              {(data || []).map((lang, index) => (
                <Languague
                  key={`foreign-lang-${index}`}
                  data={lang}
                  constants={this.props.constants}
                  onChange={value => {
                    // delete value.label;
                    const newData = [...this.state.data];
                    newData[index] = value;
                    this.setState({ data: newData }, this._updateData);
                  }}
                  onDelete={() => {
                    this.setState({ data: [...data.slice(0, index), ...data.slice(index + 1)] }, this._updateData);
                  }}
                  ref={r => {
                    this._laguageRefs[index] = r;
                  }}
                />
              ))}
            </div>
            {updateMode &&
              editData.length > 0 && (
                <div className="update-actions-wrapper">
                  <Button className="jn-btn__yellow" onClick={this._saveLanguages}>
                    {this.t('Lưu')}
                  </Button>
                  <Button
                    className="jn-btn__normal"
                    onClick={() => {
                      this.setState({ data: this.props.data.map(lang => ({ ...lang, noChange: true })) });
                    }}
                  >
                    {this.t('Huỷ')}
                  </Button>
                </div>
              )}
            <div className="add-btn-wrapper">
              <Button className="jn-btn__normal" onClick={this._addLanguage}>
                <span className="icon-jn-plus" />
                <span className="btn-title">{this.t('THÊM NGOẠI NGỮ')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ constants: state.constants.data.resumes }))(ForeignLanguage);
