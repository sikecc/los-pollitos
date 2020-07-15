import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import Geocoder from 'react-native-geocoding';
import Geocode from "react-geocode";

const mapStyles = {
  width: '100%',
  height: '100%'
};

Geocoder.init("AIzaSyDZWsRGm15g_84Tn3alWduqR4XFEBg7LmY", {language: "en"}); // use a valid API key
Geocode.setApiKey("AIzaSyDZWsRGm15g_84Tn3alWduqR4XFEBg7LmY");
Geocode.setLanguage("en");
class MapLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        success: '',
        error: '',
        options: '',
        lat: '',
        long: '',
        Address: '',
        locations: []
    };
  }


  
  success = (pos) => {
    var crd = pos.coords;
    // this.setState({
    //   lat: crd.latitude,
    //   long: crd.longitude
    // })
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    Geocoder.from(pos.coords.latitude, pos.coords.longitude).then(json => {
      console.log(json);
      // let addressComponent = json.results[0].address_components;
      let addressComponent2 = json.plus_code.compound_code;
      this.setState({
        lat: crd.latitude,
        long: crd.longitude,
        Address: addressComponent2,
      });
      for(let i =0;i<(this.props.Tasks.length);i++){
      // this.props.Tasks.map((task,i)=>{
        let locatioN = this.props.Tasks[i].task
        let address = `https://www.google.com/maps/search/?api=1&query=${locatioN}+${addressComponent2}`
      
      Geocode.fromAddress(address).then(
        response => {
          const {lat ,lng} = response.results[0].geometry.location;
          let lt = lat;
          let ln = lng;
          console.log(lt,ln);
          let temp = this.state.locations
          temp.push({
            title: locatioN,
            position: {lat: lt, lng: ln},
            name: locatioN
          });
          this.setState({locations: temp})
          console.log(this.state.locations)
        },
        error => {
          console.error(error)
        }
      );
    };
      console.log(addressComponent2);
    });
  }
  //CHeck for users permission to ask for location. If you dont have permisison dont ask. 
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }  
  
  componentDidMount = async () => {
     navigator.geolocation.getCurrentPosition(this.success ,this.error, this.options)
  }

  componentDidUpdate = async (prevState, prevProps) =>{
    if(prevState.lat === '' && prevState.long === ''){
      await navigator.geolocation.getCurrentPosition(this.success,this.error,this.options)
    }
    else{
      console.log(prevState)
    }
  }

  getMarkers = () => {
    return this.state.locations.map((marker,i) => {
      return <Marker
      onClick={this.onMarkerClick}
      title={marker.title}
      name={marker.name}
      position={marker.position}
      key={i}
      >
      </Marker>
    })
  }
  
  render() {
    let {lat,long } = this.state
    return(
      <div text-align="center">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          center={{
            lat: lat,
            lng: long,
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          title={"Clean the Bathroom at my house"}
          name={'My Location'}
          position={{lat: lat, lng: long}}
        />
        {this.getMarkers()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDZWsRGm15g_84Tn3alWduqR4XFEBg7LmY'
})(MapLoader);