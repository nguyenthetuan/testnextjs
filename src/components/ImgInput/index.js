import uuidv4 from 'uuid/v4';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// API & utils
// import { imageApi } from '../../../services';
import { getFileBase64, getImageBase64KeepFileType } from '../../utils/file';

export default class ImgInput extends React.Component {
  static propTypes = {
    autoConvertToJPG: PropTypes.bool,
    multiple: PropTypes.bool,
    onUpload: PropTypes.func.isRequired
  };

  static defaultProps = {
    autoConvertToJPG: true,
    multiple: false
  };

  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  setKeyForImageFile = files => {
    const filesObject = {};
    files.map(file => {
      const key = uuidv4();
      Object.assign(filesObject, { [key]: file });
    });
    return filesObject;
  };

  getFileKeyArray = files => {
    return files.map(file => uuidv4());
  };

  uploadImageFromFiles = files => {
    files = this.setKeyForImageFile([...files]);
    const convertToBase64 = this.props.autoConvertToJPG ? getFileBase64 : getImageBase64KeepFileType;
    if (typeof this.props.preProcessUpload === 'function') {
      this.props.preProcessUpload(Object.keys(files));
    }
    Object.keys(files).map(key => {
      let requiredFiles = ['image/jpg', 'image/gif', 'image/png', 'image/jpeg'];
      if (files && requiredFiles.indexOf(files[key].type) > -1) {
        convertToBase64(files[key]).then(data => {
          if (typeof this.props.getImageBase64 === 'function') {
            this.props.getImageBase64(files, key);
          }
          // Upload trong nay luon...
          this.props.onUpload('', key);
          // imageApi.uploadImage({
          //   data,
          //   onSuccess: res => {
          //     this.props.onUpload(res.image_url, key);
          //   },
          //   onProgress: percent => {
          //     if (typeof this.props.onImageProgress === 'function') {
          //       this.props.onImageProgress(percent, key);
          //     }
          //   }
          // });
        });
      } else {
        setTimeout(() => this.props.onError(key), 0);
      }
    });
  };

  uploadImage = e => {
    e.preventDefault();
    this.uploadImageFromFiles(e.target.files);
    e.target.value = null;
  };

  openFileBrowser = () => {
    this.inputRef.click();
  };

  render() {
    return (
      <input
        ref={c => {
          this.inputRef = c;
        }}
        type="file"
        name="file[]"
        id="coverInput"
        style={{ display: 'none' }}
        accept=".png,.jpeg,.jpg,.gif"
        onChange={e => this.uploadImage(e)}
        multiple={this.props.multiple}
      />
    );
  }
}
