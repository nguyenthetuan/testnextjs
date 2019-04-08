/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-08-20 22:30:47
 */
import React from 'react';
import Base from '../Base';
import Select from '../Select';
import Input from '../Input';
import './style.scss';

export default class AddressInput extends Base {
  constructor(props) {
    super(props);
    const { province, district, street, _id } = props.value || {};
    this.state = {
      province: [{ value: province || undefined, label: province || this.t('components').AddressInput.citiesOpts.city }],
      district: [{ value: district || (_id && -1) || undefined, label: district || (_id && this.t('components').AddressInput.citiesOpts.district) || this.t('components').AddressInput.citiesOpts.district }],
      street: street || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = { ...this.state };
    const currentProvince = newState.province[0].value;
    const currentDistric = newState.district[0].value;
    const { street, district, province } = nextProps.value || {};
    let updateState = false;
    if (currentProvince !== province) {
      updateState = true;
      newState.province = [{ value: province, label: province }];
    }
    if (district && currentDistric !== district) {
      updateState = true;
      newState.district = [{ value: district, label: district }];
    }

    if (newState.street !== street) {
      updateState = true;
      newState.street = street;
    }
    if (updateState) {
      this.setState(newState);
    }
  }

  validate = () => {
    const { street, province, district } = this.getValue();
    const { disableStreet } = this.props;
    if ((!street && !disableStreet) || !province || !district) {
      this.showError(true);
      return false;
    }

    return true;
  };

  getValue = () => {
    return {
      province: this.state.province[0].value,
      district: this.state.district[0].value,
      street: this.state.street
    };
  };

  showError = state => {
    this.setState({ showError: state });
  };

  _checkValues = () => {
    const { street, district, province } = this.getValue();
    console.log('dasdasdasdas change value', this.state.showError);
    if ((street || this.props.disableStreet) && district && province && this.state.showError) {
      this.setState({ showError: false });
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.getValue());
    }
  };

  render() {
    const { locations, label, required, fieldsLabel, disableStreet, showAllDistrictOpt } = this.props;
    let districtOpts = [];
    const citiesOpts = locations.map(location => {
      if (location.city === this.state.province[0].value) {
        districtOpts = location.district.map(distr => ({ label: distr.name, value: distr.name }));
      }
      return { value: location.city, label: location.city };
    });
    citiesOpts.unshift({ value: undefined, label: `${this.t('components').AddressInput.citiesOpts.city}` });
    if (districtOpts.length) {
      if (showAllDistrictOpt) {
        districtOpts.unshift({ value: -1, label: `${this.t('components').AddressInput.citiesOpts.all}` });
      }
      districtOpts.unshift({ value: undefined, label: `${this.t('components').AddressInput.citiesOpts.district}` });
    }

    const { street, district, province } = this.state;

    return (
      <div className={`field-wrapper form-group address-field${this.state.showError ? ' has-error' : ''}`}>
        {label && (
          <label>
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="wrapp">
          <div className="inputs-wrapper">
            <div className="field-wrapper">
              {fieldsLabel && fieldsLabel.province && <label>{fieldsLabel.province}</label>}
              <Select
                value={province}
                options={citiesOpts}
                name="address[province]"
                onChange={selected => {
                  this.setState(
                    {
                      province: selected,
                      district: [{ value: undefined, label: `${this.t('components').AddressInput.citiesOpts.district}` }]
                    },
                    this._checkValues
                  );
                }}
              />
            </div>
            <div className="field-wrapper">
              {fieldsLabel && fieldsLabel.district && <label>{fieldsLabel.district}</label>}
              <Select
                placeholder={this.t('components').AddressInput.citiesOpts.district}
                value={district}
                options={districtOpts}
                name="address[district]"
                onChange={selected => {
                  this.setState({ district: selected }, this._checkValues);
                }}
              />
            </div>
            {!disableStreet && (
              <div className="field-wrapper">
                {fieldsLabel && fieldsLabel.street && <label>{fieldsLabel.street}</label>}
                <Input
                  type="text"
                  name="address[street]"
                  placeholder={this.t('components').AddressInput.citiesOpts.street}
                  onChange={value => this.setState({ street: value }, this._checkValues)}
                  value={(street !== undefined && street !== 'undefined' && street) || ''}
                  floatingLabel
                />
              </div>
            )}
          </div>
          {this.state.showError && (
            <div className="help-block" style={{ display: 'block' }}>
              {this.t('components').AddressInput.citiesOpts.showError}
            </div>
          )}
        </div>
      </div>
    );
  }
}
