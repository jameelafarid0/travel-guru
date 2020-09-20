import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const GoogleMaps = () => {
    return (
        <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            
        </InfoWindow>
      </Map>
    );
};


export default GoogleApiWrapper({
    apiKey: ('AIzaSyBwWU2g613r9LZ5xYwedFx823NLaN5JR4s')
  })(GoogleMaps)