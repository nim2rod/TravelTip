

export const mapService = {
    initMap,
    addMarker,
    panTo,
    setUserLocation,
    centerMapOnUser,


}

const API_KEY ='AIzaSyBTe6kLY-SJi6miOaJI2r-Rotk_2VPWtAc'
var gMap;
let gMarker;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}

function addMarker(loc, adress) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Adress'
    });
    attachMessage(adress);
    setCenter(loc);
}

function attachMessage(adress) {
    let infowindow = new google.maps.infowindow({
        content: adress
    })
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBTe6kLY-SJi6miOaJI2r-Rotk_2VPWtAc'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function setUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(centerMapOnUser)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  function centerMapOnUser(position) {
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
}
