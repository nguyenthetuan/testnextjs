import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import './style.scss';

export default class Pagination extends Component {
  static propTypes = {
    total: PropTypes.number,
    currentCount: PropTypes.number,
    numberPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    initialPage: PropTypes.number,
    className: PropTypes.node,
    onChangePage: PropTypes.func
  };

  static defaultProps = {
    currentPage: 0,
    total: 0,
    currentCount: 0,
    numberPerPage: 15,
    initialPage: 0,
    className: '',
    onChangePage: () => {}
  };

  _handlePageClick = data => {
    if (data.selected === -1) return;
    this.props.onChangePage(data.selected);
  };

  _renderInfo() {
    let start = 1 + this.props.currentPage * this.props.numberPerPage;
    let end = this.props.currentCount + this.props.currentPage * this.props.numberPerPage;

    return (
      <div className="pagination-info">
        Hiển thị{' '}
        <span>
          {start} - {end} / {this.props.total}
        </span>{' '}
        kết quả
      </div>
    );
  }

  render() {
    if (this.props.total === 0) {
      return null;
    }
    let pageRangeDisplayed = window.innerWidth >= 450 ? 3 : 1;
    return (
      <div className={`pagination-wrap ${this.props.className}`}>
        <ReactPaginate
          forcePage={this.props.currentPage}
          pageCount={Math.ceil(this.props.total / this.props.numberPerPage)}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={pageRangeDisplayed}
          onPageChange={this._handlePageClick}
          nextLabel={<i className="icon-arrow-right" />}
          previousLabel={<i className="icon-arrow-left" />}
          breakLabel={<a className="page-link">...</a>}
          breakClassName="page-item disabled"
          containerClassName="jn-pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          disabledClassName="disabled"
          initialPage={this.props.initialPage}
        />
      </div>
    );
  }
}
