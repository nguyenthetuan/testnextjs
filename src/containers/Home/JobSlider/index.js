/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-27 12:54:11
 */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Base } from '../../../components';
import './style.scss';

const _$ = window.jQuery;

export default class JobSlider extends Base {
  static propsType = {
    showItems: PropTypes.number || PropTypes.object,
    scrollItems: PropTypes.number,
    groupSize: PropTypes.number,
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  static defaultProps = {
    showItems: 1,
    scrollItems: 1,
    groupSize: 1,
    itemsPerLine: 1,
    loading: false,
    showdots: true
  };

  static IDNumber = 0;

  constructor(props) {
    super(props);
    this._id = ++JobSlider.IDNumber;
    this.state = {
      screenMode: this._updateScreenMode(true)
    };
  }

  componentDidMount() {
    // this._slideChanges();
    window.addEventListener('resize', () => {
      // if (this.props.fixedWidth) {
      //   Array.from(this._wrapper.querySelectorAll('.job-item-wrapper')).map(item => {
      //     const itemWidth = window.innerWidth / (this.props.showItems || 1);
      //     item.style = `width: ${itemWidth - 20}px;`;
      //   });
      //   this._slideChanges(100);
      // }
      // set screen mode:
      // this._updateScreenMode();
    });
  }

  _updateScreenMode = (getModeOnly = false) => {
    const screenSize = window.innerWidth;
    let screenMode = 'default';
    if (screenSize < 992 && screenSize >= 768) {
      screenMode = 'tablet';
    } else if (screenSize < 768 && screenSize >= 480) {
      screenMode = 'mobile';
    } else if (screenSize < 480) {
      screenMode = 'extraMobile';
    }
    if (!getModeOnly && this.state.screenMode !== screenMode) {
      this.setState({ screenMode });
    }

    return screenMode;
  };

  _slideChanges = (timeout = 0) => {
    if (this.props.fixedWidth) {
      setTimeout(() => {
        const track = this._wrapper.querySelector('.slick-track');
        const style = track.getAttribute('style');
        const transX = /.*\((-?[0-9]*)px,.*/.exec(style);
        if (transX && transX[1]) {
          track.style = style.replace(transX[1], parseInt(transX[1], 10) - 20);
        }
        const activeSlides = track.querySelectorAll('.slick-active');
        const { showItems } = this.props;
        const { screenMode } = this.state;
        const showNumber = typeof showItems === 'object' ? showItems[screenMode] || showItems.default : showItems;
        const lastItem = activeSlides[(showNumber || 1) - 1].querySelector('.job-item-wrapper');
        if (lastItem) {
          const cssText = lastItem.style.getPropertyValue('cssText');
          lastItem.style = `border-right: none; ${cssText}`;
        }

        const firstItem = activeSlides[0].previousElementSibling();
      }, timeout);
    }

    if (typeof this.props.afterChange === 'function') {
      this.props.afterChange();
    }
  };

  _renderGroupItem = (groups, gIndex) => {
    const { renderItem } = this.props;

    return (
      <div className="slide" key={`slide-group-${this._id}-${gIndex}`}>
        <div className="slide-group-items">
          {groups.map((item, index) => (
            <div className={`slide-item-wrapper${item === undefined ? ' empty-item' : ''}`} key={`slide-group-${this._id}-${gIndex}-${index}`}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  _renderItems = () => {
    const { data, renderItem, groupSize, itemsPerLine } = this.props;
    let renderedItems = [];
    if (groupSize <= 1) {
      renderedItems = (data || []).map((item, index) => (
        <div className="slide" key={`slide-${this._id}-${index}`}>
          {renderItem(item)}
        </div>
      ));
    } else {
      const renderingData = [...(data || [])];
      let gIndex = 0;

      while (renderingData.length > 0) {
        const groupItems = renderingData.splice(0, groupSize);
        if (renderingData.length && renderingData.length < groupSize) {
          const modulus = renderingData.length % itemsPerLine;
          for (let i = 0; i < itemsPerLine - modulus; i++) {
            renderingData.push(undefined);
          }
        }
        renderedItems.push(this._renderGroupItem(groupItems, ++gIndex));
      }
    }

    return renderedItems;
  };

  render() {
    const { showItems, scrollItems, className, data, loading, showdots, responsive, autoplay } = this.props;
    const { screenMode } = this.state;

    if ((data || []).length === 0 || loading) {
      return null;
    }

    const showNumber = typeof showItems === 'object' ? showItems[screenMode] || showItems.default : showItems;

    const settings = {
      dots: showdots,
      infinite: true,
      speed: 500,
      slidesToShow: showNumber,
      slidesToScroll: scrollItems,
      // afterChange: this._slideChanges,
      responsive,
      autoplay
    };
    const wrapperClasses = ['job-slider-block'];
    if (className) wrapperClasses.push(className);

    return (
      <div
        className={wrapperClasses.join(' ')}
        ref={r => {
          this._wrapper = r;
        }}
      >
        <Slider {...settings}>{this._renderItems()}</Slider>
      </div>
    );
  }
}
