var data = {
    places: [
    {
        name      : 'Adelitas',
        location  : 'Denver, CO'
    },
    {
        name      : 'The Hornet',
        location  : 'Denver, CO'
    },
    {
        name      : 'Sushi Den',
        location  : 'Denver, CO'
    },
    {
        name      : 'Kaos Pizzaria',
        location  : 'Denver, CO'
    },
    {
        name      : 'Park Burger',
        location  : 'Denver, CO'
    },
    {
        name      : 'Gaia Bistro',
        location  : 'Denver, CO'
    },
    {
        name      : 'Uno Mas',
        location  : 'Denver, CO'
    }
]};

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

      // Create a google.maps.LatLng object for the position of the marker.
      // A LatLng object literal (as above) could be used, but the heatmap
      // in the next step requires a google.maps.LatLng object.
      var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

      // Place a marker at that location.
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    });
  });
}

// Inside the view model constructor function is where to write most of the
// code to handle data-binding the list on the page with the data points.
function MyViewModel(data) {
    var self = this;
    self.name = mapData.places.name;
    self.lat = mapData.places.lat;
    self.lng = mapData.places.lng;

}
