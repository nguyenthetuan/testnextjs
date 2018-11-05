import React from 'react';
import Base from '../Base';
import './style.scss';

export default class Input extends Base {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      isFocused: false,
      showPassword: false,
      errorMessage: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value }, this._updateTextAreaHeight);
    }
  }

  showError = message => {
    this.setState({ errorMessage: message });
  };

  _updateTextAreaHeight = event => {
    if (this.props.multiline) {
      setTimeout(() => {
        if (this._textArea) {
          this._textArea.style = 'height:auto; overflow: auto';
          this._textArea.style = `height: ${this._textArea.scrollHeight}px`;
        }
      }, 0);
    }

    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
  };

  _renderTextArea = () => {
    const { onChange, name, width, minlength, maxlength } = this.props;
    setTimeout(this._updateTextAreaHeight, 100);
    return (
      <div className="input-wrapper">
        <textarea
          name={name}
          id={name}
          className="form-control"
          style={width ? { width } : {}}
          minLength={minlength}
          maxLength={maxlength}
          onKeyDown={this._updateTextAreaHeight}
          onChange={event => {
            const textVal = event.nativeEvent.target.value;
            let newState = { value: textVal };
            if (textVal !== this.state.value && this.state.errorMessage) {
              newState.errorMessage = null;
            }
            this.setState(newState, () => {
              if (textVal) {
                this._wrapper.classList.remove('is-empty');
              } else {
                this._wrapper.classList.add('is-empty');
              }
              if (typeof onChange === 'function') {
                onChange(textVal);
              }
            });
          }}
          value={this.state.value || ''}
          onFocus={() => {
            this._wrapper.classList.add('is-focused');
          }}
          onBlur={() => {
            this._wrapper.classList.remove('is-focused');
          }}
          ref={r => {
            this._textArea = r;
          }}
        />
      </div>
    );
  };

  _renderInput = () => {
    const { type, onChange, name, width, minlength, maxlength } = this.props;
    const { showPassword, value, errorMessage } = this.state;
    return (
      <div className={`input-wrapper input-${type || 'text'}`}>
        <input
          type={showPassword && value ? 'text' : type}
          name={name}
          id={name}
          className="form-control"
          style={width ? { width } : {}}
          minLength={minlength}
          maxLength={maxlength}
          readOnly={this.props.readOnly}
          onChange={event => {
            const textVal = event.nativeEvent.target.value;
            let newState = { value: textVal };
            if (textVal !== this.state.value && this.state.errorMessage) {
              newState.errorMessage = null;
            }
            this.setState(newState, () => {
              if (textVal) {
                this._wrapper.classList.remove('is-empty');
              } else {
                this._wrapper.classList.add('is-empty');
              }
              if (typeof onChange === 'function') {
                onChange(textVal);
              }
            });
          }}
          value={this.state.value || ''}
          onFocus={() => {
            this._wrapper.classList.add('is-focused');
          }}
          onBlur={() => {
            this._wrapper.classList.remove('is-focused');
          }}
          onKeyDown={this.props.onKeyDown}
        />
        {type === 'number' && (
          <div className="step-controls">
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                const parsedVal = (this.state.value && parseInt(this.state.value, 10)) || 0;
                this.setState({ value: `${parsedVal + 1}` });
                if (typeof onChange === 'function') {
                  onChange(`${parsedVal + 1}`);
                }
              }}
            >
              <span className="jn-awesome-caret-up" />
            </a>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                const parsedVal = (this.state.value && parseInt(this.state.value, 10)) || 0;
                this.setState({ value: `${parsedVal - 1}` });
                if (typeof onChange === 'function') {
                  onChange(`${parsedVal - 1}`);
                }
              }}
            >
              <span className="jn-awesome-caret-down" />
            </a>
          </div>
        )}
        {type === 'password' && (
          <a
            href="#"
            onMouseDown={event => {
              event.preventDefault();
              this.setState({ showPassword: true });
            }}
            onMouseUp={event => {
              event.preventDefault();
              this.setState({ showPassword: false });
            }}
            onClick={event => {
              event.preventDefault();
            }}
          >
            <i className={`icon-eye${value && !showPassword ? ' active' : ''} `} />
          </a>
        )}
        {errorMessage && (
          <div className="error-msg" style={{ display: 'block' }}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { placeholder, floatingLabel, required, rightComponent, multiline } = this.props;
    const { value } = this.state;
    let wrapperClasses = ['jn-input-wrapper form-group', floatingLabel ? 'label-floating' : 'left-label'];

    if (rightComponent) {
      wrapperClasses.push('has-right-col');
    }

    if (!value) {
      wrapperClasses.push('is-empty');
    }

    return (
      <div
        className={wrapperClasses.join(' ')}
        ref={r => {
          this._wrapper = r;
        }}
      >
        {placeholder && (
          <label className="control-label">
            {this.t(placeholder)}
            {required && <span className="required">*</span>}
          </label>
        )}
        {multiline ? this._renderTextArea() : this._renderInput()}
        {rightComponent || null}
      </div>
    );
  }
}
