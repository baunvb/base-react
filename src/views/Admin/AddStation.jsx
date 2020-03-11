import React from 'react';
import MapApi from '../../components/Map/MapApi';
import WhaleloInput from "../../components/CustomInput/WhaleloInput";
import './addstation.css'
import * as requestApi from '../../api/requestApi'

class AddStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    }
  }

  onInput = (e) => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {
    const { lat, lng, name, phone, address, code } = this.state;
    var data = {
      "name": name,
      "phone_number": phone,
      "address": address,
      "lat": lat,
      "lng": lng,
      "province_code": code
    }

    requestApi.postRequest("api/station/createstation", data, (res) => {
      console.log("/api/station/createstation", res);
      alert(res.message)
    })

  }

  render() {
    return (
      <div>
        <div>
          <div className="in-line">
            <WhaleloInput
              name="name"
              label="Name*"
              onChange={this.onInput}
            />
            <WhaleloInput
              name="phone"
              label="Phone number*"
              onChange={this.onInput}
            />
            <WhaleloInput
              value={this.state.code}
              name="code"
              label="Province code*"
              onChange={this.onInput}
            />
          </div>
          <div className="in-line">
            <WhaleloInput
              value={this.state.lat}
              name="lat"
              label="Latitude*"
              onChange={this.onInput}
            />
            <WhaleloInput
              value={this.state.lng}
              name="lng"
              label="Longitude*"
              onChange={this.onInput}
            />

          </div>
          <WhaleloInput
            id="search-place"
            name="address"
            label="Search address*"
            onChange={this.onInput}
          />
          <button onClick={this.onSubmit} className="btn-add">Add station</button>
        </div>
        <MapApi
          id="myMap"
          options={{
            center: { lat: 21.024441, lng: 105.788869 },
            zoom: 8
          }}
          onMapLoad={map => {
            var directionsDisplay = new window.google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);
            var input = document.getElementById('search-place')
            var marker = new window.google.maps.Marker({
              draggable: true,
              animation: window.google.maps.Animation.DROP,
              position: { lat: 21.024441, lng: 105.788869 },
              map: map,
            });
            //map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
            var searchBox = new window.google.maps.places.Autocomplete(input, { componentRestrictions: { country: "VN" } });
            searchBox.addListener('place_changed', () => {
              var places = searchBox.getPlace();

              if (places.length == 0) {
                return;
              }
              let place = places;
              let location = place.geometry.location;
              this.setState({
                lat: location.lat(),
                lng: location.lng(),
                address: places.formatted_address
              })
              marker.setPosition(location);

            });

            var self = this;
            marker.addListener('dragend', e => {
              var geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({
                latLng: { lat: e.latLng.lat(), lng: e.latLng.lng() }
              }, function (results, status) {
                if (status === window.google.maps.GeocoderStatus.OK) {
                  console.log("Results", results);
                } else {
                  console.log('Cannot determine address at this location.' + status);
                }
              }
              );
            });
          }}
        />
      </div>
    )
  }

}

export default AddStation