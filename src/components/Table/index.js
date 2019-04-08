/*
 * File: Table/index.js
 * Desc: generate table component what will be used in object page
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-07-22 01:21:59
 */
import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';
import CheckBox from '../CheckBox';
import DatePicker from '../DatePicker';
import './style.scss';

const _$ = window.jQuery;

export default class Table extends Base {
  static propsType = {
    pageTitle: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
    columns: PropTypes.shape([
      {
        field: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      }
    ]).isRequired,
    data: PropTypes.array.isRequired,
    renderFields: PropTypes.shape({ a: PropTypes.func.isRequired }).isRequired,
    allowEditRow: PropTypes.bool,
    showAddBtn: PropTypes.bool,
    showDateFilter: PropTypes.bool,
    onPageChange: PropTypes.func,
    addEditRow: PropTypes.func,
    deleteItems: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      pageSize: '25',
      page: 0,
      data: props.data,
      filtersSelected: {
        startDate: null,
        endDate: null
      }
    };
    this._openningFilter = '';
  }

  componentDidMount() {
    _$('#productsTable').DataTable();
    this._focused = [];
    _$('.date-filter .rdt > input')
      .on('focus', event => {
        this._focused.push(event.target);
        const height = _$(event.target).parents('span.start-date').length ? 340 : 400;
        _$('.date-filter .dropdown-menu').height(height);
      })
      .on('blur', event => {
        setTimeout(() => {
          if (this._focused.indexOf(event.target) > -1) {
            this._focused.splice(this._focused.indexOf(event.target), 1);
          }
          if (this._focused.length === 0 && _$('.date-filter .rdtOpen').length === 0) {
            _$('.date-filter .dropdown-menu').animate({ height: '20rem' });
          }
        }, 100);
      });
    document.addEventListener('click', this._handleDocumentClick);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick);
  }

  getPageSize = () => this.state.pageSize;

  _handleDocumentClick = event => {
    this._headerWrapper.querySelectorAll('.card-actions > li.dropdown').forEach(item => {
      if (!item.contains(event.target) && (this._openningFilter !== 'date' || _$('.date-filter .rdtOpen').length === 0)) {
        item.classList.remove('open');
      }
      return null;
    });

    if (!this._filterWrapper.contains(event.target) && !this._filterBtn.contains(event.target)) {
      this._toggleFilter(null, false);
    }
  };

  _toggleFilter = (event, show = undefined, clearText = false) => {
    if (event) event.preventDefault();
    const searchWraper = this._headerWrapper.querySelector('.card-search');
    if (show === undefined) {
      if (searchWraper.classList.contains('open')) {
        searchWraper.classList.remove('open');
      } else {
        searchWraper.classList.add('open');
      }
    } else if (show) searchWraper.classList.add('open');
    else {
      searchWraper.classList.remove('open');
      if (clearText) {
        this._searchRef.value = '';
        this._changePage();
      }
    }
  };

  _onDeleteItemsClick = event => {
    event.preventDefault();
    window
      .swal({
        title: this.t('components').table.title,
        text: this.t('components').table.text,
        icon: 'warning',
        dangerMode: true,
        buttons: {
          cancel: this.t('components').table.cancel,
          confirm: {
            text: this.t('components').table.delete,
            value: true,
            visible: true,
            className: '',
            closeModal: true
          }
        },
        closeOnConfirm: false,
        closeOnCancel: false
      })
      .then(value => {
        if (value && typeof this.props.deleteItems === 'function') {
          const deletedItems = this.props.data.filter(
            (item, index) => this.state.selectedRows.indexOf(index) > -1
          );
          this.props.deleteItems(deletedItems, this._handleDeleteFinished);
        }
      });
  };

  _handleDeleteFinished = success => {
    if (success) {
      this.setState({ selectedRows: [] }, () => {
        this._changePage();
      });
    }
  }

  _toggleDropdown = (event, field) => {
    event.preventDefault();
    const menuItem = event.target.parentElement;
    if (menuItem.classList.contains('open')) {
      menuItem.classList.remove('open');
      this._openningFilter = '';
    } else {
      this._openningFilter = field;
      menuItem.classList.add('open');
    }
  };

  _changePage = page => {
    if (typeof this.props.onPageChange === 'function') {
      const { pageSize, filtersSelected } = this.state;
      let extraQuery = Object.keys(filtersSelected).map(field => {
        if (filtersSelected[field]) {
          return `${field}=${filtersSelected[field]}`;
        }
        return null;
      });
      if (this._searchRef.value.trim()) {
        extraQuery.push(`keyword=${this._searchRef.value.trim()}`);
      }
      this.props.onPageChange(page || 0, pageSize, extraQuery.join('&').replace(/&$/g, ''));
    }
  };

  _renderEntriesSelectedMenu = () => {
    return this._renderColumnFilterMenu(
      'entries',
      { 10: '10', 25: '25', 50: '50', 100: '100' },
      this.state.pageSize,
      'zmdi zmdi-more-vert'
    );
  };

  _renderFilterFieldsMenu = () => {
    const { filterFields } = this.props;
    const filters = typeof filterFields === 'function' ? filterFields() : filterFields;
    return (filters || []).map(filter => {
      return this._renderColumnFilterMenu(
        filter.field,
        filter.options,
        this.state.filtersSelected[filter.field],
        undefined,
        true
      );
    });
  };

  _onFilterSelect = (field, value) => {
    let newState = { page: 0 };
    if (field === 'entries') {
      newState.pageSize = value;
    } else {
      const filtersSelected = Object.assign({}, this.state.filtersSelected);
      if (value === 'clear') delete filtersSelected[field];
      else filtersSelected[field] = value;
      newState.filtersSelected = filtersSelected;
    }
    this.setState(newState, () => this._changePage());
  };

  _renderColumnFilterMenu = (field, options, selected, icon, addClearOption = false) => {
    const { columns } = this.props;
    let columnLabels = { entries: this.t('components').table.entries };
    columns.map(col => {
      columnLabels[col.field] = col.label;
      return null;
    });
    const title = columnLabels[field];
    const openClass = this._openningFilter === field ? 'open ' : '';

    return (
      <li
        className={`${openClass}dropdown${field !== 'entries' && selected ? ' filtered' : ''}`}
        key={`filter-item-${field}`}
      >
        <a href="#" data-toggle="dropdown" onClick={event => this._toggleDropdown(event, field)}>
          {icon && <i className={icon} />}
          <span style={{ marginLeft: icon ? 0 : 10 }}>{title}</span>
        </a>

        <div className="filter-menu">
          <div className="dropdownjs country-icons">
            <ul className="dropdown-menu dropdown-menu-right">
              {addClearOption && (
                <li
                  className="withripple"
                  key={`table-filter-${field}-clear`}
                  onClick={() => this._onFilterSelect(field, 'clear')}
                >
                  {this.t('components').table.clear}
                </li>
              )}
              {Object.keys(options).map(option => {
                return (
                  <li
                    className={`withripple${selected === option ? ' selected' : ''}`}
                    key={`table-filer-${field}-${option}`}
                    onClick={() => this._onFilterSelect(field, option)}
                  >
                    {options[option]}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </li>
    );
  };

  _renderDateFilter = () => {
    if (this.props.showDateFilter) {
      const { filtersSelected } = this.state;
      const selected = filtersSelected.startDate || filtersSelected.endDate;
      const openClass = this._openningFilter === 'date' ? 'open ' : '';
      _$('.date-filter .dropdown-menu').animate({ height: '20rem' });

      return (
        <li
          className={`${openClass}date-filter dropdown${selected ? ' filtered' : ''}`}
          key="filter-item-by-date"
        >
          <a href="#" data-toggle="dropdown" onClick={event => this._toggleDropdown(event, 'date')}>
            <span style={{ marginLeft: 10 }}>{this.t('components').table.date}</span>
          </a>
          <div className="filter-menu">
            <div className="dropdownjs country-icons">
              <ul className="dropdown-menu dropdown-menu-right">
                <li>
                  <div className="form-group">
                    <span className="date-label">{this.t('components').table.from}</span>
                    <span className="start-date">
                      <DatePicker
                        showHour={false}
                        defaultCreatedAt={this.state.filtersSelected.startDate}
                        exportFormat="YYYY-MM-DD"
                        retrieveValue={value => {
                          let newFilters = { ...filtersSelected };
                          if (!value || value.toLowerCase() === 'invalid date') {
                            newFilters.startDate = null;
                            _$('.date-filter .dropdown-menu').animate({ height: '20rem' });
                          } else {
                            newFilters.startDate = value;
                          }

                          this.setState({ filtersSelected: newFilters }, () => {
                            this._changePage();
                          });
                        }}
                      />
                    </span>
                  </div>
                  <div className="form-group">
                    <span className="date-label">{this.t('components').table.to}</span>
                    <span className="end-date">
                      <DatePicker
                        showHour={false}
                        defaultCreatedAt={this.state.filtersSelected.endDate}
                        exportFormat="YYYY-MM-DD"
                        retrieveValue={value => {
                          let newFilters = { ...filtersSelected };
                          if (!value || value.toLowerCase() === 'invalid date') {
                            newFilters.endDate = null;
                            _$('.date-filter .dropdown-menu').animate({ height: '20rem' });
                          } else {
                            newFilters.endDate = value;
                          }
                          this.setState({ filtersSelected: newFilters }, () => {
                            this._changePage();
                          });
                        }}
                      />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      );
    }

    return null;
  };

  _handleFilterByFirstColum = event => {
    this._changePage();
  };

  _renderHeader = () => {
    return (
      <header
        className="card-heading"
        ref={r => {
          this._headerWrapper = r;
        }}
      >
        <h2 className="card-title">{this.props.pageTitle}</h2>
        <div
          className="card-search"
          ref={r => {
            this._filterWrapper = r;
          }}
        >
          <div className="form-group label-floating">
            <i className="zmdi zmdi-search search-icon-left" />
            <input
              type="text"
              className="form-control filter-input"
              placeholder={`${this.props.searchPlaceHolder}...`}
              autoComplete="off"
              ref={r => {
                this._searchRef = r;
              }}
              onKeyUp={this._handleFilterByFirstColum}
            />
            <a
              href="#"
              className="close-search"
              title="Close"
              onClick={event => {
                event.preventDefault();
                this._toggleFilter(null, false, true);
              }}
            >
              <i className="zmdi zmdi-close" />
            </a>
          </div>
        </div>
        <ul className="card-actions icons right-top">
          <li
            id="deleteItems"
            style={{ display: this.state.selectedRows.length > 0 ? 'inline-block' : 'none' }}
          >
            <span className="label label-info pull-left m-t-5 m-r-10 text-white">
              {this.state.selectedRows.length} {this.t('components').table.itemsSelected}
            </span>
            <a href="#" onClick={this._onDeleteItemsClick}>
              <i className="zmdi zmdi-delete" />
            </a>
          </li>
          <li
            ref={r => {
              this._filterBtn = r;
            }}
          >
            <a href="#" onClick={this._toggleFilter}>
              <i className="zmdi zmdi-filter-list" />
            </a>
          </li>
          {this._renderEntriesSelectedMenu()}
          {this._renderFilterFieldsMenu()}
          {this._renderDateFilter()}
          <li>
            <a href="#" data-toggle="tooltip" data-placement="top" data-original-title="Export All">
              <i className="zmdi zmdi-inbox" />
            </a>
          </li>
        </ul>
      </header>
    );
  };

  _toggleSelectAll = checked => {
    let selectedRows = [];
    if (checked) {
      for (let i = 0; i < this.props.data.length; i++) {
        selectedRows.push(i);
      }
    }
    this.setState({ selectedRows });
  };

  _addEditRow = (event, item = null) => {
    if (event) event.preventDefault();
    if (typeof this.props.addEditRow === 'function') {
      this.props.addEditRow(item);
    }
  };

  _renderTableHeader = () => {
    const { columns, renderFields } = this.props;
    const { data, selectedRows } = this.state;
    const labels = (columns || []).map(col => col.label);
    const fields = (columns || []).map(col => col.field);

    return (
      <thead>
        <tr>
          <th data-orderable="false" className="col-xs-1">
            <CheckBox
              onChange={this._toggleSelectAll}
              checked={selectedRows.length > 0 && selectedRows.length === data.length}
            />
          </th>
          {labels.map((fieldLabel, index) => (
            (typeof renderFields[fields[index]] === 'function') && (
              <th
                data-orderable="false"
                className={`col-xs-${columns[index].size || 1}`}
                key={`col-header-${index}`}
              >
                {fieldLabel}
              </th>
            )
          ))}
          {(this.props.showAddBtn || this.props.allowEditRow) && (
            <th data-orderable="false" className="col-xs-1">
              {this.props.showAddBtn && (
                <button
                  className="btn btn-primary btn-fab  animate-fab"
                  onClick={event => this._addEditRow()}
                >
                  <i className="zmdi zmdi-plus" />
                </button>
              )}
            </th>
          )}
        </tr>
      </thead>
    );
  };

  _getColumnData = (field, row) => {
    const fieldArray = field.split('.');
    let fieldValue = row ? Object.assign({}, row) : {};
    while (fieldArray.length > 0) {
      const subField = fieldArray.shift();
      fieldValue = fieldValue[subField];
      if (!(fieldValue instanceof Object)) {
        break;
      }
    }

    if (fieldArray.length > 0) {
      fieldValue = undefined;
    }

    return fieldValue;
  }

  _renderRow = (row, rIndex) => {
    const { columns, renderFields, allowEditRow } = this.props;
    const fields = (columns || []).map(col => col.field);
    const onSelectedChange = checked => {
      const { selectedRows } = this.state;
      let newSelectedRow = [...selectedRows];
      if (checked) newSelectedRow.push(rIndex);
      else newSelectedRow.splice(newSelectedRow.indexOf(rIndex), 1);
      this.setState({ selectedRows: newSelectedRow });
    };

    return (
      <tr key={`table-row-${rIndex}`}>
        <td className="checkbox-cell">
          <CheckBox
            checked={this.state.selectedRows.indexOf(rIndex) > -1}
            onChange={onSelectedChange}
          />
        </td>
        {fields.map((field, index) => (
          (typeof renderFields[field] === 'function') && ( 
            <td key={`col-${rIndex}-${index}`} className={`col-${field.toLowerCase()}`}>
              {renderFields[field](this._getColumnData(field, row), row)}
            </td>
          )
        ))}
        {allowEditRow && (
          <td>
            <a
              href="#"
              className="edit-product icon"
              onClick={event => this._addEditRow(event, row)}
            >
              <i className="zmdi zmdi-edit" />
            </a>
          </td>
        )}
      </tr>
    );
  };

  _renderTableBody = () => {
    const data = this.state.data;
    return <tbody>{data.map((row, index) => this._renderRow(row, index))}</tbody>;
  };

  _renderpagination = () => {
    const { total } = this.props;
    const { pageSize, page } = this.state;
    const pageArray = [];
    for (let i = 0; i < Math.ceil(total / pageSize); i++) {
      pageArray.push(i);
    }

    return (
      <div className="pagination">
        <button
          className={`mdl-button previous${page === 0 ? ' disabled' : ''}`}
          id="productsTable_previous"
          disabled={page === 0 ? 'disabled' : ''}
          onClick={() => {
            this.setState({ page: page - 1 }, () => {
              this._changePage(page - 1);
            });
          }}
        >
          {this.t('components').table.previous}
        </button>
        {pageArray.map(index => (
          <button
            className={`mdl-button${
              page === index ? ' mdl-button--raised mdl-button--colored' : ''
            }`}
            key={`page-${index}`}
            onClick={() => {
              this.setState({ page: index }, () => {
                this._changePage(index);
              });
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`mdl-button next${page === pageArray.length - 1 ? ' disabled' : ''}`}
          id="productsTable_next"
          disabled={page === pageArray.length - 1 ? 'disabled' : ''}
          onClick={() => {
            this.setState({ page: page + 1 }, () => {
              this._changePage(page + 1);
            });
          }}
        >
          {this.t('components').table.next}
        </button>
      </div>
    );
  };

  _renderFooter = () => {
    const { page, pageSize } = this.state;
    const { total } = this.props;
    const { data } = this.state;
    const start = page * pageSize;
    const displayStatusText = this.t('components').table.displayStatusText;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col">
          <div className="dataTables_info" id="productsTable_info" role="status" aria-live="polite">
            {displayStatusText
              .replace('%start', start)
              .replace('%end', start + data.length)
              .replace('%total', total)}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--8-col">
          <div className="dataTables_paginate paging_simple_numbers" id="productsTable_paginate">
            {this._renderpagination()}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="card card-data-tables product-table-wrapper">
        {this._renderHeader()}
        <div className="card-body p-0">
          <div className="table-responsive">
            <div className="dataTables_wrapper form-inline dt-material no-footer">
              <div className="mdl-grid" />
              <div className="mdl-grid dt-table">
                <table className="mdl-data-table product-table m-t-30" cellSpacing="0" width="100%">
                  {this._renderTableHeader()}
                  {this._renderTableBody()}
                </table>
              </div>
              {this._renderFooter()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
