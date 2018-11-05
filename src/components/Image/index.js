import React from 'react';

export default class Image extends React.Component {
  state = {
    naturalHeight: 0,
    naturalWidth: 0
  };

  render() {
    const { src, alt, scaleToFit, ratio } = this.props;
    let style = {};
    if (scaleToFit && ratio) {
      const { naturalHeight, naturalWidth } = this.state;
      if (naturalHeight) {
        const ratioHeight = naturalWidth / ratio;
        if (ratioHeight < naturalHeight) {
          style = { width: '100%', height: 'auto' };
        } else {
          style = { height: '100%', width: 'auto' };
        }
      }
    }

    return (
      <img
        src={src}
        alt={alt || ''}
        style={style}
        onLoad={event => {
          const { naturalWidth, naturalHeight } = event.target;
          this.setState({ naturalHeight, naturalWidth });
        }}
      />
    );
  }
}
