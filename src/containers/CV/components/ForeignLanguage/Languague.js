/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-08 00:32:36
 */
import React from 'react';
import { connect } from 'react-redux';
import { Base, Button, Select, Radio } from '../../../../components';

export default class Language extends Base {
  static IDNo = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...props.data,
      editMode: !props.data.noChange
    };
    this._id = ++Language.IDNo;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.noChange !== !this.state.editMode) {
      this.setState({ ...nextProps.data, editMode: !nextProps.data.noChange });
    }
  }

  getValue = () => {
    const data = { ...this.state };
    delete data.editMode;
    delete data.noChange;
    delete data._id;
    return data;
  };

  showError = () => {
    this._languageRef.showError(this.t('containers').CV.components.ForeignLanguage.Languague.showError);
  };

  _saveLanguage = () => {
    const { title } = this.state;
    let hasError = false;
    if (title === '') {
      this._languageRef.showError(this.t('containers').CV.components.ForeignLanguage.Languague.showError);
      hasError = true;
    }
    if (!hasError) {
      this.setState({ editMode: false }, () => {
        if (typeof this.props.onSave === 'function') this.props.onSave(this.getValue());
      });
    }
  };

  _updateData = () => {
    this.props.onChange(this.getValue());
  };

  _renderBlockView = () => {
    const { title, write, read, listen, talk } = this.state;
    const { constants } = this.props;
    const { languages_level, languages } = constants;

    return (
      <div className="language-view-info">
        <div className="info-wrapper">
          <div className="name">{languages && languages[title]}</div>
          <div className="summary-skills">
            <div className="line-info">
              <div className="info-title">{this.t('containers').CV.components.ForeignLanguage.Languague.listen}:</div>
              <div className="info-value">{languages_level && languages_level[listen]}</div>
            </div>
            <div className="line-info">
              <div className="info-title">{this.t('containers').CV.components.ForeignLanguage.Languague.speak}:</div>
              <div className="info-value">{languages_level && languages_level[talk]}</div>
            </div>
            <div className="line-info">
              <div className="info-title">{this.t('containers').CV.components.ForeignLanguage.Languague.read}:</div>
              <div className="info-value">{languages_level && languages_level[read]}</div>
            </div>
            <div className="line-info">
              <div className="info-title">{this.t('containers').CV.components.ForeignLanguage.Languague.write}:</div>
              <div className="info-value">{languages_level && languages_level[write]}</div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <Button className="btn-delete" onClick={this.props.onDelete}>
            <span className="icon-trash" />
            {this.t('containers').CV.components.ForeignLanguage.Languague.delete}
          </Button>
          <Button
            className="btn-edit"
            onClick={() => {
              this.setState({ editMode: true, noChange: false }, this._updateData);
            }}
          >
            <span className="icon-pencil" />
            {this.t('containers').CV.components.ForeignLanguage.Languague.edit}
          </Button>
        </div>
      </div>
    );
  };

  _renderForm = () => {
    const { write, read, listen, talk, title } = this.state;

    const { constants } = this.props;
    const { languages, languages_level } = constants;
    let selectedValue = { value: title };
    const langOpts = Object.keys(languages || {}).map(key => {
      if (parseInt(key, 10) === ((typeof title === 'string' && parseInt((title && title.trim()) || '0', 10)) || title)) {
        selectedValue.label = languages[key];
      }
      return {
        value: key,
        label: languages[key]
      };
    });

    const levelsText = [];
    const levelOpts = Object.keys(languages_level || {}).map(key => {
      levelsText.push(languages_level[key]);
      return {
        value: key
      };
    });

    return (
      <div className="language-form-wrapper">
        <div className="language-form">
          <div className="lang-selection">
            <Select
              options={langOpts}
              label={this.t('containers').CV.components.ForeignLanguage.Languague.language}
              placeholder={this.t('containers').CV.components.ForeignLanguage.Languague.langOpts}
              value={[selectedValue]}
              required
              onChange={value => {
                this._languageRef.hideError();
                this.setState({ title: value[0].value }, this._updateData);
              }}
              ref={r => {
                this._languageRef = r;
              }}
            />
          </div>
          <div className="skills-level">
            <div className="label-wrapper">
              <div className="col">{this.t('containers').CV.components.ForeignLanguage.Languague.level}</div>
              {levelsText.map((text, index) => (
                <div className="col" key={`level-text-lang-${this._id}-${index}`}>
                  {this.t(text)}
                </div>
              ))}
            </div>
            <div className="skills">
              <Radio
                options={levelOpts}
                label={this.t('containers').CV.components.ForeignLanguage.Languague.listen}
                value={`${listen}`}
                onChange={value => {
                  this.setState({ listen: parseInt(value, 10) }, this._updateData);
                }}
              />
              <Radio
                options={levelOpts}
                label={this.t('containers').CV.components.ForeignLanguage.Languague.speak}
                value={`${talk}`}
                onChange={value => {
                  this.setState({ talk: parseInt(value, 10) }, this._updateData);
                }}
              />
              <Radio
                options={levelOpts}
                label={this.t('containers').CV.components.ForeignLanguage.Languague.read}
                value={`${read}`}
                onChange={value => {
                  this.setState({ read: parseInt(value, 10) }, this._updateData);
                }}
              />
              <Radio
                options={levelOpts}
                label={this.t('containers').CV.components.ForeignLanguage.Languague.write}
                value={`${write}`}
                onChange={value => {
                  this.setState({ write: parseInt(value, 10) }, this._updateData);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div className={`language-item${this.state.editMode ? ' editing' : ''}`}>{this.state.editMode ? this._renderForm() : this._renderBlockView()}</div>;
  }
}
