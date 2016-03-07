var firebase = new Firebase("<https://brilliant-inferno-9749.firebaseio.com/>");
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.688, lng: -104.991},
    zoom: 13,
    // styles: [{
    //   featureType: 'poi',
    //   stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    // }, {
    //   featureType: 'transit.station',
    //   stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    // }],
    // disableDoubleClickZoom: true
  });

  map.addListener('click', function(e) {
      firebase.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
      firebase.on("child_added", function(snapshot, prevChildKey) {
      // Get latitude and longitude from Firebase.
      var newPosition = snapshot.val();
      var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

      // Place a marker at that location.
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    });
  });
}
