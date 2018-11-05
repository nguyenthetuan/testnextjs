/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-24 10:44:53
 */
import React from 'react';
import _ from 'lodash';
import { Base, CheckBox, AddressInput } from '../../../../components';
import './style.scss';

export default class WorkLocation extends Base {
  static idNumber = 0;

  constructor(props) {
    super(props);
    this._id = WorkLocation.idNumber++;
    const { values } = props;
    const hasCompanyAddress = values && values[0] && values[0].companyAddress !== undefined;
    const cpnAddress = hasCompanyAddress ? { ...values.slice(0, 1)[0] } : null;
    const otherLocations = cpnAddress ? [...values.slice(1)] : [...values] || [];

    if (otherLocations.length === 0) {
      otherLocations.push({
        district: undefined,
        province: undefined
      });
    }

    this._addrRef = [];

    this.state = {
      otherLocations: otherLocations,
      showError: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { values } = nextProps;
    const isCompanyAddress = values && values[0] && values[0].companyAddress !== undefined;
    const cpnAddress = isCompanyAddress ? values.slice(0, 1)[0] : null;
    const otherLocations1 = cpnAddress ? values.slice(1) : values || [];

    if (isCompanyAddress) {
      this.setState({
        otherLocations: otherLocations1
      });
    }
  }

  validate = () => {
    let ret = true;
    this._addrRef.map(addrRef => {
      const elRet = addrRef.validate();
      if (elRet === false) {
        ret = false;
      }
    });

    return ret;
  };

  showError = () => {
    const { otherLocations } = this.state;
    const locations = otherLocations.filter(loc => loc.province && loc.district);

    if (locations.length === 0) {
      this.setState({ showError: true });
      return true;
    }

    return false;
  };

  _changeValues = () => {
    if (typeof this.props.onChange === 'function') {
      const { otherLocations } = this.state;
      const locations = otherLocations.filter(loc => loc.province && loc.district);
      if (this.state.showError && locations.length) {
        this.setState({ showError: false });
      }
      this.props.onChange([...otherLocations]);
    }
  };

  _addLocation = event => {
    event.preventDefault();
    const { otherLocations } = this.state;
    this.setState({
      otherLocations: [...otherLocations, { district: undefined, province: undefined, companyAddress: false }]
    });
  };

  _removeLocation = (event, index) => {
    event.preventDefault();
    const { otherLocations } = this.state;
    this.setState(
      {
        otherLocations: [...otherLocations.slice(0, index), ...otherLocations.slice(index + 1)]
      },
      this._changeValues
    );
  };

  render() {
    const { label, required, locations, className, addMoreLabel, errorMessage } = this.props;
    const { otherLocations, showError } = this.state;

    return (
      <div className={['jn-work-location form-group', className].join(' ')}>
        {label && (
          <label>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="field-body">
          {otherLocations.map((location, index) => {
            return (
              <div className="location-item" key={`work-loc-${this._id}-${index}`}>
                <AddressInput
                  value={location}
                  locations={locations}
                  disableStreet
                  showAllDistrictOpt
                  onChange={address => {
                    delete address.street;
                    this.setState(
                      {
                        otherLocations: [...otherLocations.slice(0, index), address, ...otherLocations.slice(index + 1)]
                      },
                      this._changeValues
                    );
                  }}
                  ref={r => {
                    this._addrRef[index] = r;
                  }}
                />
                <a
                  href="#"
                  className="icon-jn-remove"
                  onClick={event => {
                    this._removeLocation(event, index);
                  }}
                >
                  <span className="path1" />
                  <span className="path2" />
                </a>
              </div>
            );
          })}
          <div className="add-more-wrapper">
            <a href="#" onClick={this._addLocation}>
              <span className="icon-location-pin" />
              <span className="add-more-text">{addMoreLabel}</span>
            </a>
          </div>
        </div>
        {errorMessage &&
          required &&
          showError && (
            <div id="job_require-error" className="help-block">
              {errorMessage}
            </div>
          )}
      </div>
    );
  }
}
