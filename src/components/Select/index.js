import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Base from '../Base';
import './style.scss';

export default class Select extends Base {
  static idNumer = 0;

  static propsType = {
    options: PropTypes.shape([
      {
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }
    ]),
    value: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    multiple: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    options: [],
    value: null,
    placeholder: '',
    multiple: false
  };

  constructor(props) {
    super(props);
    let selected;

    if (!selected && props.options.length) {
      selected = props.options[0];
    }
    if (props.placeholder) {
      selected = props.placeholder;
    }

    selected = !props.multiple ? [selected] : [];
    if (props.value) selected = props.value;

    this.state = {
      showDropdown: false,
      selected,
      parentSelected: null
    };
    this._idNumber = Select.idNumer++;
    this._addSelect = false;
    this._renderChildrenOpts = true;
  }

  componentDidMount() {
    document.addEventListener('click', this._onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onDocumentClick);
  }

  componentWillReceiveProps(nextProps) {
    let defaultValue = (nextProps.options.length && nextProps.options[0]) || null;
    if (nextProps.placeholder) {
      defaultValue = nextProps.placeholder;
    }
    defaultValue = nextProps.multiple ? [] : [defaultValue];
    if (nextProps.options.length !== this.props.options.length || !_.isEqual(nextProps.value, this.state.selected)) {
      this.setState({ selected: nextProps.value || defaultValue });
    }
  }

  showError = message => {
    this.setState({ showError: true, message });
  };

  hideError = () => {
    this.setState({ showError: false });
  };

  _onDocumentClick = event => {
    if (this.state.showDropdown && !this._inputRef.contains(event.target)) {
      this.setState({ showDropdown: false });
    }
  };

  _onSelectOpt = opt => {
    const { selectSubLevel, multiple } = this.props;
    const { parentSelected } = this.state;

    if (selectSubLevel && !this.state.parentSelected) {
      this.setState({ parentSelected: opt });
    } else if (!multiple) {
      this.setState(
        {
          selected: [opt.selectParent ? parentSelected : opt],
          showDropdown: false
        },
        () => {
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.selected);
          }
        }
      );
    } else {
      const selected = [...this.state.selected];
      const selectedValues = selected.map(item => item.value);
      if (selectedValues.indexOf(opt.value) === -1) {
        this.setState(
          {
            selected: [...selected, (opt.selectParent && parentSelected) || opt],
            showDropdown: false
          },
          () => {
            if (typeof this.props.onChange === 'function') {
              this.props.onChange(this.state.selected);
            }
          }
        );
      } else {
        this.setState({
          showDropdown: false
        });
      }
    }
  };

  _removeSelectedOpt = (index, event) => {
    event.preventDefault();
    const { selected } = this.state;
    setTimeout(() => {
      this.setState({ selected: [...selected.slice(0, index), ...selected.slice(index + 1)] }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selected);
        }
      });
    }, 0);
  };

  _renderMultipleSelectedOpts = () => {
    const { selected } = this.state;

    if (!this.props.multiple || selected.length === 0) {
      return null;
    }

    return (
      <div className="selected-wrapper">
        <div className="title">{ this.t('components').select.title}</div>
        <div className="selected-opts">
          {selected.map((selectedOpt, index) => {
            if (!selectedOpt || !selectedOpt.value) return null;
            return (
              <div className="selected-opt" key={`multi-selected-item-${this._idNumber}${index}`}>
                <div className="selected-label">{selectedOpt.label}</div>
                <a
                  href="#"
                  onClick={event => {
                    this._removeSelectedOpt(index, event);
                  }}
                >
                  <span className="icon-jn-close" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { placeholder, options, icon, multiple, label, required, selectSubLevel, className } = this.props;
    const { selected, showDropdown, parentSelected, showError, message } = this.state;
    const selectedOpts = JSON.parse(JSON.stringify(selected));
    let selectedOpt = selectedOpts[selectedOpts.length - 1];
    let dropdownOpts = JSON.parse(JSON.stringify(options));

    if (selectSubLevel && parentSelected) {
      dropdownOpts = JSON.parse(JSON.stringify(parentSelected.children));
    }

    let renderedDropdownOpts = dropdownOpts;
    if (multiple) {
      let selecteds = [];
      selectedOpts.map(item => {
        if (item.children) {
          item.children.slice(1).map(child => {
            if (selecteds.indexOf(child.value) === -1) {
              selecteds.push(child.value);
            }
          });
        } else if (selecteds.indexOf(item.value) === -1) {
          selecteds.push(item.value);
        }
      });

      renderedDropdownOpts = [];
      dropdownOpts.map((opt, index) => {
        if (selecteds.indexOf(opt.value) === -1) {
          if (opt.children) {
            let children = JSON.parse(JSON.stringify(opt.children));
            children.map((child, id) => {
              if (selecteds.indexOf(child.value) > -1) {
                children.splice(id, 1);
              }
            });
          }
          renderedDropdownOpts.push(opt);
        }
      });
    }

    const wrapperClasses = ['jn-select dropdown', 'form-group'];
    if (className) wrapperClasses.push(className);
    if (multiple) wrapperClasses.push('multi-select');
    if (this._addSelect) wrapperClasses.push('sub-options');
    if (selected.length === 0) wrapperClasses.push('select-empty');
    if (showDropdown) wrapperClasses.push('open');

    return (
      <div
        className={wrapperClasses.join(' ')}
        ref={r => {
          this._inputRef = r;
        }}
      >
        {label && (
          <label>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="field-body">
          <div className="select-display-wrapper">
            <div className="select-display">
              {icon && <i className={icon} />}
              <input
                type="text"
                readOnly="true"
                value={((!multiple || selectSubLevel) && selectedOpt && selectedOpt.label) || placeholder}
                onClick={e => {
                  this.setState({ showDropdown: true });
                }}
                className={`fakeinput select form-control ${this.state.isFocus ? 'focus' : ''}`}
              />
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ showDropdown: true });
                }}
              >
                <span className={`icon-arrow-${this.state.showDropdown ? 'up' : 'down'}`} />
              </a>
            </div>

            {this._renderMultipleSelectedOpts()}

            <div className="dropdown-menu">
              {parentSelected && (
                <div className="back-parent">
                  <a
                    href="#"
                    onClick={event => {
                      event.preventDefault();
                      setTimeout(() => {
                        this.setState({ parentSelected: null });
                      }, 0);
                    }}
                  >
                    <i className="icon-arrow-left" />
                    <span>{parentSelected.label}</span>
                  </a>
                </div>
              )}
              <ul>
                {renderedDropdownOpts.map((opt, index) => (
                  <li key={`select-opt-${Select.idNumer}-${index}`}>
                    <a
                      href="#"
                      onClick={event => {
                        event.preventDefault();
                        this._onSelectOpt(opt);
                      }}
                    >
                      <span>{opt.label}</span>
                      {opt.children && opt.children.length && <i className="icon-arrow-right" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {showError && <div className="error-msg">{message}</div>}
        </div>
      </div>
    );
  }
}
