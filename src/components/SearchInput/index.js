/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-26 12:59:24
 */
import React from 'react';
import PropTypes from 'prop-types';
import _api from '../../services/_request';
import Base from '../Base';
import Input from '../Input';
import './style.scss';

export default class SearchInput extends Base {
  static numberID = 0;

  static propsType = {
    minLenToSearch: PropTypes.number
  };

  static defaultProps = {
    minLenToSearch: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: true,
      suggestions: [],
      showSuggestionMenu: false
    };
    this._searchTimer = -1;
    this._id = ++SearchInput.numberID;
  }

  componentDidMount() {
    document.addEventListener('click', this._handleDocClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocClick);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  _handleDocClick = event => {
    if (!this._wrapper.contains(event.target) && this.state.showSuggestionMenu) {
      this.setState({ showSuggestionMenu: false });
    }
  };

  _handleValueChange = value => {
    if (this._searchTimer > 0) {
      clearTimeout(this._searchTimer);
    }

    const newState = { value };
    if (value.trim() !== '' && this.props.searchURL && !this.state.loading) {
      newState.loading = true;
    }
    this.setState(newState);

    if (this.props.searchURL && value.trim().length >= this.props.minLenToSearch) {
      this._searchTimer = setTimeout(async () => {
        const response = await _api.GET(`${this.props.searchURL}?keyword=${value}`, _api.addTokenToHeader());
        if (response && !response.code && !response.result) {
          const suggestions = this.props.formatResponseData(response);
          this.setState({ suggestions, showSuggestionMenu: true });
        }
      });
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newState.value);
    }
  };

  _handleSuggestionChose = (event, item) => {
    event.preventDefault();

    this.setState({ showSuggestionMenu: false, value: item }, () => {
      if (typeof this.props.onSuggestionSelect === 'function') {
        this.props.onSuggestionSelect(item);
      }
    });
  };

  _renderValue = () => {
    if (typeof this.state.value === 'string') {
      return this.state.value;
    }
    if (typeof this.props.renderSelectedValue === 'function') {
      return this.props.renderSelectedValue(this.state.value);
    }

    return '';
  };

  render() {
    const { className, placeholder, icon, searchURL, renderListItem, maxlength } = this.props;
    const { suggestions, showSuggestionMenu } = this.state;

    return (
      <div
        className={['jn-search-input', className].join(' ')}
        ref={r => {
          this._wrapper = r;
        }}
      >
        {icon && <span className={icon} />}
        <Input placeholder={placeholder} floatingLabel onChange={this._handleValueChange} maxlength={maxlength} value={this._renderValue()} onKeyDown={this.props.onKeyDown} />
        {searchURL &&
          (suggestions || []).length > 0 && (
            <div className={`dropdown search-suggestion-menu${showSuggestionMenu ? ' open' : ''}`}>
              <ul className="dropdown-menu">
                {suggestions.map((item, index) => {
                  return (
                    <li key={`search-input-suggestion-${this.id}-${index}`}>
                      <a href="#" onClick={event => this._handleSuggestionChose(event, item)}>
                        {renderListItem(item)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
      </div>
    );
  }
}
