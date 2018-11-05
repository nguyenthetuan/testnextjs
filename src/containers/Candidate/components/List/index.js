/*
 * File: Candidate/List
 * Desc: generate list componen for candidate pages
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-12 09:33:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Base, Input, Pagination } from '../../../../components';
import './style.scss';

export default class List extends Base {
  static defaultProps = {
    header: PropTypes.Component || PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    data: PropTypes.shape([{}]).isRequired,
    onPageChange: PropTypes.func,
    pageSize: PropTypes.number,
    totalEntries: PropTypes.number
  };

  static defaultProps = {
    pageSize: 10,
    totalEntries: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentPage !== nextProps.page) {
      this.setState({ currentPage: nextProps.page });
    }
  }

  _nextPage = () => {
    const { currentPage } = this.state;
    const { onPageChange, pageSize, data, totalEntries } = this.props;
    const lengthItemTotal = totalEntries || (data || []).length;
    const totalPage = Math.ceil(lengthItemTotal / pageSize);

    if (currentPage + 1 <= totalPage) {
      this.setState({ currentPage: currentPage + 1 }, () => {
        if (typeof onPageChange === 'function') {
          onPageChange(this.state.currentPage);
        }
      });
    }
  };

  _prevPage = () => {
    const { currentPage } = this.state;
    const { onPageChange } = this.props;

    if (currentPage - 1 > 0) {
      this.setState({ currentPage: currentPage - 1 }, () => {
        if (typeof onPageChange === 'function') {
          onPageChange(this.state.currentPage);
        }
      });
    }
  };

  _changePage = page => {
    if (page !== this.state.currentPage) {
      this.setState({ currentPage: page }, () => {
        if (typeof this.props.onPageChange === 'function') {
          this.props.onPageChange(this.state.currentPage);
        }
      });
    }
  };

  _renderPagination = () => {
    const { data, pageSize, totalEntries } = this.props;
    const lengthItemTotal = totalEntries || (data || []).length;

    const totalPage = Math.ceil(lengthItemTotal / pageSize);

    if (totalPage <= 1) return null;

    if (totalPage > 10) {
      return (
        <div className="pagination-wrapper">
          <span className="title">{this.t('Trang')}</span>
          <span className="page-control-wrapper input-control">
            <Input
              value={this.state.currentPage}
              type="number"
              onChange={value => {
                let currentPage = parseInt(value, 10);
                if (currentPage < 1) currentPage = 1;
                else if (currentPage > totalPage) currentPage = totalPage;
                this._changePage(currentPage);
              }}
            />
          </span>
          <span className="total-page">{` / ${totalPage}`}</span>
        </div>
      );
    }

    let pageArray = [];
    for (let i = 1; i <= totalPage; i++) {
      pageArray.push(i);
    }

    return (
      <div className="pagination-wrapper">
        {this.state.currentPage > 1 && (
          <div className="page-item">
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this._prevPage();
              }}
            >
              <i className="icon-arrow-left" />
            </a>
          </div>
        )}
        {pageArray.map(page => (
          <div className={`page-item${page === this.state.currentPage ? ' active' : ''}`} key={`list-page-${page}`}>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this._changePage(page);
              }}
            >
              {page}
            </a>
          </div>
        ))}
        {this.state.currentPage < totalPage && (
          <div className="page-item">
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this._nextPage();
              }}
            >
              <i className="icon-arrow-right" />
            </a>
          </div>
        )}
      </div>
    );
  };

  _renderListFooter = () => {
    const { data, pageSize, totalEntries } = this.props;
    const lengthItemTotal = totalEntries || (data || []).length;
    const totalPage = Math.ceil(lengthItemTotal / pageSize);

    if (totalPage > 1 || this.props.showFooter) {
      return (
        <div className="list-footer">
          <Pagination
            currentPage={this.state.currentPage - 1}
            total={lengthItemTotal}
            numberPerPage={pageSize}
            onChangePage={page => {
              this._changePage(page + 1);
            }}
          />
        </div>
      );
    }

    return null;
  };

  _renderListBody = () => {
    const { renderItem, data, emptyMessage } = this.props;

    if (data.length === 0) {
      return (
        <div className="list-empty">
          <img src="/assets/img/empty.png" alt="" />
          {emptyMessage && <div className="empty-message">{this.t(emptyMessage)}</div>}
        </div>
      );
    }

    return data.map((item, index) => {
      const renderedItem = renderItem(item, index);

      if (!renderedItem) {
        return null;
      }

      return (
        <div className="list-item-wrapper" key={`list-item-${index}`}>
          {renderedItem}
        </div>
      );
    });
  };

  render() {
    const { header, data } = this.props;
    const renderedHeader = typeof header === 'function' ? header() : header;

    return (
      <div className="jn-list-wrapper">
        <div className="list-header">{renderedHeader}</div>
        <div className={`list-body${data.length > 0 ? ' has-data' : ''}`}>{this._renderListBody()}</div>
        {this._renderListFooter()}
      </div>
    );
  }
}
