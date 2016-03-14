// var firebase = new Firebase("<https://brilliant-inferno-9749.firebaseio.com/>");
var map, infowindow;
function initMap() {
  var denCenter = {lat: 39.688, lng: -104.991};
  map = new google.maps.Map(document.getElementById('map'), {
    center: denCenter,
    zoom: 13,
  });

  

  // firebase.on("child_added", function(snapshot, prevChildKey) {
  // // Get latitude and longitude from Firebase.
  // var newPosition = snapshot.val();
  // var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);
  // var marker = new google.maps.Marker({
  //   position: latLng,
  //   map: map,
    // animation: google.maps.Animation.BOUNCE
  // });
// });

  infowindow = new google.maps.InfoWindow();

  // map.addListener('click', function(e) {
  //     firebase.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
  //     firebase.on("child_added", function(snapshot, prevChildKey) {
  //     // Get latitude and longitude from Firebase.
  //     var newPosition = snapshot.val();
  //     var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);
  //
  //     // Place a marker at that location.
  //     var marker = new google.maps.Marker({
  //       position: latLng,
  //       map: map,
  //       animation: google.maps.Animation.BOUNCE
  //     });
  //   });
  // });
}
