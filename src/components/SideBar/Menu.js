/*
 * File: SideBar/Menu.js
 * Desc: generate left sidebar menu
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-07 13:30:22
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const _$ = window.jQuery.noConflict();

export default class Menu extends PureComponent {
  static propsType = {
    level: PropTypes.number
  };

  static defaultProps = {
    level: 0
  };

  componentDidMount() {
    _$('> li > a', this._wrapper).on('click', event => {
      const currentActive = _$('> li.active', this._wrapper);
      const href = event.target.getAttribute('href');
      if (href === '#') {
        event.preventDefault();
        const menuItem = _$(event.target).parents('li:first');

        if (!currentActive.is(menuItem)) {
          if (currentActive.length > 0) {
            _$('> ul', currentActive)
              .stop()
              .slideUp('fast');
            currentActive.removeClass('active');
          }
        }

        if (_$('> ul', menuItem).length > 0) {
          if (menuItem.hasClass('active')) {
            _$('> ul', menuItem)
              .stop()
              .slideUp('fast', () => {
                menuItem.removeClass('active');
              });
          } else {
            menuItem.addClass('active');
            _$('> ul', menuItem)
              .stop()
              .slideDown('fast');
          }
        }
      }
    });

    const $activeEl = _$('> li.active', this._wrapper);
    const isHiddenEl = $activeEl.css('display') === 'none';
    $activeEl.parents('.menu-item').addClass('active');
    _$('> li.active', this._wrapper)
      .parents(`ul.sub-menu${isHiddenEl ? ':not(:first)' : ''}`)
      .show();
  }

  _renderMenuItem = (item, index) => {
    const { link, title, children, icon, show } = item;
    const currentPath = window.location.pathname;
    const links = (_.isArray(link) && link) || [link];
    const trimmedLinks = links.map(url => url.replace(/^[^/]\/$/g, ''));

    return (
      <li
        className={`menu-item${trimmedLinks.indexOf(currentPath) > -1 ? ' active' : ''}`}
        key={`menu-item-${this.props.level + 1}-${index}`}
        style={show === false ? { display: 'none' } : null}
      >
        <a href={trimmedLinks[0] || '#'}>
          {icon
            && icon.name && (
              <span className="icon-wrapper" style={{ backgroundColor: icon.bgColor }}>
                <i className={icon.name} />
              </span>
          )}
          {title}
        </a>
        {children && children.length > 0 && <Menu items={children} level={this.props.level + 1} />}
      </li>
    );
  };

  render() {
    const { items, level } = this.props;

    if (items && items.length > 0) {
      return (
        <ul
          className={level === 0 ? 'sidebar-menu' : 'sub-menu'}
          ref={r => {
            this._wrapper = r;
          }}
        >
          {items.map((item, index) => this._renderMenuItem(item, index))}
        </ul>
      );
    }

    return null;
  }
}
