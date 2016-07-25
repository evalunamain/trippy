import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';
import Marker from './Marker';

const __GAPI_KEY__ = MAPS_KEY;

export class MapsContainer extends React.Component {
  render() {
    return (
        <Map style={this.props.style} google={this.props.google}>
        </Map>
    );
  }
}

export default GoogleApiComponent({
  apiKey: __GAPI_KEY__,
})(MapsContainer);
