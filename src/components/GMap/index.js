/*
 * File: undefined
 * Desc: 
 * Author: DuyNg (duy@megadrupal.com)
 * Created: 2018-09-01 11:57:22
 */
import React from 'react';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

const mapKey = 'AIzaSyB1wwtHtOsSoPht3cZyBvfmC7kYNn_lrR8';

class GMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showBoxes: [],
      zoom: 15
    };
  }

  componentDidMount() {
    if (this._map.props.children.length) {
      const bounds = new window.google.maps.LatLngBounds();
      this._map.props.children.forEach(child => {
        if (child && child.type === Marker) {
          bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
        }
      });
      this._map.fitBounds(bounds);
    }
    if (this.props.showMyLocationControl) this.addYourLocationButton(this._map.context[MAP]);
    document.addEventListener('click', this._handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick);
  }

  _handleDocumentClick = event => {
    if (!this._infoBoxRef || !this._infoBoxRef.contain(event.target)) {
      this.setState({ showBoxes: [] });
    }
  };

  addYourLocationButton = (map, marker) => {
    let controlDiv = document.createElement('div');
    let firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    let secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0 0';
    secondChild.style.backgroundRepeat = 'no-repeat';
    firstChild.appendChild(secondChild);

    window.google.maps.event.addListener(map, 'center_changed', () => {
      secondChild.style['background-position'] = '0 0';
    });

    firstChild.addEventListener('click', () => {
      let imgX = '0';
      const animationInterval = setInterval(() => {
        imgX = imgX === '-18' ? '0' : '-18';
        secondChild.style['background-position'] = `${imgX}px 0`;
      }, 500);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let latlng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(latlng);
          map.setZoom(15);
          clearInterval(animationInterval);
          secondChild.style['background-position'] = '-144px 0';
        });
      } else {
        clearInterval(animationInterval);
        secondChild.style['background-position'] = '0 0';
      }
    });

    controlDiv.index = 1;
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  };

  render() {
    const { center, positions, renderInfoBox, customMarker, showMyLocationControl, myLocation } = this.props;
    const centerPoint = center || positions[0] || { latitude: 20.9770921, longitude: 105.7856715 };
    let filledPositions = (positions || []).filter(pos => pos && pos.latitude && pos.longitude);
    if (showMyLocationControl && myLocation) {
      filledPositions.push({ ...myLocation, isMyLocation: true });
    }

    return (
      <GoogleMap
        ref={r => {
          this._map = r;
        }}
        zoom={this.state.zoom}
        defaultCenter={{
          lat: parseFloat(centerPoint.latitude),
          lng: parseFloat(centerPoint.longitude)
        }}
        onBoundsChanged={parm => {
          if (this._map.getZoom() > 17) {
            this.setState({ zoom: 17 });
          }
        }}
        options={{ disableDefaultUI: true, zoomControl: this.props.showZoomControl }}
      >
        {filledPositions.map((pos, index) => {
          return (
            <Marker
              position={{
                lat: parseFloat(pos.latitude),
                lng: parseFloat(pos.longitude)
              }}
              key={`map-marker-${index}`}
              options={customMarker && !pos.isMyLocation ? { icon: { url: '/assets/img/search_icon-marker.png' } } : {}}
              onClick={event => {
                if (pos.isMyLocation) event.preventDefault();
                const { showBoxes } = this.state;
                if (showBoxes.indexOf(index) === -1) {
                  setTimeout(() => {
                    this.setState({ showBoxes: [index] });
                  }, 0);
                }
              }}
            >
              {this.state.showBoxes.indexOf(index) > -1 &&
                typeof renderInfoBox === 'function' &&
                !pos.isMyLocation && (
                  <InfoBox
                    onCloseClick={() => {
                      const { showBoxes } = this.state;
                      const showedIndex = showBoxes.indexOf(index);
                      this.setState({
                        showBoxes: [...showBoxes.slice(0, showedIndex), ...showBoxes.slice(showedIndex + 1)]
                      });
                    }}
                    options={{ closeBoxURL: '', enableEventPropagation: true }}
                  >
                    {renderInfoBox(index)}
                  </InfoBox>
                )}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="map-container" style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(GMap);
