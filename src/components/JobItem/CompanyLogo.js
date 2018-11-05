import React from 'react';

export default class CompanyLogo extends React.Component {
  state = {
    naturalWidth: 0,
    naturalHeight: 0
  };

  render() {
    const { src, alt } = this.props;
    let style = {};
    const { naturalHeight, naturalWidth } = this.state;
    style = { width: '100%', height: 'auto' };
    if (naturalHeight > naturalWidth) {
      style = { height: '100%', width: 'auto' };
    }
    if (!src) return null;

    return (
      <img
        style={style}
        src={src}
        alt={alt || ''}
        ref={r => {
          this._ref = r;
        }}
        onLoad={event => {
          const img = event.target;
          this.setState({ naturalHeight: img.naturalHeight, naturalWidth: img.naturalWidth });
        }}
      />
    );
  }
}
