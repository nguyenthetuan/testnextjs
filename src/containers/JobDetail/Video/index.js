/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-31 18:10:16
 */
import React from 'react';
import { Base } from '../../../components';

export default class Video extends Base {
  _generatePlayURL = () => {
    const { url } = this.props;
    const matches = /^.*?(?:youtube\.com\/(?:watch\?v=|embed)\/?|\/vimeo\.com\/|player\.vimeo\.com\/video\/|instagram\.com\/p\/)(.*?)\/?$/.exec(this.props.url);
    if (matches && matches[1]) {
      if (url && url.indexOf('youtu') > -1) {
        return { type: 'youtube', url: `https://www.youtube.com/embed/${matches[1]}?modestbranding=1&autohide=1&showinfo=0&controls=0` };
      }
      if (url && url.indexOf('vimeo') > -1) {
        const vimeoMatch = /.*\/(.*)$/.exec(matches[1]);
        if (vimeoMatch && vimeoMatch[1]) return { type: 'vimeo', url: `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0` };
      }
    }

    return false;
  };

  render() {
    const playURL = this._generatePlayURL();
    if (playURL === false) return null;
    return (
      <div className="embed-responsive embed-responsive-16by9">
        {playURL.type === 'youtube' && <iframe title="intro-video" className="embed-responsive-item" src={playURL.url} allowFullScreen />}
        {playURL.type === 'vimeo' && [<iframe title="introvideo" src={playURL.url} key="intro-vimeo" />, <script src="https://player.vimeo.com/api/player.js" key="vimeo-script" />]}
      </div>
    );
  }
}
